// In-memory module-scope cache for LTA BusRoutes dataset
let routeIndex = null;
let totalRouteRows = 0;
let loadPromise = null;

export function getRouteIndexStatus() {
  return {
    loaded: routeIndex !== null,
    rows: totalRouteRows
  };
}

function getSingaporeDayOfWeek() {
  const now = new Date();
  const dayStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Singapore',
    weekday: 'short'
  }).format(now);
  if (dayStr === 'Sun') return 'SUN';
  if (dayStr === 'Sat') return 'SAT';
  return 'WD';
}

async function fetchAllBusRoutes(accountKey) {
  const tempIndex = new Map();
  let rowCount = 0;

  for (let page = 0; page < 200; page++) {
    const skip = page * 500;
    const url = `https://datamall2.mytransport.sg/ltaodataservice/BusRoutes?%24skip=${skip}`;

    const response = await fetch(url, {
      headers: {
        AccountKey: accountKey.trim(),
        accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Upstream LTA BusRoutes returned HTTP ${response.status} at page ${page} (skip ${skip})`);
    }

    const data = await response.json();
    const rows = Array.isArray(data?.value) ? data.value : [];

    for (const row of rows) {
      rowCount++;
      const serviceNo = String(row.ServiceNo || '').trim();
      const direction = String(row.Direction || '1').trim();
      // Bus stop codes MUST be kept as strings to preserve leading zeroes
      const busStopCode = String(row.BusStopCode || '').trim();
      const stopSeq = Number(row.StopSequence);
      const distance = Number(row.Distance || 0);

      const routeKey = `${serviceNo}__${direction}`;
      if (!tempIndex.has(routeKey)) {
        tempIndex.set(routeKey, new Map());
      }

      tempIndex.get(routeKey).set(busStopCode, {
        StopSequence: stopSeq,
        Distance: distance,
        WD_LastBus: row.WD_LastBus ? String(row.WD_LastBus).trim() : '',
        SAT_LastBus: row.SAT_LastBus ? String(row.SAT_LastBus).trim() : '',
        SUN_LastBus: row.SUN_LastBus ? String(row.SUN_LastBus).trim() : ''
      });
    }

    if (rows.length < 500) {
      break;
    }
  }

  return { tempIndex, rowCount };
}

async function getOrLoadRouteIndex(accountKey) {
  if (routeIndex) {
    return routeIndex;
  }

  if (!loadPromise) {
    loadPromise = (async () => {
      try {
        const { tempIndex, rowCount } = await fetchAllBusRoutes(accountKey);
        routeIndex = tempIndex;
        totalRouteRows = rowCount;
        return routeIndex;
      } catch (err) {
        routeIndex = null;
        totalRouteRows = 0;
        throw err;
      } finally {
        loadPromise = null;
      }
    })();
  }

  return await loadPromise;
}

export default async function handler(req, res) {
  const accountKey = process.env.LTA_ACCOUNT_KEY;

  // BEFORE any LTA fetch, check that key exists and is non-empty
  if (!accountKey || accountKey.trim() === '') {
    return res.status(503).json({
      error: 'LTA_ACCOUNT_KEY is not set. Add it in Vercel and redeploy.'
    });
  }

  // Treat every bus stop code strictly as a string
  const rawFrom = req.query?.from ?? req.query?.From;
  const fromStop = typeof rawFrom === 'string' ? rawFrom.trim() : (rawFrom != null ? String(rawFrom).trim() : '');

  if (!fromStop || !/^\d{5}$/.test(fromStop)) {
    return res.status(400).json({
      error: 'Please provide a 5-digit bus stop code as the "from" parameter (e.g. 04121).'
    });
  }

  const destinationStop = '77009'; // Fixed destination: Pasir Ris Interchange

  let index;
  try {
    index = await getOrLoadRouteIndex(accountKey);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to load route data';
    return res.status(502).json({
      error: errorMsg,
      status: 502
    });
  }

  // Find all services where fromStop and 77009 appear on the same ServiceNo and Direction,
  // AND fromStop's StopSequence is LOWER than 77009's
  const rawMatches = [];
  const dayType = getSingaporeDayOfWeek();

  for (const [routeKey, stopsMap] of index.entries()) {
    if (stopsMap.has(fromStop) && stopsMap.has(destinationStop)) {
      const fromInfo = stopsMap.get(fromStop);
      const destInfo = stopsMap.get(destinationStop);

      if (fromInfo.StopSequence < destInfo.StopSequence) {
        const [serviceNo] = routeKey.split('__');
        const stopsAway = destInfo.StopSequence - fromInfo.StopSequence;
        const distanceKm = Math.round(Math.max(0, destInfo.Distance - fromInfo.Distance) * 10) / 10;

        let rawLastBus = '';
        if (dayType === 'SUN') {
          rawLastBus = fromInfo.SUN_LastBus || destInfo.SUN_LastBus || '';
        } else if (dayType === 'SAT') {
          rawLastBus = fromInfo.SAT_LastBus || destInfo.SAT_LastBus || '';
        } else {
          rawLastBus = fromInfo.WD_LastBus || destInfo.WD_LastBus || '';
        }

        let lastBus = rawLastBus;
        if (rawLastBus && rawLastBus.length === 4 && /^\d{4}$/.test(rawLastBus)) {
          lastBus = `${rawLastBus.slice(0, 2)}:${rawLastBus.slice(2)}`;
        }

        rawMatches.push({
          ServiceNo: serviceNo,
          stopsAway,
          distanceKm,
          lastBus: lastBus || 'N/A'
        });
      }
    }
  }

  // Deduplicate by ServiceNo if multiple directions matched, picking the shortest stop count
  const serviceMap = new Map();
  for (const m of rawMatches) {
    if (!serviceMap.has(m.ServiceNo) || serviceMap.get(m.ServiceNo).stopsAway > m.stopsAway) {
      serviceMap.set(m.ServiceNo, m);
    }
  }

  const matchingServices = Array.from(serviceMap.values());
  matchingServices.sort((a, b) => a.ServiceNo.localeCompare(b.ServiceNo, undefined, { numeric: true }));

  // If nothing matches, return empty list plus required plain message
  if (matchingServices.length === 0) {
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=172800');
    return res.status(200).json({
      from: fromStop,
      destination: destinationStop,
      services: [],
      message: 'No direct bus from that stop to Pasir Ris Interchange. You would need to change buses, and this page cannot plan that.'
    });
  }

  // Call BusArrival endpoint for the "from" stop and attach minutes until next two buses for matching ServiceNo only
  try {
    const arrivalUrl = `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${encodeURIComponent(fromStop)}`;
    const arrivalRes = await fetch(arrivalUrl, {
      headers: {
        AccountKey: accountKey.trim(),
        accept: 'application/json'
      }
    });

    if (arrivalRes.ok) {
      const arrivalData = await arrivalRes.json();
      const rawArrivalServices = Array.isArray(arrivalData?.Services) ? arrivalData.Services : [];
      const now = Date.now();

      const arrivalsByService = new Map();
      for (const s of rawArrivalServices) {
        const sNo = String(s.ServiceNo || '').trim();
        const minsList = [];
        for (const busKey of ['NextBus', 'NextBus2']) {
          const busObj = s[busKey];
          const estArrival = busObj?.EstimatedArrival;
          if (typeof estArrival === 'string' && estArrival.trim() !== '') {
            const arrTime = new Date(estArrival).getTime();
            if (!isNaN(arrTime)) {
              const diffMs = arrTime - now;
              const mins = Math.max(0, Math.floor(diffMs / 60000));
              minsList.push(mins);
            }
          }
        }
        arrivalsByService.set(sNo, minsList);
      }

      for (const service of matchingServices) {
        service.nextBuses = arrivalsByService.get(service.ServiceNo) || [];
      }
    } else {
      for (const service of matchingServices) {
        service.nextBuses = [];
      }
    }
  } catch (err) {
    for (const service of matchingServices) {
      service.nextBuses = [];
    }
  }

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=172800');
  return res.status(200).json({
    from: fromStop,
    destination: destinationStop,
    services: matchingServices
  });
}

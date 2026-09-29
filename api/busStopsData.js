// Comprehensive Singapore bus stop dataset and search utility
// Used for autocomplete suggestions when users search by stop or place name

export const FALLBACK_BUS_STOPS = [
  // Anchorvale (Sengkang) stops
  { code: '67351', name: 'Anchorvale CC', road: 'Anchorvale Rd' },
  { code: '67359', name: 'Opp Anchorvale CC', road: 'Anchorvale Rd' },
  { code: '67371', name: 'Sengkang Sports Cplx', road: 'Anchorvale St' },
  { code: '67379', name: 'Opp Sengkang Sports Cplx', road: 'Anchorvale St' },
  { code: '67341', name: 'Blk 317B', road: 'Anchorvale Rd' },
  { code: '67349', name: 'Blk 308A', road: 'Anchorvale Rd' },
  { code: '67361', name: 'Blk 326D', road: 'Anchorvale Rd' },
  { code: '67431', name: 'Opp Blk 326D', road: 'Anchorvale Rd' },
  { code: '67439', name: 'Bef Blk 326D', road: 'Anchorvale Rd' },
  { code: '67381', name: 'Opp Blk 313B', road: 'Anchorvale Rd' },
  { code: '67389', name: 'Blk 313B', road: 'Anchorvale Rd' },
  { code: '67481', name: 'Farmway Stn Exit A', road: 'Anchorvale Rd' },
  { code: '67489', name: 'Farmway Stn Exit B', road: 'Anchorvale Rd' },

  // Pasir Ris stops (Destination & surrounding stops)
  { code: '77009', name: 'Pasir Ris Int', road: 'Pasir Ris Dr 3' },
  { code: '77031', name: 'Opp Pasir Ris Stn', road: 'Pasir Ris Ctrl' },
  { code: '77039', name: 'Pasir Ris Stn', road: 'Pasir Ris Ctrl' },
  { code: '77011', name: 'Opp Pasir Ris Swimming Cpx', road: 'Pasir Ris Dr 1' },
  { code: '77019', name: 'Pasir Ris Swimming Cpx', road: 'Pasir Ris Dr 1' },
  { code: '77089', name: 'Downtown East', road: 'Pasir Ris Cl' },
  { code: '77099', name: 'Opp Downtown East', road: 'Pasir Ris Dr 3' },
  { code: '77109', name: 'Opp Blk 1', road: 'Pasir Ris Dr 3' },
  { code: '77149', name: 'Pasir Ris Elias CC', road: 'Pasir Ris Dr 3' },
  { code: '77159', name: 'Opp Pasir Ris Elias CC', road: 'Pasir Ris Dr 3' },
  { code: '77171', name: 'Blk 571', road: 'Pasir Ris Dr 1' },
  { code: '77179', name: 'Blk 643', road: 'Pasir Ris Dr 1' },
  { code: '77181', name: 'Blk 576', road: 'Pasir Ris Dr 1' },
  { code: '77189', name: 'Blk 640', road: 'Pasir Ris Dr 1' },
  { code: '77191', name: 'Blk 569', road: 'Pasir Ris Dr 1' },
  { code: '77199', name: 'Blk 568', road: 'Pasir Ris Dr 1' },
  { code: '77299', name: 'Pasir Ris Pr Sch', road: 'Pasir Ris Dr 6' },
  { code: '77309', name: 'Opp Pasir Ris Pr Sch', road: 'Pasir Ris Dr 6' },
  { code: '77319', name: 'Blk 442', road: 'Pasir Ris Dr 6' },
  { code: '77329', name: 'Opp Blk 442', road: 'Pasir Ris Dr 6' },

  // Tampines stops
  { code: '75009', name: 'Tampines Bus Interchange', road: 'Tampines Ctrl 1' },
  { code: '76009', name: 'Tampines Concourse Interchange', road: 'Tampines Concourse' },
  { code: '75139', name: 'Tampines Stn/Int', road: 'Tampines Ave 4' },
  { code: '75131', name: 'Opp Tampines Stn/Int', road: 'Tampines Ave 4' },
  { code: '75149', name: 'Tampines Mall', road: 'Tampines Ctrl 5' },
  { code: '76191', name: 'Our Tampines Hub', road: 'Tampines Ave 4' },
  { code: '76199', name: 'Opp Our Tampines Hub', road: 'Tampines Ave 4' },

  // Sengkang stops
  { code: '67009', name: 'Sengkang Bus Interchange', road: 'Sengkang Sq' },
  { code: '67409', name: 'Sengkang Stn Exit C', road: 'Compassvale Rd' },
  { code: '67401', name: 'Sengkang Stn Exit D', road: 'Compassvale Rd' },
  { code: '67419', name: 'Compassvale Stn Exit A', road: 'Compassvale Rd' },
  { code: '67449', name: 'Rivervale Plaza', road: 'Rivervale Dr' },

  // Punggol stops
  { code: '65009', name: 'Punggol Temporary Interchange', road: 'Punggol Pl' },
  { code: '65011', name: 'Punggol Stn/Waterway Point', road: 'Punggol Central' },
  { code: '65019', name: 'Opp Punggol Stn/Waterway Point', road: 'Punggol Central' },
  { code: '65281', name: 'Oasis Stn Exit B', road: 'Punggol Dr' },

  // Bedok stops
  { code: '84009', name: 'Bedok Bus Interchange', road: 'Bedok North Ave 1' },
  { code: '84039', name: 'Bedok Stn Exit B', road: 'New Upper Changi Rd' },
  { code: '84031', name: 'Bedok Stn Exit A', road: 'New Upper Changi Rd' },
  { code: '84011', name: 'Bedok Mall', road: 'Bedok North Ave 1' },

  // Loyang & Changi stops
  { code: '98011', name: 'Loyang Point', road: 'Loyang Ave' },
  { code: '98019', name: 'Opposite Loyang Point', road: 'Loyang Ave' },
  { code: '95129', name: 'Changi Airport PTB2', road: 'PTB2 B/Stn' },
  { code: '95139', name: 'Changi Airport PTB1', road: 'PTB1 B/Stn' },
  { code: '95149', name: 'Changi Airport PTB3', road: 'PTB3 B/Stn' },
  { code: '99009', name: 'Changi Village Ter', road: 'Changi Village Rd' },

  // Central, Orchard & Downtown stops
  { code: '04121', name: 'Opposite The Treasury', road: 'North Bridge Rd' },
  { code: '04111', name: 'Grand Park City Hall', road: 'Coleman St' },
  { code: '03019', name: 'Apollo Centre', road: 'Havelock Rd' },
  { code: '08057', name: 'Dhoby Ghaut Station', road: 'Orchard Rd' },
  { code: '09048', name: 'Orchard Station / Lucky Plaza', road: 'Orchard Rd' },
  { code: '09022', name: 'Orchard Stn/Tang Plaza', road: 'Orchard Blvd' },
  { code: '08138', name: 'Somerset Station', road: 'Somerset Rd' },
  { code: '01112', name: 'Bugis Stn Exit A', road: 'Victoria St' },
  { code: '01113', name: 'Bugis Stn Exit B', road: 'Victoria St' },
  { code: '03223', name: 'Chinatown Stn Exit E', road: 'Eu Tong Sen St' },
  { code: '10018', name: 'Raffles Place Stn Exit F', road: 'Robinson Rd' },
  { code: '03549', name: 'Marina Bay Financial Ctr', road: 'Marina Blvd' },

  // North, North-East & West stops
  { code: '53009', name: 'Bishan Bus Interchange', road: 'Bishan Pl' },
  { code: '52009', name: 'Ang Mo Kio Interchange', road: 'Ang Mo Kio Ave 8' },
  { code: '52109', name: 'Opp Ang Mo Kio Stn', road: 'Ang Mo Kio Ave 8' },
  { code: '54009', name: 'Serangoon Bus Interchange', road: 'Serangoon Ave 2' },
  { code: '52001', name: 'Toa Payoh Interchange', road: 'Lor 6 Toa Payoh' },
  { code: '59009', name: 'Yishun Bus Interchange', road: 'Yishun Ave 2' },
  { code: '46009', name: 'Woodlands Temporary Interchange', road: 'Woodlands Sq' },
  { code: '28009', name: 'Jurong East Bus Interchange', road: 'Jurong Gateway Rd' },
  { code: '17009', name: 'Clementi Bus Interchange', road: 'Clementi Ave 3' },
  { code: '22009', name: 'Boon Lay Bus Interchange', road: 'Jurong West Central 3' },
  { code: '43009', name: 'Bukit Batok Bus Interchange', road: 'Bt Batok Central' },
  { code: '44009', name: 'Bukit Panjang Interchange', road: 'Bt Panjang Ring Rd' },
  { code: '11009', name: 'Queenstown Stn Exit A', road: 'Commonwealth Ave' }
];

/**
 * Searches a list or Map of bus stops by query string.
 * Case-insensitive partial matching anywhere in the name or road.
 * Returns up to 5 matching stops.
 */
export function searchBusStops(query, busStopsSource) {
  if (!query || typeof query !== 'string') return [];
  const clean = query.trim().toLowerCase();
  if (clean.length < 2) return [];

  // Determine stops list
  let stopsList = [];
  if (busStopsSource instanceof Map) {
    for (const [code, info] of busStopsSource.entries()) {
      stopsList.push({
        code: String(code).trim(),
        name: String(info?.Description || '').trim(),
        road: String(info?.RoadName || '').trim()
      });
    }
  } else if (Array.isArray(busStopsSource) && busStopsSource.length > 0) {
    stopsList = busStopsSource;
  } else {
    stopsList = FALLBACK_BUS_STOPS;
  }

  const matches = [];
  const seenCodes = new Set();

  for (const stop of stopsList) {
    if (!stop?.code || !stop?.name || seenCodes.has(stop.code)) continue;

    const nameLower = stop.name.toLowerCase();
    const roadLower = (stop.road || '').toLowerCase();

    const nameMatches = nameLower.includes(clean);
    const roadMatches = roadLower.includes(clean);

    if (nameMatches || roadMatches) {
      seenCodes.add(stop.code);

      // Score for ranking: lower is better
      let score = 10;
      if (nameLower === clean) {
        score = 0;
      } else if (stop.code === '77009' && (nameMatches || clean.startsWith('pasir'))) {
        score = 0.5; // Prioritize Pasir Ris Interchange
      } else if (nameLower.startsWith(clean)) {
        score = 1;
      } else if (nameMatches) {
        score = 2;
      } else if (roadLower.startsWith(clean)) {
        score = 5;
      } else if (roadMatches) {
        score = 6;
      }

      matches.push({
        code: stop.code,
        name: stop.name,
        road: stop.road || '',
        score
      });
    }
  }

  // Also include fallback stops if source is a Map and had few matches
  if (busStopsSource instanceof Map && matches.length < 5) {
    for (const stop of FALLBACK_BUS_STOPS) {
      if (seenCodes.has(stop.code)) continue;
      const nameLower = stop.name.toLowerCase();
      const roadLower = (stop.road || '').toLowerCase();
      if (nameLower.includes(clean) || roadLower.includes(clean)) {
        seenCodes.add(stop.code);
        let score = 5;
        if (nameLower.startsWith(clean)) score = 2;
        else if (nameLower.includes(clean)) score = 3;
        matches.push({
          code: stop.code,
          name: stop.name,
          road: stop.road || '',
          score
        });
      }
    }
  }

  // Sort by relevance score, then alphabetically by name
  matches.sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    return a.name.localeCompare(b.name);
  });

  return matches.slice(0, 5).map(({ code, name, road }) => ({ code, name, road }));
}

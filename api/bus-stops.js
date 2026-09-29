import { searchBusStops } from './busStopsData.js';
import { getLoadedBusStops, loadBusStopsFromLTA } from './routes-to-shelter.js';

export default async function handler(req, res) {
  const query = (req.query?.q ?? req.query?.search ?? req.query?.name ?? '').toString().trim();

  // If query is shorter than 2 characters, return empty suggestions list
  if (query.length < 2) {
    return res.status(200).json({ stops: [] });
  }

  try {
    let stopsMap = getLoadedBusStops?.();
    const accountKey = process.env.LTA_ACCOUNT_KEY;

    if (!stopsMap && accountKey && accountKey.trim() !== '') {
      stopsMap = await loadBusStopsFromLTA(accountKey).catch(() => null);
    }

    const suggestions = searchBusStops(query, stopsMap);
    return res.status(200).json({ stops: suggestions });
  } catch {
    // Graceful fallback to static seed data
    const suggestions = searchBusStops(query, null);
    return res.status(200).json({ stops: suggestions });
  }
}

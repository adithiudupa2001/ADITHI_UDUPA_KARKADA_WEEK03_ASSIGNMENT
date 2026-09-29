export default async function handler(req, res) {
  try {
    const response = await fetch('https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast');
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Upstream weather service returned HTTP ${response.status}`,
        status: response.status
      });
    }

    const data = await response.json();
    const item = data?.data?.items?.[0];
    const validPeriod = item?.valid_period?.text || '';
    const forecasts = item?.forecasts || [];
    const pasirRis = forecasts.find((f) => f.area === 'Pasir Ris');
    const forecastText = pasirRis ? pasirRis.forecast : 'No forecast available';

    const issuedAt = item?.update_timestamp || item?.timestamp || new Date().toISOString();
    const fetchedAt = new Date().toISOString();
    const validPeriodStart = item?.valid_period?.start || null;
    const validPeriodEnd = item?.valid_period?.end || null;
    const isExpired = validPeriodEnd ? (Date.now() > new Date(validPeriodEnd).getTime()) : false;

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({
      area: 'Pasir Ris',
      forecast: forecastText,
      valid_period: validPeriod,
      valid_period_start: validPeriodStart,
      valid_period_end: validPeriodEnd,
      issued_at: issuedAt,
      fetched_at: fetchedAt,
      issued_time: issuedAt,
      fetched_time: fetchedAt,
      timestamp: item?.timestamp || null,
      update_timestamp: item?.update_timestamp || null,
      is_expired: isExpired
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to communicate with weather upstream service'
    });
  }
}

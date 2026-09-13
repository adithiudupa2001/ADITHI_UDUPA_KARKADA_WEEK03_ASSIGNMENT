import React, { useState, useEffect, useCallback } from 'react';
import { CloudSun, Search, AlertCircle, RefreshCw, Compass, Umbrella, Sun } from 'lucide-react';

interface DirectService {
  ServiceNo: string;
  stopsAway: number;
  distanceKm: number;
  lastBus: string;
  nextBuses?: number[];
}

interface RouteSearchResponse {
  from: string;
  destination: string;
  services: DirectService[];
  message?: string;
  error?: string;
}

interface WeatherData {
  area: string;
  forecast: string;
  valid_period: string;
}

export const ShelterVisitPlanningSection: React.FC = () => {
  // Panel A: Weather State
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Panel B: Route Finder State
  const [stopCodeInput, setStopCodeInput] = useState<string>('');
  const [routesLoading, setRoutesLoading] = useState<boolean>(false);
  const [routesError, setRoutesError] = useState<string | null>(null);
  const [routeResult, setRouteResult] = useState<RouteSearchResponse | null>(null);

  // Fetch Weather once and poll every 5 minutes (data.gov.sg rate limit friendly)
  const fetchWeather = useCallback(async () => {
    try {
      setWeatherLoading(true);
      setWeatherError(null);
      const res = await fetch('/api/weather');
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Weather status ${res.status}`);
      }
      const data: WeatherData = await res.json();
      setWeather(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to load weather';
      setWeatherError(msg);
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
    const weatherInterval = setInterval(() => {
      fetchWeather();
    }, 300000);
    return () => clearInterval(weatherInterval);
  }, [fetchWeather]);

  // Handle Route Search
  const handleSearchRoutes = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = stopCodeInput.trim();

    if (!cleanCode) {
      setRoutesError('Please enter a 5-digit bus stop code.');
      return;
    }

    if (!/^\d{5}$/.test(cleanCode)) {
      setRoutesError('A Singapore stop code must be exactly 5 digits (e.g. 04121).');
      return;
    }

    setRoutesLoading(true);
    setRoutesError(null);
    setRouteResult(null);

    try {
      const res = await fetch(`/api/routes-to-shelter?from=${encodeURIComponent(cleanCode)}`);
      const data: RouteSearchResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Error ${res.status}`);
      }

      setRouteResult(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to plan route';
      setRoutesError(msg);
    } finally {
      setRoutesLoading(false);
    }
  };

  // Derive plain advice from the actual forecast string
  const getForecastAdvice = (forecast: string): { text: string; isRain: boolean } => {
    const text = (forecast || '').toLowerCase();
    if (text.includes('rain') || text.includes('shower') || text.includes('thundery')) {
      return { text: 'Rain about — bring an umbrella', isRain: true };
    }
    return { text: 'Fine for a shelter visit', isRain: false };
  };

  const formatValidPeriodSentence = (period?: string) => {
    if (!period) return '';
    const clean = period.trim();
    const withPeriod = clean.endsWith('.') ? clean : `${clean}.`;
    return `Forecast for ${withPeriod}`;
  };

  const formatRouteNextBuses = (nextBuses?: number[]) => {
    if (!nextBuses || nextBuses.length === 0) {
      return 'no buses running currently';
    }
    const formatted = nextBuses.map((m) => (m < 1 ? 'Arriving' : `${m} min`));
    if (formatted.length === 1) {
      return `next bus in ${formatted[0]}`;
    }
    return `next buses in ${formatted[0]} and ${formatted[1]}`;
  };

  return (
    <section
      id="planning-visit-section"
      aria-label="Planning a visit to the shelter"
      className="space-y-5 sm:space-y-6"
    >
      {/* Section Header */}
      <div className="space-y-1.5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-warmgray-900 tracking-tight">
          Planning a visit to the shelter
        </h2>
        <p className="text-sm sm:text-base text-warmgray-600 font-medium">
          Two things worth checking before you come — the weather, and how to get here. Both are live.
        </p>
      </div>

      {/* Two Live Panels: Side by Side on Desktop, Stacked on Mobile with Route Finder first */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* PANEL A: How's the weather at Pasir Ris?
            On mobile: order-2 (rendered below Route Finder).
            On desktop: order-1 (left column). */}
        <div
          id="weather-panel"
          className="order-2 lg:order-1 bg-white border-2 border-[#DDD2C6] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md flex flex-col justify-between space-y-6"
        >
          <div className="space-y-5">
            {/* Header & Live Data Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EDE8]">
              <div className="flex items-center gap-2">
                <CloudSun className="w-6 h-6 text-amber-600 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-warmgray-500">
                  Pasir Ris Weather
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                LIVE DATA
              </span>
            </div>

            {/* Panel Heading: A clear step bigger than normal section headings */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-warmgray-900 tracking-tight leading-snug">
              How&apos;s the weather at Pasir Ris?
            </h3>

            {/* Weather Content Area */}
            {weatherLoading && !weather && (
              <div className="py-8 text-center space-y-2 text-warmgray-500 animate-pulse">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-amber-500" />
                <p className="text-sm font-medium">Checking live Singapore weather forecast...</p>
              </div>
            )}

            {weatherError && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Weather data temporarily unavailable</p>
                  <p className="text-xs text-amber-800">{weatherError}</p>
                </div>
              </div>
            )}

            {weather && (
              <div className="space-y-4">
                {/* 1. The forecast text, set large, as the main thing in the card */}
                <div className="pt-2">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-warmgray-900 tracking-tight leading-none">
                    {weather.forecast}
                  </div>
                </div>

                {/* 2. The valid period underneath in smaller text, worded as a sentence */}
                <p className="text-sm sm:text-base text-warmgray-600 font-medium">
                  {formatValidPeriodSentence(weather.valid_period)}
                </p>

                {/* 3. One short line of plain advice DERIVED FROM THE FORECAST TEXT ITSELF */}
                {(() => {
                  const advice = getForecastAdvice(weather.forecast);
                  return (
                    <div
                      className={`p-4 rounded-2xl border flex items-center gap-3 ${
                        advice.isRain
                          ? 'bg-blue-50/80 border-blue-200 text-blue-950'
                          : 'bg-amber-50/80 border-amber-200 text-amber-950'
                      }`}
                    >
                      {advice.isRain ? (
                        <Umbrella className="w-5 h-5 text-blue-600 shrink-0" />
                      ) : (
                        <Sun className="w-5 h-5 text-amber-600 shrink-0" />
                      )}
                      <span className="text-sm sm:text-base font-bold">
                        {advice.text}
                      </span>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#F2EDE8] text-xs text-warmgray-400 font-medium flex items-center justify-between">
            <span>Source: data.gov.sg 2-hour forecast</span>
            <span>Station: Pasir Ris</span>
          </div>
        </div>

        {/* PANEL B: How do I get to the shelter?
            On mobile: order-1 (rendered first!).
            On desktop: order-2 (right column). */}
        <div
          id="how-do-i-get-there-panel"
          className="order-1 lg:order-2 bg-white border-2 border-[#DDD2C6] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md flex flex-col justify-between space-y-6"
        >
          <div className="space-y-5">
            {/* Header & Live Data Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EDE8]">
              <div className="flex items-center gap-2">
                <Compass className="w-6 h-6 text-terracotta-600 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-warmgray-500">
                  Direct Bus Finder
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                LIVE DATA
              </span>
            </div>

            {/* Panel Heading: A clear step bigger than normal section headings */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-warmgray-900 tracking-tight leading-snug">
              How do I get to the shelter?
            </h3>

            {/* Stop code input form: larger and clearly the thing to use first */}
            <form onSubmit={handleSearchRoutes} className="space-y-3">
              <label htmlFor="bus-stop-code-hero-input" className="block text-sm font-bold text-warmgray-800">
                Enter the bus stop code nearest you
              </label>
              <div className="flex items-center gap-2.5">
                <input
                  id="bus-stop-code-hero-input"
                  type="text"
                  pattern="[0-9]*"
                  maxLength={5}
                  value={stopCodeInput}
                  onChange={(e) => setStopCodeInput(e.target.value)}
                  placeholder="e.g. 04121"
                  aria-describedby="stop-code-instruction-note"
                  className="w-full h-12 sm:h-14 px-4 rounded-2xl border-2 border-[#D6CBC0] bg-[#FAF8F5] text-base sm:text-lg text-warmgray-900 placeholder:text-warmgray-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 font-mono tracking-widest shadow-inner"
                />
                <button
                  id="btn-search-shelter-routes"
                  type="submit"
                  disabled={routesLoading}
                  className="h-12 sm:h-14 px-5 sm:px-7 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white font-bold text-sm sm:text-base transition-colors shadow-sm flex items-center gap-2 shrink-0 disabled:opacity-60"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
              <p id="stop-code-instruction-note" className="text-xs text-warmgray-500 leading-relaxed">
                Note: A Singapore stop code is 5 digits and the leading zero counts, so <strong>04121</strong> not 4121.
              </p>
            </form>

            {/* Clear loading state explaining the 10 to 20 seconds initial load */}
            {routesLoading && (
              <div
                id="routes-loading-state"
                className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1 text-xs sm:text-sm animate-pulse"
              >
                <p className="font-bold text-amber-900 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-terracotta-600" />
                  Loading route index from LTA DataMall...
                </p>
                <p className="text-amber-800 leading-relaxed text-xs">
                  The first request may take 10 to 20 seconds while the route data loads.
                </p>
              </div>
            )}

            {/* Error state */}
            {routesError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <p>{routesError}</p>
              </div>
            )}

            {/* Results below, one line per service, easy to read at a glance */}
            {routeResult && !routesLoading && (
              <div id="route-results-container" className="space-y-3 pt-2">
                {routeResult.services.length === 0 ? (
                  /* Empty result message kept exactly as it is */
                  <div className="p-4 rounded-2xl bg-warmgray-50 border border-warmgray-200 text-xs sm:text-sm text-warmgray-700 leading-relaxed">
                    <p className="font-medium">
                      No direct bus from that stop to Pasir Ris Interchange. You would need to change buses, and this page cannot plan that.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-warmgray-500 uppercase tracking-wider pb-1">
                      Direct Services to Pasir Ris Interchange (77009)
                    </div>
                    {routeResult.services.map((svc) => (
                      <div
                        key={svc.ServiceNo}
                        id={`direct-service-${svc.ServiceNo}`}
                        className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE8E0] hover:border-terracotta-300 transition-colors"
                      >
                        {/* One line per service, easy to read at a glance */}
                        <p className="text-sm sm:text-base font-semibold text-warmgray-900 leading-relaxed">
                          Service {svc.ServiceNo} &mdash; {svc.stopsAway} stops, {svc.distanceKm} km &mdash; {formatRouteNextBuses(svc.nextBuses)} &mdash; last bus {svc.lastBus}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#F2EDE8] text-xs text-warmgray-400 font-medium flex items-center justify-between">
            <span>Destination: Pasir Ris Interchange (77009)</span>
            <span>Source: LTA DataMall</span>
          </div>
        </div>
      </div>
    </section>
  );
};

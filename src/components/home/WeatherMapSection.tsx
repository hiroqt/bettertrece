import { useEffect, useState } from 'react';
import {
  Wind,
  Thermometer,
  Mountain,
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  ExternalLink,
  MapPin,
  RefreshCw,
} from 'lucide-react';

interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  isDay: boolean;
}

const DEFAULT_WEATHER: WeatherData = {
  temperature: 28,
  apparentTemperature: 31,
  weatherCode: 2, // Partly cloudy
  windSpeed: 14,
  humidity: 78,
  isDay: true,
};

function getWeatherDetails(code: number, isDay: boolean = true) {
  switch (code) {
    case 0:
      return {
        label: isDay ? 'Sunny & Clear' : 'Clear night',
        icon: Sun,
      };
    case 1:
      return {
        label: 'Mainly clear',
        icon: isDay ? Sun : CloudSun,
      };
    case 2:
      return {
        label: 'Partly cloudy',
        icon: CloudSun,
      };
    case 3:
      return {
        label: 'Overcast',
        icon: Cloud,
      };
    case 45:
    case 48:
      return {
        label: 'Foggy / Hazy',
        icon: CloudFog,
      };
    case 51:
    case 53:
    case 55:
      return {
        label: 'Light drizzle',
        icon: CloudRain,
      };
    case 61:
    case 63:
    case 65:
      return {
        label: 'Rain showers',
        icon: CloudRain,
      };
    case 80:
    case 81:
    case 82:
      return {
        label: 'Scattered rain showers',
        icon: CloudRain,
      };
    case 95:
    case 96:
    case 99:
      return {
        label: 'Thunderstorm',
        icon: CloudLightning,
      };
    default:
      return {
        label: 'Partly cloudy',
        icon: CloudSun,
      };
  }
}

export default function WeatherMapSection() {
  const [weather, setWeather] = useState<WeatherData>(DEFAULT_WEATHER);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch real-time weather from Open-Meteo (free & public API, no key required)
  const fetchWeather = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=14.2828&longitude=120.8667&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=Asia%2FManila'
      );
      if (res.ok) {
        const data = await res.json();
        if (data.current) {
          setWeather({
            temperature: Math.round(data.current.temperature_2m),
            apparentTemperature: Math.round(data.current.apparent_temperature),
            weatherCode: data.current.weather_code,
            windSpeed: Math.round(data.current.wind_speed_10m),
            humidity: data.current.relative_humidity_2m,
            isDay: Boolean(data.current.is_day),
          });
          setLastUpdated(new Date());
        }
      }
    } catch {
      // Fallback seamlessly to default values
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const weatherInfo = getWeatherDetails(weather.weatherCode, weather.isDay);
  const WeatherIcon = weatherInfo.icon;

  return (
    <section
      id="weather-and-map"
      aria-label="Weather and Map of Trece Martires"
      className="py-12 lg:py-16 bg-white border-b border-gray-100"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Weather and Map of Trece Martires
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Current weather conditions and interactive geographical map of
              Trece Martires City, Cavite.
            </p>
          </div>
          {lastUpdated && (
            <button
              onClick={fetchWeather}
              disabled={isLoading}
              title="Refresh live weather data"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#003893] transition-colors px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-blue-200"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`}
              />
              <span>Live Updates</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* 1. LEFT CARD: WEATHER CARD */}
          <div className="bg-gradient-to-br from-[#002b70] via-[#003893] to-[#004bb5] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle background glow effect */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            <div>
              {/* City & Province Label */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm sm:text-base font-semibold text-blue-100/90 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-300" />
                  Trece Martires City, Cavite
                </span>
                <span className="text-[11px] font-medium bg-white/15 backdrop-blur-xs text-blue-100 px-2.5 py-0.5 rounded-full border border-white/20">
                  Cavite Center
                </span>
              </div>

              {/* Temperature Reading */}
              <div className="my-3 sm:my-5 flex items-baseline">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white font-mono">
                  {weather.temperature}°
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-blue-200 ml-2 font-mono">
                  C
                </span>
              </div>

              {/* Weather Condition */}
              <div className="flex items-center gap-2 text-base sm:text-lg font-medium text-blue-100">
                <WeatherIcon className="w-5 h-5 text-amber-300 shrink-0" />
                <span>{weatherInfo.label}</span>
              </div>
            </div>

            {/* Bottom Weather Indicators Strip */}
            <div className="mt-8 pt-5 border-t border-white/20">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-blue-100 font-medium">
                {/* Wind */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Wind className="w-4 h-4 text-blue-300 shrink-0" />
                  <span className="truncate">{weather.windSpeed} km/h</span>
                </div>

                {/* Climate Feel */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Thermometer className="w-4 h-4 text-blue-300 shrink-0" />
                  <span className="truncate">
                    Feels {weather.apparentTemperature}°C
                  </span>
                </div>

                {/* Elevation */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Mountain className="w-4 h-4 text-blue-300 shrink-0" />
                  <span className="truncate">~100m elevation</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. RIGHT CARD: INTERACTIVE MAP CARD */}
          <div className="bg-slate-100 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col relative min-h-[300px] sm:min-h-[340px]">
            {/* OpenStreetMap Embed */}
            <iframe
              title="Map of Trece Martires City, Cavite"
              width="100%"
              height="100%"
              className="w-full flex-grow min-h-[280px] sm:min-h-[320px] border-0"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=120.8200%2C14.2500%2C120.9100%2C14.3200&layer=mapnik&marker=14.2828%2C120.8667"
            />

            {/* Open in Map Links / Attribution Overlay Strip */}
            <div className="bg-white/95 backdrop-blur-xs border-t border-gray-200 px-4 py-2.5 flex items-center justify-between text-xs text-gray-600">
              <span className="flex items-center gap-1.5 font-medium text-gray-700">
                <MapPin className="w-3.5 h-3.5 text-[#003893]" />
                14.2828° N, 120.8667° E
              </span>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.openstreetmap.org/?mlat=14.2828&mlon=120.8667#map=14/14.2828/120.8667"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#003893] font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>OpenStreetMap</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="https://maps.google.com/?q=Trece+Martires+City+Hall,+Cavite"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#003893] font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

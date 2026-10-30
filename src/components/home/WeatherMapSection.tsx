import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  RefreshCw,
} from '../../lib/icons';
import BarangayPopulationExplorer from './BarangayPopulationExplorer';

type WeatherType =
  | 'sunny'
  | 'clear-night'
  | 'cloudy'
  | 'cloudy-night'
  | 'rain'
  | 'thunderstorm'
  | 'fog';

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

function getWeatherDetails(
  code: number,
  isDay: boolean = true
): {
  label: string;
  type: WeatherType;
  icon: typeof Sun;
  accentColor: string;
  badgeBg: string;
  description: string;
} {
  switch (code) {
    case 0:
      return {
        label: isDay ? 'Sunny & Clear' : 'Clear Night Sky',
        type: isDay ? 'sunny' : 'clear-night',
        icon: isDay ? Sun : Moon,
        accentColor: isDay ? 'text-amber-300' : 'text-indigo-200',
        badgeBg: isDay
          ? 'bg-amber-400/25 text-amber-100 border-amber-300/40 shadow-amber-500/20'
          : 'bg-indigo-500/25 text-indigo-100 border-indigo-300/40 shadow-indigo-500/20',
        description: isDay
          ? 'Bright sunshine with excellent visibility across Trece Martires.'
          : 'Clear, star-lit skies over the provincial capital.',
      };
    case 1:
      return {
        label: isDay ? 'Mainly Clear' : 'Mainly Clear Night',
        type: isDay ? 'sunny' : 'clear-night',
        icon: isDay ? Sun : CloudMoon,
        accentColor: isDay ? 'text-amber-300' : 'text-blue-200',
        badgeBg: isDay
          ? 'bg-amber-400/25 text-amber-100 border-amber-300/40'
          : 'bg-blue-500/25 text-blue-100 border-blue-300/40',
        description: 'Pleasant weather with minimal cloud cover.',
      };
    case 2:
      return {
        label: isDay ? 'Partly Cloudy' : 'Partly Cloudy Night',
        type: isDay ? 'cloudy' : 'cloudy-night',
        icon: isDay ? CloudSun : CloudMoon,
        accentColor: isDay ? 'text-sky-200' : 'text-slate-200',
        badgeBg: 'bg-white/20 text-white border-white/30',
        description: 'Scattered clouds with intermittent tropical breeze.',
      };
    case 3:
      return {
        label: 'Overcast Skies',
        type: isDay ? 'cloudy' : 'cloudy-night',
        icon: Cloud,
        accentColor: 'text-slate-200',
        badgeBg: 'bg-slate-500/30 text-slate-100 border-slate-300/30',
        description: 'Dense cloud ceiling covering the city horizon.',
      };
    case 45:
    case 48:
      return {
        label: 'Foggy / Hazy',
        type: 'fog',
        icon: CloudFog,
        accentColor: 'text-slate-200',
        badgeBg: 'bg-slate-400/25 text-slate-100 border-slate-300/40',
        description: 'Morning mist and reduced visibility across lowlands.',
      };
    case 51:
    case 53:
    case 55:
      return {
        label: 'Light Drizzle',
        type: 'rain',
        icon: CloudRain,
        accentColor: 'text-cyan-300',
        badgeBg: 'bg-cyan-500/25 text-cyan-100 border-cyan-300/40',
        description: 'Gentle raindrops falling over Trece Martires.',
      };
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return {
        label: 'Rain Showers',
        type: 'rain',
        icon: CloudRain,
        accentColor: 'text-sky-300',
        badgeBg: 'bg-sky-500/25 text-sky-100 border-sky-300/40',
        description: 'Active rain showers with cooling surface winds.',
      };
    case 80:
    case 81:
    case 82:
      return {
        label: 'Scattered Showers',
        type: 'rain',
        icon: CloudRain,
        accentColor: 'text-sky-300',
        badgeBg: 'bg-sky-500/25 text-sky-100 border-sky-300/40',
        description: 'Passing tropical rain clouds across Cavite plains.',
      };
    case 95:
    case 96:
    case 99:
      return {
        label: 'Thunderstorm',
        type: 'thunderstorm',
        icon: CloudLightning,
        accentColor: 'text-yellow-300',
        badgeBg: 'bg-purple-500/30 text-purple-100 border-purple-300/40',
        description: 'Active lightning activity and heavy precipitation.',
      };
    default:
      return {
        label: isDay ? 'Partly Cloudy' : 'Partly Cloudy Night',
        type: isDay ? 'cloudy' : 'cloudy-night',
        icon: isDay ? CloudSun : CloudMoon,
        accentColor: 'text-sky-200',
        badgeBg: 'bg-white/20 text-white border-white/30',
        description: 'Fair tropical conditions in Cavite Center.',
      };
  }
}

export default function WeatherMapSection() {
  const { t } = useTranslation();
  const [liveWeather, setLiveWeather] = useState<WeatherData>(DEFAULT_WEATHER);
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
          const freshWeather: WeatherData = {
            temperature: Math.round(data.current.temperature_2m),
            apparentTemperature: Math.round(data.current.apparent_temperature),
            weatherCode: data.current.weather_code,
            windSpeed: Math.round(data.current.wind_speed_10m),
            humidity: Math.round(data.current.relative_humidity_2m),
            isDay: Boolean(data.current.is_day),
          };
          setLiveWeather(freshWeather);
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

  const weatherInfo = getWeatherDetails(
    liveWeather.weatherCode,
    liveWeather.isDay
  );
  const WeatherIcon = weatherInfo.icon;

  return (
    <section
      id="weather-and-map"
      aria-label={t('weather.title', 'Weather and Map of Trece Martires')}
      className="py-12 lg:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {t('weather.title', 'Check the weather and explore the city')}
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              {t(
                'weather.description',
                'See current conditions and explore places around Trece Martires.'
              )}
            </p>
          </div>

          {/* Header Controls: Live Updates Status & Refresh Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <WeatherIcon className={`h-4 w-4 ${weatherInfo.accentColor}`} />
              <span>{weatherInfo.label}</span>
            </div>
            <button
              onClick={fetchWeather}
              disabled={isLoading}
              title={t(
                'weather.refreshTitle',
                'Refresh live weather data from Open-Meteo'
              )}
              className="inline-flex items-center gap-1.5 text-xs text-gray-700 hover:text-[#003893] bg-white transition-all px-3.5 py-2 rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-2xs ring-1 ring-slate-900/5 cursor-pointer font-semibold"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-[#003893] ${
                  isLoading ? 'animate-spin' : ''
                }`}
              />
              <span className="font-bold">{liveWeather.temperature}°C</span>
              <span>
                {lastUpdated
                  ? `Updated ${lastUpdated.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}`
                  : t('weather.liveUpdates', 'Refresh')}
              </span>
            </button>
          </div>
        </div>

        <BarangayPopulationExplorer />
      </div>
    </section>
  );
}

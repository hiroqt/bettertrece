import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Wind,
  Thermometer,
  Mountain,
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  ExternalLink,
  MapPin,
  RefreshCw,
  Droplets,
  Sparkles,
} from 'lucide-react';
import WeatherCardBackground, { WeatherType } from './WeatherCardBackground';

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

// Interactive presets for testing / previewing different atmospheric conditions
const PRESET_MODES: {
  id: string;
  name: string;
  emoji: string;
  weather: WeatherData;
}[] = [
  {
    id: 'live',
    name: 'Live Trece Weather',
    emoji: '📡',
    weather: DEFAULT_WEATHER,
  },
  {
    id: 'rain',
    name: 'Rainy (Raindrops)',
    emoji: '🌧️',
    weather: {
      temperature: 24,
      apparentTemperature: 26,
      weatherCode: 63, // Rain showers
      windSpeed: 18,
      humidity: 92,
      isDay: true,
    },
  },
  {
    id: 'thunderstorm',
    name: 'Thunderstorm',
    emoji: '⛈️',
    weather: {
      temperature: 23,
      apparentTemperature: 25,
      weatherCode: 95, // Thunderstorm
      windSpeed: 30,
      humidity: 96,
      isDay: false,
    },
  },
  {
    id: 'sunny',
    name: 'Sunny Day',
    emoji: '☀️',
    weather: {
      temperature: 33,
      apparentTemperature: 38,
      weatherCode: 0, // Clear sky
      windSpeed: 10,
      humidity: 58,
      isDay: true,
    },
  },
  {
    id: 'cloudy',
    name: 'Partly Cloudy',
    emoji: '⛅',
    weather: {
      temperature: 29,
      apparentTemperature: 32,
      weatherCode: 2, // Partly cloudy
      windSpeed: 14,
      humidity: 74,
      isDay: true,
    },
  },
  {
    id: 'clear-night',
    name: 'Clear Night',
    emoji: '🌙',
    weather: {
      temperature: 25,
      apparentTemperature: 27,
      weatherCode: 0, // Clear night
      windSpeed: 8,
      humidity: 82,
      isDay: false,
    },
  },
  {
    id: 'fog',
    name: 'Misty / Fog',
    emoji: '🌫️',
    weather: {
      temperature: 22,
      apparentTemperature: 23,
      weatherCode: 45, // Fog
      windSpeed: 4,
      humidity: 98,
      isDay: true,
    },
  },
];

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

function getWeatherBorderClasses(type: WeatherType): string {
  switch (type) {
    case 'rain':
      return 'border-sky-300/40 ring-1 ring-sky-300/25 shadow-[0_16px_40px_-8px_rgba(14,165,233,0.35),0_4px_16px_rgba(0,0,0,0.5)]';
    case 'thunderstorm':
      return 'border-purple-300/45 ring-1 ring-purple-300/30 shadow-[0_16px_40px_-8px_rgba(168,85,247,0.35),0_4px_16px_rgba(0,0,0,0.5)]';
    case 'sunny':
      return 'border-amber-300/45 ring-1 ring-amber-300/30 shadow-[0_16px_40px_-8px_rgba(245,158,11,0.35),0_4px_16px_rgba(0,0,0,0.4)]';
    case 'clear-night':
      return 'border-indigo-300/40 ring-1 ring-indigo-300/25 shadow-[0_16px_40px_-8px_rgba(99,102,241,0.35),0_4px_16px_rgba(0,0,0,0.5)]';
    case 'cloudy':
      return 'border-blue-200/45 ring-1 ring-blue-200/30 shadow-[0_16px_40px_-8px_rgba(59,130,246,0.3),0_4px_16px_rgba(0,0,0,0.4)]';
    case 'cloudy-night':
      return 'border-slate-300/35 ring-1 ring-slate-300/20 shadow-[0_16px_40px_-8px_rgba(15,23,42,0.5),0_4px_16px_rgba(0,0,0,0.6)]';
    case 'fog':
      return 'border-slate-300/40 ring-1 ring-slate-300/25 shadow-[0_16px_40px_-8px_rgba(100,116,139,0.35),0_4px_16px_rgba(0,0,0,0.4)]';
    default:
      return 'border-white/30 ring-1 ring-white/20 shadow-[0_16px_40px_-8px_rgba(0,56,147,0.3),0_4px_16px_rgba(0,0,0,0.4)]';
  }
}

export default function WeatherMapSection() {
  const { t } = useTranslation();
  const [liveWeather, setLiveWeather] = useState<WeatherData>(DEFAULT_WEATHER);
  const [selectedPreset, setSelectedPreset] = useState<string>('live');
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

  // Determine current active weather data (either live or selected preview preset)
  const currentPreset = PRESET_MODES.find(p => p.id === selectedPreset);
  const activeWeather =
    selectedPreset === 'live'
      ? liveWeather
      : currentPreset
        ? currentPreset.weather
        : liveWeather;

  const weatherInfo = getWeatherDetails(
    activeWeather.weatherCode,
    activeWeather.isDay
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#003893] text-xs font-semibold uppercase tracking-wider mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('weather.liveUpdates', 'Real-Time Climate')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {t('weather.title', 'Weather & Geographical Map')}
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              {t(
                'weather.description',
                'Live meteorological readings and interactive spatial map for Trece Martires City, Cavite.'
              )}
            </p>
          </div>

          {/* Header Controls: Live Updates & Weather Preview Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 p-1 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xs ring-1 ring-slate-900/5">
              {PRESET_MODES.slice(0, 4).map(preset => {
                const isActive = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset.id)}
                    className={`text-xs px-2.5 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1 cursor-pointer ${
                      isActive
                        ? 'bg-[#003893] text-white shadow-xs font-semibold'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                    }`}
                    title={`Switch to ${preset.name}`}
                  >
                    <span>{preset.emoji}</span>
                    <span className="hidden sm:inline">
                      {preset.id === 'live'
                        ? 'Live'
                        : preset.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}

              {/* Extra presets toggle / dropdown preview options */}
              {PRESET_MODES.slice(4).map(preset => {
                const isActive = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset.id)}
                    className={`text-xs px-2 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1 cursor-pointer ${
                      isActive
                        ? 'bg-[#003893] text-white shadow-xs font-semibold'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                    }`}
                    title={`Switch to ${preset.name}`}
                  >
                    <span>{preset.emoji}</span>
                    <span className="hidden md:inline">
                      {preset.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedPreset === 'live' && lastUpdated && (
              <button
                onClick={fetchWeather}
                disabled={isLoading}
                title={t(
                  'weather.refreshTitle',
                  'Refresh live weather data from Open-Meteo'
                )}
                className="inline-flex items-center gap-1.5 text-xs text-gray-700 hover:text-[#003893] bg-white transition-all px-3 py-2 rounded-xl border border-slate-200/90 hover:border-blue-300 shadow-2xs ring-1 ring-slate-900/5 cursor-pointer font-medium"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-[#003893] ${
                    isLoading ? 'animate-spin' : ''
                  }`}
                />
                <span className="hidden sm:inline">
                  {t('weather.liveUpdates', 'Refresh')}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Two-Column Grid: Left (Dynamic Weather Card), Right (Interactive Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* 1. LEFT CARD: DYNAMIC ANIMATED WEATHER CARD */}
          <div
            className={`relative text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden group min-h-[360px] sm:min-h-[400px] border ${getWeatherBorderClasses(
              weatherInfo.type
            )} transition-all duration-500`}
          >
            {/* Dynamic Background Rendering Component (Raindrops, Stars, Sunburst, Clouds, Fog, Lightning) */}
            <WeatherCardBackground weatherType={weatherInfo.type} />

            {/* Front Card Layer Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Top Row: Location & Weather Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-2 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30 shadow-sm ring-1 ring-white/10">
                  <MapPin className="w-4 h-4 text-sky-300 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                    {t('common.treceCity', 'Trece Martires City, Cavite')}
                  </span>
                </div>

                <div
                  className={`text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-md shadow-sm ring-1 ring-white/15 transition-all ${weatherInfo.badgeBg}`}
                >
                  {selectedPreset !== 'live' ? (
                    <span className="flex items-center gap-1">
                      <span>Preview: {currentPreset?.name}</span>
                    </span>
                  ) : (
                    <span>{t('weather.caviteCenter', 'Cavite Center')}</span>
                  )}
                </div>
              </div>

              {/* Main Reading Section: Temperature + Condition */}
              <div className="my-auto py-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] font-mono">
                    {activeWeather.temperature}°
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-sky-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] font-mono">
                    C
                  </span>
                </div>

                {/* Weather Condition Label & Dynamic Animated Icon */}
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/30 ring-1 ring-white/15 shadow-sm">
                    <WeatherIcon
                      className={`w-6 h-6 sm:w-7 sm:h-7 shrink-0 ${weatherInfo.accentColor}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-xs">
                      {weatherInfo.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-100/90 drop-shadow-xs">
                      {weatherInfo.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Smooth Gradient Divider */}
              <div className="mt-6 mb-3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Bottom Weather Indicators Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs sm:text-sm font-medium">
                {/* Wind Speed */}
                <div className="bg-black/30 hover:bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/20 ring-1 ring-white/10 shadow-sm transition-all duration-200 hover:border-white/35 hover:scale-[1.02] flex items-center gap-2">
                  <Wind className="w-4 h-4 text-sky-300 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-blue-200/80 uppercase font-semibold">
                      {t('weather.wind', 'Wind')}
                    </div>
                    <div className="truncate text-white font-bold">
                      {activeWeather.windSpeed} km/h
                    </div>
                  </div>
                </div>

                {/* Feels Like */}
                <div className="bg-black/30 hover:bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/20 ring-1 ring-white/10 shadow-sm transition-all duration-200 hover:border-white/35 hover:scale-[1.02] flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-amber-300 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-blue-200/80 uppercase font-semibold">
                      {t('weather.feelsLike', 'Feels Like')}
                    </div>
                    <div className="truncate text-white font-bold">
                      {activeWeather.apparentTemperature}°C
                    </div>
                  </div>
                </div>

                {/* Humidity */}
                <div className="bg-black/30 hover:bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/20 ring-1 ring-white/10 shadow-sm transition-all duration-200 hover:border-white/35 hover:scale-[1.02] flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-300 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-blue-200/80 uppercase font-semibold">
                      {t('weather.humidity', 'Humidity')}
                    </div>
                    <div className="truncate text-white font-bold">
                      {activeWeather.humidity}%
                    </div>
                  </div>
                </div>

                {/* Elevation */}
                <div className="bg-black/30 hover:bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/20 ring-1 ring-white/10 shadow-sm transition-all duration-200 hover:border-white/35 hover:scale-[1.02] flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-emerald-300 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-blue-200/80 uppercase font-semibold">
                      {t('weather.elevation', 'Elevation')}
                    </div>
                    <div className="truncate text-white font-bold">~100m</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. RIGHT CARD: INTERACTIVE GEOGRAPHICAL MAP CARD */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md ring-1 ring-slate-900/5 overflow-hidden flex flex-col relative min-h-[360px] sm:min-h-[400px] transition-all duration-300 hover:shadow-xl hover:border-slate-300">
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
            <div className="bg-white/95 backdrop-blur-xs border-t border-slate-200/90 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
              <span className="flex items-center gap-1.5 font-medium text-gray-700">
                <MapPin className="w-3.5 h-3.5 text-[#003893]" />
                <span>14.2828° N, 120.8667° E</span>
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

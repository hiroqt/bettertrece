export type WeatherType =
  | 'sunny'
  | 'clear-night'
  | 'cloudy'
  | 'cloudy-night'
  | 'rain'
  | 'thunderstorm'
  | 'fog';

interface WeatherCardBackgroundProps {
  weatherType: WeatherType;
  className?: string;
}

// Deterministic static particles to prevent hydration mismatches and extra renders
const RAINDROPS = [
  {
    left: '4%',
    top: '-20px',
    height: '28px',
    duration: '0.75s',
    delay: '0s',
    opacity: 0.7,
  },
  {
    left: '9%',
    top: '-30px',
    height: '34px',
    duration: '0.9s',
    delay: '-0.3s',
    opacity: 0.8,
  },
  {
    left: '15%',
    top: '-25px',
    height: '22px',
    duration: '0.65s',
    delay: '-0.7s',
    opacity: 0.6,
  },
  {
    left: '21%',
    top: '-35px',
    height: '40px',
    duration: '0.85s',
    delay: '-1.1s',
    opacity: 0.85,
  },
  {
    left: '27%',
    top: '-20px',
    height: '26px',
    duration: '0.7s',
    delay: '-0.4s',
    opacity: 0.65,
  },
  {
    left: '33%',
    top: '-40px',
    height: '36px',
    duration: '0.95s',
    delay: '-1.4s',
    opacity: 0.75,
  },
  {
    left: '39%',
    top: '-25px',
    height: '30px',
    duration: '0.8s',
    delay: '-0.2s',
    opacity: 0.8,
  },
  {
    left: '45%',
    top: '-30px',
    height: '24px',
    duration: '0.7s',
    delay: '-0.9s',
    opacity: 0.6,
  },
  {
    left: '51%',
    top: '-35px',
    height: '38px',
    duration: '0.9s',
    delay: '-0.5s',
    opacity: 0.85,
  },
  {
    left: '57%',
    top: '-20px',
    height: '28px',
    duration: '0.75s',
    delay: '-1.3s',
    opacity: 0.7,
  },
  {
    left: '63%',
    top: '-30px',
    height: '35px',
    duration: '0.85s',
    delay: '-0.8s',
    opacity: 0.8,
  },
  {
    left: '69%',
    top: '-25px',
    height: '22px',
    duration: '0.65s',
    delay: '-0.1s',
    opacity: 0.6,
  },
  {
    left: '75%',
    top: '-40px',
    height: '42px',
    duration: '1.0s',
    delay: '-1.6s',
    opacity: 0.9,
  },
  {
    left: '81%',
    top: '-20px',
    height: '25px',
    duration: '0.7s',
    delay: '-0.6s',
    opacity: 0.65,
  },
  {
    left: '87%',
    top: '-35px',
    height: '32px',
    duration: '0.85s',
    delay: '-1.2s',
    opacity: 0.75,
  },
  {
    left: '93%',
    top: '-25px',
    height: '30px',
    duration: '0.8s',
    delay: '-0.35s',
    opacity: 0.8,
  },
  {
    left: '97%',
    top: '-30px',
    height: '26px',
    duration: '0.75s',
    delay: '-1.0s',
    opacity: 0.7,
  },
  // Second wave for depth
  {
    left: '7%',
    top: '-35px',
    height: '20px',
    duration: '1.1s',
    delay: '-0.5s',
    opacity: 0.45,
  },
  {
    left: '18%',
    top: '-20px',
    height: '25px',
    duration: '1.05s',
    delay: '-1.3s',
    opacity: 0.5,
  },
  {
    left: '30%',
    top: '-30px',
    height: '22px',
    duration: '1.15s',
    delay: '-0.85s',
    opacity: 0.4,
  },
  {
    left: '42%',
    top: '-25px',
    height: '24px',
    duration: '1.0s',
    delay: '-1.5s',
    opacity: 0.5,
  },
  {
    left: '54%',
    top: '-35px',
    height: '20px',
    duration: '1.2s',
    delay: '-0.25s',
    opacity: 0.4,
  },
  {
    left: '66%',
    top: '-20px',
    height: '26px',
    duration: '1.05s',
    delay: '-0.95s',
    opacity: 0.5,
  },
  {
    left: '78%',
    top: '-30px',
    height: '22px',
    duration: '1.1s',
    delay: '-1.7s',
    opacity: 0.45,
  },
  {
    left: '90%',
    top: '-25px',
    height: '24px',
    duration: '1.0s',
    delay: '-0.6s',
    opacity: 0.4,
  },
];

const RAIN_SPLASHES = [
  { left: '12%', bottom: '8px', delay: '0.1s' },
  { left: '28%', bottom: '12px', delay: '0.6s' },
  { left: '46%', bottom: '6px', delay: '0.35s' },
  { left: '64%', bottom: '10px', delay: '0.8s' },
  { left: '82%', bottom: '7px', delay: '0.2s' },
  { left: '94%', bottom: '11px', delay: '0.5s' },
];

const STARS = [
  { left: '8%', top: '15%', size: '2px', delay: '0s', duration: '2.5s' },
  { left: '16%', top: '28%', size: '3px', delay: '0.8s', duration: '3.2s' },
  { left: '24%', top: '12%', size: '1.5px', delay: '1.4s', duration: '2.8s' },
  { left: '32%', top: '35%', size: '2px', delay: '0.3s', duration: '3.5s' },
  { left: '40%', top: '18%', size: '2.5px', delay: '1.9s', duration: '2.2s' },
  { left: '48%', top: '25%', size: '1.5px', delay: '0.6s', duration: '3.8s' },
  { left: '55%', top: '14%', size: '3px', delay: '1.1s', duration: '2.9s' },
  { left: '63%', top: '30%', size: '2px', delay: '1.7s', duration: '3.1s' },
  { left: '72%', top: '22%', size: '1.5px', delay: '0.4s', duration: '2.6s' },
  { left: '80%', top: '16%', size: '2.5px', delay: '1.3s', duration: '3.4s' },
  { left: '88%', top: '32%', size: '2px', delay: '0.9s', duration: '2.7s' },
  { left: '94%', top: '19%', size: '1.5px', delay: '1.6s', duration: '3.0s' },
  { left: '12%', top: '50%', size: '2px', delay: '0.5s', duration: '3.3s' },
  { left: '28%', top: '58%', size: '1.5px', delay: '1.8s', duration: '2.4s' },
  { left: '45%', top: '52%', size: '2px', delay: '1.0s', duration: '3.6s' },
  { left: '68%', top: '56%', size: '2.5px', delay: '0.2s', duration: '2.9s' },
  { left: '84%', top: '48%', size: '1.5px', delay: '1.5s', duration: '3.1s' },
];

const SUN_MOTES = [
  { left: '15%', top: '45%', size: '4px', delay: '0s', duration: '4s' },
  { left: '30%', top: '65%', size: '6px', delay: '1.2s', duration: '5s' },
  { left: '55%', top: '40%', size: '5px', delay: '2.1s', duration: '4.5s' },
  { left: '70%', top: '60%', size: '3px', delay: '0.7s', duration: '3.8s' },
  { left: '85%', top: '50%', size: '5px', delay: '1.8s', duration: '4.2s' },
];

export default function WeatherCardBackground({
  weatherType,
  className = '',
}: WeatherCardBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden transition-all duration-1000 ${className}`}
    >
      {/* 1. RAIN EFFECT */}
      {weatherType === 'rain' && (
        <div className="absolute inset-0">
          {/* Rainy Sky Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1829] via-[#112a47] to-[#1c3f68]" />

          {/* Dark storm cloud overlay top */}
          <div className="absolute -top-12 -left-8 -right-8 h-36 bg-gradient-to-b from-[#06101c]/80 via-[#0a1c30]/50 to-transparent blur-md pointer-events-none" />

          {/* Falling Raindrops */}
          <div className="absolute inset-0 overflow-hidden">
            {RAINDROPS.map((drop, idx) => (
              <div
                key={`rain-${idx}`}
                className="weather-anim absolute w-[1.5px] rounded-full bg-gradient-to-b from-transparent via-sky-200/60 to-sky-100/90 shadow-[0_0_2px_rgba(224,242,254,0.6)]"
                style={{
                  left: drop.left,
                  top: drop.top,
                  height: drop.height,
                  opacity: drop.opacity,
                  animation: `rainDropFall ${drop.duration} linear infinite`,
                  animationDelay: drop.delay,
                  transformOrigin: 'center bottom',
                }}
              />
            ))}
          </div>

          {/* Rain Splash Ripples at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden pointer-events-none">
            {RAIN_SPLASHES.map((splash, idx) => (
              <div
                key={`splash-${idx}`}
                className="weather-anim absolute rounded-full border border-sky-200/50 bg-sky-300/10"
                style={{
                  left: splash.left,
                  bottom: splash.bottom,
                  width: '14px',
                  height: '5px',
                  animation:
                    'rainSplashPing 1.3s cubic-bezier(0, 0.2, 0.8, 1) infinite',
                  animationDelay: splash.delay,
                }}
              />
            ))}
          </div>

          {/* Bottom Ambient Mist Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sky-500/20 via-sky-400/5 to-transparent blur-sm pointer-events-none" />
        </div>
      )}

      {/* 2. THUNDERSTORM EFFECT */}
      {weatherType === 'thunderstorm' && (
        <div className="absolute inset-0">
          {/* Deep Dark Storm Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#070a14] via-[#101026] to-[#1e0f33]" />

          {/* Sky Lightning Flash Overlay */}
          <div
            className="weather-anim absolute inset-0 bg-gradient-to-b from-cyan-100/30 via-indigo-200/20 to-purple-200/10 pointer-events-none"
            style={{
              animation: 'lightningSkyFlash 6s infinite ease-in-out',
            }}
          />

          {/* Lightning Bolt Silhouette Flash */}
          <svg
            className="weather-anim absolute top-2 right-12 w-28 h-36 text-cyan-200/80 drop-shadow-[0_0_12px_rgba(165,243,252,0.9)] pointer-events-none"
            viewBox="0 0 100 130"
            fill="currentColor"
            style={{
              animation: 'lightningSkyFlash 6s infinite ease-in-out',
            }}
          >
            <polygon points="55,0 20,60 50,60 30,130 85,55 55,55" />
          </svg>

          {/* Heavy Angled Rain Streaks */}
          <div className="absolute inset-0 overflow-hidden">
            {RAINDROPS.map((drop, idx) => (
              <div
                key={`storm-rain-${idx}`}
                className="weather-anim absolute w-[2px] rounded-full bg-gradient-to-b from-transparent via-cyan-100/70 to-white shadow-[0_0_3px_rgba(255,255,255,0.7)]"
                style={{
                  left: drop.left,
                  top: drop.top,
                  height: `${parseInt(drop.height, 10) + 10}px`,
                  opacity: drop.opacity,
                  animation: `rainDropFall ${parseFloat(drop.duration) * 0.75}s linear infinite`,
                  animationDelay: drop.delay,
                }}
              />
            ))}
          </div>

          {/* Turbulent Storm Clouds */}
          <div className="absolute -top-16 -left-12 -right-12 h-44 bg-gradient-to-b from-[#04060d]/90 via-[#0d0c1c]/60 to-transparent blur-md pointer-events-none" />

          {/* Bottom Storm Mist */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-cyan-900/30 via-purple-900/10 to-transparent pointer-events-none" />
        </div>
      )}

      {/* 3. SUNNY / CLEAR DAY EFFECT */}
      {weatherType === 'sunny' && (
        <div className="absolute inset-0">
          {/* Radiant Azure & Golden Sky Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#025a9c] via-[#0284c7] to-[#ea580c]" />

          {/* Sun Corona Glow (Top-Right) */}
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-amber-400/25 blur-3xl pointer-events-none" />
          <div
            className="weather-anim absolute top-2 right-4 w-44 h-44 rounded-full bg-yellow-300/25 blur-xl pointer-events-none"
            style={{
              animation: 'sunPulseGlow 4s ease-in-out infinite',
            }}
          />

          {/* Rotating Sunrays Beam Disc */}
          <div
            className="weather-anim absolute -top-24 -right-24 w-96 h-96 pointer-events-none opacity-20"
            style={{
              background:
                'conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0) 0deg, rgba(255,235,160,0.6) 20deg, rgba(255,255,255,0) 40deg, rgba(255,235,160,0.6) 60deg, rgba(255,255,255,0) 80deg, rgba(255,235,160,0.6) 100deg, rgba(255,255,255,0) 120deg, rgba(255,235,160,0.6) 140deg, rgba(255,255,255,0) 160deg, rgba(255,235,160,0.6) 180deg, rgba(255,255,255,0) 200deg, rgba(255,235,160,0.6) 220deg, rgba(255,255,255,0) 240deg, rgba(255,235,160,0.6) 260deg, rgba(255,255,255,0) 280deg, rgba(255,235,160,0.6) 300deg, rgba(255,255,255,0) 320deg, rgba(255,235,160,0.6) 340deg, rgba(255,255,255,0) 360deg)',
              animation: 'sunCoronaSpin 40s linear infinite',
            }}
          />

          {/* Warm Floating Light Motes */}
          {SUN_MOTES.map((mote, idx) => (
            <div
              key={`mote-${idx}`}
              className="weather-anim absolute rounded-full bg-yellow-200/60 shadow-[0_0_6px_rgba(254,240,138,0.8)] pointer-events-none"
              style={{
                left: mote.left,
                top: mote.top,
                width: mote.size,
                height: mote.size,
                animation: `sunPulseGlow ${mote.duration} ease-in-out infinite`,
                animationDelay: mote.delay,
              }}
            />
          ))}

          {/* Bottom Warm Horizon Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-500/20 via-orange-400/10 to-transparent pointer-events-none" />
        </div>
      )}

      {/* 4. CLEAR NIGHT EFFECT */}
      {weatherType === 'clear-night' && (
        <div className="absolute inset-0">
          {/* Deep Cosmic Obsidian & Indigo Night */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#040814] via-[#09142c] to-[#181238]" />

          {/* Moon Glow Aura (Top-Right) */}
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-indigo-400/20 blur-3xl pointer-events-none" />
          <div className="absolute top-6 right-8 w-20 h-20 rounded-full bg-slate-100/15 blur-lg pointer-events-none" />

          {/* Crescent Moon Silhouette */}
          <div className="absolute top-6 right-8 w-14 h-14 rounded-full shadow-[inset_6px_4px_0_0_rgba(255,255,255,0.9)] opacity-90 drop-shadow-[0_0_12px_rgba(224,231,255,0.7)] pointer-events-none" />

          {/* Twinkling Stars Field */}
          {STARS.map((star, idx) => (
            <div
              key={`star-${idx}`}
              className="weather-anim absolute rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.9)] pointer-events-none"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animation: `starShimmer ${star.duration} ease-in-out infinite`,
                animationDelay: star.delay,
              }}
            />
          ))}

          {/* Periodic Shooting Star / Meteor Streak */}
          <div
            className="weather-anim absolute top-12 right-16 w-24 h-[1.5px] bg-gradient-to-l from-white via-cyan-200 to-transparent rounded-full shadow-[0_0_6px_rgba(255,255,255,0.9)] pointer-events-none opacity-0"
            style={{
              animation: 'meteorZip 8.5s ease-in-out infinite',
            }}
          />

          {/* Bottom Cosmic Starlight Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-950/40 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      {/* 5. CLOUDY / OVERCAST (DAY) EFFECT */}
      {weatherType === 'cloudy' && (
        <div className="absolute inset-0">
          {/* Azure-Grey Sky Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0369a1] via-[#1d4ed8] to-[#60a5fa]" />

          {/* Soft Sunlight filtered behind clouds */}
          <div className="absolute top-0 right-8 w-56 h-56 rounded-full bg-amber-200/25 blur-3xl pointer-events-none" />

          {/* Layered Drifting SVG Clouds */}
          {/* Cloud 1 - Top Slow Cloud */}
          <div
            className="weather-anim absolute -top-6 left-0 opacity-40 blur-[1px] pointer-events-none"
            style={{
              animation: 'cloudDriftRight 36s linear infinite',
            }}
          >
            <svg
              className="w-80 h-36 text-white/70"
              viewBox="0 0 200 100"
              fill="currentColor"
            >
              <path d="M 30,70 A 25,25 0 0,1 65,50 A 35,35 0 0,1 125,45 A 25,25 0 0,1 165,65 A 20,20 0 0,1 185,75 L 20,75 Z" />
            </svg>
          </div>

          {/* Cloud 2 - Main Center Cloud */}
          <div
            className="weather-anim absolute top-12 left-0 opacity-55 pointer-events-none"
            style={{
              animation: 'cloudDriftRight 24s linear infinite',
              animationDelay: '-10s',
            }}
          >
            <svg
              className="w-96 h-40 text-white/80"
              viewBox="0 0 240 100"
              fill="currentColor"
            >
              <path d="M 40,80 A 30,30 0 0,1 85,55 A 40,40 0 0,1 155,50 A 30,30 0 0,1 200,75 A 25,25 0 0,1 225,85 L 25,85 Z" />
            </svg>
          </div>

          {/* Cloud 3 - Lower Drifting Cloud */}
          <div
            className="weather-anim absolute top-28 left-0 opacity-35 blur-[2px] pointer-events-none"
            style={{
              animation: 'cloudDriftRight 30s linear infinite',
              animationDelay: '-18s',
            }}
          >
            <svg
              className="w-72 h-32 text-blue-100/70"
              viewBox="0 0 200 100"
              fill="currentColor"
            >
              <path d="M 30,70 A 25,25 0 0,1 70,50 A 30,30 0 0,1 130,50 A 25,25 0 0,1 170,70 L 20,70 Z" />
            </svg>
          </div>

          {/* Bottom Cloud Base Fog */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-900/30 to-transparent pointer-events-none" />
        </div>
      )}

      {/* 6. CLOUDY NIGHT EFFECT */}
      {weatherType === 'cloudy-night' && (
        <div className="absolute inset-0">
          {/* Moody Slate Midnight Sky */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#080e1a] via-[#101b2f] to-[#1c293d]" />

          {/* Moon glow through clouds */}
          <div className="absolute top-2 right-12 w-48 h-48 rounded-full bg-slate-200/15 blur-3xl pointer-events-none" />

          {/* Subtle Stars in background */}
          {STARS.slice(0, 10).map((star, idx) => (
            <div
              key={`cloudy-star-${idx}`}
              className="weather-anim absolute rounded-full bg-white/60 pointer-events-none"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animation: `starShimmer ${star.duration} ease-in-out infinite`,
                animationDelay: star.delay,
              }}
            />
          ))}

          {/* Drifting Night Clouds */}
          <div
            className="weather-anim absolute -top-4 left-0 opacity-40 blur-[1px] pointer-events-none"
            style={{
              animation: 'cloudDriftRight 32s linear infinite',
            }}
          >
            <svg
              className="w-88 h-36 text-slate-400/40"
              viewBox="0 0 200 100"
              fill="currentColor"
            >
              <path d="M 30,70 A 25,25 0 0,1 65,50 A 35,35 0 0,1 125,45 A 25,25 0 0,1 165,65 A 20,20 0 0,1 185,75 L 20,75 Z" />
            </svg>
          </div>

          <div
            className="weather-anim absolute top-14 left-0 opacity-50 pointer-events-none"
            style={{
              animation: 'cloudDriftRight 22s linear infinite',
              animationDelay: '-8s',
            }}
          >
            <svg
              className="w-96 h-40 text-slate-300/35"
              viewBox="0 0 240 100"
              fill="currentColor"
            >
              <path d="M 40,80 A 30,30 0 0,1 85,55 A 40,40 0 0,1 155,50 A 30,30 0 0,1 200,75 A 25,25 0 0,1 225,85 L 25,85 Z" />
            </svg>
          </div>

          {/* Bottom Atmosphere */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
        </div>
      )}

      {/* 7. FOG / MIST / HAZE EFFECT */}
      {weatherType === 'fog' && (
        <div className="absolute inset-0">
          {/* Misty Charcoal Sky Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#475569]" />

          {/* Drifting Mist Wave 1 */}
          <div
            className="weather-anim absolute top-6 -left-12 -right-12 h-24 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md pointer-events-none"
            style={{
              animation: 'mistWaveFloat 7s ease-in-out infinite',
            }}
          />

          {/* Drifting Mist Wave 2 */}
          <div
            className="weather-anim absolute top-24 -left-16 -right-16 h-32 bg-gradient-to-r from-transparent via-slate-100/25 to-transparent blur-lg pointer-events-none"
            style={{
              animation: 'mistWaveFloat 11s ease-in-out infinite',
              animationDelay: '-3.5s',
            }}
          />

          {/* Drifting Mist Wave 3 */}
          <div
            className="weather-anim absolute bottom-4 -left-10 -right-10 h-28 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-xl pointer-events-none"
            style={{
              animation: 'mistWaveFloat 9s ease-in-out infinite',
              animationDelay: '-6s',
            }}
          />

          {/* Bottom Dense Mist */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-200/15 via-white/10 to-transparent blur-sm pointer-events-none" />
        </div>
      )}

      {/* Glassmorphism Inner Specular Border Highlight & Edge Beams for Depth */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl shadow-[inset_0_1.5px_0_0_rgba(255,255,255,0.45),inset_0_-1.5px_0_0_rgba(0,0,0,0.4),inset_1px_0_0_0_rgba(255,255,255,0.18),inset_-1px_0_0_0_rgba(255,255,255,0.18)] pointer-events-none" />
      <div className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-black/40 to-transparent pointer-events-none" />
    </div>
  );
}

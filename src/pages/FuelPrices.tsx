import SEO from '../components/SEO';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import FuelPriceWidget from '../components/fuel/FuelPriceWidget';
import {
  Building2,
  HelpCircle,
  MapPin,
  Clock,
  Fuel,
  ExternalLink,
} from 'lucide-react';

export default function FuelPrices() {
  return (
    <>
      <SEO
        title="Fuel Price Monitor | Trece Martires City, Cavite"
        description="Official Department of Energy (DOE) liquid fuel price monitoring and gas station locator in Trece Martires City, Cavite. Compare Unleaded, Premium, and Diesel prices."
        keywords="fuel prices Trece Martires, gas stations Trece Martires Cavite, DOE price monitoring, diesel price Trece, unleaded 91 Trece, Petron Trece, Shell Trece, Uno Fuel Trece"
      />

      <main className="flex-grow bg-slate-50/50 pb-16">
        {/* Top Hero Banner */}
        <section
          aria-label="Page Header"
          className="bg-gradient-to-r from-[#001f54] via-[#00225e] to-[#003893] text-white pt-44 sm:pt-44 lg:pt-48 pb-12 sm:pb-16 border-b border-blue-900/40 shadow-inner"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Fuel Price Monitor' },
              ]}
              className="mb-6 text-blue-200"
              isDark={true}
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-blue-100 border border-white/20">
                  <Building2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>
                    Republic of the Philippines • Department of Energy (DOE)
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Trece Martires{' '}
                  <span className="text-amber-300">Fuel Price</span> Monitor
                </h1>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  Official retail liquid fuel price monitoring schedule for
                  Trece Martires City, Cavite (Region IV-A), featuring live
                  price comparisons between major oil firms and independent gas
                  stations with interactive spatial mapping.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-blue-200">
                  <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-white font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    Trece Martires City, Cavite
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-white font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    Weekly DOE Bulletin
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-white font-medium">
                    <Fuel className="w-3.5 h-3.5 text-amber-300" />
                    25+ Gas Stations
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://www.doe.gov.ph/retail-pump-prices-luzon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#00225e] hover:bg-blue-50 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md"
                >
                  <span>DOE Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#00225e]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Widget Section */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <FuelPriceWidget isFullWidthSection={false} showMap={true} />
          </div>
        </section>

        {/* FAQ & Information Section */}
        <section className="py-10 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center justify-center gap-2">
                  <HelpCircle className="w-6 h-6 text-[#003893]" />
                  <span>Frequently Asked Questions about Fuel Prices</span>
                </h3>
                <p className="text-sm text-slate-600">
                  How retail fuel pricing works under the Oil Deregulation Law
                  in Trece Martires City.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Why do fuel prices vary across gas stations in Trece
                    Martires?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under the Downstream Oil Industry Deregulation Act (RA
                    8479), oil companies and independent retail dealers
                    determine pump prices based on world crude markets,
                    freight/logistics costs, and local competition. Independent
                    stations (such as Uno Fuel, Cleanfuel, and Petro Gazz) often
                    have lower operating overheads and offer cheaper pump rates
                    compared to major oil companies.
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    How often does the DOE update fuel price monitoring?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The DOE Oil Industry Management Bureau (OIMB) monitors
                    retail prices weekly following the Tuesday price
                    adjustments. BetterTrece curates the official Cavite
                    schedule specifically for Trece Martires City and allows
                    citizens to submit real-time pump price updates.
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    How can I report an outdated or inaccurate pump price?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Click the <strong>"Report Pump Price"</strong> button above
                    or on the gas station map pin. Your crowd-sourced update
                    will immediately appear with a community verification tag to
                    assist other drivers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

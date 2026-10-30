import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ArrowRight } from '../../lib/icons';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

const startLinks = [
  {
    number: '01',
    title: 'serviceTitle',
    description: 'serviceDescription',
    action: 'serviceAction',
    href: '/services',
  },
  {
    number: '02',
    title: 'projectTitle',
    description: 'projectDescription',
    action: 'projectAction',
    href: '/transparency/dpwh',
  },
  {
    number: '03',
    title: 'contactTitle',
    description: 'contactDescription',
    action: 'contactAction',
    href: '/#contact',
  },
  {
    number: '04',
    title: 'barangayTitle',
    description: 'barangayDescription',
    action: 'barangayAction',
    href: '/government#barangays',
  },
  {
    number: '05',
    title: 'recordsTitle',
    description: 'recordsDescription',
    action: 'recordsAction',
    href: '/government/transparency-documents',
  },
  {
    number: '06',
    title: 'statisticsTitle',
    description: 'statisticsDescription',
    action: 'statisticsAction',
    href: '/demographics',
  },
] as const;

export default function StartHereSection() {
  const { t } = useTranslation();

  return (
    <Section className="py-12 lg:py-16 bg-slate-50/60 border-b border-gray-100">
      <div className="mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0863e8]">
          {t('homeStart.eyebrow', 'Start here')}
        </p>
        <Heading
          level={2}
          className="text-2xl sm:text-3xl font-extrabold text-gray-900"
        >
          {t('homeStart.title', 'What do you need today?')}
        </Heading>
        <Text className="text-gray-600 mt-1 max-w-2xl text-sm sm:text-base">
          {t('homeStart.subtitle', 'Choose where you want to start.')}
        </Text>
      </div>

      <nav
        aria-label={t('homeStart.navLabel', 'Start here')}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {startLinks.map(item => (
          <Link
            key={item.number}
            to={item.href}
            className="group flex flex-col justify-between rounded-2xl border border-primary-200 bg-white p-5 transition-all duration-150 hover:border-primary-500 hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0863e8] sm:p-6"
          >
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary-200 bg-primary-50 font-mono text-sm font-bold text-primary-700">
              {item.number}
            </span>
            <div>
              <h3 className="mb-2 text-base font-bold leading-snug text-zinc-900 transition-colors group-hover:text-zinc-700">
                {t(`homeStart.${item.title}`)}
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-zinc-600">
                {t(`homeStart.${item.description}`)}
              </p>
            </div>
            <span className="flex items-center border-t border-zinc-100 pt-3 text-xs font-semibold text-zinc-900 transition-transform group-hover:translate-x-0.5">
              {t(`homeStart.${item.action}`)}
              <ArrowRight
                aria-hidden="true"
                className="ml-1.5 h-3.5 w-3.5 text-primary-700"
              />
            </span>
          </Link>
        ))}
      </nav>
    </Section>
  );
}

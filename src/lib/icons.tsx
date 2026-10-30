import { HugeiconsIcon } from '@hugeicons/react';
import type { IconSvgElement } from '@hugeicons/react';
import {
  ActivityIcon,
  AddCircleIcon,
  Alert02Icon,
  AlertCircleIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  AwardIcon,
  BabyIcon,
  BarChartIcon,
  BinaryIcon,
  BookOpenIcon,
  BoxesIcon,
  BriefcaseIcon,
  BuildingIcon,
  CalendarDaysIcon,
  CalendarIcon,
  CancelCircleIcon,
  CheckIcon,
  CheckmarkCircle02Icon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  Clock03Icon,
  ClockIcon,
  CloudFogIcon,
  CloudIcon,
  CloudLightningIcon,
  CloudRainIcon,
  CodeIcon,
  CoinsIcon,
  CompassIcon,
  CopyIcon,
  DatabaseIcon,
  Delete02Icon,
  DownloadIcon,
  ExternalLinkIcon,
  EyeIcon,
  EyeOffIcon,
  FactoryIcon,
  FileCheckIcon,
  FileCodeIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FilterIcon,
  FlameIcon,
  FuelIcon,
  GitForkIcon,
  GitPullRequestIcon,
  GithubIcon,
  GlobeIcon,
  GraduationCapIcon,
  GridIcon,
  HardHatIcon,
  HeartHandshakeIcon,
  HeartIcon,
  HeartPulseIcon,
  HelpCircleIcon,
  HistoryIcon,
  HomeIcon,
  InfoIcon,
  LandmarkIcon,
  LayersIcon,
  LayoutGridIcon,
  ListChecksIcon,
  ListIcon,
  LocateFixedIcon,
  MailIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  MaximizeIcon,
  MenuIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
  MinimizeIcon,
  MoonCloudIcon,
  MoonIcon,
  NavigationIcon,
  NewspaperIcon,
  PackageIcon,
  PhoneCallIcon,
  PhoneIcon,
  PieChartIcon,
  PineTreeIcon,
  PlayIcon,
  PrinterIcon,
  QuoteIcon,
  ReceiptIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  RouteIcon,
  ScaleIcon,
  SchoolIcon,
  ScrollTextIcon,
  SearchIcon,
  SendIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  ShieldIcon,
  ShoppingCartIcon,
  SlidersHorizontalIcon,
  SmartphoneIcon,
  StoreIcon,
  SunCloud01Icon,
  SunIcon,
  TableIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  UserCheckIcon,
  UsersIcon,
  VoteIcon,
  WalletIcon,
  WheatIcon,
  WrenchIcon,
  XIcon,
  ZapIcon,
} from '@hugeicons/core-free-icons';
import type { ComponentType, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: string | number;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
};

const renderIcon = (icon: IconSvgElement): ComponentType<IconProps> =>
  function HugeIcon(props) {
    return <HugeiconsIcon icon={icon} {...props} />;
  };

export const Activity = renderIcon(ActivityIcon);
export const AlertCircle = renderIcon(AlertCircleIcon);
export const AlertTriangle = renderIcon(Alert02Icon);
export const ArrowDown = renderIcon(ArrowDownIcon);
export const ArrowLeft = renderIcon(ArrowLeftIcon);
export const ArrowRight = renderIcon(ArrowRightIcon);
export const ArrowUp = renderIcon(ArrowUpIcon);
export const ArrowUpDown = renderIcon(ArrowUpDownIcon);
export const ArrowUpRight = renderIcon(ArrowUpRightIcon);
export const Award = renderIcon(AwardIcon);
export const Baby = renderIcon(BabyIcon);
export const BarChart2 = renderIcon(BarChartIcon);
export const BarChart3 = renderIcon(BarChartIcon);
export const Binary = renderIcon(BinaryIcon);
export const Book = renderIcon(BookOpenIcon);
export const ChartBar = renderIcon(BarChartIcon);
export const BookOpen = renderIcon(BookOpenIcon);
export const Boxes = renderIcon(BoxesIcon);
export const Briefcase = renderIcon(BriefcaseIcon);
export const Building = renderIcon(BuildingIcon);
export const Building2 = renderIcon(BuildingIcon);
export const Calendar = renderIcon(CalendarIcon);
export const CalendarDays = renderIcon(CalendarDaysIcon);
export const Check = renderIcon(CheckIcon);
export const CheckCircle2 = renderIcon(CheckmarkCircle02Icon);
export const ChevronDown = renderIcon(ChevronDownIcon);
export const ChevronLeft = renderIcon(ChevronLeftIcon);
export const ChevronRight = renderIcon(ChevronRightIcon);
export const ChevronUp = renderIcon(ChevronUpIcon);
export const CircleHelp = renderIcon(HelpCircleIcon);
export const Clock = renderIcon(ClockIcon);
export const Clock3 = renderIcon(Clock03Icon);
export const Cloud = renderIcon(CloudIcon);
export const CloudFog = renderIcon(CloudFogIcon);
export const CloudLightning = renderIcon(CloudLightningIcon);
export const CloudMoon = renderIcon(MoonCloudIcon);
export const CloudRain = renderIcon(CloudRainIcon);
export const CloudSun = renderIcon(SunCloud01Icon);
export const Code = renderIcon(CodeIcon);
export const Code2 = renderIcon(CodeIcon);
export const Coins = renderIcon(CoinsIcon);
export const Compass = renderIcon(CompassIcon);
export const Copy = renderIcon(CopyIcon);
export const Database = renderIcon(DatabaseIcon);
export const Download = renderIcon(DownloadIcon);
export const ExternalLink = renderIcon(ExternalLinkIcon);
export const Eye = renderIcon(EyeIcon);
export const EyeOff = renderIcon(EyeOffIcon);
export const Factory = renderIcon(FactoryIcon);
export const FileCheck = renderIcon(FileCheckIcon);
export const FileCheck2 = renderIcon(FileCheckIcon);
export const FileJson = renderIcon(FileCodeIcon);
export const FileSpreadsheet = renderIcon(FileSpreadsheetIcon);
export const FileText = renderIcon(FileTextIcon);
export const Filter = renderIcon(FilterIcon);
export const Flame = renderIcon(FlameIcon);
export const Fuel = renderIcon(FuelIcon);
export const GitFork = renderIcon(GitForkIcon);
export const GitPullRequest = renderIcon(GitPullRequestIcon);
export const Globe = renderIcon(GlobeIcon);
export const Globe2 = renderIcon(GlobeIcon);
export const GraduationCap = renderIcon(GraduationCapIcon);
export const Grid = renderIcon(GridIcon);
export const HardHat = renderIcon(HardHatIcon);
export const Heart = renderIcon(HeartIcon);
export const HeartHandshake = renderIcon(HeartHandshakeIcon);
export const HeartPulse = renderIcon(HeartPulseIcon);
export const HelpCircle = renderIcon(HelpCircleIcon);
export const History = renderIcon(HistoryIcon);
export const Home = renderIcon(HomeIcon);
export const Info = renderIcon(InfoIcon);
export const Landmark = renderIcon(LandmarkIcon);
export const Layers = renderIcon(LayersIcon);
export const LayoutGrid = renderIcon(LayoutGridIcon);
export const List = renderIcon(ListIcon);
export const ListChecks = renderIcon(ListChecksIcon);
export const LocateFixed = renderIcon(LocateFixedIcon);
export const Mail = renderIcon(MailIcon);
export const Map = renderIcon(MapIcon);
export const MapPin = renderIcon(MapPinIcon);
export const MapPinned = renderIcon(MapPinnedIcon);
export const Maximize2 = renderIcon(MaximizeIcon);
export const Menu = renderIcon(MenuIcon);
export const MessageSquare = renderIcon(MessageSquareIcon);
export const MessagesSquare = renderIcon(MessagesSquareIcon);
export const Minimize2 = renderIcon(MinimizeIcon);
export const Moon = renderIcon(MoonIcon);
export const Navigation = renderIcon(NavigationIcon);
export const Newspaper = renderIcon(NewspaperIcon);
export const Package = renderIcon(PackageIcon);
export const Phone = renderIcon(PhoneIcon);
export const PhoneCall = renderIcon(PhoneCallIcon);
export const PieChart = renderIcon(PieChartIcon);
export const Play = renderIcon(PlayIcon);
export const PlusCircle = renderIcon(AddCircleIcon);
export const Printer = renderIcon(PrinterIcon);
export const Quote = renderIcon(QuoteIcon);
export const Receipt = renderIcon(ReceiptIcon);
export const RefreshCw = renderIcon(RefreshCwIcon);
export const RotateCcw = renderIcon(RotateCcwIcon);
export const Route = renderIcon(RouteIcon);
export const Scale = renderIcon(ScaleIcon);
export const School = renderIcon(SchoolIcon);
export const ScrollText = renderIcon(ScrollTextIcon);
export const Search = renderIcon(SearchIcon);
export const Send = renderIcon(SendIcon);
export const Shield = renderIcon(ShieldIcon);
export const ShieldAlert = renderIcon(ShieldAlertIcon);
export const ShieldCheck = renderIcon(ShieldCheckIcon);
export const ShoppingCart = renderIcon(ShoppingCartIcon);
export const SlidersHorizontal = renderIcon(SlidersHorizontalIcon);
export const Smartphone = renderIcon(SmartphoneIcon);
export const Store = renderIcon(StoreIcon);
export const Sun = renderIcon(SunIcon);
export const Table = renderIcon(TableIcon);
export const Trash2 = renderIcon(Delete02Icon);
export const TreePine = renderIcon(PineTreeIcon);
export const TrendingDown = renderIcon(TrendingDownIcon);
export const TrendingUp = renderIcon(TrendingUpIcon);
export const UserCheck = renderIcon(UserCheckIcon);
export const Users = renderIcon(UsersIcon);
export const Vote = renderIcon(VoteIcon);
export const Wallet = renderIcon(WalletIcon);
export const Wheat = renderIcon(WheatIcon);
export const Wrench = renderIcon(WrenchIcon);
export const X = renderIcon(XIcon);
export const XCircle = renderIcon(CancelCircleIcon);
export const Zap = renderIcon(ZapIcon);
export const Github = renderIcon(GithubIcon);

export const iconMap: Record<string, ComponentType<IconProps>> = {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  ArrowUpRight,
  Award,
  Baby,
  BarChart2,
  BarChart3,
  Binary,
  Book,
  ChartBar,
  BookOpen,
  Boxes,
  Briefcase,
  Building,
  Building2,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleHelp,
  Clock,
  Clock3,
  Cloud,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSun,
  Code,
  Code2,
  Coins,
  Compass,
  Copy,
  Database,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  Factory,
  FileCheck,
  FileCheck2,
  FileJson,
  FileSpreadsheet,
  FileText,
  Filter,
  Flame,
  Fuel,
  GitFork,
  GitPullRequest,
  Globe,
  Globe2,
  GraduationCap,
  Grid,
  HardHat,
  Heart,
  HeartHandshake,
  HeartPulse,
  HelpCircle,
  History,
  Home,
  Info,
  Landmark,
  Layers,
  LayoutGrid,
  List,
  ListChecks,
  LocateFixed,
  Mail,
  Map,
  MapPin,
  MapPinned,
  Maximize2,
  Menu,
  MessageSquare,
  MessagesSquare,
  Minimize2,
  Moon,
  Navigation,
  Newspaper,
  Package,
  Phone,
  PhoneCall,
  PieChart,
  Play,
  PlusCircle,
  Printer,
  Quote,
  Receipt,
  RefreshCw,
  RotateCcw,
  Route,
  Scale,
  School,
  ScrollText,
  Search,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Store,
  Sun,
  Table,
  Trash2,
  TreePine,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  Vote,
  Wallet,
  Wheat,
  Wrench,
  X,
  XCircle,
  Zap,
  Github,
};

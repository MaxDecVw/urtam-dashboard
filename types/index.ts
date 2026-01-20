// Types pour les réseaux sociaux
export interface SocialPlatform {
  id: string;
  name: string;
  followers: number;
  engagement: number;
  posts: number;
  color: string;
  account: string | null;
  bestContent: string | null;
  format: string | null;
}

export interface SocialMedia {
  platforms: SocialPlatform[];
  totalFollowers: number;
  averageEngagement: number;
}

// Types pour les métriques
export interface Strength {
  name: string;
  value: string;
  description: string;
}

export interface Weakness {
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface Metrics {
  strengths: Strength[];
  weaknesses: Weakness[];
}

// Types pour les KPIs
export interface KPIs {
  totalFollowers: number;
  engagementRate: number;
  totalPosts: number;
  avisGoogle: number;
}

export interface Formation {
  personnesFormees: number;
  tauxSatisfaction: number;
  heuresFormation: number;
}

// Types pour les données URTAM
export interface UrtamData {
  company: {
    name: string;
    brandColor: string;
    lastUpdated: string;
  };
  socialMedia: SocialMedia;
  metrics: Metrics;
  kpis: KPIs;
  formation: Formation;
}

// Types pour les concurrents
export interface Competitor {
  id: string;
  name: string;
  totalFollowers: number;
  googleRanking: number;
  website: string;
  platforms: {
    linkedin: number;
    facebook: number;
    instagram: number;
    twitter: number;
    youtube: number;
  };
  offre: string;
  strengths: string;
  weaknesses: string;
  marketShare: number;
  color: string;
}

export interface MarketAnalysis {
  totalMarketFollowers: number;
  urtamFollowers: number;
  urtamShare: number;
  leaderName: string;
  leaderShare: number;
  averageFollowers: number;
  gap: {
    vsLeader: number;
    vsAverage: number;
    percentageVsLeader: number;
  };
}

export interface CompetitorsData {
  competitors: Competitor[];
  marketAnalysis: MarketAnalysis;
}

// Types pour la réputation
export interface Review {
  id: number;
  platform: string;
  comment: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  rating: number;
  date: string | null;
  author: string | null;
}

export interface ReviewTheme {
  theme: string;
  count: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface Alert {
  type: 'info' | 'warning' | 'critical';
  message: string;
  impact: string;
  action: string;
}

export interface ReputationData {
  reviews: {
    website: Review[];
    google: Review[];
    facebook: Review[];
    linkedin: Review[];
  };
  statistics: {
    total: number;
    positive: number;
    neutral: number;
    negative: number;
    averageRating: number;
    googleReviewsCount: number;
    websiteReviewsCount: number;
  };
  themes: ReviewTheme[];
  alerts: Alert[];
}

// Types pour le SEO
export interface Page {
  id: number;
  name: string;
  url: string;
  type: string;
  importance: number;
  intention: string;
  performance: number;
  description: string;
}

export interface Opportunity {
  priority: 'low' | 'medium' | 'high' | 'critical';
  page: string;
  action: string;
  impact: string;
}

export interface SeoData {
  pages: Page[];
  seoMetrics: {
    averagePerformance: number;
    totalPages: number;
    highImportancePages: number;
    conversionPages: number;
    googleRanking: number;
    competitorRankings: {
      decalez: number;
      impro2: number;
      arthemon: number;
    };
  };
  opportunities: Opportunity[];
}

// Types pour le contexte du dashboard
export interface DashboardContextType {
  dateRange: {
    start: Date;
    end: Date;
  };
  selectedCompetitors: string[];
  urtamData: UrtamData | null;
  competitorsData: CompetitorsData | null;
  reputationData: ReputationData | null;
  seoData: SeoData | null;
  setDateRange: (range: { start: Date; end: Date }) => void;
  toggleCompetitor: (id: string) => void;
}

// Types pour les composants
export interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    value: number;
    label: string;
  };
  icon?: React.ReactNode;
  color?: string;
  footer?: React.ReactNode;
  className?: string;
}

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  alert?: string;
  className?: string;
}

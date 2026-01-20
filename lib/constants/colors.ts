export const COLORS = {
  // Brand URTAM
  primary: '#22c9b0',
  primaryDark: '#1ba896',
  primaryLight: '#4dd4be',

  // Statuts
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',

  // Plateformes sociales
  social: {
    linkedin: '#0A66C2',
    instagram: '#E4405F',
    facebook: '#1877F2',
    youtube: '#FF0000',
    twitter: '#1DA1F2',
  },

  // Concurrents
  competitor: {
    decalez: '#8b5cf6',    // Violet
    impro2: '#f97316',      // Orange
    arthemon: '#ec4899',    // Rose
  },

  // Neutres
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

export const getSocialColor = (platform: string): string => {
  const platformLower = platform.toLowerCase();

  if (platformLower === 'linkedin') return COLORS.social.linkedin;
  if (platformLower === 'instagram') return COLORS.social.instagram;
  if (platformLower === 'facebook') return COLORS.social.facebook;
  if (platformLower === 'youtube') return COLORS.social.youtube;
  if (platformLower === 'twitter') return COLORS.social.twitter;

  return COLORS.gray[400];
};

export const getCompetitorColor = (competitorId: string): string => {
  if (competitorId === 'decalez') return COLORS.competitor.decalez;
  if (competitorId === 'impro2') return COLORS.competitor.impro2;
  if (competitorId === 'arthemon') return COLORS.competitor.arthemon;

  return COLORS.gray[400];
};

export const getSeverityColor = (severity: string): string => {
  if (severity === 'critical') return COLORS.danger;
  if (severity === 'high') return COLORS.warning;
  if (severity === 'medium') return COLORS.info;

  return COLORS.success;
};

export type ProjectStatus = 'Prototype' | 'Live' | 'Completed';

export type ProjectCategory =
  | 'Web & Mobile Development'
  | 'AI Solutions'
  | 'Backend & Integrations'
  | 'Maintenance & Improvement';

export interface ProjectGalleryItem {
  url: string;
  alt: string;
  caption: string;
  tag?: string;
  title?: string;
  titleAr?: string;
  captionAr?: string;
  tagAr?: string;
}

export interface Project {
  title: string;
  titleAr?: string;
  slug: string;
  shortDescription: string;
  shortDescriptionAr?: string;
  category: ProjectCategory;
  categoryAr?: string;
  coverImage: string;
  coverImageAlt: string;
  coverImageAltAr?: string;
  gallery: ProjectGalleryItem[];
  technologies: string[];
  keyFeatures: string[];
  keyFeaturesAr?: string[];
  problemStatement: string;
  problemStatementAr?: string;
  solutionOverview: string;
  solutionOverviewAr?: string;
  nubixContribution: string[];
  nubixContributionAr?: string[];
  status: ProjectStatus;
  statusAr?: string;
  verifiedOutcomes?: string[];
  verifiedOutcomesAr?: string[];
  demoUrl?: string;
  repoUrl?: string;
  isPlaceholder: boolean;
}

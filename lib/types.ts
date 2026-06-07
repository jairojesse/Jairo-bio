export interface Profile {
  avatar: string | null;
  name: string;
  bio: string;
  showAvatar: boolean;
  showBio: boolean;
}

export interface Highlight {
  id: number;
  image: string | null;
  link: string;
  active: boolean;
}

export interface Social {
  id: number;
  icon: string;
  label: string;
  link: string;
  active: boolean;
}

export interface Recommendation {
  id: number;
  image: string | null;
  title: string;
  link: string;
  size: "half" | "full";
  active: boolean;
}

export interface SectionConfig {
  active: boolean;
  showTitle: boolean;
  title: string;
}

export interface SiteContent {
  profile: Profile;
  highlights: Highlight[];
  socials: Social[];
  recommendations: Recommendation[];
  sections: {
    highlights: SectionConfig;
    socials: SectionConfig;
    recommendations: SectionConfig;
  };
}

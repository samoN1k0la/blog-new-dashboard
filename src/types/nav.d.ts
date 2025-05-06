export interface NavItemConfig {
  key: string;
  title: string;
  href?: string;
  icon?: string;
  matcher?: (pathname: string) => boolean;
  disabled?: boolean;
  external?: boolean;
  items?: NavItemConfig[];
}


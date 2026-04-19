export type HomeBlockContent = {
  id?: string;
  callbackKey: string;
  header: string | null;
  subheader: string | null;
  content: string | null;
  imageUrl: string | null;
  imageObjectPosition?: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  orderIndex?: number | null;
  visible?: boolean | null;
};

export type HomeBlockMap = Record<string, HomeBlockContent | undefined>;

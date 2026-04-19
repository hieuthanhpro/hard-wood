import { prisma, safeDbCall } from "@/lib/db";
import type { HomeBlockContent, HomeBlockMap } from "@/lib/home-blocks-types";

const HERO_BACKGROUND_IMAGE =
  "/figma/hero-bg.png";

const PRODUCTS_IMAGE = "/figma/home-products.png";
const SERVICES_IMAGE = "/figma/icon-services.svg";
const GALLERY_IMAGE = "/figma/icon-gallery.svg";

const SUPPLY_IMAGE_RESIDENTIAL = "/figma/supply-residential.png";
const SUPPLY_IMAGE_STRATA = "/figma/supply-strata.png";
const SUPPLY_IMAGE_COMMERCIAL = "/figma/supply-commercial.png";
const SUPPLY_IMAGE_CONSTRUCTION = "/figma/supply-construction.png";

const FLOORING_WISE_IMAGE_1 = "/figma/flooring-wise-row1.png";
const FLOORING_WISE_IMAGE_2 = "/figma/flooring-wise-row2.png";

const WHY_SECTION_BG = "/figma/why-hardwood-bg.png";
const WHY_CARD_IMAGE = "/figma/why-hardwood-card.png";

const SALE_IMAGE_FOREST = "/figma/best-value-left.png";
const SALE_IMAGE_RACCOON = "/figma/best-value-right.png";
const SALE_IMAGE_MOUNTAIN = "/figma/best-value-center.png";

export const DEFAULT_HOME_BLOCKS: HomeBlockContent[] = [
  {
    callbackKey: "[1. Hero] Main Block",
    header: "FLOORS",
    subheader: "CRAFTED WITH CARE",
    content: "Complimentary consultation",
    imageUrl: HERO_BACKGROUND_IMAGE,
    ctaLabel: "Inquire here",
    ctaHref: "#",
    orderIndex: 10,
    visible: true,
  },
  {
    callbackKey: "[1. Hero] Secondary CTA Button",
    header: null,
    subheader: null,
    content: null,
    imageUrl: null,
    ctaLabel: "Request more info",
    ctaHref: "#",
    orderIndex: 12,
    visible: true,
  },
  {
    callbackKey: "[1. Hero] Trades Sign In Link",
    header: null,
    subheader: null,
    content: null,
    imageUrl: null,
    ctaLabel: "Trades Sign In",
    ctaHref: "#",
    orderIndex: 13,
    visible: true,
  },
  {
    callbackKey: "[1. Hero] Categories List",
    header: "Hero Categories",
    subheader: null,
    content: "Hardwoods\nEngineered\nLaminates\nVinyl\nMats",
    imageUrl: null,
    ctaLabel: null,
    ctaHref: null,
    orderIndex: 14,
    visible: true,
  },
  {
    callbackKey: "[2. Credentials] Floating Brands Strip",
    header: "Frame 2087331532",
    subheader: "Fixed logos strip",
    content: "Fixed assets: WorkSafeBC, NWFA, Licensed/Bonded/Insured",
    imageUrl: null,
    ctaLabel: null,
    ctaHref: null,
    orderIndex: 19,
    visible: true,
  },
  {
    callbackKey: "[3. Looking For Floor] Info Section",
    header: "Choosing the Right Floor Doesn't Have to Be Hard",
    subheader: null,
    content:
      "Most flooring items are available within 48 hrs. Custom, or products delivered from outside the province of BC, will take longer. We’ll help you plan ahead.",
    imageUrl: null,
    ctaLabel: "Inquire here",
    ctaHref: "#",
    orderIndex: 20,
    visible: true,
  },
  {
    callbackKey: "[4. Products/Services/Gallery] Products Block",
    header: "PRODUCTS",
    subheader: "Assorted hardwood and laminate flooring planks",
    content: null,
    imageUrl: PRODUCTS_IMAGE,
    ctaLabel: "Browse our catalogue",
    ctaHref: "#",
    orderIndex: 30,
    visible: true,
  },
  {
    callbackKey: "[4. Products/Services/Gallery] Services Block",
    header: "SERVICES",
    subheader: "Professional floor sanding and refinishing",
    content: null,
    imageUrl: SERVICES_IMAGE,
    ctaLabel: "Explore services",
    ctaHref: "#",
    orderIndex: 31,
    visible: true,
  },
  {
    callbackKey: "[4. Products/Services/Gallery] Gallery Block",
    header: "GALLERY",
    subheader: "Light wood flooring with a puppy resting",
    content: null,
    imageUrl: GALLERY_IMAGE,
    ctaLabel: "View our work",
    ctaHref: "#",
    orderIndex: 32,
    visible: true,
  },
  {
    callbackKey: "[5. Boutique Experience] Split Content",
    header: null,
    subheader: null,
    content:
      "Experience Hardwoodliving Boutique’s hopitality and guiding knowledge to find the right product for your project.",
    imageUrl: null,
    ctaLabel: "Inquire here",
    ctaHref: "#",
    orderIndex: 40,
    visible: true,
  },
  {
    callbackKey: "[6. Supply To Finish] Center Title & Roles",
    header: "Crafted for Every Sector",
    subheader: null,
    content:
      "Restoration\nRenovators\nDevelopers\nBuilders\nDesigners\nHome Owners\nContractors\nProperty Managers",
    imageUrl: null,
    ctaLabel: null,
    ctaHref: null,
    orderIndex: 50,
    visible: true,
  },
  {
    callbackKey: "[6. Supply To Finish] Residential Grid Item",
    header: "Residential",
    subheader: "Suburban home with lawn",
    content: null,
    imageUrl: SUPPLY_IMAGE_RESIDENTIAL,
    ctaLabel: null,
    ctaHref: null,
    orderIndex: 51,
    visible: true,
  },
  {
    callbackKey: "[6. Supply To Finish] Strata Grid Item",
    header: "Strata Buildings",
    subheader: "Modern strata apartment building",
    content: null,
    imageUrl: SUPPLY_IMAGE_STRATA,
    ctaLabel: null,
    ctaHref: null,
    orderIndex: 52,
    visible: true,
  },
  {
    callbackKey: "[6. Supply To Finish] Commercial Grid Item",
    header: "Commercial",
    subheader: "Modern office interior",
    content: null,
    imageUrl: SUPPLY_IMAGE_COMMERCIAL,
    ctaLabel: null,
    ctaHref: null,
    orderIndex: 53,
    visible: true,
  },
  {
    callbackKey: "[6. Supply To Finish] Construction Grid Item",
    header: "New Construction",
    subheader: "Blueprints and planning for new construction",
    content: null,
    imageUrl: SUPPLY_IMAGE_CONSTRUCTION,
    ctaLabel: null,
    ctaHref: null,
    orderIndex: 54,
    visible: true,
  },
  {
    callbackKey: "[7. Free Consultation] Form Section",
    header: "Book Your Showroom Visit",
    subheader: null,
    content: "Fill out the form below and our team will get back to you quickly. It only takes 30 seconds.",
    imageUrl: null,
    ctaLabel: "Send",
    ctaHref: null,
    orderIndex: 60,
    visible: true,
  },
  {
    callbackKey: "[8. Flooring Wise] Top Row Block",
    header: "ARE YOU\nFLOORING WISE?",
    subheader: "Modern interior with wide-plank wood flooring, glass wall, and staircase",
    content:
      "One of the first question asked when purchasing a floor is what will be it's core purpose? Design, upgrade, replacing the old, increasing a home value, it's function, ...?\n\nWhichever the answer, it is a significant investment which should not be treated lightly. Hardwood or engineered, finished or unfinished, species, cuts, grades, dimensions, applications on grade or below, radiant heat, hardness coeficient, humidity, installation techniques, price, color of stain, natural variations - all play a role into the decision. With so many considerations, even for laminates and vinyls it is wise to consult a specialist to ensure your flooring investment holds true for its intent.",
    imageUrl: FLOORING_WISE_IMAGE_1,
    ctaLabel: "Book a free consultation",
    ctaHref: null,
    orderIndex: 70,
    visible: true,
  },
  {
    callbackKey: "[8. Flooring Wise] Bottom Row Block",
    header: null,
    subheader: "Decorative wood floor with metallic inlay detail",
    content:
      "White Oak 7 in. custom prefinished long planks with inhouse manufactured column floated stair treads in a North Vancouver home.\nStainless steel veneer Italian Design Walnut tiles installed as an entry feature in a Vancouver West side home.",
    imageUrl: FLOORING_WISE_IMAGE_2,
    ctaLabel: null,
    ctaHref: null,
    orderIndex: 71,
    visible: true,
  },
  {
    callbackKey: "[9. Why Hardwoodliving] Left Text Paragraphs",
    header: null,
    subheader: "Find out what our clients say",
    content:
      "We run a “by appointment” boutique, serving one client at the time - this means you are receiving our undivided attention. Always - as you should.\n\nOur knowledge comes from hands-on experience, working our craft for the past 20 years.\n\nCommercially, we supply, install and service any floors from carpet tiles to acrylic infused engineered and SPC oversized luxury vinyl planks or glue down engineered flooring.\n\nBy offering a boutique service, we remain competitive, providing some of the best pricing on the market.\n\nFor the past 20 years, we have served many home owners, designers, builders, contractors and other trades, with a successful track record.",
    imageUrl: null,
    ctaLabel: "Apply here for a discount",
    ctaHref: null,
    orderIndex: 80,
    visible: true,
  },
  {
    callbackKey: "[9. Why Hardwoodliving] Right Image Card",
    header: "Our craft\nbegins HERE",
    subheader: WHY_SECTION_BG,
    content: null,
    imageUrl: WHY_CARD_IMAGE,
    ctaLabel: "Flooring knowledge corner",
    ctaHref: null,
    orderIndex: 81,
    visible: true,
  },
  {
    callbackKey: "[11. Footer] About Description",
    header: "Frame 2087331426",
    subheader: null,
    content:
      "Hardwoodliving is a family owned, by appointment only flooring boutique based in the Lower Mainland, BC.\nWe specialize in providing full flooring solutions, supply, installations, sanding & finishing throughout the Lower Mainland and as far as Squamish, Whistler and Bowen Island. We carry a diverse selection of hardwoods, engineered, vinyl planks, laminates, cork and mats along with a select acrylic infused, high hardness coefficient commercial flooring. Our business model is based on the \"One client at the time\" principle thus striving to provide a catered service based on each client's unique needs. We bellieve in value added and aim for every project's success.",
    imageUrl: null,
    ctaLabel: null,
    ctaHref: null,
    orderIndex: 99,
    visible: true,
  },
  {
    callbackKey: "[11. Footer] Copyright Line",
    header: "Frame 2087331426",
    subheader: null,
    content: "Copyright @ 2026 Hardwoodliving",
    imageUrl: null,
    ctaLabel: null,
    ctaHref: null,
    orderIndex: 100,
    visible: true,
  },
  {
    callbackKey: "[10. Best Value] Left Sale Block",
    header: "Products on sale",
    subheader: null,
    content: null,
    imageUrl: SALE_IMAGE_FOREST,
    ctaLabel: "Explore what’s on Sale",
    ctaHref: "/on-sale",
    orderIndex: 90,
    visible: true,
  },
  {
    callbackKey: "[10. Best Value] Mascot Block",
    header: "Who would have thought that I will make it on the Hardwoodliving’s website page - “How?” would you ask ...",
    subheader: "Trades Sign In",
    content:
      "Who would have thought that I will make it on the Hardwoodliving’s website page - “How?” would you ask ...\nWell, me and my family always hang out in the woods around. We know our woods, just like Hardwoodliving does. More so, I’m always looking for a  bargain - who doesn’t like a good bargain? Am I always lucky? No, but I’m sure to keep trying.",
    imageUrl: SALE_IMAGE_RACCOON,
    ctaLabel: "Apply here for a Discount",
    ctaHref: "#",
    orderIndex: 91,
    visible: true,
  },
  {
    callbackKey: "[10. Best Value] Right Products Block",
    header: "best value products",
    subheader: null,
    content: null,
    imageUrl: SALE_IMAGE_MOUNTAIN,
    ctaLabel: "Explore Best Value",
    ctaHref: "/best-value",
    orderIndex: 92,
    visible: true,
  },
];

export const ACTIVE_HOME_BLOCK_KEYS = DEFAULT_HOME_BLOCKS.map((b) => b.callbackKey);

function mapHomeBlocks(blocks: HomeBlockContent[]) {
  return blocks.reduce<HomeBlockMap>((acc, block) => {
    acc[block.callbackKey] = block;
    return acc;
  }, {});
}

export async function getHomeBlocks() {
  return safeDbCall(DEFAULT_HOME_BLOCKS, async () => {
    const defaults = DEFAULT_HOME_BLOCKS;
    const keys = defaults.map((block) => block.callbackKey);


    await prisma.homeBlock.createMany({
      data: defaults.map((block) => ({
        callbackKey: block.callbackKey,
        header: block.header ?? "",
        subheader: block.subheader,
        content: block.content,
        imageUrl: block.imageUrl,
        imageObjectPosition: block.imageObjectPosition ?? null,
        ctaLabel: block.ctaLabel,
        ctaHref: block.ctaHref,
        orderIndex: block.orderIndex ?? 0,
        visible: block.visible ?? true,
      })),
      skipDuplicates: true,
    });

    await prisma.homeBlock.deleteMany({
      where: {
        callbackKey: {
          notIn: keys,
        },
      },
    });

    // Auto-migrate legacy remote image URLs to local Figma assets.
    const imageMigrations = defaults.filter((block) => block.imageUrl?.startsWith("/figma/"));
    await Promise.all(
      imageMigrations.map((block) =>
        prisma.homeBlock.updateMany({
          where: {
            callbackKey: block.callbackKey,
            imageUrl: {
              contains: "unsplash.com",
            },
          },
          data: {
            imageUrl: block.imageUrl,
            imageObjectPosition: block.imageObjectPosition ?? null,
          },
        }),
      ),
    );

    const existing = await prisma.homeBlock.findMany({
      where: { callbackKey: { in: keys } },
    });

    const existingMap = mapHomeBlocks(existing as HomeBlockContent[]);
    return defaults.map((block) => ({
      ...block,
      ...(existingMap[block.callbackKey] ?? {}),
    }));
  });
}

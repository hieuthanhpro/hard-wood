import { prisma } from "../lib/db";
import { ACTIVE_HOME_BLOCK_KEYS, DEFAULT_HOME_BLOCKS } from "../lib/home-blocks";

async function syncHomeBlocks() {
  const activeBlocks = DEFAULT_HOME_BLOCKS.filter((block) =>
    ACTIVE_HOME_BLOCK_KEYS.includes(block.callbackKey as (typeof ACTIVE_HOME_BLOCK_KEYS)[number]),
  );

  for (const block of activeBlocks) {
    await prisma.homeBlock.upsert({
      where: { callbackKey: block.callbackKey },
      create: {
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
      },
      update: {
        header: block.header ?? "",
        subheader: block.subheader,
        content: block.content,
        imageUrl: block.imageUrl,
        imageObjectPosition: block.imageObjectPosition ?? null,
        ctaLabel: block.ctaLabel,
        ctaHref: block.ctaHref,
        orderIndex: block.orderIndex ?? 0,
        visible: block.visible ?? true,
      },
    });
  }

  await prisma.homeBlock.deleteMany({
    where: {
      callbackKey: {
        notIn: activeBlocks.map((block) => block.callbackKey),
      },
    },
  });
}

syncHomeBlocks()
  .then(async () => {
    console.log(`Synced ${ACTIVE_HOME_BLOCK_KEYS.length} active home blocks from Figma defaults.`);
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Failed to sync home blocks:", error);
    await prisma.$disconnect();
    process.exit(1);
  });

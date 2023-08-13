const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const uuidV4 = require("uuid").v4;

const prisma = new PrismaClient();

async function createSeedData() {
  try {
    // Create Wishlists
    const wishlistData = [];
    for (let i = 0; i < 3; i++) {
      wishlistData.push({
        id: uuidV4(),
        title: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        isShared: faker.datatype.boolean(),
        ownerId: faker.string.uuid(),
      });
    }

    // Create wishlists and store the created records
    await prisma.wishlist.createMany({
      data: wishlistData,
      skipDuplicates: true,
    });

    // Create Gifts and Gift Details
    const giftData = [];
    const giftDetailData = [];
    for (const wishlist of wishlistData) {
      const gift = {
        id: uuidV4(),
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 3 }),
        isVisible: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        userId: faker.string.uuid(),
        wishlistId: wishlist.id,
      };

      giftData.push(gift);

      const giftDetail = {
        description: faker.lorem.sentence(),
        imageUrl: faker.image.url(),
        url: faker.internet.url(),
        price: faker.number.float({max: 999, min: 10}),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        giftId: gift.id,
      };

      giftDetailData.push(giftDetail);
    }

    await prisma.gift.createMany({
      data: giftData,
      skipDuplicates: true,
    });

    await prisma.giftDetail.createMany({
      data: giftDetailData,
      skipDuplicates: true,
    });

    console.log("Seed data created successfully!");
  } catch (error) {
    console.error("Error creating seed data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createSeedData();
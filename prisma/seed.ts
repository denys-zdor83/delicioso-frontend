import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { categories, ingridients, products } from "./constants";




async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User test',
                email: 'user@example.com',
                password: hashSync('11111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin test',
                email: 'RqRZ3@example.com',
                password: hashSync('11111', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ],
    });

    await prisma.category.createMany({
        data: categories
    })

    await prisma.ingridient.createMany({
        data: ingridients
    })

    await prisma.product.createMany({
        data: products
    })
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
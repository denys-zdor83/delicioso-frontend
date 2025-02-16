import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { categories, ingredients, products } from "./constants";
import { Prisma } from "@prisma/client";

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
    productId,
    pizzaType,
    size,
  }: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40;
  }) => {
    return {
      productId,
      price: randomDecimalNumber(10, 30),
      pizzaType,
      size,
    } as Prisma.ProductItemUncheckedCreateInput;
  };

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
    });

    await prisma.ingredient.createMany({
        data: ingredients
    });

    await prisma.product.createMany({
        data: products
    });

    const pizza_pepperoni_fresh = await prisma.product.create({
        data: {
            name: 'Pepperoni Fresh',
            imageUrl:
              '/assets/images/products/pepperoni-fresh.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza_cheesy = await prisma.product.create({
        data: {
            name: 'Cheesy',
            imageUrl:
              '/assets/images/products/cheesy.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza_chorizo_fresh = await prisma.product.create({
        data: {
            name: 'Chorizo Fresh',
            imageUrl:
              '/assets/images/products/chorizo-fresh.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40),
            },
        },
    });

    const pizza_mexican_beef_pizza = await prisma.product.create({
        data: {
            name: 'Mexican Beef pizza',
            imageUrl:
              '/assets/images/products/mexican_beef_pizza.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza_cheesy_chicken = await prisma.product.create({
        data: {
            name: 'Cheesy Chicken',
            imageUrl:
              '/assets/images/products/cheesy_chicken.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza_chicken_bbq = await prisma.product.create({
        data: {
            name: 'Chicken BBQ',
            imageUrl:
              '/assets/images/products/chicken_bbq.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40),
            },
        },
    });

    await prisma.productItem.createMany({
        data: [
            // Pizza "Pepperoni Fresh"
            generateProductItem({ productId: pizza_pepperoni_fresh.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza_pepperoni_fresh.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza_pepperoni_fresh.id, pizzaType: 2, size: 40 }),

            // Pizza "Cheesy"
            generateProductItem({ productId: pizza_cheesy.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza_cheesy.id, pizzaType: 1, size: 30 }),
            generateProductItem({ productId: pizza_cheesy.id, pizzaType: 1, size: 40 }),
            generateProductItem({ productId: pizza_cheesy.id, pizzaType: 2, size: 20 }),
            generateProductItem({ productId: pizza_cheesy.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza_cheesy.id, pizzaType: 2, size: 40 }),

            // Pizza "Chorizo Fresh"
            generateProductItem({ productId: pizza_chorizo_fresh.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza_chorizo_fresh.id, pizzaType: 2, size: 40 }),

            // Pizza "Mexican Beef pizza"
            generateProductItem({ productId: pizza_mexican_beef_pizza.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza_mexican_beef_pizza.id, pizzaType: 1, size: 30 }),
            generateProductItem({ productId: pizza_mexican_beef_pizza.id, pizzaType: 1, size: 40 }),

            // Pizza "Cheesy Chicken"
            generateProductItem({ productId: pizza_cheesy_chicken.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza_cheesy_chicken.id, pizzaType: 1, size: 30 }),
            generateProductItem({ productId: pizza_cheesy_chicken.id, pizzaType: 1, size: 40 }),
            generateProductItem({ productId: pizza_cheesy_chicken.id, pizzaType: 2, size: 20 }),
            generateProductItem({ productId: pizza_cheesy_chicken.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza_cheesy_chicken.id, pizzaType: 2, size: 40 }),

            // Pizza "Chicken BBQ"
            generateProductItem({ productId: pizza_chicken_bbq.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza_chicken_bbq.id, pizzaType: 1, size: 30 }),

            // Another products
            generateProductItem({ productId: 1 }),
            generateProductItem({ productId: 2 }),
            generateProductItem({ productId: 3 }),
            generateProductItem({ productId: 4 }),
            generateProductItem({ productId: 5 }),
            generateProductItem({ productId: 6 }),
            generateProductItem({ productId: 7 }),
            generateProductItem({ productId: 8 }),
            generateProductItem({ productId: 9 }),
            generateProductItem({ productId: 10 }),
            generateProductItem({ productId: 11 }),
            generateProductItem({ productId: 12 }),
            generateProductItem({ productId: 13 }),
            generateProductItem({ productId: 14 }),
            generateProductItem({ productId: 15 }),
            generateProductItem({ productId: 16 }),
            generateProductItem({ productId: 17 }),
            generateProductItem({ productId: 18 }),
            generateProductItem({ productId: 19 }),
            generateProductItem({ productId: 21 }),
            generateProductItem({ productId: 22 }),
            generateProductItem({ productId: 23 }),
            generateProductItem({ productId: 24 }),
            generateProductItem({ productId: 25 }),
            generateProductItem({ productId: 26 }),
            generateProductItem({ productId: 27 }),
        ],
    });

    await prisma.cart.createMany({
        data: [
          {
            userId: 1,
            totalAmount: 0,
            token: '11111',
          },
          {
            userId: 2,
            totalAmount: 0,
            token: '222222',
          },
        ],
    });

    await prisma.cartItem.create({
        data: {
          productItemId: 1,
          cartId: 1,
          quantity: 2,
          ingredients: {
            connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
          },
        },
    });

    await prisma.story.createMany({
      data: [
        {
          previewImageUrl:
            'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
        },
        {
          previewImageUrl:
            'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
        },
        {
          previewImageUrl:
            'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
        },
        {
          previewImageUrl:
            'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
        },
        {
          previewImageUrl:
            'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
        },
        {
          previewImageUrl:
            'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
        },
      ],
    });
    
    await prisma.storyItem.createMany({
      data: [
        {
          storyId: 1,
          sourceUrl:
            'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
        },
        {
          storyId: 1,
          sourceUrl:
            'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
        },
        {
          storyId: 2,
          sourceUrl:
            'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
        },
        {
          storyId: 2,
          sourceUrl:
            'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
        },
        {
          storyId: 3,
          sourceUrl:
            'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
        },
        {
          storyId: 3,
          sourceUrl:
            'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
        },
        {
          storyId: 4,
          sourceUrl:
            'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
        },
        {
          storyId: 4,
          sourceUrl:
            'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
        },
        {
          storyId: 5,
          sourceUrl:
            'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
        },
        {
          storyId: 5,
          sourceUrl:
            'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
        },
        {
          storyId: 6,
          sourceUrl:
            'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
        },
        {
          storyId: 6,
          sourceUrl:
            'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
        },
      ],
    });
}


async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
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

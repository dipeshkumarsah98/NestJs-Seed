import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy article

  const user1 = await prisma.user.upsert({
    where: { email: 'dipeshsah98@gmail.com' },
    update: {},
    create: {
      email: 'dipeshsah98@gmail.com',
      name: 'Dipesh sah',
      password: 'dipeshsah123',
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: 'rupesh@gmail.com' },
    update: {},
    create: {
      email: 'rupesh98@gmail.com',
      name: 'Rupesh yadav',
      password: 'rupeshyadav123',
    },
  });
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma support for mongoDB' },
    update: { authorId: user1.id },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: { authorId: user2.id },
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
      authorId: user2.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

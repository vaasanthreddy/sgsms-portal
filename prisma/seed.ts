import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Get first school
  const school = await prisma.school.findFirst();

  if (!school) {
    console.log("No school found. Create a school first.");
    return;
  }

  const classes = [
    "LKG",
    "UKG",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
  ];

  for (const cls of classes) {
    const students = [];

    for (let i = 1; i <= 30; i++) {
      students.push({
        name: `${cls} Student ${i}`,
        class: cls,
        parentContact: `9876543${i.toString().padStart(3, "0")}`,
        schoolId: school.id,
      });
    }

    await prisma.student.createMany({
      data: students,
      skipDuplicates: true,
    });

    console.log(`Inserted 30 students for ${cls}`);
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
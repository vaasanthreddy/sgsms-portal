import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const names = [
"Abhiman Roy","Alisha Chinai","Amit Sadh","Amrita Singh","Angad Bedi",
"Anita Hassanandani","Anshul Pandey","Anu Malik","Aparshakti Khurana",
"Arbaaz Khan","Arshad Warsi","Asha Bhosle","Ashutosh Rana","Ayush Sharma",
"Babita Phogat","Badshah Singh","Bipasha Basu","Bobby Deol","Carry Minati",
"Chunky Pandey","Daisy Shah","Dino Morea","Divya Khosla","Esha Gupta",
"Evelyn Sharma","Genelia D’Souza","Govinda Ahuja","Gul Panag","Harsh Limbachiyaa",
"Ileana D’Cruz","Jacqueline Fernandez","Juhi Parmar","Kajal Aggarwal",
"Kalki Koechlin","Kapil Sharma","Karan Kundra","Karisma Kapoor",
"Katrina Kaif","Lara Dutta","Madhuri Dixit","Malaika Arora",
"Manushi Chhillar","Mouni Roy","Neha Kakkar","Nora Fatehi"
];

async function main() {

  for (let i = 0; i < names.length; i++) {

    const id = `STU${String(316 + i).padStart(3,"0")}`;

    await prisma.student.update({
      where:{ id },
      data:{ name:names[i] }
    });

  }

  console.log("Names fixed successfully");

}

main();
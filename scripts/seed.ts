const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Literature" },
        { name: "Art" },
        { name: "Cooking" },
        { name: "Travel" },
        { name: "Science" },
        { name: "Technology" },
        { name: "Web Development" }, // New tech-related category
        { name: "Data Science" }, // New tech-related category
        { name: "Artificial Intelligence" }, // New tech-related category
        { name: "Cybersecurity" }, // New tech-related category
        { name: "Cloud Computing" }, // New tech-related category
        { name: "Internet of Things" }, // New tech-related category
        { name: "Blockchain" }, // New tech-related category
        { name: "Machine Learning" }, // New tech-related category
        { name: "Mobile Development" }, // New tech-related category
        { name: "DevOps" }, // New tech-related category
        { name: "Software Engineering" }, // New tech-related category
      ],
    });
    console.log("Categories seeded successfully");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main().catch((error) => {
  console.error("Error running main function", error);
  process.exit(1);
});
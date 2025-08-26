import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

// Custom enums (since they're not in @prisma/client standard)
enum UserRole {
  ADMIN = "ADMIN",
  CITIZEN = "CITIZEN",
}

enum CourseCategory {
  ENVIRONNEMENT = "ENVIRONNEMENT",
  DROIT_DU_CITOYEN = "DROIT_DU_CITOYEN",
  DEVOIR_DU_CITOYEN = "DEVOIR_DU_CITOYEN",
}

enum MediaType {
  AUDIO = "AUDIO",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

enum FileExtension {
  pdf = "pdf",
  pptx = "pptx",
  mp4 = "mp4",
  mp3 = "mp3",
  webp = "webp",
  png = "png",
}

enum PublicationStatus {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
}

enum PublicationType {
  MEDIA = "MEDIA",
  TEXT = "TEXT",
}

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data
  await prisma.$transaction([
    prisma.publicationAttachment.deleteMany(),
    prisma.courseAttachment.deleteMany(), // New relation
    prisma.badge.deleteMany(),
    prisma.event.deleteMany(),
    prisma.communityMember.deleteMany(),
    prisma.certificate.deleteMany(),
    prisma.courseProgress.deleteMany(),
    prisma.response.deleteMany(),
    prisma.question.deleteMany(),
    prisma.quiz.deleteMany(),
    prisma.step.deleteMany(),
    prisma.course.deleteMany(),
    prisma.publication.deleteMany(),
    prisma.attachment.deleteMany(),
    prisma.community.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log("🧹 Database cleared");

  // Create Users (3 ADMIN, 3 CITIZEN)
  const users = await Promise.all([
    // Admin users
    prisma.user.create({
      data: {
        nom: "Diop",
        prenom: "Amadou",
        username: "admin.diop",
        email: "amadou.diop@example.com",
        password: await bcrypt.hash("admin123", 10),
        phoneNumber: "+221701234567",
        role: UserRole.ADMIN,
      },
    }),
    prisma.user.create({
      data: {
        nom: "Sall",
        prenom: "Fatou",
        username: "admin.sall",
        email: "fatou.sall@example.com",
        password: await bcrypt.hash("admin123", 10),
        phoneNumber: "+221701234568",
        role: UserRole.ADMIN,
      },
    }),
    prisma.user.create({
      data: {
        nom: "Ndiaye",
        prenom: "Moussa",
        username: "admin.ndiaye",
        email: "moussa.ndiaye@example.com",
        password: await bcrypt.hash("admin123", 10),
        phoneNumber: "+221701234569",
        role: UserRole.ADMIN,
      },
    }),
    // Citizen users
    prisma.user.create({
      data: {
        nom: "Ba",
        prenom: "Aissatou",
        username: "citizen.ba",
        email: "aissatou.ba@example.com",
        password: await bcrypt.hash("citizen123", 10),
        phoneNumber: "+221701234570",
        role: UserRole.CITIZEN,
      },
    }),
    prisma.user.create({
      data: {
        nom: "Diallo",
        prenom: "Ousmane",
        username: "citizen.diallo",
        email: "ousmane.diallo@example.com",
        password: await bcrypt.hash("citizen123", 10),
        phoneNumber: "+221701234571",
        role: UserRole.CITIZEN,
      },
    }),
    prisma.user.create({
      data: {
        nom: "Cisse",
        prenom: "Mariama",
        username: "citizen.cisse",
        email: "mariama.cisse@example.com",
        password: await bcrypt.hash("citizen123", 10),
        phoneNumber: "+221701234572",
        role: UserRole.CITIZEN,
      },
    }),
  ]);

  console.log("👥 Users created");

  // Create Courses (3 courses)
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        nom: "Introduction à l'Environnement",
        description:
          "Cours de base sur la protection de l'environnement et le développement durable",
        category: CourseCategory.ENVIRONNEMENT,
        creatorId: users[0].id, // Admin Diop
      },
    }),
    prisma.course.create({
      data: {
        nom: "Droits et Devoirs du Citoyen",
        description:
          "Comprendre ses droits et obligations en tant que citoyen sénégalais",
        category: CourseCategory.DROIT_DU_CITOYEN,
        creatorId: users[1].id, // Admin Sall
      },
    }),
    prisma.course.create({
      data: {
        nom: "Devoirs Civiques",
        description:
          "Apprendre les devoirs essentiels du citoyen dans la société",
        category: CourseCategory.DEVOIR_DU_CITOYEN,
        creatorId: users[2].id, // Admin Ndiaye
      },
    }),
  ]);

  console.log("📚 Courses created");

  // Create Steps for each course (3 steps per course)
  const steps: any[] = [];
  for (let i = 0; i < courses.length; i++) {
    for (let j = 1; j <= 3; j++) {
      steps.push(
        await prisma.step.create({
          data: {
            name: `Étape ${j} - ${courses[i].nom}`,
            stepNumber: j,
            courseId: courses[i].id,
          },
        }),
      );
    }
  }

  console.log("🔄 Steps created");

  // Create Quizzes for each step (1 quiz per step)
  // Each quiz is linked to both step and course
  const quizzes: any[] = [];
  for (let i = 0; i < steps.length; i++) {
    // Calculate which course this step belongs to
    const courseIndex = Math.floor(i / 3); // 3 steps per course
    const courseId = courses[courseIndex].id;

    quizzes.push(
      await prisma.quiz.create({
        data: {
          nom: `Quiz - ${steps[i].name}`,
          description: `Évaluation pour ${steps[i].name}`,
          score: 100,
          stepId: steps[i].id,
          courseId: courseId, // Link quiz to course
        },
      }),
    );
  }

  console.log("❓ Quizzes created");

  // Create Questions for each quiz (3 questions per quiz)
  const questions: any[] = [];
  for (let i = 0; i < quizzes.length; i++) {
    for (let j = 1; j <= 3; j++) {
      questions.push(
        await prisma.question.create({
          data: {
            content: `Question ${j} du quiz ${quizzes[i].nom}`,
            quizId: quizzes[i].id,
          },
        }),
      );
    }
  }

  console.log("❔ Questions created");

  // Create Responses for each question (3 responses per question, 1 correct)
  const responses: any[] = [];
  for (let i = 0; i < questions.length; i++) {
    for (let j = 1; j <= 3; j++) {
      responses.push(
        await prisma.response.create({
          data: {
            content: `Réponse ${j} à la question ${i + 1}`,
            questionId: questions[i].id,
            isCorrect: j === 1, // First response is correct
          },
        }),
      );
    }
  }

  console.log("💬 Responses created");

  // Create Attachments (3 attachments)
  const attachments = await Promise.all([
    prisma.attachment.create({
      data: {
        name: "Guide Environnement",
        url: "https://example.com/files/guide-environnement.pdf",
        extension: FileExtension.pdf,
        mediaType: MediaType.IMAGE,
      },
    }),
    prisma.attachment.create({
      data: {
        name: "Présentation Droits Citoyens",
        url: "https://example.com/files/droits-citoyens.pptx",
        extension: FileExtension.pptx,
        mediaType: MediaType.IMAGE,
      },
    }),
    prisma.attachment.create({
      data: {
        name: "Vidéo Devoirs Civiques",
        url: "https://example.com/files/devoirs-civiques.mp4",
        extension: FileExtension.mp4,
        mediaType: MediaType.VIDEO,
      },
    }),
  ]);

  console.log("📎 Attachments created");

  // Create Publications (3 publications)
  const publications = await Promise.all([
    prisma.publication.create({
      data: {
        publicationContent:
          "Article sur la protection de l'environnement au Sénégal",
        status: PublicationStatus.PUBLISHED,
        publicationType: PublicationType.TEXT,
        authorId: users[0].id, // Admin Diop
      },
    }),
    prisma.publication.create({
      data: {
        publicationContent: "Guide pratique des droits du citoyen",
        status: PublicationStatus.PUBLISHED,
        publicationType: PublicationType.TEXT,
        authorId: users[1].id, // Admin Sall
      },
    }),
    prisma.publication.create({
      data: {
        publicationContent: "Vidéo explicative sur les devoirs civiques",
        status: PublicationStatus.DRAFT,
        publicationType: PublicationType.MEDIA,
        authorId: users[2].id, // Admin Ndiaye
      },
    }),
  ]);

  console.log("📰 Publications created");

  // Create Publication-Attachment relationships
  await Promise.all([
    prisma.publicationAttachment.create({
      data: {
        publicationId: publications[0].id,
        attachmentId: attachments[0].id,
      },
    }),
    prisma.publicationAttachment.create({
      data: {
        publicationId: publications[1].id,
        attachmentId: attachments[1].id,
      },
    }),
    prisma.publicationAttachment.create({
      data: {
        publicationId: publications[2].id,
        attachmentId: attachments[2].id,
      },
    }),
  ]);

  console.log("🔗 Publication-Attachment relationships created");

  // Create Course-Attachment relationships
  // Each course gets 2 attachments (many-to-many relationship)
  await Promise.all([
    // Course 1 (Environnement) gets attachments 1 and 2
    prisma.courseAttachment.create({
      data: {
        courseId: courses[0].id,
        attachmentId: attachments[0].id, // Guide Environnement
      },
    }),
    prisma.courseAttachment.create({
      data: {
        courseId: courses[0].id,
        attachmentId: attachments[1].id, // Présentation Droits
      },
    }),
    // Course 2 (Droits) gets attachments 2 and 3
    prisma.courseAttachment.create({
      data: {
        courseId: courses[1].id,
        attachmentId: attachments[1].id, // Présentation Droits
      },
    }),
    prisma.courseAttachment.create({
      data: {
        courseId: courses[1].id,
        attachmentId: attachments[2].id, // Vidéo Devoirs
      },
    }),
    // Course 3 (Devoirs) gets attachments 1 and 3
    prisma.courseAttachment.create({
      data: {
        courseId: courses[2].id,
        attachmentId: attachments[0].id, // Guide Environnement
      },
    }),
    prisma.courseAttachment.create({
      data: {
        courseId: courses[2].id,
        attachmentId: attachments[2].id, // Vidéo Devoirs
      },
    }),
  ]);

  console.log("🔗 Course-Attachment relationships created");

  // Create Communities (3 communities)
  const communities = await Promise.all([
    prisma.community.create({
      data: {
        communityName: "Éco-Citoyens Dakar",
        creatorId: users[3].id, // Citizen Ba
      },
    }),
    prisma.community.create({
      data: {
        communityName: "Droits Humains Sénégal",
        creatorId: users[4].id, // Citizen Diallo
      },
    }),
    prisma.community.create({
      data: {
        communityName: "Civisme et Engagement",
        creatorId: users[5].id, // Citizen Cisse
      },
    }),
  ]);

  console.log("🏘️ Communities created");

  // Create Community Members
  await Promise.all([
    // Community 1 members
    prisma.communityMember.create({
      data: {
        communityId: communities[0].id,
        userId: users[3].id, // Ba
      },
    }),
    prisma.communityMember.create({
      data: {
        communityId: communities[0].id,
        userId: users[4].id, // Diallo
      },
    }),
    // Community 2 members
    prisma.communityMember.create({
      data: {
        communityId: communities[1].id,
        userId: users[4].id, // Diallo
      },
    }),
    prisma.communityMember.create({
      data: {
        communityId: communities[1].id,
        userId: users[5].id, // Cisse
      },
    }),
    // Community 3 members
    prisma.communityMember.create({
      data: {
        communityId: communities[2].id,
        userId: users[5].id, // Cisse
      },
    }),
    prisma.communityMember.create({
      data: {
        communityId: communities[2].id,
        userId: users[3].id, // Ba
      },
    }),
  ]);

  console.log("👥 Community members created");

  // Create Events (3 events)
  const events = await Promise.all([
    prisma.event.create({
      data: {
        eventName: "Journée de l'Environnement",
        eventDate: new Date("2024-06-05"),
        organizerId: users[3].id, // Citizen Ba
        communityId: communities[0].id,
      },
    }),
    prisma.event.create({
      data: {
        eventName: "Conférence sur les Droits Humains",
        eventDate: new Date("2024-06-15"),
        organizerId: users[4].id, // Citizen Diallo
        communityId: communities[1].id,
      },
    }),
    prisma.event.create({
      data: {
        eventName: "Atelier Civisme",
        eventDate: new Date("2024-06-25"),
        organizerId: users[5].id, // Citizen Cisse
        communityId: communities[2].id,
      },
    }),
  ]);

  console.log("📅 Events created");

  // Create Badges (3 badges)
  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        name: "Éco-Citoyen Exemplaire",
        issuer: "Ministère de l'Environnement",
        userId: users[3].id, // Citizen Ba
        communityId: communities[0].id,
      },
    }),
    prisma.badge.create({
      data: {
        name: "Défenseur des Droits",
        issuer: "Ligue des Droits de l'Homme",
        userId: users[4].id, // Citizen Diallo
        communityId: communities[1].id,
      },
    }),
    prisma.badge.create({
      data: {
        name: "Citoyen Modèle",
        issuer: "Mairie de Dakar",
        userId: users[5].id, // Citizen Cisse
        communityId: communities[2].id,
      },
    }),
  ]);

  console.log("🏆 Badges created");

  // Create Course Progress for citizens (3 progress records)
  const courseProgress = await Promise.all([
    prisma.courseProgress.create({
      data: {
        percentage: 75.0,
        userId: users[3].id, // Citizen Ba
        courseId: courses[0].id, // Environnement course
      },
    }),
    prisma.courseProgress.create({
      data: {
        percentage: 50.0,
        userId: users[4].id, // Citizen Diallo
        courseId: courses[1].id, // Droits course
      },
    }),
    prisma.courseProgress.create({
      data: {
        percentage: 100.0,
        userId: users[5].id, // Citizen Cisse
        courseId: courses[2].id, // Devoirs course
      },
    }),
  ]);

  console.log("📊 Course progress created");

  // Create Certificates for completed courses
  const certificates = await Promise.all([
    prisma.certificate.create({
      data: {
        name: "Certificat Devoirs Civiques",
        issuer: "Académie Civique du Sénégal",
        userId: users[5].id, // Citizen Cisse
        courseId: courses[2].id, // Devoirs course
        progressId: courseProgress[2].id, // 100% progress
      },
    }),
  ]);

  console.log("🎓 Certificates created");

  console.log("✅ Database seeding completed successfully!");
  console.log("\n📊 Summary of created data:");
  console.log(`- Users: ${users.length}`);
  console.log(`- Courses: ${courses.length}`);
  console.log(`- Steps: ${steps.length}`);
  console.log(`- Quizzes: ${quizzes.length}`);
  console.log(`- Questions: ${questions.length}`);
  console.log(`- Responses: ${responses.length}`);
  console.log(`- Attachments: ${attachments.length}`);
  console.log(`- Publications: ${publications.length}`);
  console.log(`- Communities: ${communities.length}`);
  console.log(`- Events: ${events.length}`);
  console.log(`- Badges: ${badges.length}`);
  console.log(`- Course Progress: ${courseProgress.length}`);
  console.log(`- Certificates: ${certificates.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

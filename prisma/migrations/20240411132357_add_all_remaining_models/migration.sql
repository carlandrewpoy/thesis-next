/*
  Warnings:

  - You are about to drop the column `collegeId` on the `user` table. All the data in the column will be lost.
  - Added the required column `schoolYear` to the `GradSchoolFaculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `GradSchoolFaculty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_collegeId_fkey`;

-- AlterTable
ALTER TABLE `college` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `faculty` ADD COLUMN `suffix` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `gradschoolfaculty` ADD COLUMN `schoolYear` VARCHAR(191) NOT NULL,
    ADD COLUMN `semester` ENUM('FIRST', 'SECOND') NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `collegeId`;

-- CreateTable
CREATE TABLE `TechnicalService` (
    `id` VARCHAR(191) NOT NULL,
    `trainingId` VARCHAR(191) NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `dateStart` VARCHAR(191) NULL,
    `dateEnd` VARCHAR(191) NULL,
    `organizer` VARCHAR(191) NOT NULL,
    `faculty` VARCHAR(191) NOT NULL,
    `proofLink` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `facultyId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('RESEARCH', 'EXTENSION') NULL,
    `title` VARCHAR(191) NOT NULL,
    `dateStart` VARCHAR(191) NULL,
    `dateCompleted` VARCHAR(191) NULL,
    `dateExtension` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `fundingAgency` VARCHAR(191) NOT NULL,
    `coopAgency` VARCHAR(191) NOT NULL,
    `projectLeader` VARCHAR(191) NOT NULL,
    `researchWorkers` VARCHAR(191) NOT NULL,
    `approvedProjectCost` DECIMAL(65, 30) NOT NULL,
    `supportingDocs` VARCHAR(191) NOT NULL,
    `projectReport` VARCHAR(191) NOT NULL,
    `mandatedProgram` VARCHAR(191) NOT NULL,
    `beneficiaries` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Award` (
    `id` VARCHAR(191) NOT NULL,
    `researchers` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `yearPublished` VARCHAR(191) NOT NULL,
    `publisher` VARCHAR(191) NOT NULL,
    `type` ENUM('NATIONAL', 'INTERNATIONAL', 'REGIONAL') NOT NULL,
    `certOrProgram` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Presentation` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `status` ENUM('ONGOING', 'COMPLETED') NOT NULL,
    `startedDate` VARCHAR(191) NULL,
    `completedDate` VARCHAR(191) NULL,
    `articleTitle` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(191) NOT NULL,
    `researchers` VARCHAR(191) NOT NULL,
    `forumTitle` VARCHAR(191) NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `type` ENUM('NATIONAL', 'INTERNATIONAL', 'REGIONAL') NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `supportingDocs` VARCHAR(191) NOT NULL,
    `centerId` VARCHAR(191) NOT NULL,
    `movAbstract` BOOLEAN NOT NULL DEFAULT false,
    `movCertOfAppearance` BOOLEAN NOT NULL DEFAULT false,
    `movConferenceProgram` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Training` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `dateStarted` VARCHAR(191) NULL,
    `dateEnded` VARCHAR(191) NULL,
    `duration` ENUM('LESS_THAN_EIGHT_HOUR', 'EIGHT_HOURS', 'TWO_DAYS', 'THREE_TO_FOUR_DAYS', 'FIVE_DAYS_OR_MORE') NULL,
    `traineesCount` INTEGER NOT NULL,
    `traineesWeighted` DECIMAL(65, 30) NOT NULL,
    `traineesSurveyedCount` INTEGER NOT NULL,
    `ratePoor` INTEGER NOT NULL,
    `rateFair` INTEGER NOT NULL,
    `rateSatisfactory` INTEGER NOT NULL,
    `rateVerySatisfactory` INTEGER NOT NULL,
    `rateExcellent` INTEGER NOT NULL,
    `rateTimelinessPoor` INTEGER NOT NULL,
    `rateTimelinessFair` INTEGER NOT NULL,
    `rateTimelinessSatisfactory` INTEGER NOT NULL,
    `rateTimelinessVerySatisfactory` INTEGER NOT NULL,
    `rateTimelinessExcellent` INTEGER NOT NULL,
    `supportingDocs` VARCHAR(191) NOT NULL,
    `movReportAndActivityProgram` BOOLEAN NOT NULL DEFAULT false,
    `movSummaryOfEvaluation` BOOLEAN NOT NULL DEFAULT false,
    `movSurverForm` BOOLEAN NOT NULL DEFAULT false,
    `movAttendance` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partnership` (
    `id` VARCHAR(191) NOT NULL,
    `collegeId` VARCHAR(191) NOT NULL,
    `partner` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `dateStarted` VARCHAR(191) NULL,
    `dateEnded` VARCHAR(191) NULL,
    `implementor` VARCHAR(191) NOT NULL,
    `supportingDocs` VARCHAR(191) NOT NULL,
    `movReport` BOOLEAN NOT NULL DEFAULT false,
    `movMoa` BOOLEAN NOT NULL DEFAULT false,
    `movAgencyCertification` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Utilization` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `centerId` VARCHAR(191) NOT NULL,
    `proof` VARCHAR(191) NOT NULL,
    `benificiary` VARCHAR(191) NOT NULL,
    `supportingDocs` VARCHAR(191) NOT NULL,
    `proofLink` VARCHAR(191) NOT NULL,
    `movMoa` BOOLEAN NOT NULL DEFAULT false,
    `movReport` BOOLEAN NOT NULL DEFAULT false,
    `movUtilization` BOOLEAN NOT NULL DEFAULT false,
    `movPhotos` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publication` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `centerId` VARCHAR(191) NOT NULL,
    `status` ENUM('ONGOING', 'COMPLETED') NOT NULL,
    `startedDate` VARCHAR(191) NULL,
    `completedDate` VARCHAR(191) NULL,
    `article` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(191) NOT NULL,
    `authors` VARCHAR(191) NOT NULL,
    `publicationDate` VARCHAR(191) NOT NULL,
    `journalTitle` VARCHAR(191) NOT NULL,
    `issueNo` VARCHAR(191) NOT NULL,
    `issnOrIsbn` VARCHAR(191) NOT NULL,
    `index` VARCHAR(191) NOT NULL,
    `supportingDocs` VARCHAR(191) NOT NULL,
    `movAbstract` BOOLEAN NOT NULL DEFAULT false,
    `movJournalTitlePage` BOOLEAN NOT NULL DEFAULT false,
    `movTableOfContents` BOOLEAN NOT NULL DEFAULT false,
    `movFullPaper` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Citation` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(191) NOT NULL,
    `researchers` VARCHAR(191) NOT NULL,
    `yearPublished` VARCHAR(191) NOT NULL,
    `index` VARCHAR(191) NOT NULL,
    `journalTitle` VARCHAR(191) NOT NULL,
    `vol` VARCHAR(191) NOT NULL,
    `yearPublishedTwo` VARCHAR(191) NOT NULL,
    `publisherName` VARCHAR(191) NOT NULL,
    `scholarLink` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TechnicalService` ADD CONSTRAINT `TechnicalService_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `Training`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TechnicalService` ADD CONSTRAINT `TechnicalService_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Award` ADD CONSTRAINT `Award_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Presentation` ADD CONSTRAINT `Presentation_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Presentation` ADD CONSTRAINT `Presentation_centerId_fkey` FOREIGN KEY (`centerId`) REFERENCES `Center`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Training` ADD CONSTRAINT `Training_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partnership` ADD CONSTRAINT `Partnership_collegeId_fkey` FOREIGN KEY (`collegeId`) REFERENCES `College`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partnership` ADD CONSTRAINT `Partnership_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Utilization` ADD CONSTRAINT `Utilization_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Utilization` ADD CONSTRAINT `Utilization_centerId_fkey` FOREIGN KEY (`centerId`) REFERENCES `Center`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_centerId_fkey` FOREIGN KEY (`centerId`) REFERENCES `Center`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Citation` ADD CONSTRAINT `Citation_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

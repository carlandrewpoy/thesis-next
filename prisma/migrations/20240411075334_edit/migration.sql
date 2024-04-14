/*
  Warnings:

  - You are about to drop the `facultyengament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `facultyengament`;

-- CreateTable
CREATE TABLE `FacultyEngagement` (
    `id` VARCHAR(191) NOT NULL,
    `letter` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

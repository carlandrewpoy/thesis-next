/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `GradSchoolFaculty` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `GradSchoolFaculty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gradschoolfaculty` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `operation` VARCHAR(191) NOT NULL,
    `result` JSON NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `GradSchoolFaculty_userId_key` ON `GradSchoolFaculty`(`userId`);

-- AddForeignKey
ALTER TABLE `GradSchoolFaculty` ADD CONSTRAINT `GradSchoolFaculty_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

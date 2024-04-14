/*
  Warnings:

  - You are about to drop the column `facultyId` on the `technicalservice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `technicalservice` DROP FOREIGN KEY `TechnicalService_facultyId_fkey`;

-- AlterTable
ALTER TABLE `technicalservice` DROP COLUMN `facultyId`;

/*
  Warnings:

  - Added the required column `benefeciary` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `training` ADD COLUMN `benefeciary` VARCHAR(191) NOT NULL;

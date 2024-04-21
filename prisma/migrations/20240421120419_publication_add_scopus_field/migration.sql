/*
  Warnings:

  - Added the required column `scopus` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `publication` ADD COLUMN `scopus` VARCHAR(191) NOT NULL;

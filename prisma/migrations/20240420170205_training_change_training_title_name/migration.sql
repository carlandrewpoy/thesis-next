/*
  Warnings:

  - You are about to drop the column `traningTitle` on the `training` table. All the data in the column will be lost.
  - Added the required column `trainingTitle` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `training` DROP COLUMN `traningTitle`,
    ADD COLUMN `trainingTitle` VARCHAR(191) NOT NULL;

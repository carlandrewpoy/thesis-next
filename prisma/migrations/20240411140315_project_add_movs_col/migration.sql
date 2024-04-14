/*
  Warnings:

  - You are about to alter the column `status` on the `project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `movBoardResolution` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `movNotarizedMoa` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `movSignedBudgetAllocation` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `movSingedReports` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `status` ENUM('ONGOING', 'COMPLETED') NOT NULL;

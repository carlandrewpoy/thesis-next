/*
  Warnings:

  - You are about to drop the column `middleInitial` on the `gradschoolfaculty` table. All the data in the column will be lost.
  - Added the required column `facultyEngagementId` to the `GradSchoolFaculty` table without a default value. This is not possible if the table is not empty.
  - Made the column `facultyId` on table `gradschoolfaculty` required. This step will fail if there are existing NULL values in that column.
  - Made the column `collegeId` on table `gradschoolfaculty` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `gradschoolfaculty` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `gradschoolfaculty` DROP FOREIGN KEY `GradSchoolFaculty_collegeId_fkey`;

-- DropForeignKey
ALTER TABLE `gradschoolfaculty` DROP FOREIGN KEY `GradSchoolFaculty_facultyId_fkey`;

-- AlterTable
ALTER TABLE `gradschoolfaculty` DROP COLUMN `middleInitial`,
    ADD COLUMN `facultyEngagementId` VARCHAR(191) NOT NULL,
    MODIFY `facultyId` VARCHAR(191) NOT NULL,
    MODIFY `collegeId` VARCHAR(191) NOT NULL,
    MODIFY `position` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `GradSchoolFaculty` ADD CONSTRAINT `GradSchoolFaculty_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GradSchoolFaculty` ADD CONSTRAINT `GradSchoolFaculty_collegeId_fkey` FOREIGN KEY (`collegeId`) REFERENCES `College`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GradSchoolFaculty` ADD CONSTRAINT `GradSchoolFaculty_facultyEngagementId_fkey` FOREIGN KEY (`facultyEngagementId`) REFERENCES `FacultyEngagement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `extensionProjectId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_extensionProjectId_fkey` FOREIGN KEY (`extensionProjectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

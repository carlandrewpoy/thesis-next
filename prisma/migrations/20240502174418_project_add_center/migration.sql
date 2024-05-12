-- AlterTable
ALTER TABLE `project` ADD COLUMN `centerId` VARCHAR(191) NOT NULL DEFAULT 'cluwm4beg0003ndr6hw4jqbhy';

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_centerId_fkey` FOREIGN KEY (`centerId`) REFERENCES `Center`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

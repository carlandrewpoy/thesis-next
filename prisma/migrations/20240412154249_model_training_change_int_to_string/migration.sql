-- AlterTable
ALTER TABLE `training` MODIFY `traineesCount` VARCHAR(191) NOT NULL,
    MODIFY `traineesWeighted` VARCHAR(191) NOT NULL,
    MODIFY `traineesSurveyedCount` VARCHAR(191) NOT NULL,
    MODIFY `ratePoor` VARCHAR(191) NOT NULL,
    MODIFY `rateFair` VARCHAR(191) NOT NULL,
    MODIFY `rateSatisfactory` VARCHAR(191) NOT NULL,
    MODIFY `rateVerySatisfactory` VARCHAR(191) NOT NULL,
    MODIFY `rateExcellent` VARCHAR(191) NOT NULL,
    MODIFY `rateTimelinessPoor` VARCHAR(191) NOT NULL,
    MODIFY `rateTimelinessFair` VARCHAR(191) NOT NULL,
    MODIFY `rateTimelinessSatisfactory` VARCHAR(191) NOT NULL,
    MODIFY `rateTimelinessVerySatisfactory` VARCHAR(191) NOT NULL,
    MODIFY `rateTimelinessExcellent` VARCHAR(191) NOT NULL;

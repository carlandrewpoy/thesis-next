"use server";

import prisma from "@/lib/prisma";
import { TrainingSchema } from "@/lib/zod-types/z-schema";
import { xprisma } from "@/prisma-extension/extension";
import { TrainingDurationType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createTraining = async (state: any, formData: FormData) => {

  const values = {
      projectId: formData.get("projectId") === '' ? null : formData.get("projectId") as string,
      venue: formData.get("venue"),
      beneficiary: formData.get("beneficiary"),
      trainingTitle: formData.get("trainingTitle"),
      dateStarted: formData.get("dateStarted"),
      dateEnded: formData.get("dateEnded"),
      rateExcellent: formData.get("rateExcellent"),
      rateFair: formData.get("rateFair"),
      ratePoor: formData.get("ratePoor"),
      rateSatisfactory: formData.get("rateSatisfactory"),
      rateTimelinessExcellent: formData.get(
        "rateTimelinessExcellent"
      ),
      rateTimelinessFair: formData.get("rateTimelinessFair"),
      rateTimelinessPoor: formData.get("rateTimelinessPoor"),
      rateTimelinessSatisfactory: formData.get(
        "rateTimelinessSatisfactory"
      ),
      rateTimelinessVerySatisfactory: formData.get(
        "rateTimelinessVerySatisfactory"
      ),
      rateVerySatisfactory: formData.get("rateVerySatisfactory"),
      traineesCount: formData.get("traineesCount"),
      traineesSurveyedCount: formData.get("traineesSurveyedCount"),
      traineesWeighted: formData.get("traineesWeighted"),
      supportingDocs: formData.get("supportingDocs"),
      duration: formData.get("duration") as TrainingDurationType,
      movAttendance: !!formData.get("movAttendance"),
      movReportAndActivityProgram: !!formData.get(
        "movReportAndActivityProgram"
      ),
      movSummaryOfEvaluation: !!formData.get(
        "movSummaryOfEvaluation"
      ),
      movSurverForm: !!formData.get("movSurverForm"),
    }

     const result = TrainingSchema.safeParse(values)
          if (!result.success) {
              return {
                  error: result.error.flatten().fieldErrors
              }
          }

      const res = await xprisma.training.create({
        data: result.data,
      });
      if (res.id) {
        revalidatePath("/training");
        return {
          message: "Added successfully",
        };
      }
};

export const updateTraining = async (
  id: string,
  state: any,
  formData: FormData
) => {
    const values = {
      projectId: formData.get("projectId") === '' ? null : formData.get("projectId") as string,
      venue: formData.get("venue"),
      beneficiary: formData.get("beneficiary"),
      trainingTitle: formData.get("trainingTitle"),
      dateStarted: formData.get("dateStarted"),
      dateEnded: formData.get("dateEnded"),
      rateExcellent: formData.get("rateExcellent"),
      rateFair: formData.get("rateFair"),
      ratePoor: formData.get("ratePoor"),
      rateSatisfactory: formData.get("rateSatisfactory"),
      rateTimelinessExcellent: formData.get(
        "rateTimelinessExcellent"
      ),
      rateTimelinessFair: formData.get("rateTimelinessFair"),
      rateTimelinessPoor: formData.get("rateTimelinessPoor"),
      rateTimelinessSatisfactory: formData.get(
        "rateTimelinessSatisfactory"
      ),
      rateTimelinessVerySatisfactory: formData.get(
        "rateTimelinessVerySatisfactory"
      ),
      rateVerySatisfactory: formData.get("rateVerySatisfactory"),
      traineesCount: formData.get("traineesCount"),
      traineesSurveyedCount: formData.get("traineesSurveyedCount"),
      traineesWeighted: formData.get("traineesWeighted"),
      supportingDocs: formData.get("supportingDocs"),
      duration: formData.get("duration") as TrainingDurationType,
      movAttendance: !!formData.get("movAttendance"),
      movReportAndActivityProgram: !!formData.get(
        "movReportAndActivityProgram"
      ),
      movSummaryOfEvaluation: !!formData.get(
        "movSummaryOfEvaluation"
      ),
      movSurverForm: !!formData.get("movSurverForm"),
    }

     const result = TrainingSchema.safeParse(values)
          if (!result.success) {
              return {
                  error: result.error.flatten().fieldErrors
              }
          }
  const res = await xprisma.training.update({
    where: {
      id: id,
    },
    data: result.data,
  });
 
  revalidatePath("/training");
  return {
    message: "Updated successfully",
  };
};

export const deleteTraining = async (state: any, formData: FormData) => {
  const res = await xprisma.training.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error deleting",
    };
  }
  revalidatePath("/training");
  return {
    message: "Deleted successfully",
  };
};

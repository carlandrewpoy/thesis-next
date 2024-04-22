"use server";

import prisma from "@/lib/prisma";
import { xprisma } from "@/prisma-extension/extension";
import { TrainingDurationType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createTraining = async (state: any, formData: FormData) => {
  const res = await xprisma.training.create({
    data: {
      projectId: formData.get("projectId") as string,
      venue: formData.get("venue") as string,
      beneficiary: formData.get("beneficiary") as string,
      trainingTitle: formData.get("trainingTitle") as string,
      dateStarted: formData.get("dateStarted") as string,
      dateEnded: formData.get("dateEnded") as string,
      rateExcellent: formData.get("rateExcellent") as string,
      rateFair: formData.get("rateFair") as string,
      ratePoor: formData.get("ratePoor") as string,
      rateSatisfactory: formData.get("rateSatisfactory") as string,
      rateTimelinessExcellent: formData.get(
        "rateTimelinessExcellent"
      ) as string,
      rateTimelinessFair: formData.get("rateTimelinessFair") as string,
      rateTimelinessPoor: formData.get("rateTimelinessPoor") as string,
      rateTimelinessSatisfactory: formData.get(
        "rateTimelinessSatisfactory"
      ) as string,
      rateTimelinessVerySatisfactory: formData.get(
        "rateTimelinessVerySatisfactory"
      ) as string,
      rateVerySatisfactory: formData.get("rateVerySatisfactory") as string,
      traineesCount: formData.get("traineesCount") as string,
      traineesSurveyedCount: formData.get("traineesSurveyedCount") as string,
      traineesWeighted: formData.get("traineesWeighted") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      duration: formData.get("duration") as TrainingDurationType,
      movAttendance: !!formData.get("movAttendance") as boolean,
      movReportAndActivityProgram: !!formData.get(
        "movReportAndActivityProgram"
      ) as boolean,
      movSummaryOfEvaluation: !!formData.get(
        "movSummaryOfEvaluation"
      ) as boolean,
      movSurverForm: !!formData.get("movSurverForm") as boolean,
    },
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
  const res = await xprisma.training.update({
    where: {
      id: id,
    },
    data: {
      projectId: formData.get("projectId") as string,
      venue: formData.get("venue") as string,
      trainingTitle: formData.get("trainingTitle") as string,
      beneficiary: formData.get("beneficiary") as string,
      dateStarted: formData.get("dateStarted") as string,
      dateEnded: formData.get("dateEnded") as string,
      rateExcellent: formData.get("rateExcellent") as string,
      rateFair: formData.get("rateFair") as string,
      ratePoor: formData.get("ratePoor") as string,
      rateSatisfactory: formData.get("rateSatisfactory") as string,
      rateTimelinessExcellent: formData.get(
        "rateTimelinessExcellent"
      ) as string,
      rateTimelinessFair: formData.get("rateTimelinessFair") as string,
      rateTimelinessPoor: formData.get("rateTimelinessPoor") as string,
      rateTimelinessSatisfactory: formData.get(
        "rateTimelinessSatisfactory"
      ) as string,
      rateTimelinessVerySatisfactory: formData.get(
        "rateTimelinessVerySatisfactory"
      ) as string,
      rateVerySatisfactory: formData.get("rateVerySatisfactory") as string,
      traineesCount: formData.get("traineesCount") as string,
      traineesSurveyedCount: formData.get("traineesSurveyedCount") as string,
      traineesWeighted: formData.get("traineesWeighted") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      duration: formData.get("duration") as TrainingDurationType,
      movAttendance: !!formData.get("movAttendance") as boolean,
      movReportAndActivityProgram: !!formData.get(
        "movReportAndActivityProgram"
      ) as boolean,
      movSummaryOfEvaluation: !!formData.get(
        "movSummaryOfEvaluation"
      ) as boolean,
      movSurverForm: !!formData.get("movSurverForm") as boolean,
    },
  });
  if (!res.id) {
    return {
      error: "Error updating",
    };
  }
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

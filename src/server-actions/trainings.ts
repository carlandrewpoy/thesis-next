"use server";

import prisma from "@/lib/prisma";
import { TrainingSchema } from "@/lib/zod-types/z-schema";
import { xprisma } from "@/prisma-extension/extension";
import { TrainingDurationType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createTraining = async (state: any, formData: FormData) => {

  // const values = {
  //     projectId: formData.get("projectId") === '' ? null : formData.get("projectId") as string,
  //     venue: formData.get("venue"),
  //     beneficiary: formData.get("beneficiary"),
  //     trainingTitle: formData.get("trainingTitle"),
  //     dateStarted: formData.get("dateStarted"),
  //     dateEnded: formData.get("dateEnded"),
  //     rateExcellent: formData.get("rateExcellent"),
  //     rateFair: formData.get("rateFair"),
  //     ratePoor: formData.get("ratePoor"),
  //     rateSatisfactory: formData.get("rateSatisfactory"),
  //     rateTimelinessExcellent: formData.get(
  //       "rateTimelinessExcellent"
  //     ),
  //     rateTimelinessFair: formData.get("rateTimelinessFair"),
  //     rateTimelinessPoor: formData.get("rateTimelinessPoor"),
  //     rateTimelinessSatisfactory: formData.get(
  //       "rateTimelinessSatisfactory"
  //     ),
  //     rateTimelinessVerySatisfactory: formData.get(
  //       "rateTimelinessVerySatisfactory"
  //     ),
  //     rateVerySatisfactory: formData.get("rateVerySatisfactory"),
  //     traineesCount: formData.get("traineesCount"),
  //     traineesSurveyedCount: formData.get("traineesSurveyedCount"),
  //     traineesWeighted: formData.get("traineesWeighted"),
  //     supportingDocs: formData.get("supportingDocs"),
  //     duration: formData.get("duration") as TrainingDurationType,
  //     movAttendance: !!formData.get("movAttendance"),
  //     movReportAndActivityProgram: !!formData.get(
  //       "movReportAndActivityProgram"
  //     ),
  //     movSummaryOfEvaluation: !!formData.get(
  //       "movSummaryOfEvaluation"
  //     ),
  //     movSurverForm: !!formData.get("movSurverForm"),
  //   }

  //    const result = TrainingSchema.safeParse(values)
  //         if (!result.success) {
  //             return {
  //                 error: result.error.flatten().fieldErrors
  //             }
  //         }

  //     const res = await xprisma.training.create({
  //       data: result.data,
  //     });
  //     if (res.id) {
  //       revalidatePath("/training");
  //       return {
  //         message: "Added successfully",
  //       };
  //     }

  const res = await xprisma.training.create({
    
    data: {
      projectId: formData.get("projectId") === '' ? null : formData.get("projectId") as string,
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
      movAttendance: !!formData.get("movAttendance"),
      movReportAndActivityProgram: !!formData.get(
        "movReportAndActivityProgram"
      ),
      movSummaryOfEvaluation: !!formData.get(
        "movSummaryOfEvaluation"
      ),
      movSurverForm: !!formData.get("movSurverForm"),
    },
  });

  if (!res.id) {
    return {
      error: "Error Adding",
    };
  }
  if (res.id) {
    revalidatePath("/trainings");
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
  //   const values = {
  //     projectId: formData.get("projectId") === '' ? null : formData.get("projectId") as string,
  //     venue: formData.get("venue"),
  //     beneficiary: formData.get("beneficiary"),
  //     trainingTitle: formData.get("trainingTitle"),
  //     dateStarted: formData.get("dateStarted"),
  //     dateEnded: formData.get("dateEnded"),
  //     rateExcellent: formData.get("rateExcellent"),
  //     rateFair: formData.get("rateFair"),
  //     ratePoor: formData.get("ratePoor"),
  //     rateSatisfactory: formData.get("rateSatisfactory"),
  //     rateTimelinessExcellent: formData.get(
  //       "rateTimelinessExcellent"
  //     ),
  //     rateTimelinessFair: formData.get("rateTimelinessFair"),
  //     rateTimelinessPoor: formData.get("rateTimelinessPoor"),
  //     rateTimelinessSatisfactory: formData.get(
  //       "rateTimelinessSatisfactory"
  //     ),
  //     rateTimelinessVerySatisfactory: formData.get(
  //       "rateTimelinessVerySatisfactory"
  //     ),
  //     rateVerySatisfactory: formData.get("rateVerySatisfactory"),
  //     traineesCount: formData.get("traineesCount"),
  //     traineesSurveyedCount: formData.get("traineesSurveyedCount"),
  //     traineesWeighted: formData.get("traineesWeighted"),
  //     supportingDocs: formData.get("supportingDocs"),
  //     duration: formData.get("duration") as TrainingDurationType,
  //     movAttendance: !!formData.get("movAttendance"),
  //     movReportAndActivityProgram: !!formData.get(
  //       "movReportAndActivityProgram"
  //     ),
  //     movSummaryOfEvaluation: !!formData.get(
  //       "movSummaryOfEvaluation"
  //     ),
  //     movSurverForm: !!formData.get("movSurverForm"),
  //   }

  //    const result = TrainingSchema.safeParse(values)
  //         if (!result.success) {
  //             return {
  //                 error: result.error.flatten().fieldErrors
  //             }
  //         }
  // const res = await xprisma.training.update({
  //   where: {
  //     id: id,
  //   },
  //   data: result.data,
  // });
 
  // revalidatePath("/training");
  // return {
  //   message: "Updated successfully",
  // };

  const res = await xprisma.training.update({
    where: {
      id: id,
    },
    data: {
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
      movAttendance: !!formData.get("movAttendance"),
      movReportAndActivityProgram: !!formData.get(
        "movReportAndActivityProgram"
      ),
      movSummaryOfEvaluation: !!formData.get(
        "movSummaryOfEvaluation"
      ),
      movSurverForm: !!formData.get("movSurverForm"),
    },
  });

  if (!res.id) {
    return {
      error: "Failed!",
    };
  }
  if (res.id) {
    revalidatePath("/trainings");
    return {
      message: "Updated successfully",
    };
  }

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

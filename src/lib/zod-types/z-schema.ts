import { PresentationStatus, PresentationType, Semester, TrainingDurationType } from "@prisma/client";
import { z } from "zod";

export const GradSchoolSchema = z.object({
    collegeId: z.string().cuid({ message: "College is required" }),
    facultyEngagementId: z.string().cuid({ message: "Faculty engagement is required" }),
    facultyId: z.string().cuid({ message: "Faculty is required" }),
    schoolYear: z.string().min(1, { message: "Year is required" }),
    semester: z.nativeEnum(Semester, {
        errorMap: (issue, ctx) => {
            return { message: "Semester is required" };
        },
    }),

})
export type TGradSchoolSchema = z.infer<typeof UtilizationSchema>;

export const UtilizationSchema = z.object({
    projectId: z.string().cuid({ message: "Project is required" }),
    centerId: z.string().cuid({ message: "Center is required" }),
    year: z.string().min(1, { message: "Year is required" }).length(4, { message: "Invalid year" }),
    proof: z.string().min(1, { message: "Proof is required" }),
    benificiary: z.string().min(1, { message: "Benificiary is required" }),
    supportingDocs: z.string().startsWith("https://drive.google.com/", { message: "Must provide valid URL" }),
    movMoa: z.boolean(),
    movReport: z.boolean(),
    movUtilization: z.boolean(),
    movPhotos: z.boolean(),
}).refine((data) => {
    return data.movMoa || data.movReport || data.movUtilization || data.movPhotos;
}, { message: "At least one of the MOVs properties must be check", path: ["movMoa"]});

export type TUtilizationSchema = z.infer<typeof UtilizationSchema>;

export const PresentationSchema = z.object({
  // projectId: formData.get("projectId") as string,
  //     centerId: formData.get("centerId") as string,
  //     articleTitle: formData.get("articleTitle") as string,
  //     completedDate: formData.get("completedDate") as string,
  //     startedDate: formData.get("startedDate") as string,
  //     date: formData.get("date") as string,
  //     supportingDocs: formData.get("supportingDocs") as string,
  //     forumTitle: formData.get("forumTitle") as string,
  //     keywords: formData.get("keywords") as string,
  //     Researchers: {
  //       connect: selected.map((item) => ({ id: item }))
  //     },
  //     status: formData.get("status") as PresentationStatus,
  //     type: formData.get("type") as PresentationType,
  //     venue: formData.get("venue") as string,
  //     movAbstract: !!formData.get("movAbstract") as boolean,
  //     movCertOfAppearance: !!formData.get("movCertOfAppearance") as boolean,
  //     movConferenceProgram: !!formData.get("movConferenceProgram") as boolean,
    projectId: z.string().cuid({ message: "Project is required" }),
    centerId: z.string().cuid({ message: "Center is required" }),
    articleTitle: z.string().min(1, { message: "Article Title is required" }),
    completedDate: z.string().min(1, { message: "Required" }),
    startedDate: z.string().min(1, { message: "Required" }),
    date: z.string().min(1, { message: "Required" }),
    supportingDocs: z.string().startsWith("https://drive.google.com/", { message: "Must provide valid URL" }),
    forumTitle: z.string().min(1, { message: "Forum Title Docs is required"}),
    keywords: z.string().min(1, { message: "Keywords is required"}),
    Researchers: z.string().array().min(1, { message: "Researchers are required"}),
    status: z.nativeEnum(PresentationStatus, {
        errorMap: (issue, ctx) => {
            return { message: "Required" };
        },
    }),
    type: z.nativeEnum(PresentationType, {
        errorMap: (issue, ctx) => {
            return { message: "Type is required" };
        },
    }),
    venue: z.string().min(1, { message: "Venue are required"}),
    movAbstract: z.boolean(),
    movCertOfAppearance: z.boolean(),
    movConferenceProgram: z.boolean(),
}).refine((data) => {
    return data.movAbstract || data.movCertOfAppearance || data.movConferenceProgram;
}, { message: "At least one of the MOVs properties must be check", path: ["movCertOfAppearance"]});

export type PresentationSchema = z.infer<typeof PresentationSchema>;

export const TrainingSchema = z.object({
    projectId: z.nullable(z.string()),
    trainingTitle: z.string().min(1, { message: "Training Title is required" }),
    venue: z.string().min(1, { message: "Venue is required" }),
    beneficiary: z.string().min(1, { message: "Benificiary is required" }),
    dateStarted: z.string().min(1, { message: "Date started is required" }),
    dateEnded: z.string().min(1, { message: "Date ended is required" }),
    duration: z.nativeEnum(TrainingDurationType, {
        errorMap: (issue, ctx) => {
            return { message: 'Please select your user duration type' };
        },
    }),
    traineesCount: z.string().min(1, { message: "Trainees count is required" }),
    traineesWeighted: z.string().min(1, { message: "Trainees weighted is required" }),
    traineesSurveyedCount: z.string().min(1, { message: "Trainees surveyed count is required" }),
    ratePoor: z.string().min(1, { message: "Required" }),
    rateFair: z.string().min(1, { message: "Required" }),
    rateSatisfactory: z.string().min(1, { message: "Required" }),
    rateVerySatisfactory: z.string().min(1, { message: "Required" }),
    rateExcellent: z.string().min(1, { message: "Required" }),
    rateTimelinessPoor: z.string().min(1, { message: "Required" }),
    rateTimelinessFair: z.string().min(1, { message: "Required" }),
    rateTimelinessSatisfactory: z.string().min(1, { message: "Required" }),
    rateTimelinessVerySatisfactory: z.string().min(1, { message: "Required" }),
    rateTimelinessExcellent: z.string().min(1, { message: "Required" }),
    supportingDocs: z.string().startsWith("https://drive.google.com/", { message: "Must provide a valid google drive URL" }),
    movReportAndActivityProgram: z.boolean(),
    movSummaryOfEvaluation: z.boolean(),
    movSurverForm: z.boolean(),
    movAttendance: z.boolean(),
}).refine((data) => {
    return data.movReportAndActivityProgram || data.movSummaryOfEvaluation || data.movSurverForm || data.movAttendance;
}, { message: "At least one of the MOVs properties must be check", path: ["movReportAndActivityProgram"]});

export type TTrainingSchema = z.infer<typeof TrainingSchema>;

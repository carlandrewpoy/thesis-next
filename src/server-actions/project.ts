"use server";

import prisma from "@/lib/prisma";
import { xprisma } from "@/prisma-extension/extension";
import { ProjectStatus, ProjectType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createProject = async (selectedResearchers: string[], state: any, formData: FormData) => {
  const res = await xprisma.project.create({
    data: {
      title: formData.get("title") as string,
      extensionProjectId: formData.get("extensionProjectId") as string,
      researchWorkers: {
        connect: selectedResearchers.map((item) => ({ id: item }))
      },
      centerId:  formData.get("centerId") as string,
      type: formData.get("type") ? 'EXTENSION':'RESEARCH',
      status: formData.get("status") as ProjectStatus,
      dateStart: formData.get("dateStart") as string,
      dateCompleted: formData.get("dateCompleted") as string,
      dateExtension: formData.get("dateExtension") as string,
      fundingAgency: formData.get("fundingAgency") as string,
      coopAgency: formData.get("coopAgency") as string,
      projectLeaderId: formData.get("projectLeaderId") as string,
      approvedProjectCost: formData.get("approvedProjectCost") as string,
      beneficiaries: formData.get("beneficiaries") as string,
      mandatedProgram: formData.get("mandatedProgram") as string,
      movSignedBudgetAllocation: !!formData.get(
        "movSignedBudgetAllocation"
      ) as boolean,
      movSingedReports: !!formData.get("movSingedReports") as boolean,
      movNotarizedMoa: !!formData.get("movNotarizedMoa") as boolean,
      movBoardResolution: !!formData.get("movBoardResolution") as boolean,
      supportingDocs: formData.get("supportingDocs") as string,
      projectReport: formData.get("projectReport") as string,
    },
  });
  if (res.id) {
    revalidatePath("/project");
    return {
      message: "Added successfully",
    };
  }
};

export const updateProject = async (
  id: string,
  selectedResearchers: string[],
  state: any,
  formData: FormData
) => {
  const res = await xprisma.project.update({
    where: {
      id: id,
    },
    data: {
      title: formData.get("title") as string,
      researchWorkers: {
        connect: selectedResearchers.map((item) => ({ id: item }))
      },      extensionProjectId: formData.get("extensionProjectId") as string,
      type: formData.get("type") as ProjectType,
      centerId:  formData.get("centerId") as string,
      status: formData.get("status") as ProjectStatus,
      dateStart: formData.get("dateStart") as string,
      dateCompleted: formData.get("dateCompleted") as string,
      dateExtension: formData.get("dateExtension") as string,
      fundingAgency: formData.get("fundingAgency") as string,
      coopAgency: formData.get("coopAgency") as string,
      projectLeaderId: formData.get("projectLeaderId") as string,
      approvedProjectCost: formData.get("approvedProjectCost") as string,
      beneficiaries: formData.get("beneficiaries") as string,
      mandatedProgram: formData.get("mandatedProgram") as string,
      movSignedBudgetAllocation: !!formData.get(
        "movSignedBudgetAllocation"
      ) as boolean,
      movSingedReports: !!formData.get("movSingedReports") as boolean,
      movNotarizedMoa: !!formData.get("movNotarizedMoa") as boolean,
      movBoardResolution: !!formData.get("movBoardResolution") as boolean,
      supportingDocs: formData.get("supportingDocs") as string,
      projectReport: formData.get("projectReport") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error updating",
    };
  }
  revalidatePath("/project");
  return {
    message: "Updated successfully",
  };
};

export const deleteProject = async (state: any, formData: FormData) => {
  const res = await xprisma.project.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error deleting",
    };
  }
  revalidatePath("/project");
  return {
    message: "Deleted successfully",
  };
};

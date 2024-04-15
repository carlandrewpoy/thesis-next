"use server";

import prisma from "@/lib/prisma";
import { PresentationStatus, PresentationType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createPresentation = async (state: any, formData: FormData) => {
  const res = await prisma.presentation.create({
    data: {
      projectId: formData.get("projectId") as string,
      centerId: formData.get("centerId") as string,
      articleTitle: formData.get("articleTitle") as string,
      completedDate: formData.get("completedDate") as string,
      startedDate: formData.get("startedDate") as string,
      date: formData.get("date") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      forumTitle: formData.get("forumTitle") as string,
      keywords: formData.get("keywords") as string,
      researchers: formData.get("researchers") as string,
      status: formData.get("status") as PresentationStatus,
      type: formData.get("type") as PresentationType,
      venue: formData.get("venue") as string,
      movAbstract: !!formData.get("movAbstract") as boolean,
      movCertOfAppearance: !!formData.get("movCertOfAppearance") as boolean,
      movConferenceProgram: !!formData.get("movConferenceProgram") as boolean,
    },
  });
  if (res.id) {
    revalidatePath("/presentation");
    return {
      message: "Added successfully",
    };
  }
};

export const updatePresentation = async (
  id: string,
  state: any,
  formData: FormData
) => {
  const res = await prisma.presentation.update({
    where: {
      id: id,
    },
    data: {
      projectId: formData.get("projectId") as string,
      centerId: formData.get("centerId") as string,
      articleTitle: formData.get("articleTitle") as string,
      completedDate: formData.get("completedDate") as string,
      startedDate: formData.get("startedDate") as string,
      date: formData.get("date") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      forumTitle: formData.get("forumTitle") as string,
      keywords: formData.get("keywords") as string,
      researchers: formData.get("researchers") as string,
      status: formData.get("status") as PresentationStatus,
      type: formData.get("type") as PresentationType,
      venue: formData.get("venue") as string,
      movAbstract: !!formData.get("movAbstract") as boolean,
      movCertOfAppearance: !!formData.get("movCertOfAppearance") as boolean,
      movConferenceProgram: !!formData.get("movConferenceProgram") as boolean,
    },
  });
  if (!res.id) {
    return {
      error: "Error updating",
    };
  }
  revalidatePath("/presentation");
  return {
    message: "Updated successfully",
  };
};

export const deletePresentation = async (state: any, formData: FormData) => {
  const res = await prisma.presentation.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error deleting",
    };
  }
  revalidatePath("/presentation");
  return {
    message: "Deleted successfully",
  };
};

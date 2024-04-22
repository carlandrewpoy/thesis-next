"use server";

import prisma from "@/lib/prisma";
import { xprisma } from "@/prisma-extension/extension";
import { Faculty, PresentationStatus, PresentationType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createPresentation = async (selected: string[], state: any, formData: FormData) => {
  console.log(selected, 'actions');
  console.log(formData.get("projectId"));
  const res = await xprisma.presentation.create({  
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
      Researchers: {
        connect: selected.map((item) => ({ id: item }))
      },
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
  selected: string[],
  state: any,
  formData: FormData
) => {
  console.log(selected, 'actions')
  console.log(formData.get("projectId"), 'actions')
  const res = await xprisma.presentation.update({
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
      Researchers: {
        set: selected.map((item) => ({ id: item }))
      },      
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
  const res = await xprisma.presentation.delete({
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

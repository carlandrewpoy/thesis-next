"use server";
import { prisma } from "@/lib/utils";
import {
  PresentationStatus,
  PresentationType,
  ProjectStatus,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createPresentation = async (
  projectId: string,
  centerId: string,
  status: PresentationStatus,
  type: PresentationType,
  formData: FormData
) => {
  const res = await prisma.presentation.create({
    data: {
      projectId: projectId as string,
      centerId: centerId as string,
      status: status as PresentationStatus,
      type: type as PresentationType,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      articleTitle: formData.get("articleTitle") as string,
      keywords: formData.get("keywords") as string,
      researchers: formData.get("researchers") as string,
      forumTitle: formData.get("forumTitle") as string,
      venue: formData.get("venue") as string,
      date: formData.get("date") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      docsLinkType: formData.get("docsLinkType") as string,
    },
  });
  revalidatePath("/presentation");
};

export const updatePresentation = async (
  projectId: string,
  centerId: string,
  status: PresentationStatus,
  type: PresentationType,
  id: string,
  formData: FormData
) => {
  //   console.log(college);
  const res = await prisma.presentation.update({
    where: {
      id: id,
    },
    data: {
      projectId: projectId as string,
      centerId: centerId as string,
      status: status as PresentationStatus,
      type: type as PresentationType,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      articleTitle: formData.get("articleTitle") as string,
      keywords: formData.get("keywords") as string,
      researchers: formData.get("researchers") as string,
      forumTitle: formData.get("forumTitle") as string,
      venue: formData.get("venue") as string,
      date: formData.get("date") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      docsLinkType: formData.get("docsLinkType") as string,
    },
  });
  revalidatePath("/presentation");
};

export const deletePresentation = async (id: string, formData: FormData) => {
  const deleteUser = await prisma.presentation.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/presentation");
};

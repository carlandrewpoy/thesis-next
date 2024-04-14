"use server";
import { prisma } from "@/lib/utils";
import { PresentationType, ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createAward = async (type: string, formData: FormData) => {
  const res = await prisma.award.create({
    data: {
      researchersName: formData.get("researchersName") as string,
      researchTitle: formData.get("researchTitle") as string,
      yearPublished: formData.get("yearPublished") as string,
      publisher: formData.get("publisher") as string,
      type: type as PresentationType,
      supportingDocs: formData.get("supportingDocs") as string,
      docsLinkType: formData.get("docsLinkType") as string,
    },
  });
  revalidatePath("/awards");
};

export const updateAward = async (
  type: string | null,
  id: string,
  formData: FormData
) => {
  //   console.log(college);
  const res = await prisma.award.update({
    where: {
      id: id,
    },
    data: {
      researchersName: formData.get("researchersName") as string,
      researchTitle: formData.get("researchTitle") as string,
      yearPublished: formData.get("yearPublished") as string,
      publisher: formData.get("publisher") as string,
      type: type as PresentationType,
      supportingDocs: formData.get("supportingDocs") as string,
      docsLinkType: formData.get("docsLinkType") as string,
    },
  });
  revalidatePath("/awards");
};

export const deleteAward = async (id: string, formData: FormData) => {
  const deleteUser = await prisma.award.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/awards");
};

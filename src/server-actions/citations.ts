"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createCitation = async (selected: string[],state: any, formData: FormData) => {
  const res = await prisma.citation.create({
    data: {
      projectId: formData.get("projectId") as string,
      index: formData.get("index") as string,
      scopus: formData.get("scopus") as string,
      journalTitle: formData.get("journalTitle") as string,
      keywords: formData.get("keywords") as string,
      vol: formData.get("vol") as string,
      publisherNameId: formData.get("publisherNameId") as string,
      researchers: {
        connect: selected.map((item) => ({ id: item }))
      },
      scholarLink: formData.get("scholarLink") as string,
      yearPublished: formData.get("yearPublished") as string,
      yearPublishedTwo: formData.get("yearPublishedTwo") as string,
    },
  });
  if (res.id) {
    revalidatePath("/citation");
    return {
      message: "Added successfully",
    };
  }
};

export const updateCitation = async (
  id: string,
  selected: string[],
  state: any,
  formData: FormData
) => {
  const res = await prisma.citation.update({
    where: {
      id: id,
    },
    data: {
      projectId: formData.get("projectId") as string,
      index: formData.get("index") as string,
      journalTitle: formData.get("journalTitle") as string,
      keywords: formData.get("keywords") as string,
      vol: formData.get("vol") as string,
      publisherNameId: formData.get("publisherNameId") as string,
      researchers: {
                set: selected.map((item) => ({ id: item }))
      },
      scholarLink: formData.get("scholarLink") as string,
      yearPublished: formData.get("yearPublished") as string,
      yearPublishedTwo: formData.get("yearPublishedTwo") as string,
      scopus: formData.get("scopus") as string,

    },
  });
  if (!res.id) {
    return {
      error: "Error updating",
    };
  }
  revalidatePath("/citation");
  return {
    message: "Updated successfully",
  };
};

export const deleteCitation = async (state: any, formData: FormData) => {
  const res = await prisma.citation.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error deleting",
    };
  }
  revalidatePath("/citation");
  return {
    message: "Deleted successfully",
  };
};

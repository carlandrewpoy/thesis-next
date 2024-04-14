"use server";

import prisma from "@/lib/prisma";
import { PublicationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createPublication = async (state: any, formData: FormData) => {
  const res = await prisma.publication.create({
    data: {
      projectId: formData.get("projectId") as string,
      centerId: formData.get("centerId") as string,
      article: formData.get("article") as string,
      authors: formData.get("authors") as string,
      index: formData.get("index") as string,
      keywords: formData.get("keywords") as string,
      status: formData.get("status") as PublicationStatus,
      issnOrIsbn: formData.get("issnOrIsbn") as string,
      issueNo: formData.get("issueNo") as string,
      journalTitle: formData.get("journalTitle") as string,
      publicationDate: formData.get("publicationDate") as string,
      completedDate: formData.get("completedDate") as string,
      startedDate: formData.get("startedDate") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      movAbstract: !!formData.get("movAbstract") as boolean,
      movFullPaper: !!formData.get("movFullPaper") as boolean,
      movJournalTitlePage: !!formData.get("movJournalTitlePage") as boolean,
      movTableOfContents: !!formData.get("movTableOfContents") as boolean,
    },
  });
  if (res.id) {
    revalidatePath("/publication");
    return {
      message: "Added successfully",
    };
  }
};

export const updatePublication = async (
  id: string,
  state: any,
  formData: FormData
) => {
  const res = await prisma.publication.update({
    where: {
      id: id,
    },
    data: {
      projectId: formData.get("projectId") as string,
      centerId: formData.get("centerId") as string,
      article: formData.get("article") as string,
      authors: formData.get("authors") as string,
      index: formData.get("index") as string,
      keywords: formData.get("keywords") as string,
      status: formData.get("status") as PublicationStatus,
      issnOrIsbn: formData.get("issnOrIsbn") as string,
      issueNo: formData.get("issueNo") as string,
      journalTitle: formData.get("journalTitle") as string,
      publicationDate: formData.get("publicationDate") as string,
      completedDate: formData.get("completedDate") as string,
      startedDate: formData.get("startedDate") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      movAbstract: !!formData.get("movAbstract") as boolean,
      movFullPaper: !!formData.get("movFullPaper") as boolean,
      movJournalTitlePage: !!formData.get("movJournalTitlePage") as boolean,
      movTableOfContents: !!formData.get("movTableOfContents") as boolean,
    },
  });
  if (!res.id) {
    return {
      error: "Error updating",
    };
  }
  revalidatePath("/publication");
  return {
    message: "Updated successfully",
  };
};

export const deletePublication = async (state: any, formData: FormData) => {
  const res = await prisma.publication.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error deleting",
    };
  }
  revalidatePath("/publication");
  return {
    message: "Deleted successfully",
  };
};

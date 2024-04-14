"use server";
import { prisma } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const createCitations = async (college: string, formData: FormData) => {
  const res = await prisma.citation.create({
    data: {
      collegeId: college as string,
      authorsWhoCited: formData.get("authorsWhoCited") as string,
      index: formData.get("index") as string,
      issueNo: formData.get("issueNo") as string,
      journalTitle: formData.get("journalTitle") as string,
      keywords: formData.get("keywords") as string,
      publisherName: formData.get("publisherName") as string,
      researchers: formData.get("researchers") as string,
      researchWasCited: formData.get("researchWasCited") as string,
      scholarProfileLink: formData.get("scholarProfileLink") as string,
      yearPublished: formData.get("yearPublished") as string,
    },
  });
  revalidatePath("/citations");
};

export const updateCitations = async (
  collegeId: string,
  id: string,
  formData: FormData
) => {
  //   console.log(college);
  const res = await prisma.citation.update({
    where: {
      id: id,
    },
    data: {
      collegeId: collegeId as string,
      authorsWhoCited: formData.get("authorsWhoCited") as string,
      index: formData.get("index") as string,
      issueNo: formData.get("issueNo") as string,
      journalTitle: formData.get("journalTitle") as string,
      keywords: formData.get("keywords") as string,
      publisherName: formData.get("publisherName") as string,
      researchers: formData.get("researchers") as string,
      researchWasCited: formData.get("researchWasCited") as string,
      scholarProfileLink: formData.get("scholarProfileLink") as string,
      yearPublished: formData.get("yearPublished") as string,
    },
  });
  revalidatePath("/citations");
};

export const deleteCitations = async (id: string, formData: FormData) => {
  const deleteUser = await prisma.citation.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/citations");
};

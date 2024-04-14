"use server";
import { prisma } from "@/lib/utils";
import { PresentationType, ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createTechnicalAdvisoryServices = async (formData: FormData) => {
  const res = await prisma.technicalServices.create({
    data: {
      title: formData.get("title") as string,
      venue: formData.get("venue") as string,
      fromDate: formData.get("fromDate") as string,
      toDate: formData.get("toDate") as string,
      invitedFaculty: formData.get("invitedFaculty") as string,
      organizer: formData.get("organizer") as string,
      supportingDocs: formData.get("supportingDocs") as string,
    },
  });
  revalidatePath("/technical-advisory-services");
};

export const updateTechnicalAdvisoryServices = async (
  id: string,
  formData: FormData
) => {
  //   console.log(college);
  const res = await prisma.technicalServices.update({
    where: {
      id: id,
    },
    data: {
      title: formData.get("title") as string,
      venue: formData.get("venue") as string,
      fromDate: formData.get("fromDate") as string,
      toDate: formData.get("toDate") as string,
      invitedFaculty: formData.get("invitedFaculty") as string,
      organizer: formData.get("organizer") as string,
      supportingDocs: formData.get("supportingDocs") as string,
    },
  });
  revalidatePath("/technical-advisory-services");
};

export const deleteTechnicalAdvisoryServices = async (
  id: string,
  formData: FormData
) => {
  const deleteUser = await prisma.technicalServices.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/technical-advisory-services");
};

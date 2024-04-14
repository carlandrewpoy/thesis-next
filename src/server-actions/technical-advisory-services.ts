"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createTechnicalServices = async (
  state: any,
  formData: FormData
) => {
  const res = await prisma.technicalService.create({
    data: {
      projectId: formData.get("projectId") as string,
      venue: formData.get("venue") as string,
      faculty: formData.get("faculty") as string,
      organizer: formData.get("organizer") as string,
      proofLink: formData.get("proofLink") as string,
      dateStart: formData.get("dateStart") as string,
      dateEnd: formData.get("dateEnd") as string,
    },
  });
  if (res.id) {
    revalidatePath("/technical-advisory-services");
    return {
      message: "Added successfully",
    };
  }
};

export const updateTechnicalServices = async (
  id: string,
  state: any,
  formData: FormData
) => {
  const res = await prisma.technicalService.update({
    where: {
      id: id,
    },
    data: {
      projectId: formData.get("projectId") as string,
      venue: formData.get("venue") as string,
      faculty: formData.get("faculty") as string,
      organizer: formData.get("organizer") as string,
      proofLink: formData.get("proofLink") as string,
      dateStart: formData.get("dateStart") as string,
      dateEnd: formData.get("dateEnd") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error updating",
    };
  }
  revalidatePath("/technical-advisory-services");
  return {
    message: "Updated successfully",
  };
};

export const deleteTechnicalServices = async (
  state: any,
  formData: FormData
) => {
  const res = await prisma.technicalService.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error deleting",
    };
  }
  revalidatePath("/technical-advisory-services");
  return {
    message: "Deleted successfully",
  };
};

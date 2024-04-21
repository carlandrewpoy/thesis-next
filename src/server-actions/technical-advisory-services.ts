"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createTechnicalServices = async (
  selectedOrganizers: string[],
  selectedInvFaculty: string[],
  state: any,
  formData: FormData
) => {
  const res = await prisma.technicalService.create({
    data: {
      projectId: formData.get("projectId") as string,
      venue: formData.get("venue") as string,
      organizers: {
        connect: selectedOrganizers.map((item) => ({ id: item }))
      },
      invitedFaculties: {
        connect: selectedInvFaculty.map((item) => ({ id: item }))
      },
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
  selectedOrganizers: string[],
  selectedInvFaculty: string[],
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
       organizers: {
        set: selectedOrganizers.map((item) => ({ id: item }))
      },
      invitedFaculties: {
        set: selectedInvFaculty.map((item) => ({ id: item }))
      },
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

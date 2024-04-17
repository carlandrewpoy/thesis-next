"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createUtilization = async (state: any, formData: FormData) => {
  const res = await prisma.utilization.create({
    data: {
      projectId: formData.get("projectId") as string,
      centerId: formData.get("centerId") as string,
      proof: formData.get("proof") as string,
      benificiary: formData.get("benificiary") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      year: formData.get("year") as string,
      movMoa: !!formData.get("movMoa") as boolean,
      movPhotos: !!formData.get("movPhotos") as boolean,
      movReport: !!formData.get("movReport") as boolean,
      movUtilization: !!formData.get("movUtilization") as boolean,
    },
  });
  if (res.id) {
    revalidatePath("/utilization");
    return {
      message: "Added successfully",
    };
  }
};

export const updateUtilization = async (
  id: string,
  state: any,
  formData: FormData
) => {
  const res = await prisma.utilization.update({
    where: {
      id: id,
    },
    data: {
      projectId: formData.get("projectId") as string,
      centerId: formData.get("centerId") as string,
      proof: formData.get("proof") as string,
      benificiary: formData.get("benificiary") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      movMoa: !!formData.get("movMoa") as boolean,
      movPhotos: !!formData.get("movPhotos") as boolean,
      movReport: !!formData.get("movReport") as boolean,
      movUtilization: !!formData.get("movUtilization") as boolean,
    },
  });
  if (!res.id) {
    return {
      error: "Error updating",
    };
  }
  revalidatePath("/utilization");
  return {
    message: "Updated successfully",
  };
};

export const deleteUtilization = async (state: any, formData: FormData) => {
  const res = await prisma.utilization.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error deleting",
    };
  }
  revalidatePath("/utilization");
  return {
    message: "Deleted successfully",
  };
};

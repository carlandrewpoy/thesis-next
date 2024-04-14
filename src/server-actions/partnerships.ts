"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createPartnership = async (state: any, formData: FormData) => {
  const res = await prisma.partnership.create({
    data: {
      collegeId: formData.get("collegeId") as string,
      projectId: formData.get("projectId") as string,
      partner: formData.get("partner") as string,
      dateStarted: formData.get("dateStarted") as string,
      dateEnded: formData.get("dateEnded") as string,
      implementor: formData.get("implementor") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      movMoa: !!formData.get("movMoa") as boolean,
      movAgencyCertification: !!formData.get(
        "movAgencyCertification"
      ) as boolean,
      movReport: !!formData.get("movReport") as boolean,
    },
  });
  if (res.id) {
    revalidatePath("/admin/user");
    return {
      message: "Added successfully",
    };
  }
};

export const updatePartnership = async (
  id: string,
  state: any,
  formData: FormData
) => {
  const res = await prisma.partnership.update({
    where: {
      id: id,
    },
    data: {
      collegeId: formData.get("collegeId") as string,
      projectId: formData.get("projectId") as string,
      partner: formData.get("partner") as string,
      dateStarted: formData.get("dateStarted") as string,
      dateEnded: formData.get("dateEnded") as string,
      implementor: formData.get("implementor") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      movMoa: !!formData.get("movMoa") as boolean,
      movAgencyCertification: !!formData.get(
        "movAgencyCertification"
      ) as boolean,
      movReport: !!formData.get("movReport") as boolean,
    },
  });
  if (!res.id) {
    return {
      error: "Error updating",
    };
  }
  revalidatePath("/admin/user");
  return {
    message: "Updated successfully",
  };
};

export const deletePartnership = async (state: any, formData: FormData) => {
  const res = await prisma.partnership.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error deleting",
    };
  }
  revalidatePath("/admin/user");
  return {
    message: "Deleted successfully",
  };
};

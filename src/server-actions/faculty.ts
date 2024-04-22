"use server";

import prisma from "@/lib/prisma";
import { xprisma } from "@/prisma-extension/extension";
import { revalidatePath } from "next/cache";

export const createFaculty = async (state: any, formData: FormData) => {
  const res = await xprisma.faculty.create({
    data: {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      middleInitial: formData.get("middleInitial") as string,
      position: formData.get("position") as string,
      suffix: formData.get("suffix") as string,
    },
  });
  if (res.id) {
    revalidatePath("/admin/faculty");
    return {
      message: "Added successfully",
    };
  }
};

export const updateFaculty = async (
  id: string,
  state: any,
  formData: FormData
) => {
  const res = await xprisma.faculty.update({
    where: {
      id: id,
    },
    data: {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      middleInitial: formData.get("middleInitial") as string,
      position: formData.get("position") as string,
      suffix: formData.get("suffix") as string,

    },
  });
  if (!res.id) {
    return {
      error: "Error updating",
    };
  }
  revalidatePath("/admin/faculty");
  return {
    message: "Updated successfully",
  };
};

export const deleteFaculty = async (state: any, formData: FormData) => {
  const res = await xprisma.faculty.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error deleting",
    };
  }
  revalidatePath("/admin/faculty");
  return {
    message: "Deleted successfully",
  };
};

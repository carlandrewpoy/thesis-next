"use server";

import prisma from "@/lib/prisma";
import { xprisma } from "@/prisma-extension/extension";
import { revalidatePath } from "next/cache";

export const createCollege = async (state: any, formData: FormData) => {
  const res = await xprisma.college.create({
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    },
  });
  if (res.id) {
    revalidatePath("/admin/user");
    return {
      message: "Added successfully",
    };
  }
};

export const updateCollege = async (
  id: string,
  state: any,
  formData: FormData
) => {
  const res = await xprisma.college.update({
    where: {
      id: id,
    },
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
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

export const deleteCollege = async (state: any, formData: FormData) => {
  const res = await xprisma.college.delete({
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

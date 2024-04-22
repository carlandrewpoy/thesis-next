"use server";

import prisma from "@/lib/prisma";
import { xprisma } from "@/prisma-extension/extension";
import { revalidatePath } from "next/cache";

export const createCenter = async (state: any, formData: FormData) => {
  const res = await xprisma.center.create({
    data: {
      name: formData.get("name") as string,
      collegeId: formData.get("collegeId") as string,
    },
  });
  if (res.id) {
    revalidatePath("/admin/center");
    return {
      message: "Added successfully",
    };
  }
};

export const updateCenter = async (
  id: string,
  state: any,
  formData: FormData
) => {
  const res = await xprisma.center.update({
    where: {
      id: id,
    },
    data: {
      name: formData.get("name") as string,
      collegeId: formData.get("collegeId") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error updating",
    };
  }
  revalidatePath("/admin/center");
  return {
    message: "Updated successfully",
  };
};

export const deleteCenter = async (state: any, formData: FormData) => {
  const res = await xprisma.center.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error deleting",
    };
  }
  revalidatePath("/admin/center");
  return {
    message: "Deleted successfully",
  };
};

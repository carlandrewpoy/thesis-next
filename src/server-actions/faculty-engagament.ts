"use server";

import { xprisma } from "@/prisma-extension/extension";
import { revalidatePath } from "next/cache";

export const createEngagement = async (state: any, formData: FormData) => {
  const res = await xprisma.facultyEngagement.create({
    data: {
      letter: formData.get("letter") as string,
      description: formData.get("description") as string,
    },
  });
  if (res.id) {
    revalidatePath("/admin/faculty-engagement");
    return {
      message: "Added successfully",
    };
  }
};

export const updateEngagement = async (
  id: string,
  state: any,
  formData: FormData
) => {
  const res = await xprisma.facultyEngagement.update({
    where: {
      id: id,
    },
    data: {
      letter: formData.get("letter") as string,
      description: formData.get("description") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error updating",
    };
  }
  revalidatePath("/admin/faculty-engagement");
  return {
    message: "Updated successfully",
  };
};

export const deleteEngagement = async (state: any, formData: FormData) => {
  const res = await xprisma.facultyEngagement.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error deleting",
    };
  }
  revalidatePath("/admin/faculty-engagement");
  return {
    message: "Deleted successfully",
  };
};

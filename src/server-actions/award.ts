"use server";

import { xprisma } from "@/prisma-extension/extension";
import { AwardType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createAward = async (selectedResearchers: string[], state: any, formData: FormData) => {
  const res = await xprisma.award.create({
    data: {
      projectId: formData.get("projectId") as string,
      researchers: {
        connect: selectedResearchers.map((item) => ({ id: item }))
      },
      publisher: formData.get("publisher") as string,
      certOrProgram: formData.get("certOrProgram") as string,
      type: formData.get("type") as AwardType,
      yearPublished: formData.get("yearPublished") as string,
    },
  });
  if (res.id) {
    revalidatePath("/award");
    return {
      message: "Added successfully",
    };
  }
};

export const updateAward = async (
  id: string,
  selectedResearchers: string[],
  state: any,
  formData: FormData
) => {
  const res = await xprisma.award.update({
    where: {
      id: id,
    },
    data: {
      projectId: formData.get("projectId") as string,
researchers: {
        set: selectedResearchers.map((item) => ({ id: item }))
      },      publisher: formData.get("publisher") as string,
      certOrProgram: formData.get("certOrProgram") as string,
      type: formData.get("type") as AwardType,
      yearPublished: formData.get("yearPublished") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error updating",
    };
  }
  revalidatePath("/award");
  return {
    message: "Updated successfully",
  };
};

export const deleteAward = async (state: any, formData: FormData) => {
  const res = await xprisma.award.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  if (!res.id) {
    return {
      error: "Error deleting",
    };
  }
  revalidatePath("/award");
  return {
    message: "Deleted successfully",
  };
};

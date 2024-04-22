"use server";

import prisma from "@/lib/prisma";
import { UtilizationSchema } from "@/lib/zod-types/z-schema";
import { xprisma } from "@/prisma-extension/extension";
import { revalidatePath } from "next/cache";

export const createUtilization = async (state: any, formData: FormData) => {
      const values = {
            projectId: formData.get("projectId"),
            centerId: formData.get("centerId"),
            proof: formData.get("proof"),
            benificiary: formData.get("benificiary"),
            supportingDocs: formData.get("supportingDocs"),
            year: formData.get("year"),
            movMoa: !!formData.get("movMoa"),
            movPhotos: !!formData.get("movPhotos"),
            movReport: !!formData.get("movReport"),
            movUtilization: !!formData.get("movUtilization"),
      }
      const result = UtilizationSchema.safeParse(values)
      if (!result.success) {
          return {
              error: result.error.flatten().fieldErrors
          }
      }

      const res = await xprisma.utilization.create({
          data: result.data
      })

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
  const values = {
            projectId: formData.get("projectId"),
            centerId: formData.get("centerId"),
            proof: formData.get("proof"),
            benificiary: formData.get("benificiary"),
            supportingDocs: formData.get("supportingDocs"),
            year: formData.get("year"),
            movMoa: !!formData.get("movMoa"),
            movPhotos: !!formData.get("movPhotos"),
            movReport: !!formData.get("movReport"),
            movUtilization: !!formData.get("movUtilization"),
      }
      const result = UtilizationSchema.safeParse(values)
      if (!result.success) {
          return {
              error: result.error.flatten().fieldErrors
          }
      }
  const res = await xprisma.utilization.update({
    where: {
      id: id,
    },
    data: result.data,
  });
 
  revalidatePath("/utilization");
  return {
    message: "Updated successfully",
  };
};

export const deleteUtilization = async (state: any, formData: FormData) => {
  const res = await xprisma.utilization.delete({
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

"use server";
import { prisma } from "@/lib/utils";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createExtensionProgram = async (
  collegeId: string,
  formData: FormData
) => {
  const res = await prisma.extensionProgram.create({
    data: {
      collegeId: collegeId as string,
      mandatedProgram: formData.get("mandatedProgram") as string,
      extensionProgram: formData.get("extensionProgram") as string,
      fromDate: formData.get("fromDate") as string,
      toDate: formData.get("toDate") as string,
      benefeciaries: formData.get("benefeciaries") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      docsLinkType: formData.get("docsLinkType") as string,
    },
  });
  revalidatePath("/extension-program");
};

export const updateExtensionProgram = async (
  collegeId: string,
  id: string,
  formData: FormData
) => {
  //   console.log(college);
  const res = await prisma.extensionProgram.update({
    where: {
      id: id,
    },
    data: {
      collegeId: collegeId as string,
      mandatedProgram: formData.get("mandatedProgram") as string,
      extensionProgram: formData.get("extensionProgram") as string,
      fromDate: formData.get("fromDate") as string,
      toDate: formData.get("toDate") as string,
      benefeciaries: formData.get("benefeciaries") as string,
      supportingDocs: formData.get("supportingDocs") as string,
      docsLinkType: formData.get("docsLinkType") as string,
    },
  });
  revalidatePath("/extension-program");
};

export const deleteExtensionProgram = async (
  id: string,
  formData: FormData
) => {
  const deleteUser = await prisma.extensionProgram.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/extension-program");
};

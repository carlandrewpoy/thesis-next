"use server";

import prisma from "@/lib/prisma";
import { Semester } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createGradSchoolFaculty = async (
  state: any,
  formData: FormData
) => {
  const res = await prisma.gradSchoolFaculty.create({
    data: {
      collegeId: formData.get("collegeId") as string,
      facultyEngagementId: formData.get("facultyEngagement") as string,
      facultyId: formData.get("faculty") as string,
      schoolYear: formData.get("schoolYear") as string,
      semester: formData.get("semester") as Semester,
    },
  });
  if (res.id) {
    revalidatePath("/admin/graduate-school-faculty");
    return {
      message: "Added successfully",
    };
  }
};

export const updateGradSchoolFaculty = async (
  id: string,
  state: any,
  formData: FormData
) => {
  const res = await prisma.gradSchoolFaculty.update({
    where: {
      id: id,
    },
    data: {
      collegeId: formData.get("collegeId") as string,
      facultyEngagementId: formData.get("facultyEngagement") as string,
      facultyId: formData.get("faculty") as string,
      schoolYear: formData.get("schoolYear") as string,
      semester: formData.get("semester") as Semester,
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

export const deleteGradSchoolFaculty = async (
  state: any,
  formData: FormData
) => {
  const res = await prisma.gradSchoolFaculty.delete({
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

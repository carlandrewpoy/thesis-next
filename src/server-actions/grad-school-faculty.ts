"use server";

import { xprisma } from "@/prisma-extension/extension";
import { Semester } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const createGradSchoolFaculty = async (
  state: any,
  formData: FormData
) => {
  const user = await getServerSession()
  const res = await xprisma.gradSchoolFaculty.create({
    
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
    // await xprisma.center.create({
    //   data: {
    //    name: 'Graduate School Faculty',
    //     collegeId: 'cluuyi60g0001ec2thbshwbm4',
    //   },
    // })
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
  const res = await xprisma.gradSchoolFaculty.update({
    where: {
      id: id,
    },
    data: {
      collegeId: formData.get("collegeId") as string,
      facultyEngagementId: formData.get("facultyEngagement") as string,
      facultyId: formData.get("facultyId") as string,
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
  const res = await xprisma.gradSchoolFaculty.delete({
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

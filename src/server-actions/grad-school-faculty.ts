"use server";

import { GradSchoolSchema } from "@/lib/zod-types/z-schema";
import { xprisma } from "@/prisma-extension/extension";
import { Semester } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createGradSchoolFaculty = async (
  state: any,
  formData: FormData
) => {
  //  const values = {
  //       collegeId: formData.get("collegeId"),
  //       facultyEngagementId: formData.get("facultyEngagement"),
  //       facultyId: formData.get("faculty"),
  //       schoolYear: formData.get("schoolYear"),
  //       semester: formData.get("semester") as Semester,
  //     }
  //     const result = GradSchoolSchema.safeParse(values)
  //     if (!result.success) {
  //         return {
  //             error: result.error.flatten().fieldErrors
  //         }
  //     }

  //     const res = await xprisma.gradSchoolFaculty.create({
  //         data: result.data
  //     })

  //     if (res.id) {
  //         revalidatePath("/graduate-school-faculty");
  //         return {
  //             message: "Added successfully",
  //         };
  //     }
      
  const res = await xprisma.gradSchoolFaculty.create({
    
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
      error: "Error Adding",
    };
  }
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
  revalidatePath("/graduate-school-faculty");
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
  revalidatePath("/graduate-school-faculty");
  return {
    message: "Deleted successfully",
  };
};

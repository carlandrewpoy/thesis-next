"use server";

import prisma from "@/lib/prisma";
import { signIn } from "next-auth/react";
var bcrypt = require("bcryptjs");
import { redirect } from "next/navigation";
import { roles } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { xprisma } from "@/prisma-extension/extension";

export const loginUser = async (formData: FormData) => {
  const params = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  signIn("credentials", {
    ...params,
    callbackUrl: "http://localhost:3000",
  });
};

export const createUser = async (state: any, formData: FormData) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(
    formData.get("password") as string,
    salt
  );

  const user = await prisma.user.findUnique({
    where: {
      email: formData.get("email") as string,
    },
  });

  if (user) {
    return {
      error: "User already exists",
    };
  }

  const res = await xprisma.user.create({
    data: {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as roles,
      password: hashedPassword as string,
    },
  });
  if (res.id) {
    revalidatePath("/admin/user");
    return {
      message: "Added successfully",
    };
  }
};

export const updateUser = async (
  id: string,
  state: any,
  formData: FormData
) => {
  /*  const user = await prisma.user.findUnique({
    where: {
      email: formData.get("email") as string,
    },
  });

  if (user && user.email !== formData.get("email")) {
    return {
      error: "User already exists",
    };
  } */

  const user = await prisma.user.findUnique({
    where: {
      id: id as string,
    },
  });

  console.log(user);
  if (user?.superAdmin === true && formData.get("role") === "USER") {
    return {
      error: "Cannot edit super admin role",
    };
  }

  const res = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      firstname: formData.get("firstname") as string,
      middleInitial: formData.get("middleInitial") as string,
      lastname: formData.get("lastname") as string,
      role: formData.get("role") as roles,
    },
  });

  if (res.id) {
    revalidatePath("/admin/user");
    return {
      message: "Updated successfully",
    };
  }
};

export const deleteUser = async (state: any, formData: FormData) => {
  const user = await prisma.user.findUnique({
    where: {
      id: formData.get("id") as string,
    },
  });

  console.log(user);
  if (user?.superAdmin === true) {
    return {
      error: "Cannot delete super admin",
    };
  }
  const res = await prisma.user.delete({
    where: {
      id: formData.get("id") as string,
    },
  });
  revalidatePath("/admin/user");
  if (res.id) {
    return {
      message: "Deleted successfully",
    };
  }
};

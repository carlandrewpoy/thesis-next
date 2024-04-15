import { Icons } from "@/components/icons";

export const statuses = [
  {
    value: "success",
    label: "Success",
    icon: Icons.question,
  },
  {
    value: "processing",
    label: "Processing",
    icon: Icons.circle,
  },
  {
    value: "failed",
    label: "Failed",
    icon: Icons.pending,
  },
];

export const userTypes = [
  {
    name: "ADMIN",
    value: "ADMIN",
    icon: Icons.gitHub,
  },
  {
    name: "USER",
    value: "USER",
    icon: Icons.google,
  },
];

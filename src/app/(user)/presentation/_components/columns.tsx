"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { FacultyEngagement, GradSchoolFaculty, Prisma } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type UtilizationWithOther = Prisma.UtilizationGetPayload<{
  include: {
    project: true,
    center: true,
  }
}>

export const columns: ColumnDef<UtilizationWithOther>[] = [
  {
    accessorKey: "project.title",
    header: "Project Title",
  },
  {
    accessorKey: "proof",
    header: "PROOF/DESCRIPTION/DOCUMENTATION",
  },
  {
    accessorKey: "benificiary",
    header: "Benificiary",
  },
  {
    accessorKey: "supportingDocs",
    header: "Supporting Docs",
  },

  {
    accessorKey: "center.name",
    header: "Center",
  },

  {
    accessorKey: "movMoa",
    header: "Movs",
    cell: ({ row }) => {
      return <div className="flex flex-col w-52">

        {row.original.movMoa ? <h1>✔Notarized MOA</h1> : ""}
        {row.original.movReport ? <h1>✔Signed Reports</h1> : ""}
        {row.original.movUtilization ? <h1>✔Certificate of Utilization</h1> : ""}
        {row.original.movPhotos ? <h1>✔Photos of Actual Product</h1> : ""}
      </div>;
    }
  },

  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      return <div className="flex gap-x-2">
        <EditDialog row={row} />
        <DeleteDialog row={row} />
      </div>;
    }
  },
];

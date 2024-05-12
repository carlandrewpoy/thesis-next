"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { FacultyEngagement, GradSchoolFaculty, Prisma } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type UtilizationWithOther = Prisma.UtilizationGetPayload<{
  include: {
    project: {
      select: {
        title: true
      }
    },
    center: {
      select: {
        name: true
      }

    },
  }
}>

export const columns: ColumnDef<UtilizationWithOther>[] = [
  {
    accessorKey: "project.title",
    header: "Project Title",
    cell: ({ row }) => {
      return <h1 className="w-72">{row.original.project.title}</h1>
    }
  },
  {
    accessorKey: "center.name",
    header: "Center",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "proof",
    header: "Proof/Description/Documnetation",
  },
  {
    accessorKey: "benificiary",
    header: "Benificiary",
    cell: ({ row }) => {
      return <h1 className="w-52">{row.original.benificiary}</h1>
    }
  },
  {
    accessorKey: "supportingDocs",
    header: "Supporting Docs",
  },
  {
    accessorKey: "movMoa",
    header: "MOVs",
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

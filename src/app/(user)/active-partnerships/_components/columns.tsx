"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { FacultyEngagement, GradSchoolFaculty, Prisma } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type PartnershipWithOthers = Prisma.PartnershipGetPayload<{
  include: {
    project: {
      select: {
        title: true
      }
    },
    college: {
      select: {
        name: true
      }
    },
  }
}>

export const columns: ColumnDef<PartnershipWithOthers>[] = [
  {
    accessorKey: "project.title",
    header: "Extension Activity",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.project.title}
      </div>;
    }
  },
  {
    accessorKey: "college.name",
    header: "College",
    cell: ({ row }) => {
      return <div className="w-20">
        {row.original.college.name}
      </div>;
    }
  },
  {
    accessorKey: "partner",
    header: "PARTNER LGU /COMMUNITY / INDUSTRY / SMEs / PRIVATE OF PUBLIC AGENCIES /NGOs",
  },
  {
    accessorKey: "dateStarted",
    header: "Date Started",
  },
  {
    accessorKey: "dateEnded",
    header: "Date Ended",
  },
  {
    accessorKey: "implementor",
    header: "Implementors/ Delivery Units/Bureaus",
  },

  {
    accessorKey: "supportingDocs",
    header: "Supporting Docs",
    cell: ({ row }) => {
      return <div className="w-20">
        {row.original.supportingDocs}
      </div>;
    }
  },

  {
    accessorKey: "movMoa",
    header: "Movs",
    cell: ({ row }) => {
      return <div className="flex flex-col w-52">

        {row.original.movReport ? <h1>✔Abstract</h1> : ""}
        {row.original.movMoa ? <h1>✔Journal Title Page</h1> : ""}
        {row.original.movAgencyCertification ? <h1>✔Table of Contents</h1> : ""}
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

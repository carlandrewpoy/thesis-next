"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { FacultyEngagement, GradSchoolFaculty, Prisma } from "@prisma/client";
import { dateFormatterName } from "@/lib/utils";
import OpenLink from "@/components/open-link";

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
    header: "Partner",
    cell: ({ row }) => {
      return <h1 className="w-96">{row.original.partner}</h1>
    }
  },
  {
    accessorKey: "dateStarted",
    header: "Date Started",
    cell: ({ row }) => {
      return <h1 className="w-24">{dateFormatterName(row.original.dateStarted)}</h1>
    }
  },
  {
    accessorKey: "dateEnded",
    header: "Date Ended",
    cell: ({ row }) => {
      return <h1 className="w-24">{dateFormatterName(row.original.dateEnded)}</h1>
    }
  },
  {
    accessorKey: "implementor",
    header: "Implementors",
    cell: ({ row }) => {
      return <h1 className="w-52">{row.original.implementor}</h1>
    }
  },

  {
    accessorKey: "supportingDocs",
    header: "Supporting Docs",
    cell: ({ row }) => {
      return <OpenLink link={row.original.supportingDocs} />
    }
  },

  {
    accessorKey: "movMoa",
    header: "MOVs",
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

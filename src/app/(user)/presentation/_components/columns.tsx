"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { FacultyEngagement, GradSchoolFaculty, Prisma } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type PresentationWithOthers = Prisma.PresentationGetPayload<{
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

export const columns: ColumnDef<PresentationWithOthers>[] = [
  {
    accessorKey: "project.title",
    header: "Project Title",
    cell: ({ row }) => {
      return <h1 className="w-52">{row.original.project.title}</h1>
    }
  },
  {
    accessorKey: "center.name",
    header: "Center",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "startedDate",
    header: "Started Date",
  },
  {
    accessorKey: "completedDate",
    header: "Completed Date",
  },

  {
    accessorKey: "articleTitle",
    header: "Article/Title",
  },
  {
    accessorKey: "keywords",
    header: "Keywords",
  },
  {
    accessorKey: "researchers",
    header: "Researchers",
  },
  {
    accessorKey: "forumTitle",
    header: "Forum Title",
  },
  {
    accessorKey: "venue",
    header: "Venue",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "date",
    header: "Date",
  },

  {
    accessorKey: "movMoa",
    header: "Movs",
    cell: ({ row }) => {
      return <div className="flex flex-col w-52">

        {row.original.movAbstract ? <h1>✔ABSTRACT</h1> : ""}
        {row.original.movCertOfAppearance ? <h1>✔CERT OF APPEARANCE/PARTICIPATION</h1> : ""}
        {row.original.movConferenceProgram ? <h1>✔Conference Proceeding/Program</h1> : ""}
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

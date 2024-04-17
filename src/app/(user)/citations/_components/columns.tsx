"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { FacultyEngagement, GradSchoolFaculty, Prisma } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type CitationWithOther = Prisma.CitationGetPayload<{
  include: {
    project: {
      select: {
        title: true
      }
    },
  }
}>

export const columns: ColumnDef<CitationWithOther>[] = [
  {
    accessorKey: "Title of Research Output",
    header: "Project Title",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.project.title}
      </div>;
    }
  },
  {
    accessorKey: "keywords",
    header: "Keywords",
    cell: ({ row }) => {
      return <div className="w-20">
        {row.original.keywords}
      </div>;
    }
  },
  {
    accessorKey: "researchers",
    header: "Researcher(s)",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.researchers}
      </div>;
    }
  },
  {
    accessorKey: "yearPublished",
    header: "Year Published",
  },
  {
    accessorKey: "index",
    header: "Index",
  },
  {
    accessorKey: "researchers",
    header: "Author(s) Who Cited the Research Output",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.researchers}
      </div>;
    }
  },

  {
    accessorKey: "project.title",
    header: "Title of Article Where the Research Output Was Cited",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.project.title}
      </div>;
    }
  },
  {
    accessorKey: "journalTitle",
    header: "Journal Title",
    cell: ({ row }) => {
      return <div className="w-40">
        {row.original.journalTitle}
      </div>;
    }
  },
  {
    accessorKey: "vol",
    header: "Vol. / Issue / Page No.",
    cell: ({ row }) => {
      return <div className="w-40">
        {row.original.vol}
      </div>;
    }
  },
  {
    accessorKey: "yearPublishedTwo",
    header: "Year Published",
    cell: ({ row }) => {
      return <div className="w-20">
        {row.original.yearPublishedTwo}
      </div>;
    }
  },
  {
    accessorKey: "publisherName",
    header: "Publisher Name",
    cell: ({ row }) => {
      return <div className="w-64">
        {row.original.journalTitle}
      </div>;
    }
  },
  {
    accessorKey: "scholarLink",
    header: "Scholarly Link",
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

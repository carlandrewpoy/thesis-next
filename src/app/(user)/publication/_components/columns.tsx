"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { FacultyEngagement, GradSchoolFaculty, Prisma } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type PublicationWithOther = Prisma.PublicationGetPayload<{
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

export const columns: ColumnDef<PublicationWithOther>[] = [
  {
    accessorKey: "project.title",
    header: "Project Title",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.project.title}
      </div>;
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <div className="w-20">
        {row.original.status}
      </div>;
    }
  },
  {
    accessorKey: "startedDate",
    header: "Started",
  },
  {
    accessorKey: "completedDate",
    header: "Completed",
  },
  {
    accessorKey: "article",
    header: "Article",
  },
  {
    accessorKey: "keywords",
    header: "Keywords",
  },
  {
    accessorKey: "authors",
    header: "Authors",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.authors}
      </div>;
    }
  },
  {
    accessorKey: "publicationDate",
    header: "Publication Date",
    cell: ({ row }) => {
      return <div className="w-20">
        {row.original.publicationDate}
      </div>;
    }
  },
  {
    accessorKey: "journalTitle",
    header: "Journal Title",
  },
  {
    accessorKey: "issueNo",
    header: "VOL. NO. & ISSUE NO.",
    cell: ({ row }) => {
      return <div className="w-20">
        {row.original.issueNo}
      </div>;
    }
  },
  {
    accessorKey: "issnOrIsbn",
    header: "ISSN / ISBN",
    cell: ({ row }) => {
      return <div className="w-20">
        {row.original.issnOrIsbn}
      </div>;
    }
  },

  {
    accessorKey: "index",
    header: "Index",
  },
  {
    accessorKey: "supportingDocs",
    header: "Supporting Docs",
  },

  {
    accessorKey: "movMoa",
    header: "Movs",
    cell: ({ row }) => {
      return <div className="flex flex-col w-52">

        {row.original.movAbstract ? <h1>✔Abstract</h1> : ""}
        {row.original.movJournalTitlePage ? <h1>✔Journal Title Page</h1> : ""}
        {row.original.movTableOfContents ? <h1>✔Table of Contents</h1> : ""}
        {row.original.movFullPaper ? <h1>✔Full Paper</h1> : ""}
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

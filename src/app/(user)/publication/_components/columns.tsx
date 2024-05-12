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
    authors: true
  }
}> & {
  newAuthors: string;
}

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
    cell: ({ row }) => {
      return <div className="w-24">
        {row.original.startedDate}
      </div>;
    }
  },
  {
    accessorKey: "completedDate",
    header: "Completed",
    cell: ({ row }) => {
      return <div className="w-24">
        {row.original.completedDate}
      </div>;
    }
  },
  {
    accessorKey: "article",
    header: "Article",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.article}
      </div>;
    }
  },
  {
    accessorKey: "keywords",
    header: "Keywords",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.keywords}
      </div>;
    }
  },
  {
    accessorKey: "newAuthors",
    header: "Authors",
    cell: ({ row }) => {
      const newAuthorsArray = row.original.newAuthors.split(':');
      return <div className="w-64">
        {newAuthorsArray.map((author, index) => {
          return <h1 key={index}>{author}</h1>
        })}
      </div>
    }
  },
  {
    accessorKey: "publicationDate",
    header: "Publication Date",
    cell: ({ row }) => {
      return <div className="w-32">
        {row.original.publicationDate}
      </div>;
    }
  },
  {
    accessorKey: "journalTitle",
    header: "Journal Title",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.issueNo}
      </div>;
    }
  },
  {
    accessorKey: "issueNo",
    header: "Vol. No. & Issue No.",
    cell: ({ row }) => {
      return <div className="w-36">
        {row.original.issueNo}
      </div>;
    }
  },
  {
    accessorKey: "issnOrIsbn",
    header: "Issn/Isbn",
    cell: ({ row }) => {
      return <div className="w-36">
        {row.original.issnOrIsbn}
      </div>;
    }
  },

  {
    accessorKey: "index",
    header: "Index",
    cell: ({ row }) => {
      return <div className="w-36">
        {row.original.index}
      </div>;
    }
  },
  {
    accessorKey: "supportingDocs",
    header: "Supporting Docs",
  },
  {
    accessorKey: "scopus",
    header: "Scopus",
  },

  {
    accessorKey: "movMoa",
    header: "MOVs",
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

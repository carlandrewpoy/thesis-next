"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { Prisma } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type AwardWithOthers = Prisma.AwardGetPayload<{
  include: {
    project: {
      select: {
        title: true
      }
    },
  }
}>

export const columns: ColumnDef<AwardWithOthers>[] = [
  {
    accessorKey: "project.title",
    header: "Research Title",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.project.title}
      </div>;
    }
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "researchers",
    header: "Researchers",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.researchers}
      </div>;
    }
  },
  {
    accessorKey: "yearPublished",
    header: "Year Published/Awarded",
  },
  {
    accessorKey: "publisher",
    header: "Publisher/Conference Organizer/Conferring Body",
  },
  {
    accessorKey: "supportingDocs",
    header: "Certificate and Program",
    cell: ({ row }) => {
      return <div className="w-20">
        {row.original.certOrProgram}
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

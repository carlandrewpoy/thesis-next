"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { Prisma } from "@prisma/client";
import OpenLink from "@/components/open-link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type AwardWithOthers = Prisma.AwardGetPayload<{
  include: {
    project: {
      select: {
        title: true
      }
    },
    researchers: true
  }
}> & {
  newResearchers: string
}

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
    accessorKey: "newResearchers",
    header: "Researchers",
    cell: ({ row }) => {
      const newResearchersArray = row.original.newResearchers.split(':');
      console.log(newResearchersArray)
      return <div className="w-64">
        {newResearchersArray.map((item, index) => {
          return <h1 key={index}>{item.toLocaleUpperCase()}</h1>
        })}
      </div>
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
  // {
  //   accessorKey: "certOrProgram",
  //   header: "Certificate and Program",
  //   // cell: ({ row }) => {
  //   //   return <div className="w-20">
  //   //     {row.original.certOrProgram}
  //   //   </div>;
  //   // }
  // },
  {
    accessorKey: "Certificate and Program",
    header: "Certificate/Invitation/Program/Evaluation",
    cell: ({ row }) => {
      return <OpenLink link={row.original.certOrProgram} />
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

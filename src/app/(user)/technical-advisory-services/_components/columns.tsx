"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { FacultyEngagement, GradSchoolFaculty, Prisma } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type TechnicalServiceWithOther = Prisma.TechnicalServiceGetPayload<{
  include: {
    project: {
      select: {
        title: true
      }
    },
    invitedFaculties: true,
    organizers: true
  }
}> & {
  newOrganizers: string;
  newInvitedFaculty: string;
}

export const columns: ColumnDef<TechnicalServiceWithOther>[] = [
  {
    accessorKey: "project.title",
    header: "Training Title",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.project.title}
      </div>;
    }
  },
  {
    accessorKey: "venue",
    header: "Venue/Place",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.venue}
      </div>;
    }
  },
  {
    accessorKey: "dateStart",
    header: "Date Start",
    cell: ({ row }) => {
      return <div className="w-32">
        {row.original.dateStart}
      </div>;
    }
  },
  {
    accessorKey: "dateEnd",
    header: "Date End",
    cell: ({ row }) => {
      return <div className="w-32">
        {row.original.dateEnd}
      </div>;
    }
  },
  {
    accessorKey: "newOrganizers",
    header: "Organizers",
    cell: ({ row }) => {
      const newResearchersArray = row.original.newOrganizers.split(':');
      console.log(newResearchersArray)
      return <div className="w-64">
        {newResearchersArray.map((item, index) => {
          return <h1 key={index}>{item.toLocaleUpperCase()}</h1>
        })}
      </div>
    }
  },
  {
    accessorKey: "newInvitedFaculty",
    header: "Invited Faculty",
    cell: ({ row }) => {
      const newResearchersArray = row.original.newInvitedFaculty.split(':');
      console.log(newResearchersArray)
      return <div className="w-64">
        {newResearchersArray.map((item, index) => {
          return <h1 key={index}>{item.toLocaleUpperCase()}</h1>
        })}
      </div>
    }
  },

  {
    accessorKey: "proofLink",
    header: "Certificate/Invitation/Program/Evaluation",
    // cell: ({ row }) => {
    //   return <div className="w-52">
    //     {row.original.proofLink}
    //   </div>;
    // }
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

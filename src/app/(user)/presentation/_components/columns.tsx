"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { FacultyEngagement, GradSchoolFaculty, Presentation, Prisma } from "@prisma/client";
import { dateFormatterName } from "@/lib/utils";

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
    Researchers: true
  }
}> & {
  newResearchers: string;
}

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
        {newResearchersArray.map((researcher, index) => {
          return <h1 key={index}>{researcher}</h1>
        })}
      </div>
    }
  },
  {
    accessorKey: "startedDate",
    header: "Started Date",
    cell: ({ row }) => {
      return <h1 className="w-24">{dateFormatterName(row.original.startedDate)}</h1>
    }

  },
  {
    accessorKey: "completedDate",
    header: "Completed Date",
    cell: ({ row }) => {
      return <h1 className="w-24">{dateFormatterName(row.original.completedDate)}</h1>
    }
  },

  {
    accessorKey: "articleTitle",
    header: "Article/Title",
    cell: ({ row }) => {
      return (
        <div className="w-52">
          <h1 >{row.original.articleTitle}</h1>

        </div>
      )

    }
  },
  {
    accessorKey: "keywords",
    header: "Keywords",
  },

  // {
  //   accessorKey: "researchers",
  //   header: "Researchers",
  //   cell: ({ row }) => {
  //     return <div className="w-52">
  //       {row.original.Researchers.map((researcher, index) => {
  //         return <h1 key={index}>{researcher.lastname} {researcher.firstname} {researcher?.middleInitial && researcher?.middleInitial + '.'} {researcher.suffix}</h1>
  //       })}
  //     </div>
  //   }
  // },
  {
    accessorKey: "forumTitle",
    header: "Forum Title",
  },
  {
    accessorKey: "venue",
    header: "Venue",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <h1 className="w-24">{dateFormatterName(row.original.date)}</h1>
    }
  },

  {
    accessorKey: "movMoa",
    header: "MOVS",
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

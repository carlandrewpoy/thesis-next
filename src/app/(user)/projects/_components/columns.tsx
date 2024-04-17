"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Center, College, Project, User } from "@prisma/client";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.title}
      </div>;
    }
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "dateStart",
    header: "Start",
    cell: ({ row }) => {
      return <div className="w-24">
        {row.original.dateStart}
      </div>;
    }
  },
  {
    accessorKey: "dateCompleted",
    header: "Completed",
    cell: ({ row }) => {
      return <div className="w-24">
        {row.original.dateCompleted}
      </div>;
    }
  },
  {
    accessorKey: "dateExtension",
    header: "Extension",
    cell: ({ row }) => {
      return <div className="w-24">
        {row.original.dateExtension}
      </div>;
    }
  },
  {
    accessorKey: "fundingAgency",
    header: "Funding Agency",
    cell: ({ row }) => {
      return <div className="w-48">
        {row.original.fundingAgency}
      </div>;
    }
  },
  {
    accessorKey: "coopAgency",
    header: "Cooparating Agency",
    cell: ({ row }) => {
      return <div className="w-48">
        {row.original.coopAgency}
      </div>;
    }
  },
  {
    accessorKey: "projectLeader",
    header: "Project Leader",
    cell: ({ row }) => {
      return <div className="w-48">
        {row.original.projectLeader}
      </div>;
    }
  },
  {
    accessorKey: "researchWorkers",
    header: "Research Workers",
    cell: ({ row }) => {
      return <div className="w-48">
        {row.original.researchWorkers}
      </div>;
    }
  },
  {
    accessorKey: "approvedProjectCost",
    header: "Approved Project Cost",
    cell: ({ row }) => {
      return <div className="w-28">
        {row.original.approvedProjectCost.toString()}
      </div>;
    }
  },
  {
    accessorKey: "beneficiaries",
    header: "Beneficiaries",
    cell: ({ row }) => {
      return <div className="w-48">
        {row.original.beneficiaries}
      </div>;
    }
  },
  {
    accessorKey: "mandatedProgram",
    header: "Mandated Program",
    cell: ({ row }) => {
      return <div className="w-36">
        {row.original.mandatedProgram}
      </div>;
    }
  },
  {
    accessorKey: "supportingDocs",
    header: "Supporting Docs",
    // cell: ({ row }) => {
    //   return <div className="w-96">
    //     {row.original.supportingDocs}
    //   </div>;
    // }
  },
  {
    accessorKey: "projectReport",
    header: "MOVS",
    cell: ({ row }) => {
      return <div className="flex flex-col w-52">

        {row.original.movSignedBudgetAllocation ? <h1>✔Budget Allocation</h1> : ""}
        {row.original.movSingedReports ? <h1>✔Reports</h1> : ""}
        {row.original.movNotarizedMoa ? <h1>✔MOA</h1> : ""}
        {row.original.movBoardResolution ? <h1>✔Board Resolution</h1> : ""}
      </div>;
    }
  },


  /*   {
      accessorKey: "password",
      header: "Password",
      cell: ({ row }) => <DataTableRowActions row={row} />
  
    }, */
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
  // {
  //   accessorKey: "role",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     const date = row.original.createdAt;
  //     return <Switch
  //     // checked={field.value}
  //     // onCheckedChange={field.onChange}
  //     />

  //   },
  // },

];

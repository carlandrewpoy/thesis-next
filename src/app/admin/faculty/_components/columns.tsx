"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Center, College, Faculty, User } from "@prisma/client";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Faculty>[] = [
  {
    accessorKey: "firstname",
    header: "Firstname",
    cell: ({ row }) => {
      return <div>{row.original.firstname.toLocaleUpperCase()}</div>;
    }
  },
  {
    accessorKey: "middleInitial",
    header: "Middle Initial/Name",
    cell: ({ row }) => {
      return <div>{row.original.middleInitial?.toLocaleUpperCase()}</div>;
    }
  },
  {
    accessorKey: "lastname",
    header: "Lastname",
    cell: ({ row }) => {
      return <div>{row.original.lastname?.toLocaleUpperCase()}</div>;
    }

  },
  {
    accessorKey: "suffix",
    header: "Suffix",
  },
  {
    accessorKey: "position",
    header: "Position",
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

"use client";
import { ColumnDef } from "@tanstack/react-table";
import { AuditLog, Prisma, User } from "@prisma/client";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { LogDetails } from "./dialog/log-details";
import { dateFormatterName, formattedDistance } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type AuditLogWithOthers = Prisma.AuditLogGetPayload<{
  include: {
    user: true;
  };
}>

export const columns: ColumnDef<AuditLogWithOthers>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return `${row.original.user.lastname}, ${row.original.user.firstname} ${row.original.user.middleInitial === null ? '' : `${row.original.user?.middleInitial}.`}`
    }
  },
  {
    accessorKey: "userEmail",
    header: "Email",
  },
  {
    accessorKey: "model",
    header: "Table",
  },
  {
    accessorKey: "operation",
    header: "Operation",
  },



  {
    accessorKey: "result",
    header: "Details",
    cell: ({ row }) => {
      return <div className="">
        <LogDetails data={row.original.result} />
      </div>
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return <div className="">
        {dateFormatterName(row.original.createdAt.toString())}
      </div>
    }
  },
  {
    accessorKey: "Time",
    header: "Details",
    cell: ({ row }) => {
      return <div className="">
        {formattedDistance(row.original.createdAt.toString())}
      </div>
    }
  },

];

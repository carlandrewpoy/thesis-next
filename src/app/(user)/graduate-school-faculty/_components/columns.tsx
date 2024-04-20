"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { FacultyEngagement, GradSchoolFaculty, Prisma } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type GradSchoolFacultyWithOwner = Prisma.GradSchoolFacultyGetPayload<{
  include: {
    facultyEngagement: true
    faculty: true
    college: true
  }
}>

export const columns: ColumnDef<GradSchoolFacultyWithOwner>[] = [
  {
    accessorKey: "college.name",
    header: "College",
  },
  {
    accessorKey: "faculty.firstname",
    header: "Firstname",
  },
  {
    accessorKey: "faculty.middleInitial",
    header: "Middle Initial",
  },
  {
    accessorKey: "faculty.lastname",
    header: "Lastname",
  },
  {
    accessorKey: "faculty.position",
    header: "Position",
  },


  {
    accessorKey: "facultyEngagement",
    header: "Engagement",
    cell: ({ row }) => {
      return <div>({row.original.facultyEngagement.letter}) {row.original.facultyEngagement.description}</div>
    }
  },
  {
    accessorKey: "schoolYear",
    header: "School Year",
  },
  {
    accessorKey: "semester",
    header: "Semester",
    cell: ({ row }) => {
      return <div>{row.original.semester === 'FIRST' ? '1st' : row.original.semester === 'SECOND' ? '2nd' : null}</div>
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

"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { FacultyEngagement, GradSchoolFaculty, Prisma } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type TrainingWithOther = Prisma.TrainingGetPayload<{
  include: {
    project: {
      select: {
        title: true
      }
    },
  }
}>

export const columns: ColumnDef<TrainingWithOther>[] = [
  {
    accessorKey: "project.title",
    header: "Project Title",
    cell: ({ row }) => {
      return <div className="w-72">
        {row.original.project.title}
      </div>;
    }
  },
  {
    accessorKey: "venue",
    header: "Venue",
    cell: ({ row }) => {
      return <div className="w-72">
        {row.original.venue}
      </div>;
    }
  },
  {
    accessorKey: "dateStarted",
    header: "From",
    cell: ({ row }) => {
      return <div className="w-24">
        {row.original.dateStarted}
      </div>;
    }
  },
  {
    accessorKey: "dateEnded",
    header: "To",
    cell: ({ row }) => {
      return <div className="w-24">
        {row.original.dateEnded}
      </div>;
    }

  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "traineesCount",
    header: "NO. OF TRAINEES",
  },
  {
    accessorKey: "traineesWeighted",
    header: "TRAINEES WEIGHTED BY THE LENGTH OF TRAINING",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.venue}
      </div>;
    }
  },
  {
    accessorKey: "traineesSurveyedCount",
    header: "TRAINEES SURVEYED",
    cell: ({ row }) => {
      return <div className="w-20">
        {row.original.traineesSurveyedCount}
      </div>;
    }
  },
  {
    accessorKey: "ratePoor",
    header: "Rate 1",
  },
  {
    accessorKey: "rateFair",
    header: "Rate 2",
  },
  {
    accessorKey: "rateSatisfactory",
    header: "Rate 3",
  },

  {
    accessorKey: "rateVerySatisfactory",
    header: "Rate 4",
  },
  {
    accessorKey: "rateExcellent",
    header: "Rate 5",
  },
  {
    accessorKey: "rateTimelinessPoor",
    header: "Timeless Rate 1",
  },
  {
    accessorKey: "rateTimelinessFair",
    header: "Timeless Rate 2",
  },
  {
    accessorKey: "rateTimelinessSatisfactory",
    header: "Timeless Rate 3",
  },
  {
    accessorKey: "rateTimelinessVerySatisfactory",
    header: "Timeless Rate 4",
  },
  {
    accessorKey: "rateTimelinessExcellent",
    header: "Timeless Rate 5",
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

        {row.original.movReportAndActivityProgram ? <h1>✔Report and Activity Program</h1> : ""}
        {row.original.movSummaryOfEvaluation ? <h1>✔Summary of Evaluation</h1> : ""}
        {row.original.movSurverForm ? <h1>✔Sample of Accomplished Suvey Form</h1> : ""}
        {row.original.movAttendance ? <h1>✔Attendance</h1> : ""}
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

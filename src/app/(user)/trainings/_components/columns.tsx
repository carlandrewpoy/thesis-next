"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDialog } from "./dialog/edit-dialog/edit-dialog";
import { DeleteDialog } from "./dialog/delete-dialog/delete-dialog";
import { FacultyEngagement, GradSchoolFaculty, Prisma } from "@prisma/client";
import { CircleHelp, Octagon, OctagonX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import OpenLink from "@/components/open-link";

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
        {row.original.project?.title ? row.original.project?.title : <CircleHelp className="w-5 h-5" />}
      </div>;
    }
  },
  {
    accessorKey: "trainingTitle",
    header: "Training Title",
    cell: ({ row }) => {
      return <div className="w-72">
        {row.original.trainingTitle}
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
    accessorKey: "beneficiary",
    header: "Beneficiary",
    cell: ({ row }) => {
      return <div className="w-72">
        {row.original.beneficiary}
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
    header: "No. of Trainees",
  },
  {
    accessorKey: "traineesWeighted",
    header: "Trainees Weighted by the lenght of training",
    cell: ({ row }) => {
      return <div className="w-52">
        {row.original.traineesWeighted}
      </div>;
    }
  },
  {
    accessorKey: "traineesSurveyedCount",
    header: "Trainees Surveyed",
    cell: ({ row }) => {
      return <div className="w-20">
        {row.original.traineesSurveyedCount}
      </div>;
    }
  },
  {
    accessorKey: "ratePoor",
    header: () => {
      return <div className="w-20 flex items-center gap-x-1">
        <span>Rate 1</span>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <InfoCircledIcon />
            </TooltipTrigger>
            <TooltipContent side="right">Number of clients who rate the training as Poor</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>;
    },
  },
  {
    accessorKey: "rateFair",
    header: () => {
      return <div className="w-20 flex items-center gap-x-1">
        <span>Rate 2</span>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <InfoCircledIcon />
            </TooltipTrigger>
            <TooltipContent side="right">Number of clients who rate the training as Fair</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>;
    },
  },
  {
    accessorKey: "rateSatisfactory",
    header: () => {
      return <div className="w-20 flex items-center gap-x-1">
        <span>Rate 3</span>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <InfoCircledIcon />
            </TooltipTrigger>
            <TooltipContent side="right">Number of clients who rate the training as Satisfactory</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>;
    },
  },

  {
    accessorKey: "rateVerySatisfactory",
    header: () => {
      return <div className="w-20 flex items-center gap-x-1">
        <span>Rate 4</span>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <InfoCircledIcon />
            </TooltipTrigger>
            <TooltipContent side="right">Number of clients who rate the training as Very Satisfactory</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>;
    },
  },
  {
    accessorKey: "rateExcellent",
    header: () => {
      return <div className="w-20 flex items-center gap-x-1">
        <span>Rate 5</span>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <InfoCircledIcon />
            </TooltipTrigger>
            <TooltipContent side="right">Number of clients who rate the training as Excellent</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>;
    },
  },
  {
    accessorKey: "rateTimelinessPoor",
    header: () => {
      return <div className="w-20 flex items-center gap-x-1">
        <span>Rate 1</span>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <InfoCircledIcon />
            </TooltipTrigger>
            <TooltipContent side="right">Number of clients trained who rate TIMELINESS of training as Poor</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>;
    },
  },
  {
    accessorKey: "rateTimelinessFair",
    header: () => {
      return <div className="w-20 flex items-center gap-x-1">
        <span>Rate 2</span>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <InfoCircledIcon />
            </TooltipTrigger>
            <TooltipContent side="right">Number of clients trained who rate TIMELINESS of training as Fair</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>;
    },
  },
  {
    accessorKey: "rateTimelinessSatisfactory",
    header: () => {
      return <div className="w-20 flex items-center gap-x-1">
        <span>Rate 3</span>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <InfoCircledIcon />
            </TooltipTrigger>
            <TooltipContent side="right">Number of clients trained who rate TIMELINESS of training as Satisfactory</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>;
    },
  },
  {
    accessorKey: "rateTimelinessVerySatisfactory",
    header: () => {
      return <div className="w-20 flex items-center gap-x-1">
        <span>Rate 4</span>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <InfoCircledIcon />
            </TooltipTrigger>
            <TooltipContent side="right">Number of clients trained who rate TIMELINESS of training as Very Satisfactory</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>;
    },
  },
  {
    accessorKey: "rateTimelinessExcellent",
    header: () => {
      return <div className="w-20 flex items-center gap-x-1">
        <span>Rate 5</span>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <InfoCircledIcon />
            </TooltipTrigger>
            <TooltipContent side="right">Number of clients trained who rate TIMELINESS of training as Excellent</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>;
    },
  },
  {
    accessorKey: "supportingDocs",
    header: "Supporting Docs",
    cell: ({ row }) => {
      return <OpenLink link={row.original.supportingDocs} />
    }
  },
  {
    accessorKey: "movMoa",
    header: "MOVs",
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

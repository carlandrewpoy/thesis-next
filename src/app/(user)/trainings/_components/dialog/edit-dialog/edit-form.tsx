import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { Training, Utilization } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { Checkbox } from '@/components/ui/checkbox'
import { ProjectSelect } from '@/components/select/project-select'
import { DurationSelect } from '@/components/select/duration-select'
import { updateTraining } from '@/server-actions/trainings'
import { ResearchProjectCombobox } from '@/components/combobox/mutation/research-project'
import { TrainingWithOther } from '../../columns'

const EditForm = ({ row, close }: {
    row: Row<TrainingWithOther>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const updateWithId = updateTraining.bind(null, row.original.id)
    const [state, formAction] = useFormState(updateWithId, null)
    const [mov1, setmov1] = useState(row.original.movReportAndActivityProgram)
    const [mov2, setmov2] = useState(row.original.movSummaryOfEvaluation)
    const [mov3, setmov3] = useState(row.original.movSurverForm)
    const [mov4, setmov4] = useState(row.original.movAttendance)

    const handleChangeMov1 = (checked: boolean) => {
        setmov1(checked)
    };
    const handleChangeMov2 = (checked: boolean) => {
        setmov2(checked)
    };
    const handleChangeMov3 = (checked: boolean) => {
        setmov3(checked)
    };

    const handleChangeMov4 = (checked: boolean) => {
        setmov4(checked)
    };
    if (state?.message) {
        close(false)
        toast({
            duration: 1500,
            description: state?.message,

        })
    }

    return (
        <form className="grid gap-4" action={formAction} >
            {row.original.projectId &&
                <>
                    <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                        <Label className="col-span-9 text-xs font-extralight">Project</Label>
                    </div>
                    <div className="grid grid-cols-9 items-center gap-4 ">
                        <div className='col-span-9'>
                            <ResearchProjectCombobox columnName='projectId' defaultValue={row.original.project?.title ?? ''} />
                        </div>
                    </div>
                </>}
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Training Title</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.trainingTitle} name='trainingTitle' />
                    {state?.error?.trainingTitle && <p className="text-red-500 text-xs">{state?.error?.trainingTitle[0]}</p>}

                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Venue</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.venue} name='venue' />
                    {state?.error?.venue && <p className="text-red-500 text-xs">{state?.error?.venue[0]}</p>}

                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Beneficiary</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.beneficiary} name='beneficiary' />
                    {state?.error?.beneficiary && <p className="text-red-500 text-xs">{state?.error?.beneficiary[0]}</p>}

                </div>
            </div>

            {/* <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Title</Label>
                <Label className="col-span-3 text-xs font-extralight">Venue</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <div className="col-span-3">
                    <Input name='title' />
                </div>
                <div className="col-span-3">
                    <Input name='venue' />
                </div>
            </div> */}
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Start</Label>
                <Label className="col-span-2 text-xs font-extralight">End</Label>
                <Label className="col-span-2 text-xs font-extralight">Duration</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">
                <div className="col-span-2">
                    <Input defaultValue={row.original.dateStarted ?? ''} type='date' name="dateStarted" />
                    {state?.error?.dateStarted && <p className="text-red-500 text-xs">{state?.error?.dateStarted[0]}</p>}

                </div>
                <div className="col-span-2">
                    <Input defaultValue={row.original.dateEnded ?? ''} type='date' name="dateEnded" />
                    {state?.error?.dateEnded && <p className="text-red-500 text-xs">{state?.error?.dateEnded[0]}</p>}

                </div>
                <div className="col-span-2">
                    <DurationSelect defaultValue={row.original.duration ?? ''} />
                    {state?.error?.duration && <p className="text-red-500 text-xs">{state?.error?.duration[0]}</p>}
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Count</Label>
                <Label className="col-span-2 text-xs font-extralight">Weighted</Label>
                <Label className="col-span-2 text-xs font-extralight">Survey Count</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <div className="col-span-2">

                    <Input defaultValue={row.original.traineesCount} type='number' name="traineesCount" />
                    {state?.error?.traineesCount && <p className="text-red-500 text-xs">{state?.error?.traineesCount[0]}</p>}

                </div>
                <div className="col-span-2">
                    <Input defaultValue={row.original.traineesWeighted} type='number' name="traineesWeighted" className="col-span-2" />
                    {state?.error?.traineesWeighted && <p className="text-red-500 text-xs">{state?.error?.traineesWeighted[0]}</p>}

                </div>
                <div className="col-span-2">
                    <Input defaultValue={row.original.traineesSurveyedCount} type='number' name="traineesSurveyedCount" className="col-span-2" />
                    {state?.error?.traineesSurveyedCount && <p className="text-red-500 text-xs">{state?.error?.traineesSurveyedCount[0]}</p>}

                </div>
            </div>
            <div className="grid grid-cols-10 items-center gap-4 -mb-3">
                <Label className="col-span-10 text-center text-xs font-extralight">Number of clients who rate the training as </Label>
            </div>
            <div className="grid grid-cols-10 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Rate 1</Label>
                <Label className="col-span-2 text-xs font-extralight">Rate 2</Label>
                <Label className="col-span-2 text-xs font-extralight">Rate 3</Label>
                <Label className="col-span-2 text-xs font-extralight">Rate 4</Label>
                <Label className="col-span-2 text-xs font-extralight">Rate 5</Label>
            </div>
            <div className="grid grid-cols-10 items-center gap-4 ">

                <Input defaultValue={row.original.ratePoor} type='number' name="ratePoor" className="col-span-2" />
                <Input defaultValue={row.original.rateFair} type='number' name="rateFair" className="col-span-2" />
                <Input defaultValue={row.original.rateSatisfactory} type='number' name="rateSatisfactory" className="col-span-2" />
                <Input defaultValue={row.original.rateVerySatisfactory} type='number' name="rateVerySatisfactory" className="col-span-2" />
                <Input defaultValue={row.original.rateExcellent} type='number' name="rateExcellent" className="col-span-2" />
            </div>
            <div className="grid grid-cols-10 items-center gap-4 -mb-3">
                <Label className="col-span-10 text-center text-xs font-extralight">Number of clients trained who rate TIMELINESS of training as</Label>
            </div>
            <div className="grid grid-cols-10 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Rate 1</Label>
                <Label className="col-span-2 text-xs font-extralight">Rate 2</Label>
                <Label className="col-span-2 text-xs font-extralight">Rate 3</Label>
                <Label className="col-span-2 text-xs font-extralight">Rate 4</Label>
                <Label className="col-span-2 text-xs font-extralight">Rate 5</Label>
            </div>
            <div className="grid grid-cols-10 items-center gap-4 ">

                <Input defaultValue={row.original.rateTimelinessPoor} type='number' name="rateTimelinessPoor" className="col-span-2" />
                <Input defaultValue={row.original.rateTimelinessFair} type='number' name="rateTimelinessFair" className="col-span-2" />
                <Input defaultValue={row.original.rateTimelinessSatisfactory} type='number' name="rateTimelinessSatisfactory" className="col-span-2" />
                <Input defaultValue={row.original.rateTimelinessVerySatisfactory} type='number' name="rateTimelinessVerySatisfactory" className="col-span-2" />
                <Input defaultValue={row.original.rateTimelinessExcellent} type='number' name="rateTimelinessExcellent" className="col-span-2" />
            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Supporting Document</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input defaultValue={row.original.supportingDocs} name="supportingDocs" className="col-span-12" />

            </div>

            <div className="grid grid-cols-8 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Report and Activity Program</Label>
                <Label className="col-span-2 text-xs font-extralight">Summary of Evaluation</Label>
                <Label className="col-span-2 text-xs font-extralight">Sample of Accomplished Suvey Form</Label>
                <Label className="col-span-2 text-xs font-extralight">Attendance</Label>
            </div>
            <div className="grid grid-cols-8 items-center gap-4 ">
                <Checkbox checked={mov1} onCheckedChange={handleChangeMov1} name="movReportAndActivityProgram" className="col-span-2" />
                <Checkbox checked={mov2} onCheckedChange={handleChangeMov2} name="movSummaryOfEvaluation" className="col-span-2" />
                <Checkbox checked={mov3} onCheckedChange={handleChangeMov3} name="movSurverForm" className="col-span-2" />
                <Checkbox checked={mov4} onCheckedChange={handleChangeMov4} name="movAttendance" className="col-span-2" />
            </div>

            <div className='flex justify-end'>
                <SubmitButton />
            </div>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            disabled={pending}
        >
            {pending ? 'Saving...' : 'Save'}
        </Button>
    )
}

export default EditForm
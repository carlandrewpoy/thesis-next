'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { dateFormatterNumber, getSchoolYears } from '@/lib/utils'
import { createUtilization } from '@/server-actions/utilization'
import { DurationSelect } from '@/components/select/duration-select'
import { ProjectSelect } from '@/components/select/project-select'
import { Checkbox } from '@/components/ui/checkbox'
import { createTraining } from '@/server-actions/trainings'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ReloadIcon } from '@radix-ui/react-icons'
import { AutoFill } from '@/server-state-management/autofill'
import { link } from 'fs'
import { ProjectCombobox } from '@/components/combobox/mutation/project'
import { Switch } from '@/components/ui/switch'
import { ResearchProjectCombobox } from '@/components/combobox/mutation/research-project'

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {
    const [projectToggle, setprojectToggle] = useState(false)
    const handleProjectToggle = () => { setprojectToggle(!projectToggle) }
    const [state, formAction] = useFormState(createTraining, null)
    if (state?.message) {
        close(false)
        toast({
            duration: 1500,
            description: state?.message,
        })
    }
    console.log(state)


    const { mutateAsync: autofillFN, isPending } = AutoFill();
    const [autoFillData, setautoFillData] = useState<TTraingingAutofill>()
    const [link, setlink] = useState('')
    const params = {
        "link": link,
        "table": "TRAINING"
    }
    !isPending && console.log(autoFillData)

    const handleClick = async () => {
        if (link === '') return toast({ description: 'Please enter a link', duration: 1500, variant: 'destructive' })
        const res = await autofillFN(params as any)
        if (!res.data.mov) return toast({ description: 'Invalid link', duration: 1500, variant: 'destructive' })
        setautoFillData(res.data as any)
        if (res.data.mov) {
            toast({
                duration: 1500,
                description: 'Scan successfuly',
            })
        }
    }

    const [mov1, setmov1] = useState(false)
    const [mov2, setmov2] = useState(false)
    const [mov3, setmov3] = useState(false)
    const [mov4, setmov4] = useState(false)



    const [durationValue, setdurationValue] = useState('')
    const [countTrainees, setcountTrainees] = useState<string>()
    console.log(durationValue, countTrainees)
    console.log({ autoFillData })


    useEffect(() => {
        setmov1(autoFillData?.mov.report === 1 ? true : false)
        setmov2(autoFillData?.mov.summary === 1 ? true : false)
        setmov3(autoFillData?.mov.sample === 1 ? true : false)
        setmov4(autoFillData?.mov.attendance === 1 ? true : false)
        setcountTrainees(autoFillData?.results.totalTrainees.toString())
        setdurationValue(autoFillData?.results.duration.toString() ?? '0')
    }, [autoFillData])


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


    return (
        <form className="grid gap-4" action={formAction} >

            <div className="flex items-center space-x-2">
                <Switch checked={projectToggle} onCheckedChange={handleProjectToggle} />
                <Label >Project</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Supporting Document</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input onChange={(e) => setlink(e.target.value)} name="supportingDocs" className="col-span-10" />
                <div className='col-span-2'>
                    {/* <Button type='button' variant={'secondary'}>Read</Button> */}
                    <Button type='button' onClick={handleClick} disabled={isPending}>
                        {isPending ? <div className='flex items-center justify-center w-10'>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        </div> : 'Scan'}
                    </Button>
                </div>
                <div className='col-span-12'>
                    {state?.error?.supportingDocs && <p className="text-red-500 text-xs">{state?.error?.supportingDocs[0]}</p>}

                </div>
            </div>
            <div className={`${!projectToggle && 'hidden'}`}>
                {/* <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                    <Label className="col-span-9 text-xs font-extralight">Project</Label>
                </div> */}
                <div className="grid grid-cols-9 items-center gap-4 ">
                    <div className='col-span-9'>
                        <ResearchProjectCombobox columnName='projectId' />
                        {state?.error?.projectId && <p className="text-red-500 text-xs">{state?.error?.projectId[0]}</p>}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Training Title</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={autoFillData?.results.title} name='trainingTitle' />
                    {state?.error?.trainingTitle && <p className="text-red-500 text-xs">{state?.error?.trainingTitle[0]}</p>}

                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Venue</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={autoFillData?.results.venue} name='venue' />
                    {state?.error?.venue && <p className="text-red-500 text-xs">{state?.error?.venue[0]}</p>}

                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Beneficiary</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='beneficiary' />
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
                    <Input defaultValue={dateFormatterNumber(autoFillData?.results.dateStarted ?? '') ?? ''} type='date' name="dateStarted" />
                    {state?.error?.dateStarted && <p className="text-red-500 text-xs">{state?.error?.dateStarted[0]}</p>}

                </div>
                <div className="col-span-2">
                    <Input defaultValue={dateFormatterNumber(autoFillData?.results.dateEnded ?? '') ?? ''} type='date' name="dateEnded" />
                    {state?.error?.dateEnded && <p className="text-red-500 text-xs">{state?.error?.dateEnded[0]}</p>}

                </div>
                <div className="col-span-2">
                    <DurationSelect set={setdurationValue} defaultValue={autoFillData?.results.duration} />
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

                    <Input value={countTrainees} onChange={(e) => setcountTrainees(e.target.value)} type='number' name="traineesCount" />
                    {state?.error?.traineesCount && <p className="text-red-500 text-xs">{state?.error?.traineesCount[0]}</p>}

                </div>
                <div className="col-span-2">
                    <Input value={parseFloat(durationValue) * parseFloat(countTrainees ?? '0')} type='number' name="traineesWeighted" className="col-span-2" />
                    {state?.error?.traineesWeighted && <p className="text-red-500 text-xs">{state?.error?.traineesWeighted[0]}</p>}

                </div>
                <div className="col-span-2">
                    <Input defaultValue={autoFillData?.results.tookSurvey} type='number' name="traineesSurveyedCount" className="col-span-2" />
                    {state?.error?.traineesSurveyedCount && <p className="text-red-500 text-xs">{state?.error?.traineesSurveyedCount[0]}</p>}

                </div>
            </div>
            <div className="grid grid-cols-10 items-center gap-4 -mb-3">
                <Label className="col-span-10 text-center text-xs font-extralight">Number of clients who rate the training as </Label>
            </div>
            <div className="grid grid-cols-10 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Poor</Label>
                <Label className="col-span-2 text-xs font-extralight">Fair</Label>
                <Label className="col-span-2 text-xs font-extralight">Satisfactory</Label>
                <Label className="col-span-2 text-xs font-extralight">Very satisfactory</Label>
                <Label className="col-span-2 text-xs font-extralight">Excellent</Label>
            </div>
            <div className="grid grid-cols-10 items-center gap-4 ">
                <div className='col-span-2'>
                    <Input defaultValue={autoFillData?.results.overall.Poor} type='number' name="ratePoor" className="col-span-2" />
                    {state?.error?.ratePoor && <p className="text-red-500 text-xs">{state?.error?.ratePoor[0]}</p>}
                </div>
                <div className='col-span-2'>
                    <Input defaultValue={autoFillData?.results.overall.fair} type='number' name="rateFair" className="col-span-2" />
                    {state?.error?.rateFair && <p className="text-red-500 text-xs">{state?.error?.rateFair[0]}</p>}
                </div>
                <div className='col-span-2'>
                    <Input defaultValue={autoFillData?.results.overall.satisfactory} type='number' name="rateSatisfactory" className="col-span-2" />
                    {state?.error?.rateSatisfactory && <p className="text-red-500 text-xs">{state?.error?.rateSatisfactory[0]}</p>}
                </div>
                <div className='col-span-2'>
                    <Input defaultValue={autoFillData?.results.overall.very_satisfactory} type='number' name="rateVerySatisfactory" className="col-span-2" />
                    {state?.error?.rateVerySatisfactory && <p className="text-red-500 text-xs">{state?.error?.rateVerySatisfactory[0]}</p>}
                </div>
                <div className='col-span-2'>
                    <Input defaultValue={autoFillData?.results.overall.excellent} type='number' name="rateExcellent" className="col-span-2" />
                    {state?.error?.rateExcellent && <p className="text-red-500 text-xs">{state?.error?.rateExcellent[0]}</p>}
                </div>
                {/* <div className='col-span-10'>
                    {state?.error?.ratePoor && <p className="text-red-500 text-xs">{state?.error?.ratePoor[0]}</p>}

                </div> */}
            </div>
            <div className="grid grid-cols-10 items-center gap-4 -mb-3">
                <Label className="col-span-10 text-center text-xs font-extralight">Number of clients trained who rate TIMELINESS of training as</Label>
            </div>
            <div className="grid grid-cols-10 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Poor</Label>
                <Label className="col-span-2 text-xs font-extralight">Fair</Label>
                <Label className="col-span-2 text-xs font-extralight">Satisfactory</Label>
                <Label className="col-span-2 text-xs font-extralight">Very satisfactory</Label>
                <Label className="col-span-2 text-xs font-extralight">Excellent</Label>
            </div>
            <div className="grid grid-cols-10 items-center gap-4 ">
                <div className='col-span-2'>
                    <Input defaultValue={autoFillData?.results.timeliness.Poor} type='number' name="rateTimelinessPoor" className="col-span-2" />
                    {state?.error?.rateTimelinessPoor && <p className="text-red-500 text-xs">{state?.error?.rateTimelinessPoor[0]}</p>}
                </div>
                <div className='col-span-2'>
                    <Input defaultValue={autoFillData?.results.timeliness.fair} type='number' name="rateTimelinessFair" className="col-span-2" />
                    {state?.error?.rateTimelinessFair && <p className="text-red-500 text-xs">{state?.error?.rateTimelinessFair[0]}</p>}
                </div>
                <div className='col-span-2'>
                    <Input defaultValue={autoFillData?.results.timeliness.satisfactory} type='number' name="rateTimelinessSatisfactory" className="col-span-2" />
                    {state?.error?.rateTimelinessSatisfactory && <p className="text-red-500 text-xs">{state?.error?.rateTimelinessSatisfactory[0]}</p>}
                </div>
                <div className='col-span-2'>
                    <Input defaultValue={autoFillData?.results.timeliness.very_satisfactory} type='number' name="rateTimelinessVerySatisfactory" className="col-span-2" />
                    {state?.error?.rateTimelinessVerySatisfactory && <p className="text-red-500 text-xs">{state?.error?.rateTimelinessVerySatisfactory[0]}</p>}
                </div>
                <div className='col-span-2'>
                    <Input defaultValue={autoFillData?.results.timeliness.excellent} type='number' name="rateTimelinessExcellent" className="col-span-2" />
                    {state?.error?.rateTimelinessExcellent && <p className="text-red-500 text-xs">{state?.error?.rateTimelinessExcellent[0]}</p>}
                </div>
                {/* <div className='col-span-10'>
                    {state?.error?.rateTimelinessPoor && <p className="text-red-500 text-xs">{state?.error?.rateTimelinessPoor[0]}</p>}

                </div> */}
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
                <div className='col-span-8'>
                    {state?.error?.movReportAndActivityProgram && <p className="text-red-500 text-xs">{state?.error?.movReportAndActivityProgram[0]}</p>}

                </div>
            </div>

            <div className='flex justify-end'>
                <SubmitButton />
            </div>
        </form>
    )
}

// checked = { autoFillData?.mov.report === 1 ? true : false }

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

export default AddForm
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { createCenter } from '@/server-actions/center'
import { CollegeSelect } from '@/components/select/college-select'
import { FacultySelect } from '@/components/select/faculty-select'
import { EngagementSelect } from '@/components/select/engagement-select'
import { createGradSchoolFaculty } from '@/server-actions/grad-school-faculty'
import { getSchoolYears } from '@/lib/utils'
import { SchoolYearSelect } from '@/components/select/schoolyear-select'
import { SemesterSelect } from '@/components/select/semester-select'
import { ProjectSelect } from '@/components/select/project-select'
import { CenterSelect } from '@/components/select/center-select'
import { Checkbox } from '@/components/ui/checkbox'
import { createUtilization } from '@/server-actions/utilization'
import { z } from 'zod'
import { CenterCombobox } from '@/components/combobox/mutation/center'
import { ProjectCombobox } from '@/components/combobox/mutation/project'
import { ResearchProjectCombobox } from '@/components/combobox/mutation/research-project'
import { UtilizationSchema } from '@/lib/zod-types/z-schema'

// const handleOnSubmit = (formData: FormData) => {
//     console.log(typeof formData.get("proof"))
//     const values = {
//         projectId: formData.get("projectId"),
//         centerId: formData.get("centerId"),
//         proof: formData.get("proof"),
//         benificiary: formData.get("benificiary"),
//         supportingDocs: formData.get("supportingDocs"),
//         year: formData.get("year"),
//         movMoa: !!formData.get("movMoa"),
//         movPhotos: !!formData.get("movPhotos"),
//         movReport: !!formData.get("movReport"),
//         movUtilization: !!formData.get("movUtilization"),
//     }
//     const result = UtilizationSchema.safeParse(values)
//     if (!result.success) {
//         console.log(result.error.flatten().fieldErrors)
//     }
// }


const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {
    const [state, formAction] = useFormState(createUtilization, null)
    if (state?.message) {
        close(false)
        toast({
            duration: 1500,
            description: state?.message,
        })
    }
    console.log(state)


    return (
        <form className="grid gap-4 p-4" action={formAction}>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Project</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ResearchProjectCombobox columnName='projectId' />
                    {state?.error?.projectId && <p className="text-red-500 text-xs">{state?.error?.projectId[0]}</p>}

                </div>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Center</Label>
                <Label className="col-span-6 text-xs font-extralight">Year</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 ">
                <div className='col-span-6'>
                    <CenterCombobox />
                    {state?.error?.centerId && <p className="text-red-500 text-xs">{state?.error?.centerId[0]}</p>}
                </div>
                <div className="col-span-6" >
                    <Input name='year' type='number' />
                    {state?.error?.year && <p className="text-red-500 text-xs">{state?.error?.year[0]}</p>}

                </div>

            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Proof/Description/Documentation</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='proof' />
                    {state?.error?.proof && <p className="text-red-500 text-xs">{state?.error?.proof[0]}</p>}

                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Beneficiary</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='benificiary' />
                    {state?.error?.benificiary && <p className="text-red-500 text-xs">{state?.error?.benificiary[0]}</p>}

                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Supporting Docs</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='supportingDocs' />
                    {state?.error?.supportingDocs && <p className="text-red-500 text-xs">{state?.error?.supportingDocs[0]}</p>}

                </div>
            </div>
            <div className="grid grid-cols-8 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Notarized Moa</Label>
                <Label className="col-span-2 text-xs font-extralight">Report</Label>
                <Label className="col-span-2 text-xs font-extralight">Certificate of Utilization</Label>
                <Label className="col-span-2 text-xs font-extralight">Photos of Actual Product</Label>
            </div>
            <div className="grid grid-cols-8 items-center gap-4 ">
                <Checkbox name="movMoa" className="col-span-2" />
                <Checkbox name="movReport" className="col-span-2" />
                <Checkbox name="movUtilization" className="col-span-2" />
                <Checkbox name="movPhotos" className="col-span-2" />
                <div className='col-span-8'>
                    {state?.error?.movMoa && <p className="text-red-500 text-xs">{state?.error?.movMoa[0]}</p>}
                </div>

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

export default AddForm
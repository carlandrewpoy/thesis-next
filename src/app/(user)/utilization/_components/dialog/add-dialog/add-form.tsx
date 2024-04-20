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

// const UtilizationSchema = z.object({
//     projectId: z.string(),
//     centerId: z.string(),
//     year: z.string(),
//     proof: z.string({
//         required_error: "Proof is required",
//         invalid_type_error: "Proof must be a string",
//     }),
//     benificiary: z.string({
//         required_error: "Benificiary is required",
//         invalid_type_error: "Benificiary must be a string",
//     }),
//     supportingDocs: z.string().startsWith("https://", { message: "Must provide secure URL" }),
//     movMoa: z.boolean(),
//     movReport: z.boolean(),
//     movUtilization: z.boolean(),
//     movPhotos: z.boolean(),
// })

// type TUtilizationSchema = z.infer<typeof UtilizationSchema>;


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

    console.log(getSchoolYears())

    return (
        <form className="grid gap-4 p-4" action={formAction}>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Project</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ProjectCombobox />
                </div>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Center</Label>
                <Label className="col-span-6 text-xs font-extralight">Year</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 ">
                <div className='col-span-6'>
                    <CenterCombobox />
                </div>
                <Input name='year' className="col-span-6" />
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Proof/Description/Documentation</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='proof' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Beneficiary</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='benificiary' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Supporting Docs</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='supportingDocs' />
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
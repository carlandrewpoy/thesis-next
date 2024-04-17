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

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {

    const [state, formAction] = useFormState(createGradSchoolFaculty, null)
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
                <Label className="col-span-9 text-xs font-extralight">Faculty</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <FacultySelect />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">College</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <CollegeSelect />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Engagement</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <EngagementSelect />
                </div>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">School Year</Label>
                <Label className="col-span-6 text-xs font-extralight">Semester</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 ">
                <div className='col-span-6'>
                    <SchoolYearSelect />
                </div>
                <div className='col-span-6'>
                    <SemesterSelect />
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
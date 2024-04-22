import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { Center, College, GradSchoolFaculty, User } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateUser } from '@/server-actions/auth/auth'
import { updateCollege } from '@/server-actions/college'
import { CollegeSelect } from '@/components/select/college-select'
import { updateCenter } from '@/server-actions/center'
import { FacultySelect } from '@/components/select/faculty-select'
import { EngagementSelect } from '@/components/select/engagement-select'
import { updateGradSchoolFaculty } from '@/server-actions/grad-school-faculty'
import { GradSchoolFacultyWithOwner } from '../../columns'
import { SchoolYearSelect } from '@/components/select/schoolyear-select'
import { SemesterSelect } from '@/components/select/semester-select'
import { FacultyCombobox } from '@/components/combobox/mutation/faculty'
import { CollegeCombobox } from '@/components/combobox/college'

const EditForm = ({ row, close }: {
    row: Row<GradSchoolFacultyWithOwner>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const updateWithId = updateGradSchoolFaculty.bind(null, row.original.id)
    const [state, formAction] = useFormState(updateWithId, null)
    if (state?.message) {
        close(false)
        toast({
            duration: 1500,
            description: state?.message,

        })
    }
    if (state?.error) {
        close(false)
        toast({
            variant: 'destructive',
            duration: 1500,
            description: state?.error,

        })
    }
    return (
        <form className="grid gap-4 p-4" action={formAction}>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Faculty</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <FacultyCombobox columnName='facultyId' defaultValue={row.original.faculty} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">College</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <CollegeCombobox defaultValue={row.original.college.name} />

                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Engagement</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <EngagementSelect defaultValue={row.original.facultyEngagementId} />
                </div>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">School Year</Label>
                <Label className="col-span-6 text-xs font-extralight">Semester</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 ">
                <div className='col-span-6'>
                    <SchoolYearSelect defaultValue={row.original.schoolYear} />
                </div>
                <div className='col-span-6'>
                    <SemesterSelect defaultValue={row.original.semester} />
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

export default EditForm
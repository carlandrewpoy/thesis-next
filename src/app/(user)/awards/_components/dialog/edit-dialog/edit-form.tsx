import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { Award, Partnership, Publication, Training, Utilization } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateGradSchoolFaculty } from '@/server-actions/grad-school-faculty'
import { Checkbox } from '@/components/ui/checkbox'
import { CenterSelect } from '@/components/select/center-select'
import { ProjectSelect } from '@/components/select/project-select'
import { updateUtilization } from '@/server-actions/utilization'
import { DurationSelect } from '@/components/select/duration-select'
import { dateFormatterNumber } from '@/lib/utils'
import { PublicationStatusSelect } from '@/components/select/publication-status-select'
import { updatePublication } from '@/server-actions/publication'
import { ExtensionProjectSelect } from '@/components/select/extension-project-select'
import { CollegeSelect } from '@/components/select/college-select'
import { updatePartnership } from '@/server-actions/partnerships'
import { AwardTypeSelect } from '@/components/select/award-type-select'
import { updateAward } from '@/server-actions/award'
import { ResearchProjectSelect } from '@/components/select/research-project-select'
import { AwardWithOthers } from '../../columns'

const EditForm = ({ row, close }: {
    row: Row<AwardWithOthers>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const updateWithId = updateAward.bind(null, row.original.id)
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
        <form className="grid gap-4" action={formAction} >
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Research Title</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ResearchProjectSelect defaultValue={row.original.projectId} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Researchers</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.researchers} name='researchers' />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Year Published</Label>
                <Label className="col-span-3 text-xs font-extralight">Type</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">
                <div className="col-span-3">
                    <Input defaultValue={row.original.yearPublished} name="yearPublished" />
                </div>
                <div className="col-span-3">
                    <AwardTypeSelect defaultValue={row.original.type} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Publisher/Conference Organizer/Conferring Body</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.publisher} name='publisher' />
                </div>
            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Certificate and Program</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input name="certOrProgram" defaultValue={row.original.certOrProgram} className="col-span-12" />

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
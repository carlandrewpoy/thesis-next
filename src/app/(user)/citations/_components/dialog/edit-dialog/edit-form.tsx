import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { Citation, Training, Utilization } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { Checkbox } from '@/components/ui/checkbox'
import { ProjectSelect } from '@/components/select/project-select'
import { DurationSelect } from '@/components/select/duration-select'
import { updateTraining } from '@/server-actions/trainings'
import { updateCitation } from '@/server-actions/citations'
import { FacultyCombobox } from '@/components/combobox/mutation/faculty'
import { MultiSelectFacultyCombobox } from '@/components/combobox/mutation/multi-select-faculty'
import { CitationWithOther } from '../../columns'

const EditForm = ({ row, close }: {
    row: Row<CitationWithOther>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const [selected, setSelected] = useState<string[]>(row.original.researchers.map((item) => item.id))
    const updateWithId = updateCitation.bind(null, row.original.id, selected)
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
                <Label className="col-span-9 text-xs font-extralight">Project</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ProjectSelect defaultValue={row.original.projectId} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Researchers</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <MultiSelectFacultyCombobox selected={selected} setSelected={setSelected} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Keywords</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.keywords} name='keywords' />
                </div>
            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Year Published</Label>
                <Label className="col-span-3 text-xs font-extralight">Index</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <div className="col-span-3">
                    <Input defaultValue={row.original.yearPublished} type='number' name='yearPublished' />
                </div>
                <div className="col-span-3">
                    <Input defaultValue={row.original.index} name='index' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Journal Title</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.journalTitle} name='journalTitle' />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Year Published</Label>
                <Label className="col-span-3 text-xs font-extralight">Vol. / Issue / Page No.</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <div className="col-span-3">
                    <Input defaultValue={row.original.yearPublishedTwo} type='number' name='yearPublishedTwo' />
                </div>
                <div className="col-span-3">
                    <Input defaultValue={row.original.vol} name='vol' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Name of Publisher</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <FacultyCombobox columnName='publisherNameId' defaultValue={row.original.publisherName} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Scholar Link</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.scholarLink} name='scholarLink' />
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
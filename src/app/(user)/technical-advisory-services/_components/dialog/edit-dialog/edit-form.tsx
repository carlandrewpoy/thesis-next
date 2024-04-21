import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { ProjectSelect } from '@/components/select/project-select'
import { TechnicalServiceWithOther } from '../../columns'
import { updateTechnicalServices } from '@/server-actions/technical-advisory-services'
import { MultiSelectFacultyCombobox } from '@/components/combobox/mutation/multi-select-faculty'

const EditForm = ({ row, close }: {
    row: Row<TechnicalServiceWithOther>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const [selectedOrganizer, setSelectedOrganizer] = useState<string[]>(row.original.organizers.map((item) => item.id))
    const [selectedInvFaculty, setSelectedInvFaculty] = useState<string[]>(row.original.invitedFaculties.map((item) => item.id))
    const updateWithId = updateTechnicalServices.bind(null, row.original.id, selectedOrganizer, selectedInvFaculty)
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
                <Label className="col-span-9 text-xs font-extralight">Venue/Place</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.venue} name='venue' />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">From</Label>
                <Label className="col-span-3 text-xs font-extralight">To</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <div className="col-span-3">
                    <Input defaultValue={row.original.dateStart ?? ''} type='date' name='dateStart' />
                </div>
                <div className="col-span-3">
                    <Input defaultValue={row.original.dateStart ?? ''} type='date' name='dateEnd' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Organizer</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <MultiSelectFacultyCombobox selected={selectedOrganizer} setSelected={setSelectedOrganizer} />

                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Name of the faculty who invited</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <MultiSelectFacultyCombobox selected={selectedInvFaculty} setSelected={setSelectedInvFaculty} />

                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Certificate/Invitation/Program/Evaluation</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.proofLink} name='proofLink' />
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
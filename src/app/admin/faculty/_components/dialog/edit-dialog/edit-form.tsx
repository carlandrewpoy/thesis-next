import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { Faculty } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { CollegeSelect } from '@/components/select/college-select'
import { updateCenter } from '@/server-actions/center'
import { updateFaculty } from '@/server-actions/faculty'

const EditForm = ({ row, close }: {
    row: Row<Faculty>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const updateWithId = updateFaculty.bind(null, row.original.id)
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
                <Label className="col-span-3 text-xs font-extralight">Firstname</Label>
                <Label className="col-span-3 text-xs font-extralight">Middle Initial</Label>
                <Label className="col-span-3 text-xs font-extralight">Lastname</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">

                <Input defaultValue={row.original.firstname} required name="firstname" className="col-span-3" />
                <Input maxLength={1} defaultValue={row.original.middleInitial ?? ''} name="middleInitial" className="col-span-3" />
                <Input defaultValue={row.original.lastname} required name="lastname" className="col-span-3" />

            </div>

            <div className="grid grid-cols-12 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Suffix</Label>
                <Label className="col-span-6 text-xs font-extralight">Position</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 ">

                <Input defaultValue={row.original.suffix ?? ''} name="suffix" className="col-span-6" />
                <Input defaultValue={row.original.position} required name="position" className="col-span-6" />

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
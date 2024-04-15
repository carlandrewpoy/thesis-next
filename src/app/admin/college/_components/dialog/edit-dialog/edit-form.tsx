import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { College, User } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateUser } from '@/server-actions/auth/auth'
import { updateCollege } from '@/server-actions/college'

const EditForm = ({ row, close }: {
    row: Row<College>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const updateCollegeWithId = updateCollege.bind(null, row.original.id)
    const [state, formAction] = useFormState(updateCollegeWithId, null)
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

                <Label className="col-span-9 text-xs font-extralight">Name</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">


                <Input defaultValue={row.original.name} required name="name" className="col-span-9" />

            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">

                <Label className="col-span-9 text-xs font-extralight">Description</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">


                <Input defaultValue={row.original.description ?? ''} name="description" className="col-span-9" />

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
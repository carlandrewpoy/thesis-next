import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { Center, College, Prisma, User } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateUser } from '@/server-actions/auth/auth'
import { updateCollege } from '@/server-actions/college'
import { CollegeSelect } from '@/components/select/college-select'
import { updateCenter } from '@/server-actions/center'
import { CollegeCombobox } from '@/components/combobox/mutation/college'

export type CenterWithOthers = Prisma.CenterGetPayload<{
    include: {
        college: {
            select: {
                name: true
            }
        },
    }
}>

const EditForm = ({ row, close }: {
    row: Row<CenterWithOthers>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const updateWithId = updateCenter.bind(null, row.original.id)
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

                <Label className="col-span-9 text-xs font-extralight">Name</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">


                <Input required name="name" className="col-span-9" defaultValue={row.original.name} />

            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">

                <Label className="col-span-9 text-xs font-extralight">College</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">


                <div className='col-span-9'>
                    {/*  <CollegeSelect /> */}
                    <CollegeCombobox defaultValue={row.original.college.name} />
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
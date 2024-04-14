import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { User } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateUser } from '@/server-actions/auth/auth'
import RolesSelect from '../../select/roles-select'

const EditForm = ({ row, close }: {
    row: Row<User>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const updateUserWithId = updateUser.bind(null, row.original.id)
    const [state, formAction] = useFormState(updateUserWithId, null)
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
                <Label className="col-span-3 text-xs font-extralight">Middlename/intial</Label>
                <Label className="col-span-3 text-xs font-extralight">Lastname</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">

                <Input defaultValue={row.original.firstname} required name="firstname" className="col-span-3" />
                <Input defaultValue={row.original.middleInitial ?? ''} name="middleInitial" className="col-span-3" />
                <Input defaultValue={row.original.lastname} required name="lastname" className="col-span-3" />

            </div>

            <div className="grid grid-cols-12 items-center gap-4 -mb-3">
                {/*                 <Label className="col-span-6 text-xs font-extralight">Email</Label>
 */}
                <Label className="col-span-6 text-xs font-extralight">Role</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 ">

                {/*  <div className="col-span-6">
                    <Input defaultValue={row.original.email ?? ''} required name="email" className="col-span-3" />
                    {state?.error && <p className="text-red-500 text-xs">{state?.error}</p>}
                </div> */}
                <div className="col-span-12">
                    <RolesSelect defaultValue={row.original.role ?? ''} />
                </div>

            </div>
            {/* <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Password</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <div className="col-span-6">
                    <Input required name="password" className="col-span-3" />
                </div>

            </div> */}


            {/* <div className='flex justify-end'>
                <DialogClose className={buttonVariants({ variant: 'default' })} type='submit'>
                    Save
                </DialogClose>
            </div> */}
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
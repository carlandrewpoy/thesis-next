import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { User } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { deleteUser, updateUser } from '@/server-actions/auth/auth'
import RolesSelect from '../../select/roles-select'
import { DialogClose } from '@/components/ui/dialog'

const DeleteForm = ({ row, close }: {
    row: Row<User>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const [state, formAction] = useFormState(deleteUser, null)
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
        <form className="" action={formAction}>
            <Input defaultValue={row.original.id} name='id' className="hidden" />
            <div className='flex justify-end gap-x-2'>
                <DialogClose><Button type='button' variant={'outline'}>Cancel</Button></DialogClose>
                <SubmitButton />
            </div>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            variant={'destructive'}
            disabled={pending}
        >
            {pending ? 'Deleting...' : 'Delete'}
        </Button>
    )
}

export default DeleteForm
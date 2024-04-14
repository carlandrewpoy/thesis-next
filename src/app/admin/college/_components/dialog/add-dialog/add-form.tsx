import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RolesSelect from '../../select/roles-select'
import { useFormState, useFormStatus } from 'react-dom'
import { createUser } from '@/server-actions/auth/auth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { createCollege } from '@/server-actions/college'

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {

    const [state, formAction] = useFormState(createCollege, null)
    if (state?.message) {
        close(false)
        toast({
            duration: 1500,
            description: state?.message,

        })
    }


    return (
        <form className="grid gap-4 p-4" action={formAction}>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">

                <Label className="col-span-9 text-xs font-extralight">Name</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">


                <Input required name="name" className="col-span-9" />

            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">

                <Label className="col-span-9 text-xs font-extralight">Description</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">


                <Input required name="description" className="col-span-9" />

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
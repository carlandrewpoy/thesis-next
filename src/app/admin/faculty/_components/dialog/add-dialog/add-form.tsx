import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { createFaculty } from '@/server-actions/faculty'

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {

    const [state, formAction] = useFormState(createFaculty, null)
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
                <Label className="col-span-3 text-xs font-extralight">Firstname</Label>
                <Label className="col-span-3 text-xs font-extralight">Middle Initial</Label>
                <Label className="col-span-3 text-xs font-extralight">Lastname</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">

                <Input required name="firstname" className="col-span-3" />
                <Input maxLength={1} name="middleInitial" className="col-span-3" />
                <Input required name="lastname" className="col-span-3" />

            </div>

            <div className="grid grid-cols-12 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Suffix</Label>
                <Label className="col-span-6 text-xs font-extralight">Position</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 ">

                <Input name="suffix" className="col-span-6" />
                <Input required name="position" className="col-span-6" />

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
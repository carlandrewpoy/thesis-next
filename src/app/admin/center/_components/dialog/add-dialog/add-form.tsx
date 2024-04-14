import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { createCenter } from '@/server-actions/center'
import { CollegeSelect } from '@/components/select/college-select'
import { ReloadIcon } from '@radix-ui/react-icons'

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {

    const [state, formAction] = useFormState(createCenter, null)
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

                <Label className="col-span-9 text-xs font-extralight">College</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">


                <div className='col-span-9'>
                    <CollegeSelect />
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
        // <Button
        //     disabled={pending}
        // >
        //     {pending ? 'Saving...' : 'Save'}
        // </Button>
        <Button disabled={pending}>
            {pending ? <div className='flex items-center'>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Saving
            </div> : 'Save'}
        </Button>

    )
}

export default AddForm
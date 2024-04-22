import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RolesSelect from '../../select/roles-select'
import { useFormState, useFormStatus } from 'react-dom'
import { createUser } from '@/server-actions/auth/auth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {

    const [state, formAction] = useFormState(createUser, null)
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
                <Label className="col-span-3 text-xs font-extralight">Middlename/intial</Label>
                <Label className="col-span-3 text-xs font-extralight">Lastname</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">

                <Input required name="firstname" className="col-span-3" />
                <Input name="middleInitial" className="col-span-3"
                    maxLength={1}
                />
                <Input required name="lastname" className="col-span-3" />

            </div>

            <div className="grid grid-cols-12 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Suffix</Label>
                <Label className="col-span-6 text-xs font-extralight">Role</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 ">

                <div className="col-span-6">
                    <Input required name="suffix" className="col-span-3" />
                </div>
                <div className="col-span-6">
                    <RolesSelect />
                </div>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 -mb-3">
                <Label className="col-span-12 text-xs font-extralight">Email</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-4 ">

                <div className="col-span-12">
                    <Input required name="email" className="col-span-3" />
                    {state?.email?.error && <p className="text-red-500 text-xs">{state?.email?.error}</p>}
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Password</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">

                <div className="col-span-6">
                    <Input type='password' required name="password" className="col-span-3" />
                </div>

            </div>


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

export default AddForm
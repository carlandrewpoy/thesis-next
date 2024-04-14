'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { dateFormatterNumber, getSchoolYears } from '@/lib/utils'
import { ProjectSelect } from '@/components/select/project-select'
import { Checkbox } from '@/components/ui/checkbox'
import { ReloadIcon } from '@radix-ui/react-icons'
import { AutoFill } from '@/api/autofill'
import { PublicationStatusSelect } from '@/components/select/publication-status-select'
import { CenterSelect } from '@/components/select/center-select'
import { createPublication } from '@/server-actions/publication'
import { ExtensionProjectSelect } from '@/components/select/extension-project-select'
import { createPartnership } from '@/server-actions/partnerships'
import { CollegeSelect } from '@/components/select/college-select'

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {

    const [state, formAction] = useFormState(createPartnership, null)
    if (state?.message) {
        close(false)
        toast({
            duration: 1500,
            description: state?.message,
        })
    }


    const { mutateAsync: createPost, isPending } = AutoFill();
    console.log(isPending)
    const [autoFillData, setautoFillData] = useState<ApiResponse>()
    const [link, setlink] = useState('')
    const params = {
        "link": link,
        "table": "TRAINING"
    }
    !isPending && console.log(autoFillData)

    const handleClick = async () => {
        const res = await createPost(params as any)
        setautoFillData(res.data as any)
    }

    return (
        <form className="grid gap-4" action={formAction} >
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Extension</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ExtensionProjectSelect />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">College</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <CollegeSelect />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">PARTNER LGU /COMMUNITY / INDUSTRY / SMEs / PRIVATE OF PUBLIC AGENCIES /NGOs	</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='partner' />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Start</Label>
                <Label className="col-span-3 text-xs font-extralight">End</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">
                <div className="col-span-3">
                    <Input defaultValue={dateFormatterNumber(autoFillData?.results.dateStarted ?? '') ?? ''} type='date' name="dateStarted" />
                </div>
                <div className="col-span-3">
                    <Input defaultValue={dateFormatterNumber(autoFillData?.results.dateEnded ?? '') ?? ''} type='date' name="dateEnded" />
                </div>

            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Implementors/ Delivery Units/Bureaus	</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='implementor' />
                </div>
            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Supporting Document</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input onChange={(e) => setlink(e.target.value)} name="supportingDocs" className="col-span-10" />
                <div className='col-span-2'>
                    {/* <Button type='button' variant={'secondary'}>Read</Button> */}
                    <Button type='button' onClick={handleClick} disabled={isPending}>
                        {isPending ? <div className='flex items-center justify-center w-10'>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        </div> : 'Read'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Report</Label>
                <Label className="col-span-2 text-xs font-extralight"> MOA/MOU or other similar documents</Label>
                <Label className="col-span-2 text-xs font-extralight">Certification from the partner agency</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">
                <Checkbox name="movReport" className="col-span-2" />
                <Checkbox name="movMoa" className="col-span-2" />
                <Checkbox name="movAgencyCertification" className="col-span-2" />
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
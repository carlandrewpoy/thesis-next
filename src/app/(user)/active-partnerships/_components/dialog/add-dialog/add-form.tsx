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
import { AutoFill } from '@/server-state-management/autofill'
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


    const { mutateAsync: autofillFN, isPending } = AutoFill();
    const [autoFillData, setautoFillData] = useState<TPartnerAutofill>()
    const [link, setlink] = useState('')
    const params = {
        "link": link,
        "table": "PARTNER"
    }
    !isPending && console.log(autoFillData)

    const handleClick = async () => {
        if (link === '') return toast({ description: 'Please enter a link', duration: 1500, variant: 'destructive' })
        const res = await autofillFN(params as any)
        if (!res.data.mov) return toast({ description: 'Invalid link', duration: 1500, variant: 'destructive' })
        setautoFillData(res.data as any)
        if (res.data.mov) {
            toast({
                duration: 1500,
                description: 'Scan successfuly',
            })
        }
    }

    const [mov1, setmov1] = useState(false)
    const [mov2, setmov2] = useState(false)
    const [mov3, setmov3] = useState(false)

    useEffect(() => {
        setmov1(autoFillData?.mov.report === 1 ? true : false)
        setmov2(autoFillData?.mov.moa === 1 ? true : false)
        setmov3(autoFillData?.mov.certif === 1 ? true : false)
    }, [autoFillData])


    const handleChangeMov1 = (checked: boolean) => {
        setmov1(checked)
    };
    const handleChangeMov2 = (checked: boolean) => {
        setmov2(checked)
    };
    const handleChangeMov3 = (checked: boolean) => {
        setmov3(checked)
    };

    return (
        <form className="grid gap-4" action={formAction} >
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
                    <Input defaultValue={autoFillData?.results.partner} name='partner' />
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
                    <Input defaultValue={autoFillData?.results.implementors} name='implementor' />
                </div>
            </div>



            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Report</Label>
                <Label className="col-span-2 text-xs font-extralight"> MOA/MOU or other similar documents</Label>
                <Label className="col-span-2 text-xs font-extralight">Certification from the partner agency</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 ">
                <Checkbox checked={mov1} onCheckedChange={handleChangeMov1} name="movReport" className="col-span-2" />
                <Checkbox checked={mov2} onCheckedChange={handleChangeMov2} name="movMoa" className="col-span-2" />
                <Checkbox checked={mov3} onCheckedChange={handleChangeMov3} name="movAgencyCertification" className="col-span-2" />
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
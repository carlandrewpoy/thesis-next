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

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {

    const [state, formAction] = useFormState(createPublication, null)
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
                <Label className="col-span-9 text-xs font-extralight">Project</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ProjectSelect />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Center</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <CenterSelect />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Start</Label>
                <Label className="col-span-2 text-xs font-extralight">End</Label>
                <Label className="col-span-2 text-xs font-extralight">Status</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">
                <div className="col-span-2">
                    <Input defaultValue={dateFormatterNumber(autoFillData?.results.dateStarted ?? '') ?? ''} type='date' name="startedDate" />
                </div>
                <div className="col-span-2">
                    <Input defaultValue={dateFormatterNumber(autoFillData?.results.dateEnded ?? '') ?? ''} type='date' name="completedDate" />
                </div>
                <div className="col-span-2">
                    <PublicationStatusSelect />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Article</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='article' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Keywords</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='keywords' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Authors</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='authors' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">TITLE OF JOURNAL OR PUBLICATION</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input name='journalTitle' />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Publication Date</Label>
                <Label className="col-span-3 text-xs font-extralight">Index</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">

                <Input defaultValue={autoFillData?.results.totalTrainees} type='date' name="publicationDate" className="col-span-3" />
                <Input defaultValue={autoFillData?.results.weightedTrainees} type='text' name="index" className="col-span-3" />
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">VOL. NO. & ISSUE NO.</Label>
                <Label className="col-span-3 text-xs font-extralight">ISSN / ISBN</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">

                <Input defaultValue={autoFillData?.results.totalTrainees} type='text' name="issueNo" className="col-span-3" />
                <Input defaultValue={autoFillData?.results.weightedTrainees} type='text' name="issnOrIsbn" className="col-span-3" />
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

            <div className="grid grid-cols-8 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Abstract</Label>
                <Label className="col-span-2 text-xs font-extralight">Journal Title Page</Label>
                <Label className="col-span-2 text-xs font-extralight">Table of Contents</Label>
                <Label className="col-span-2 text-xs font-extralight">Full Paperr</Label>
            </div>
            <div className="grid grid-cols-8 items-center gap-4 ">
                <Checkbox name="movAbstract" className="col-span-2" />
                <Checkbox name="movJournalTitlePage" className="col-span-2" />
                <Checkbox name="movTableOfContents" className="col-span-2" />
                <Checkbox name="movFullPaper" className="col-span-2" />
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
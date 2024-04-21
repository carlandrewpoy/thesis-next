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
import { MultiSelectFacultyCombobox } from '@/components/combobox/mutation/multi-select-faculty'
import { ProjectCombobox } from '@/components/combobox/mutation/project'
import { CenterCombobox } from '@/components/combobox/mutation/center'
import { ResearchProjectCombobox } from '@/components/combobox/mutation/research-project'

const AddForm = ({ close }: {
    close: Dispatch<SetStateAction<boolean>>
}
) => {

    const [selected, setSelected] = useState<string[]>([])
    const createWithOthers = createPublication.bind(null, selected)
    const [state, formAction] = useFormState(createWithOthers, null)
    if (state?.message) {
        close(false)
        toast({
            duration: 1500,
            description: state?.message,
        })
    }


    const { mutateAsync: autofillFN, isPending } = AutoFill();
    const [autoFillData, setautoFillData] = useState<TPublicationAutofill>()
    const [link, setlink] = useState('')
    const params = {
        "link": link,
        "table": "PUBLICATION"
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

    return (
        <form className="grid gap-4" action={formAction} >
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Project</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ResearchProjectCombobox columnName='projectId' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Center</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <CenterCombobox />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Start</Label>
                <Label className="col-span-2 text-xs font-extralight">End</Label>
                <Label className="col-span-2 text-xs font-extralight">Status</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">
                <div className="col-span-2">
                    <Input type='date' name="startedDate" />
                </div>
                <div className="col-span-2">
                    <Input type='date' name="completedDate" />
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
                    <Input defaultValue={autoFillData?.results.keywords} name='keywords' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Authors</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <MultiSelectFacultyCombobox selected={selected} setSelected={setSelected} />

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

                <Input defaultValue={autoFillData?.results.date} type='date' name="publicationDate" className="col-span-3" />
                <Input type='text' name="index" className="col-span-3" />
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">VOL. NO. & ISSUE NO.</Label>
                <Label className="col-span-3 text-xs font-extralight">ISSN / ISBN</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">

                <Input defaultValue={autoFillData?.results.volume} type='text' name="issueNo" className="col-span-3" />
                <Input type='text' name="issnOrIsbn" className="col-span-3" />
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
                        </div> : 'Scan'}
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Scopus</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input name="scopus" className="col-span-10" />

            </div>

            <div className="grid grid-cols-8 items-center gap-4 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Abstract</Label>
                <Label className="col-span-2 text-xs font-extralight">Journal Title Page</Label>
                <Label className="col-span-2 text-xs font-extralight">Table of Contents</Label>
                <Label className="col-span-2 text-xs font-extralight">Full Paperr</Label>
            </div>
            <div className="grid grid-cols-8 items-center gap-4 ">
                <Checkbox checked={autoFillData?.mov.abstract === 1 ? true : false} name="movAbstract" className="col-span-2" />
                <Checkbox checked={autoFillData?.mov.title === 1 ? true : false} name="movJournalTitlePage" className="col-span-2" />
                <Checkbox checked={autoFillData?.mov.table === 1 ? true : false} name="movTableOfContents" className="col-span-2" />
                <Checkbox checked={autoFillData?.mov.full === 1 ? true : false} name="movFullPaper" className="col-span-2" />
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
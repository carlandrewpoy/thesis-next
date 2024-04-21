import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { Publication, Training, Utilization } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { updateGradSchoolFaculty } from '@/server-actions/grad-school-faculty'
import { Checkbox } from '@/components/ui/checkbox'
import { CenterSelect } from '@/components/select/center-select'
import { ProjectSelect } from '@/components/select/project-select'
import { updateUtilization } from '@/server-actions/utilization'
import { DurationSelect } from '@/components/select/duration-select'
import { dateFormatterNumber } from '@/lib/utils'
import { PublicationStatusSelect } from '@/components/select/publication-status-select'
import { updatePublication } from '@/server-actions/publication'
import { MultiSelectFacultyCombobox } from '@/components/combobox/mutation/multi-select-faculty'
import { PublicationWithOther } from '../../columns'
import { ProjectCombobox } from '@/components/combobox/mutation/project'
import { CenterCombobox } from '@/components/combobox/mutation/center'
import { ResearchProjectCombobox } from '@/components/combobox/mutation/research-project'

const EditForm = ({ row, close }: {
    row: Row<PublicationWithOther>
    close: Dispatch<SetStateAction<boolean>>
}) => {
    const [selected, setSelected] = useState<string[]>(row.original.authors.map((item) => item.id))
    const updateWithId = updatePublication.bind(null, row.original.id, selected)
    const [state, formAction] = useFormState(updateWithId, null)
    const [mov1, setmov1] = useState(row.original.movAbstract)
    const [mov2, setmov2] = useState(row.original.movJournalTitlePage)
    const [mov3, setmov3] = useState(row.original.movTableOfContents)
    const [mov4, setmov4] = useState(row.original.movFullPaper)

    const handleChangeMov1 = (checked: boolean) => {
        setmov1(checked)
    };
    const handleChangeMov2 = (checked: boolean) => {
        setmov2(checked)
    };
    const handleChangeMov3 = (checked: boolean) => {
        setmov3(checked)
    };

    const handleChangeMov4 = (checked: boolean) => {
        setmov4(checked)
    };
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
        <form className="grid gap-4" action={formAction} >
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Project</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <ResearchProjectCombobox columnName='projectId' defaultValue={row.original.project.title ?? ''} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Center</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <CenterCombobox defaultValue={row.original.center.name} />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-2 text-xs font-extralight">Start</Label>
                <Label className="col-span-2 text-xs font-extralight">End</Label>
                <Label className="col-span-2 text-xs font-extralight">Status</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">
                <div className="col-span-2">
                    <Input defaultValue={row.original.startedDate ?? ''} type='date' name="startedDate" />
                </div>
                <div className="col-span-2">
                    <Input defaultValue={row.original.completedDate ?? ''} type='date' name="completedDate" />
                </div>
                <div className="col-span-2">
                    <PublicationStatusSelect defaultValue={row.original.status} />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Article</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.article} name='article' />
                </div>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 -mb-3">
                <Label className="col-span-9 text-xs font-extralight">Keywords</Label>
            </div>
            <div className="grid grid-cols-9 items-center gap-4 ">
                <div className='col-span-9'>
                    <Input defaultValue={row.original.keywords} name='keywords' />
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
                    <Input defaultValue={row.original.journalTitle} name='journalTitle' />
                </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">Publication Date</Label>
                <Label className="col-span-3 text-xs font-extralight">Index</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">

                <Input defaultValue={row.original.publicationDate} type='date' name="publicationDate" className="col-span-3" />
                <Input defaultValue={row.original.index} type='text' name="index" className="col-span-3" />
            </div>
            <div className="grid grid-cols-6 items-center gap-2 -mb-3">
                <Label className="col-span-3 text-xs font-extralight">VOL. NO. & ISSUE NO.</Label>
                <Label className="col-span-3 text-xs font-extralight">ISSN / ISBN</Label>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 ">

                <Input defaultValue={row.original.issueNo} type='text' name="issueNo" className="col-span-3" />
                <Input defaultValue={row.original.issnOrIsbn} type='text' name="issnOrIsbn" className="col-span-3" />
            </div>

            <div className="grid grid-cols-6 items-center gap-4 -mb-3">
                <Label className="col-span-6 text-xs font-extralight">Supporting Document</Label>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 ">
                <Input defaultValue={row.original.supportingDocs} name="supportingDocs" className="col-span-12" />
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
                <Checkbox checked={mov1} onCheckedChange={handleChangeMov1} name="movAbstract" className="col-span-2" />
                <Checkbox checked={mov2} onCheckedChange={handleChangeMov2} name="movJournalTitlePage" className="col-span-2" />
                <Checkbox checked={mov3} onCheckedChange={handleChangeMov3} name="movTableOfContents" className="col-span-2" />
                <Checkbox checked={mov4} onCheckedChange={handleChangeMov4} name="movFullPaper" className="col-span-2" />
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

export default EditForm
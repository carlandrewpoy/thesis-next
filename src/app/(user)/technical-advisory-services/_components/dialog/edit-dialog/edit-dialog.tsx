import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react"
import EditForm from "./edit-form"
import { Row } from "@tanstack/react-table"
import { Center, Citation, College, GradSchoolFaculty, Training, User, Utilization } from "@prisma/client"
import { Edit } from "lucide-react"

export function EditDialog({
    row,
}: {
    row: Row<Citation>
}) {
    const [openDialog, setOpenDialog] = useState(false)
    const handleChange = () => {
        setOpenDialog(prev => !prev)
    }
    return (
        <Dialog open={openDialog} onOpenChange={handleChange}>
            <DialogTrigger asChild >
                <Button variant="default"
                    size="sm"
                    className="h-8 flex items-center gap-4 px-2.5 "
                >
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[95%] overflow-y-auto ">
                {/* <ScrollArea className="max-h-screen"> */}
                {/* <div className="bg-slate-600 h-[80%]"> */}
                <DialogHeader>
                    <DialogTitle>Edit Training</DialogTitle>
                    <DialogDescription>
                        Remember to save your data after completing the form.
                    </DialogDescription>
                </DialogHeader>
                {/* <div className="h-full"> */}
                <EditForm row={row} close={setOpenDialog} />
                {/* </div> */}
                {/* </div> */}
                {/* </ScrollArea> */}
            </DialogContent>
        </Dialog>
    )
}

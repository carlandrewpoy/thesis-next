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
import { Row } from "@tanstack/react-table"
import { Trash } from "lucide-react"
import DeleteForm from "./delete-form"
import { Partnership, Publication, Utilization } from "@prisma/client"
import { PartnershipWithOthers } from "../../columns"

export function DeleteDialog({
    row,
}: {
    row: Row<PartnershipWithOthers>
}) {
    const [openDialog, setOpenDialog] = useState(false)
    const handleChange = () => {
        setOpenDialog(prev => !prev)
    }
    return (
        <Dialog open={openDialog} onOpenChange={handleChange}>
            <DialogTrigger asChild >
                <Button variant="destructive"
                    size="sm"
                    className="h-8 flex items-center gap-4 px-2.5 "
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80%] overflow-y-auto ">
                {/* <ScrollArea className="max-h-screen"> */}
                {/* <div className="bg-slate-600 h-[80%]"> */}
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="pt-2">
                        This action cannot be undone. This will permanently delete your and remove your data from servers.
                    </DialogDescription>
                </DialogHeader>
                {/* <div className="h-full"> */}
                <DeleteForm row={row} close={setOpenDialog} />
                {/* </div> */}
                {/* </div> */}
                {/* </ScrollArea> */}
            </DialogContent>
        </Dialog>
    )
}

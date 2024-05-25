import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Copy, ExternalLink, Eye } from 'lucide-react'

const OpenLink = ({ link }: {
    link: string
}) => {
    return (
        <div className='flex items-center gap-x-2'>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline"><Eye className='w-4 h-4' /></Button>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Link</DialogTitle>
                        {/* <DialogDescription>
                            {link}
                        </DialogDescription> */}
                    </DialogHeader>
                    <div className="flex items-center gap-x-2">
                        <Input value={link} />
                        <Button onClick={() => navigator.clipboard.writeText(link)} variant={'outline'} size={'icon'}>
                            <Copy className='w-4 h-4' />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Link href={link} rel="noopener noreferrer" target="_blank">
                <Button variant={'outline'}>
                    <ExternalLink className='w-4 h-4' />
                </Button>
            </Link>
        </div>
    )
}

export default OpenLink
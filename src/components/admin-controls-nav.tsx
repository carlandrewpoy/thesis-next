'use client'
import { adminControlsLinks } from '@/constants/links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const AdminControlsNav = () => {
    const pathname = usePathname()

    return (
        <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
        >
            {adminControlsLinks.map((link) => (
                <Link href={link.href} key={link.title} className={`${pathname === link.href ? 'font-semibold text-primary' : ''}`}>
                    {link.title}
                </Link>
            ))}
            {/* <Link href="/admin/user" className="font-semibold text-primary">
        User
    </Link>
    <Link href="#">College</Link>
    <Link href="#">Center</Link>
    <Link href="#">Support</Link>
    <Link href="#">Organizations</Link>
    <Link href="#">Advanced</Link> */}
        </nav>
    )
}

export default AdminControlsNav
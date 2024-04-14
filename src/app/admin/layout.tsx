import AdminControlsNav from '@/components/admin-controls-nav'
import Header from '@/components/header'
import SideNav from '@/components/side-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { adminControlsLinks } from '@/constants/links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'



const TablesLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex min-h-screen w-full flex-col bg-muted/40">
            <SideNav />
            <div className="flex flex-col gap-4  sm:pl-14">
                <Header />
                <main>
                    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 px-4">
                        <div className="mx-auto grid w-full  gap-2">
                            <h1 className="text-3xl font-semibold">Admin</h1>
                        </div>
                        <div className="mx-auto grid w-full  items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[120px_1fr]">
                            <AdminControlsNav />
                            {children}
                        </div>
                    </main>
                </main>
            </div>
        </main>
    )
}

export default TablesLayout
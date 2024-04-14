import Header from '@/components/header'
import SideNav from '@/components/side-nav'
import React, { ReactNode } from 'react'

const TablesLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex min-h-screen w-full flex-col bg-muted/40">
            <SideNav />
            <div className="flex flex-col gap-4  sm:pl-14">
                <Header />
                <main>
                    {children}
                </main>
            </div>
        </main>
    )
}

export default TablesLayout
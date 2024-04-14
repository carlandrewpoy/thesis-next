'use client'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link'
import { Home, LineChart, Package, Package2, PanelLeft, Scroll, Settings, ShoppingCart, Users2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { adminSideNavLinks, headerLinks, userSideNavLinks } from '@/constants/links'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { useSession } from 'next-auth/react'



const SideNav = () => {
    const pathname = usePathname()
    const { data: session, status, update } = useSession()
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex overflow-auto scrollbar-hide no-scroll">
            <ScrollArea className='h-screen'>
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    {/* <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </Link> */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
                                <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                                <span className="sr-only">Acme Inc</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <ScrollArea className='h-screen'>
                                <nav className="grid gap-y-6 text-sm font-medium mb-16">
                                    <SheetClose asChild>
                                        <Link
                                            href="#"
                                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                        >
                                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                            <span className="sr-only">Acme Inc</span>
                                        </Link>
                                    </SheetClose>
                                    {headerLinks.map((link) => (
                                        <SheetClose asChild key={link.title}>
                                            <Link
                                                href={link.href}
                                                className={`${pathname === link.href ? 'text-foreground' : 'text-muted-foreground'} flex items-center gap-4 px-2.5  hover:text-foreground`}
                                            >
                                                <link.icon className="h-5 w-5" />
                                                {link.title}
                                            </Link>
                                        </SheetClose>
                                    ))}

                                </nav>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                    {session?.user.role === 'ADMIN' ? (
                        adminSideNavLinks.map((link) => (
                            <TooltipProvider key={link.title}>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={link.href}
                                            className={`${pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground hover:bg-accent md:h-8 md:w-8`}
                                        >
                                            <link.icon className="h-5 w-5" />
                                            <span className="sr-only">{link.title}</span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">{link.title}</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))
                    ) : (
                        userSideNavLinks.map((link) => (
                            <TooltipProvider key={link.title}>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={link.href}
                                            className={`${pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground hover:bg-accent md:h-8 md:w-8`}
                                        >
                                            <link.icon className="h-5 w-5" />
                                            <span className="sr-only">{link.title}</span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">{link.title}</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))
                    )}

                    {/* <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Home className="h-5 w-5" />
                                <span className="sr-only">Dashboard</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>
                    </TooltipProvider> */}


                    {/* <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Home className="h-5 w-5" />
                                <span className="sr-only">Dashboard</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Orders</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Orders</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Package className="h-5 w-5" />
                                <span className="sr-only">Products</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Products</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Users2 className="h-5 w-5" />
                                <span className="sr-only">Customers</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Customers</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <LineChart className="h-5 w-5" />
                                <span className="sr-only">Analytics</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Analytics</TooltipContent>
                    </Tooltip>
                </TooltipProvider> */}

                </nav>
            </ScrollArea>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Link
                                href="/settings"
                                className={`${pathname === "/settings" ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {/* <TooltipProvider>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="settings"
                                className={`${pathname === 'settings' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider> */}

            </nav>
        </aside>
    )
}

export default SideNav
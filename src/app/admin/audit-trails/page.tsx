import { Metadata } from "next"
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
    title: "User",
    description: "A task and issue tracker build using Tanstack Table.",
}

export default async function TaskPage() {
    const users = await prisma.auditLog.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return <DataTable data={users} columns={columns} />
}

{/* <div className="h-full space-y-8 px-6 ">
            <Tabs defaultValue="user">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="user">User</TabsTrigger>
                        <TabsTrigger value="college">College</TabsTrigger>
                        <TabsTrigger value="year">Year</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 gap-1 text-sm"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">Filter</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Fulfilled
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Declined
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Refunded
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1 text-sm"
                        >
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">Export</span>
                        </Button>
                    </div>
                </div>
                <TabsContent value="user">
                    <UserTable />
                </TabsContent>
                <TabsContent value="college">
                    <CollegeTable />
                </TabsContent>
            </Tabs>
        </div> */}
import { Metadata } from "next"

import prisma from "@/lib/prisma";
import { DataTable } from "./user/_components/data-table";
import { columns } from "./user/_components/columns";

export const metadata: Metadata = {
    title: "User",
    description: "A task and issue tracker build using Tanstack Table.",
}

export default async function TaskPage() {
    const users = await prisma.user.findMany({
        orderBy: {
            updatedAt: 'desc'
        }
    });
    return <DataTable data={users} columns={columns} />
}

import React from 'react'
import { DataTable } from './data-table'
import prisma from '@/lib/prisma';
import { columns } from './columns';


const UserTable = async () => {
    const users = await prisma.user.findMany({
        orderBy: {
            updatedAt: 'desc'
        }
    });
    return <DataTable data={users} columns={columns} />
}

export default UserTable
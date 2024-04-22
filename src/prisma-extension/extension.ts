import prisma from "@/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
export const xprisma = new PrismaClient().$extends({
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                const user = await getServerSession()
                /* your custom logic for modifying all operations on all models here */
                const result = await query(args)
                // const id = result?.id
                // const res = await prisma.gradSchoolFaculty.findUnique({
                //     where: {
                //         id: id,
                //     }, 
                //     include: {
                //         college: true,
                //         faculty: true,
                //         facultyEngagement: true,
                //     }
                // })
                // console.log(id)
                console.log({result})
                await prisma.auditLog.create({
                    data: {
                        model: model,
                        operation: operation,
                        result: result as any,
                        userEmail: user?.user.email as string,
                    },
                })
                return result
            },
        },
    },
})

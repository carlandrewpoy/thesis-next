import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.project.findMany();
  return Response.json(data);
}

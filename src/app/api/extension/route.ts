import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.project.findMany({
    where: {
      type: "EXTENSION",
    },
  });
  return Response.json(data);
}

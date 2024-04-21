import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.project.findMany({
    include: {
      extensionProject: true
    }
  });
  return Response.json(data);
}

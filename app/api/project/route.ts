import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
export async function GET(req: NextRequest) {
  const session = await getServerSession(req, authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/api/project/organization/${req.nextUrl.searchParams.get('id')}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.token}`
    }
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: response.status }
    );
  }

  const data = await response.json();
  const table: any[] = data.projects.map((pro: any) => ({
    id: pro._id,
    name: pro.ProjectName,
    location: pro.location,
    floorplan: pro.imageUrl,
    link: `http://127.0.0.1:5501/index.html?id=${pro.organizationId}`
  }));

  return NextResponse.json(table);
}
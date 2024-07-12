import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST (req: Request ){
    const user = await getCurrentUser();
    const { title, content } = await req.json();
    try {
        if (!user || !user.email) {
            return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
        } else {
            const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
            console.log('User: ',dbUser);
            if (!dbUser || dbUser.role !== 'ADMIN') {
                return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
            }
            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: user.email,
                },
            })
            return NextResponse.json({newPost}, { status: 200});
        }

    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' },{ status: 500 });
    }

}
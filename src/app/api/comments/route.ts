import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST (req: Request ){
    const user = await getCurrentUser();
    const { postId, content } = await req.json();
    try {
        if (!user || !user.email) {
            return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
        }
        const newComment = await prisma.comment.create({
            data: {
                postId,
                content,
                authorId: user.email,
            },
        })
        return NextResponse.json({newComment}, { status: 200});
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' },{ status: 500 });
    }

}
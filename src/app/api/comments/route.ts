import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET (req: Request ){
    const url = new URL(req.url);
    let postId = url.searchParams.get('postId') ?? '';
    postId = postId.trim(); // sanitize the postId
    // const { postId } = await req.json();
    console.log('postId:', postId);
    if (!postId) {
        return NextResponse.json({ message: 'Invalid request body: postId is required.' }, { status: 400 });
    }
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId,
            },
            include: { author: true },
        });
        return NextResponse.json({ comments }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' },{ status: 500 });
    }
}


export async function POST (req: Request ){
    const user = await getCurrentUser();
    const { postId, text } = await req.json();
    if (!postId || !text) {
        return NextResponse.json({ message: 'Invalid request body: postId and content are required.' }, { status: 400 });
    }
    try {
        if (!user || !user.email) {
            return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
        }
        const newComment = await prisma.comment.create({
            data: {
                postId,
                text,
                authorId: user.email,
            },
        })
        return NextResponse.json({newComment}, { status: 200});
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' },{ status: 500 });
    }

}

export async function PUT (req: Request ){
    const user = await getCurrentUser();
    const { id, text } = await req.json();
    if (!id || !text) {
        return NextResponse.json({ message: 'Invalid request body: id and content are required.' }, { status: 400 });
    }
    try {
        const existingComment = await prisma.comment.findUnique({ where: { id }, include: { author: true }});
        if (!existingComment) {
            return NextResponse.json({ message: 'Comment not found!' }, { status: 404 });
        }
        if (!user || !user.email || existingComment.author.email !== user.email) {
            return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
        }
        const updatedComment = await prisma.comment.update({
            where: { id },
            data: { text },
        });
        return NextResponse.json({ updatedComment }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' },{ status: 500 });
    }
}

export async function DELETE (req: Request ){
    const user = await getCurrentUser();
    const { id } = await req.json();
    try {
        if (!user || !user.email) {
            return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
        } else {
            const dbUser = await prisma.user.findUnique({ where: { email: user.email }, select: { role: true } }) ?? { role: 'USER' };
            const comment = await prisma.comment.findUnique({ where: { id }, include: { author: true } });

            if (!comment) {
                return NextResponse.json({ message: 'Comment not found!' }, { status: 404 });
            }
            if (comment.author.email !== user.email || dbUser.role !== 'ADMIN') {
                return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
            }
            await prisma.comment.delete({ where: { id } });
            return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' },{ status: 500 });
    }
}
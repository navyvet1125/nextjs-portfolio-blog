import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import prisma from '@/lib/db';

export async function GET(req: Request) {
    // This route is meant to get all likes for a post or comment
    // The response should return a number of likes for a post or comment
    // as well as the current user's like status for the post or comment
    const user = await getCurrentUser();
    const url = new URL(req.url);
    const postId = url.searchParams.get('postId') ?? '';
    const commentId = url.searchParams.get('commentId') ?? '';

    if (!postId && !commentId) {
        return NextResponse.json({ message: 'Invalid request body: a valid postId or commentId is required.' }, { status: 400 });
    }
    try {
        // Get the total number of likes for the post or comment
        const totalLikes = await prisma.like.count({
            where: {
                OR: [
                    { postId },
                    { commentId },
                ],
            },
            
        });
        // Check if the current user has liked the post or comment
        const userLiked = user && user.id ? await prisma.like.findFirst({
            where: {
                AND: [
                    { userId: user.id },
                    {
                        OR: [
                            { postId },
                            { commentId },
                        ],
                    },
                ],
            },
        }) : null;

        // Return the total number of likes and the user's like status
        return NextResponse.json({ 
            totalLikes,
            userLiked: userLiked ? true : false,
            }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    // This route is meant to like a post or comment
    // The method should only allow valid postId or commentId to be passed in the request body,
    // it should only allow logged in users to like a post or comment,
    // and should only allow a user to like a post or comment once.
    const user = await getCurrentUser();
    const { postId, commentId} = await req.json();
    if (!postId && !commentId) {
        return NextResponse.json({ message: 'Invalid request body: a valid postId or commentId is required.' }, { status: 400 });
    }
    try {
        if (!user || !user.id) {
            return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
        }
        
        // Check if the user has already liked the post or comment
        const existingLike = await prisma.like.findFirst({
            where: {
                AND: [
                    { userId: user.id },
                    {
                        OR: [
                            { postId },
                            { commentId },
                        ],
                    },
                ],
            },
        });
        if (existingLike) {
            return NextResponse.json({ message: 'You have already liked this post or comment!' }, { status: 400 });
        }

        // Determine the like target and prepare data accordingly
        const likeData = postId ? { postId, userId: user.id } : { commentId, userId: user.id };
        // Create the like
        const like = await prisma.like.create({
            data: likeData,
        });
        // Return the like
        return NextResponse.json({ like }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
    }

}

export async function DELETE(req: Request) {
    // This route is meant to unlike a post or comment
    // The method should only allow valid likeId to be passed in the request body,
    // it should only allow logged in users to unlike a post or comment,
    // and should only allow the user who liked the post or comment to unlike it.

    const user = await getCurrentUser();
    const { likeId } = await req.json();
    if (!likeId) {
        return NextResponse.json({ message: 'Invalid request body: a valid likeId is required.' }, { status: 400 });
    }
    try {
        const likeUser = await prisma.like.findUnique({ where: { id: likeId }, select: { userId: true } });
        if (!user || !user.id) {
            return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
        }
        if (!likeUser || likeUser.userId !== user.id) {
            return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
        }
        // Delete the like
        const like = await prisma.like.delete({
            where: { id: likeId },
        });
        // Return the deleted like
        return NextResponse.json({ like }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
    }
}
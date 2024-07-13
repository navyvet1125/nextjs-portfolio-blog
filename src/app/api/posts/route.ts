import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { Category } from "@prisma/client";

function generateSlug(title: string) {
    return title
        .normalize("NFD") // Normalize to decomposed form, separating characters from their accents
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/(^-|-$)/g, ''); // Remove leading and trailing hyphens
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    console.log('url:', req.url);
    let slug  = url.searchParams.get('slug') ?? '';
    console.log('slug:', slug);
    let category = url.searchParams.get('category') ?? '';
    slug = slug.trim(); // sanitize the slug
    category = category.trim().toUpperCase(); // sanitize the category
    try {
        if (!slug) {
            const where: { [key: string]: any } = {};
            if (category) {

                where.category = category as Category;
            }
    
            const posts = await prisma.post.findMany({
                where,
                include: { author: true },
                orderBy: { createdAt: 'desc' },
            });
            return NextResponse.json({ posts }, { status: 200 });
        }
        const post = await prisma.post.findFirst({
            where: { slug },
            include: { author: true },
        });

        if (!post) {
            return NextResponse.json({ message: 'Post not found!' }, { status: 404 });
        }

        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ message: 'Server error.' }, { status: 500 });
    }

}

export async function POST(req: Request) {
    const AUTHORIZED_ROLES = ['ADMIN', 'CONTRIBUTOR'];
    const user = await getCurrentUser();
    const { title, content } = await req.json();

    if (!title || !content) {
        return NextResponse.json({ message: 'Title and content are required.' }, { status: 400 });
    }

    if (!user || !user.email) {
        return NextResponse.json({ message: 'Unauthorized access.' }, { status: 403 });
    }

    try {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
        if (!dbUser || !AUTHORIZED_ROLES.includes(dbUser.role)) {
            return NextResponse.json({ message: 'Access denied.' }, { status: 403 });
        }

        const slug = generateSlug(title); // Generate a slug from the title
        const newPost = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                authorId: user.email,
            },
        });

        return NextResponse.json({ newPost }, { status: 200 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ message: 'Server error.' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const user = await getCurrentUser();
    if (!user || !user.email) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    const { id, title, content } = await req.json();
    if (!id || !title || !content) {
        return NextResponse.json({ message: 'Invalid request body: id, title, and content are required.' }, { status: 400 });
    }
    try {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email }, select: { role: true }});
        const existingPost = await prisma.post.findUnique({ where: { id }, include: { author: true }});

        if (!existingPost) {
            return NextResponse.json({ message: 'Post not found!' }, { status: 404 });
        }

        // Check if the user is the original author or an admin
        const isAuthor = existingPost.author.email === user.email;
        const isAdmin = dbUser && dbUser.role === 'ADMIN';

        if (!isAuthor && !isAdmin) {
            return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
        }

        // Check if the title has changed
        let updateData = { title, content, slug: existingPost.slug};
        if (existingPost.title !== title) {
            const newSlug = generateSlug(title)
            updateData.title = title;
            updateData.slug = newSlug;
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ message: 'Post updated successfully', updatedPost }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const user = await getCurrentUser();
    const { id } = await req.json();
    try {
        if (!user || !user.email) {
            return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
        } else {
            const dbUser = await prisma.user.findUnique({ where: { email: user.email }, select: { role: true } });
            const post = await prisma.post.findUnique({ where: { id }, include: { author: true } });

            if (!post) {
                return NextResponse.json({ message: 'Post not found!' }, { status: 404 });
            }

            const isAuthor = post.author.email === user.email;
            const isAdmin = dbUser && dbUser.role === 'ADMIN';

            if (!isAuthor && !isAdmin) {
                return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
            }

            const deletedPost = await prisma.post.delete({ where: { id } });
            return NextResponse.json({ deletedPost }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
    }
}
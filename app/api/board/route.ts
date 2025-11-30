import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

// ---------------------------------------------------------------------
// Generate Unique Slug
// ---------------------------------------------------------------------
async function generateUniqueSlug(title: string) {
  const base = slugify(title, { lower: true, strict: true });
  let slug = base;
  let count = 1;

  while (await prisma.board.findUnique({ where: { slug } })) {
    slug = `${base}-${count++}`;
  }

  return slug;
}

// ---------------------------------------------------------------------
// Generate random publicId
// ---------------------------------------------------------------------
function generatePublicId() {
  return Math.random().toString(36).substring(2, 10);
}

// =====================================================================
// GET → Fetch all boards for authenticated user
// =====================================================================
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const boards = await prisma.board.findMany({
      where: { ownerId: user.id },
      include: { collaborators: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(boards, { status: 200 });
  } catch (error) {
    console.error("GET /api/board error:", error);
    return NextResponse.json(
      { error: "Failed to load boards" },
      { status: 500 }
    );
  }
}

// =====================================================================
// POST → Create a board
// =====================================================================
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const {
      title,
      description,
      category,
      priority,
      tags,
      status,
      dueDate,
      color,
      icon,
      coverImage,
      isPublic,
    } = body;

    // ------------------------------
    // Validation
    // ------------------------------
    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "A valid title is required." },
        { status: 400 }
      );
    }

    if (!category || typeof category !== "string") {
      return NextResponse.json(
        { error: "A valid category is required." },
        { status: 400 }
      );
    }

    // ------------------------------
    // Ensure user exists locally
    // ------------------------------
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name ?? null,
        image: user.user_metadata?.avatar_url ?? null,
      },
    });

    // ------------------------------
    // Generate slug
    // ------------------------------
    const slug = await generateUniqueSlug(title);

    // ------------------------------
    // Create board
    // ------------------------------
    const board = await prisma.board.create({
      data: {
        title,
        description: description || null,
        category,
        priority: priority || "Medium",
        status: status || "active",

        tags: Array.isArray(tags) ? tags : [],

        dueDate: dueDate ? new Date(dueDate) : null,

        color: color || null,
        icon: icon || null,
        coverImage: coverImage || null,

        slug,
        isPublic: !!isPublic,
        publicId: isPublic ? generatePublicId() : null,

        ownerId: user.id,
        documentation: null,
        elements: null,
      },
    });

    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    console.error("POST /api/board error:", error);
    return NextResponse.json(
      { error: "Failed to create board" },
      { status: 500 }
    );
  }
}

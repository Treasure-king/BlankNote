import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

// =====================================================================
// Helper: Require Authentication
// =====================================================================
async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// =====================================================================
// GET → Fetch full board data (metadata + elements + docs)
// =====================================================================
export async function GET(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = await params;
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const board = await prisma.board.findUnique({
      where: { id: boardId },
      include: { collaborators: true }
    });

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const excalidrawData = board.elements || {
      elements: [],
      appState: { collaborators: [] },
      files: {},
    };

    return NextResponse.json({
      id: board.id,
      title: board.title,
      ownerId: board.ownerId,

      // Excalidraw
      elements: excalidrawData.elements || [],
      appState: {
        ...excalidrawData.appState,
        collaborators: Array.isArray(excalidrawData.appState?.collaborators)
          ? excalidrawData.appState.collaborators
          : [],
      },
      files: excalidrawData.files || {},

      // Metadata
      description: board.description,
      category: board.category,
      priority: board.priority,
      status: board.status,
      tags: board.tags,
      dueDate: board.dueDate,
      color: board.color,
      icon: board.icon,
      coverImage: board.coverImage,
      isPublic: board.isPublic,
      slug: board.slug,

      documentation: board.documentation || null,
      collaborators: board.collaborators,

      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    });
  } catch (error) {
    console.error("Failed to load board:", error);
    return NextResponse.json(
      { error: "Failed to load board" },
      { status: 500 }
    );
  }
}

// =====================================================================
// PUT → Update board metadata (Edit page)
// =====================================================================
export async function PUT(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = await params;
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const {
      title,
      description,
      category,
      priority,
      status,
      tags,
      dueDate,
      color,
      icon,
      coverImage,
      isPublic,
    } = body;

    // Validation
    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Invalid title" }, { status: 400 });
    }

    const updated = await prisma.board.update({
      where: { id: boardId },
      data: {
        title,
        description: description ?? null,
        category: category ?? null,
        priority: priority ?? "Medium",
        status: status ?? "active",
        tags: Array.isArray(tags) ? tags : [],
        dueDate: dueDate ? new Date(dueDate) : null,
        color: color ?? null,
        icon: icon ?? null,
        coverImage: coverImage ?? null,
        isPublic: !!isPublic,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Failed to update board:", error);
    return NextResponse.json(
      { error: "Failed to update board" },
      { status: 500 }
    );
  }
}

// =====================================================================
// POST → Save Excalidraw elements + documentation
// =====================================================================
export async function POST(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = await params;
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data: any = {};

    if ("elements" in body) data.elements = body;
    if ("documentation" in body) data.documentation = body.documentation;

    const updated = await prisma.board.update({
      where: { id: boardId },
      data,
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("Failed to save board:", error);
    return NextResponse.json(
      { error: "Failed to save board" },
      { status: 500 }
    );
  }
}

// =====================================================================
// DELETE → Remove board completely
// =====================================================================
export async function DELETE(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.board.delete({
      where: { id: boardId },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete board:", error);
    return NextResponse.json(
      { error: "Failed to delete board" },
      { status: 500 }
    );
  }
}

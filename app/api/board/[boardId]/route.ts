import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { boardId: string };
}

// --------------------------------------------------
// GET → Fetch a board with elements + documentation
// --------------------------------------------------
export async function GET(req: Request, { params }: Params) {
  const { boardId } = params;

  try {
    const board = await prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    // Extract stored Excalidraw data, default to empty values
    const excalidrawData = board.elements || {
      elements: [],
      appState: { collaborators: [] },
      files: {},
    };

    return NextResponse.json({
      id: board.id,
      title: board.title,
      ownerId: board.ownerId,
      elements: excalidrawData.elements || [],
      appState: {
        ...excalidrawData.appState,
        collaborators: Array.isArray(excalidrawData.appState?.collaborators)
          ? excalidrawData.appState.collaborators
          : [],
      },
      files: excalidrawData.files || {},
      documentation: board.documentation || null,
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



// --------------------------------------------------
// POST → Save elements + documentation
// --------------------------------------------------
export async function POST(req: Request, { params }: Params) {
  const { boardId } = params;

  // console.log(boardId);
  

  try {
    const body = await req.json();
    // console.log("Incoming:", body);

    const data: any = {};
    console.log(body);
    

    if ("elements" in body) {
      data.elements = body;
    }

    if ("documentation" in body) {
      data.documentation = body.documentation;
    }

    const updated = await prisma.board.update({
      where: { id: boardId },
      data,
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("Failed to save board:", error);
    return NextResponse.json({ error: "Failed to save board" }, { status: 500 });
  }
}


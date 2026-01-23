import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createToolRouter } from "@winstain/toolkit/server/router";
import { tools } from "@/tools/tools";
import { getCurrentUser, getOrCreateUser } from "@/tools/auth/server";
import { User } from "@/tools/user/models";

// Request envelope validation
const BodySchema = z.object({
  method: z.string(),
  params: z.unknown(), // tool-specific validation happens inside router via zod
});

const router = createToolRouter(tools);

export async function POST(req: NextRequest) {
  try {
    let json: unknown;
    try {
      json = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body", statusCode: 400 },
        { status: 400 }
      );
    }

    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.message, statusCode: 400 },
        { status: 400 }
      );
    }

    const { method, params } = parsed.data;

    const supabaseUser = await getCurrentUser(req);
    let user: any = null;

    if (supabaseUser) {
      const drizzleUser = await getOrCreateUser(supabaseUser);
      user = {
        id: drizzleUser.id,
        firstName: drizzleUser.firstName,
        lastName: drizzleUser.lastName,
        verified: drizzleUser.verified,
      };
    }

    const ctx = { user };

    const result = await router.execute(method as any, params, ctx);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";

    // Map common cases
    const isNotFound = message.startsWith("Unknown tool:");
    const isAuthError =
      message.includes("Unauthorized") || message.includes("Authentication required");

    const status = isNotFound ? 404 : isAuthError ? 401 : 500;

    return NextResponse.json(
      { error: message, statusCode: status },
      { status }
    );
  }
}
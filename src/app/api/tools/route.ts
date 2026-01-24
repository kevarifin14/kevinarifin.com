import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createToolRouter, isToolError } from "@winstain/toolkit/server";
import { tools } from "@/tools/tools";
import { getCurrentUser, getOrCreateUser } from "@/tools/auth/server";

const BodySchema = z.object({
  method: z.string(),
  params: z.unknown(),
});

const router = createToolRouter(tools);

export async function POST(req: NextRequest) {
  try {
    const json: unknown = await req.json();

    const { method, params } = BodySchema.parse(json);

    const supabaseUser = await getCurrentUser(req);
    const user = supabaseUser ? await getOrCreateUser(supabaseUser) : null;

    const ctx = {
      user: user
        ? {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          verified: user.verified,
        }
        : null,
    };

    const result = await router.execute(method as any, params as any, ctx);

    return NextResponse.json(result);
  } catch (err) {
    if (isToolError(err)) {
      return NextResponse.json(err.toPayload(), { status: err.status });
    }

    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
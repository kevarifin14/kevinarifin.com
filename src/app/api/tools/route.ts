import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as tools from "@/tools/tools";
import { getCurrentUser, getOrCreateUser } from "@/tools/auth/server";

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON in request body", statusCode: 400 },
        { status: 400 }
      );
    }

    // Extract tool name and params from request body
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body", statusCode: 400 },
        { status: 400 }
      );
    }

    if (!body.method || typeof body.method !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'method' field in request body", statusCode: 400 },
        { status: 400 }
      );
    }

    if (!body.params || typeof body.params !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid 'params' field in request body", statusCode: 400 },
        { status: 400 }
      );
    }

    const toolName = body.method;
    const params = body.params;

    // Find the tool by matching schema.name
    let tool = null;
    for (const toolKey in tools) {
      const candidateTool = (tools as any)[toolKey];
      if (candidateTool?.schema?.name === toolName) {
        tool = candidateTool;
        break;
      }
    }

    if (!tool) {
      return NextResponse.json(
        { error: `Tool "${toolName}" not found`, statusCode: 404 },
        { status: 404 }
      );
    }

    // Validate params against tool's input schema
    let validatedInput;
    try {
      validatedInput = tool.schema.input.parse(params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: "Validation error",
            details: error.errors,
            statusCode: 400,
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // Get the current authenticated user (if any)
    const supabaseUser = await getCurrentUser(req);
    let user = null;
    
    if (supabaseUser) {
      // Convert Supabase user to Drizzle user (get or create)
      const drizzleUser = await getOrCreateUser(supabaseUser);
      // Map to the User type expected by tools
      user = {
        id: drizzleUser.id,
        firstName: drizzleUser.firstName,
        lastName: drizzleUser.lastName,
        verified: drizzleUser.verified,
      };
    }

    // Execute tool handler with context
    // Tools handle their own authentication - they throw errors if auth is required
    try {
      const result = await tool.handler(validatedInput, { user });
      
      return NextResponse.json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to execute tool";
      const errorStack = error instanceof Error ? error.stack : undefined;
      
      // Check if it's an authentication error
      const isAuthError = errorMessage.includes("Unauthorized") || 
                         errorMessage.includes("Authentication required");
      
      console.log(`[API] Tool "${toolName}" error:`, error);
      return NextResponse.json(
        {
          error: errorMessage,
          stack: process.env.NODE_ENV === "development" ? errorStack : undefined,
          statusCode: isAuthError ? 401 : 500
        },
        { status: isAuthError ? 401 : 500 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage, statusCode: 500 },
      { status: 500 }
    );
  }
}

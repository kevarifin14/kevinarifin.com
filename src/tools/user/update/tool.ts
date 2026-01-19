import { userUpdateSchema } from "./schema";
import { createTool } from "@/tools/shared";
import { requireUser } from "@/tools/shared";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const userUpdate = createTool(
  userUpdateSchema,
  async (params, context) => {
    const user = requireUser(context);

    const updateData: { firstName?: string | null; lastName?: string | null; updatedAt?: Date } = {
      updatedAt: new Date(),
    };

    if (params.firstName !== undefined) {
      updateData.firstName = params.firstName;
    }

    if (params.lastName !== undefined) {
      updateData.lastName = params.lastName;
    }

    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, user.id))
      .returning();

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      verified: updatedUser.verified,
    };
  }
);

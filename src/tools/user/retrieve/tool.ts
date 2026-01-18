import { userRetrieveSchema } from "./schema";
import { createTool } from "@/tools/shared";
import { requireUser } from "@/tools/shared";

export const userRetrieve = createTool(
  userRetrieveSchema,
  async (params, context) => {
    const user = requireUser(context);

    return user;
  }
);


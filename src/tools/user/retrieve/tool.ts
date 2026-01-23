import { toolkit } from "@/tools/server";
import { userRetrieveSchema } from "./schema";
import { requireUser } from "@/tools/shared";

export const userRetrieve = toolkit.createTool(
  userRetrieveSchema,
  async (params, context) => {
    const user = requireUser(context);

    return user;
  }
);


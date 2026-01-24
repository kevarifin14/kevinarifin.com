import { requireUser, toolkit } from "@/tools/server";
import { userRetrieveSchema } from "./schema";

export const userRetrieve = toolkit.createTool(
  userRetrieveSchema,
  async (params, context) => {
    const user = requireUser(context);

    return user;
  }
);


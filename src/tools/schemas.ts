import { createSchemas } from "@winstain/toolkit/core";
import { authLoginSchema } from "./auth/login/schema";
import { authVerifySchema } from "./auth/verify/schema";
import { authLogoutSchema } from "./auth/logout/schema";
import { userRetrieveSchema } from "./user/retrieve/schema";
import { userUpdateSchema } from "./user/update/schema";

export const schemas = createSchemas(
  authLoginSchema,
  authVerifySchema,
  authLogoutSchema,
  userRetrieveSchema,
  userUpdateSchema,
);

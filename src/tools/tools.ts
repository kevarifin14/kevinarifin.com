// Re-export all tools (server-only code is in server.ts)

import { authLogin } from "./auth/login/tool";
import { authVerify } from "./auth/verify/tool";
import { authLogout } from "./auth/logout/tool";
import { userRetrieve } from "./user/retrieve/tool";
import { userUpdate } from "./user/update/tool";
import { toolkit } from "./server";

export const tools = toolkit.createTools(
  authLogin,
  authVerify,
  authLogout,
  userRetrieve,
  userUpdate,
);

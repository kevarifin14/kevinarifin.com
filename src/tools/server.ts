import { createToolkit } from "@winstain/toolkit/server";
import { User } from "./user/models";

export const toolkit = createToolkit<{ user: User | null }>();

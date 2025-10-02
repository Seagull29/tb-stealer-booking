import type { SessionSchema } from "@/types/types";
import { createContext } from "react-router";

export const sessionContext = createContext<SessionSchema | null>(null);
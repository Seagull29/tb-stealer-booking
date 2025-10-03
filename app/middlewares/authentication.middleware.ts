import { sessionContext } from "@/stores/session.context";
import { redirect, type MiddlewareFunction } from "react-router";

export const requireAuthentication: MiddlewareFunction = async function({ request, context }) {
    let sessionToken = context.get(sessionContext)?.token;

    // If no token in context, try localStorage
    if (!sessionToken && typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
            context.set(sessionContext, { token: storedToken });
            sessionToken = storedToken;
        }
    }

    if (!sessionToken) {
        throw redirect("/");
    }
}
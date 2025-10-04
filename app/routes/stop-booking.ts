import CLIENT_CONFIG from "@/config/client.config";
import { data, redirect } from "react-router";
import { sessionContext } from "@/stores/session.context";
import type { Route } from "./+types/stop-booking";
import { requireAuthentication } from "@/middlewares/authentication.middleware";

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    requireAuthentication as Route.ClientMiddlewareFunction
];

export async function clientLoader() {
    return null;
}

export async function clientAction({ context, params: { id } }: Route.ClientActionArgs) {
    const url = new URL(`${CLIENT_CONFIG.get("API_URL")}/bookings/${id}`);
    try {
        const response = await fetch(url.toString(), {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${context.get(sessionContext)?.token}`
            }
        });
        switch (response.status) {
            case 500:
                return data({ error: "Ocurrió un error en el servidor, por favor intente más tarde" });
            case 401:
                localStorage.removeItem('auth_token');
                throw redirect("/");
        }
        return data({ message: "Reserva cancelada exitosamente" });
    } catch (error) {
        return data({ error: "Problema de conexión, por favor intente más tarde" });
    }
}  
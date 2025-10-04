import CLIENT_CONFIG from "@/config/client.config";
import type { Route } from "../+types/root";
import { data, redirect } from "react-router";
import { sessionContext } from "@/stores/session.context";

export async function clientAction({ context, params: { id } }: Route.ClientActionArgs) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return data({ message: "Reserva cancelada exitosamente" });
    // const url = new URL(`${CLIENT_CONFIG.get("API_URL")}/bookings/${id}/stop`);
    // try {
    //     const response = await fetch(url.toString(), {
    //         method: "DELETE",
    //         headers: {
    //             Authorization: `Bearer ${context.get(sessionContext)?.token}`
    //         }
    //     });
    //     switch (response.status) {
    //         case 500:
    //             return data({ error: "Ocurrió un error en el servidor, por favor intente más tarde" });
    //         case 401:
    //             localStorage.removeItem('auth_token');
    //             throw redirect("/");
    //     }
    //     return data({ message: "Reserva cancelada exitosamente" });
    // } catch (error) {
    //     return data({ error: "Problema de conexión, por favor intente más tarde" });
    // }
}  
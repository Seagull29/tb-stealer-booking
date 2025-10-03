import { data } from "react-router";
import type { Route } from "./+types/bookings";
import { requireAuthentication } from "@/middlewares/authentication.middleware";
import { sessionContext } from "@/stores/session.context";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import CLIENT_CONFIG from "@/config/client.config";
import type { BookingSchema } from "@/types/types";

async function fetchBookings(token: string) {
    const response = await fetch(`${CLIENT_CONFIG.get("API_URL")}/bookings`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    switch (response.status) {
        case 500:
            throw new Error("There was an error while fetching bookings");
        case 401:
            const error = new Error("Unauthorized") as any;
            error.code = 401;
            throw error;
    }
    const { bookings } = await response.json();
    return bookings as BookingSchema[];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    requireAuthentication as Route.ClientMiddlewareFunction
];

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
    return data({ token: context.get(sessionContext)?.token });
}

export default function BookingsPage({ loaderData }: Route.ComponentProps) {
    const { token } = loaderData;
    const queryClient = useQueryClient();
    const { isError, isPending, isSuccess, data } = useQuery({
        queryKey: ["bookings", token],
        queryFn: ({ queryKey: [_, token] }) => fetchBookings(token!)
    });
    return (
        <main className="min-h-screen bg-ctp-frappe-base flex flex-col items-center">
            <section className="w-fit bg-ctp-frappe-surface-0 rounded-xl mx-20 my-20 border-ctp-frappe-surface-2 border shadow-xl px-7 py-10">
                <header className="flex flex-col gap-2">
                    <p className="text-ctp-frappe-text font-semibold text-2xl">Reservas programadas</p>
                    <p className="text-ctp-frappe-subtext-0">Lista de reservas</p>
                </header>
            </section>
        </main>
    );
}
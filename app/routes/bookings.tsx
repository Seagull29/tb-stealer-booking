import { data } from "react-router";
import type { Route } from "./+types/bookings";
import { requireAuthentication } from "@/middlewares/authentication.middleware";
import { sessionContext } from "@/stores/session.context";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    requireAuthentication as Route.ClientMiddlewareFunction
];

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
    return data({ token: context.get(sessionContext)?.token });
}   

export default function BookingsPage() {
    const queryClient = useQueryClient();
    const { isError, isPending, isSuccess, data } = useQuery({ 
        queryKey: ["bookings"],
        queryFn: async () => {

        }
    });
    return (
    );
}
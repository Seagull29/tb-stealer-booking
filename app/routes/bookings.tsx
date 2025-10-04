import { data, Link, useNavigate } from "react-router";
import type { Route } from "./+types/bookings";
import { requireAuthentication } from "@/middlewares/authentication.middleware";
import { sessionContext } from "@/stores/session.context";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import CLIENT_CONFIG from "@/config/client.config";
import type { BookingSchema } from "@/types/types";
import { AlertTriangleIcon, BookPlusIcon } from "lucide-react";
import BouncingLoader from "@/components/BouncingLoader";
import { useEffect } from "react";
import BookingCard from "@/components/BookingCard";

const fakeBookings: BookingSchema[] = [
    {
        bookingId: "BK-2025-001",
        road: 1,
        date: "2025-10-15",
        tickets: 2,
        passengers: [
            {
                name: "John",
                lastName: "Doe",
                secondLastName: "Smith",
                birthdate: "15-03-1985",
                countryId: "32",
                documentTypeId: 1,
                originId: 1,
                taxId: 1,
                id: "P-001",
                originName: "Extranjero",
                sex: "Masculino",
                taxName: "General"
            },
            {
                name: "Jane",
                lastName: "Doe",
                secondLastName: "Johnson",
                birthdate: "22-07-1987",
                countryId: "32",
                documentTypeId: 1,
                originId: 1,
                taxId: 1,
                id: "P-002",
                originName: "Extranjero",
                sex: "Femenino",
                taxName: "General"
            }
        ],
        status: "BOOKED",
        nextExpectedRetentionTime: 1729180800000, // Oct 17, 2025 16:00:00 GMT
        startingBookingTime: 1728489600000 // Oct 9, 2025 16:00:00 GMT
    },
    {
        bookingId: "BK-2025-002",
        road: 5,
        date: "2025-10-20",
        tickets: 2,
        passengers: [
            {
                name: "Carlos",
                lastName: "García",
                secondLastName: "López",
                birthdate: "08-11-1990",
                countryId: "32",
                documentTypeId: 2,
                originId: 2,
                taxId: 200,
                id: "P-003",
                originName: "Extranjero",
                sex: "Masculino",
                taxName: "Estudiante egresado"
            },
            {
                name: "María",
                lastName: "Rodríguez",
                secondLastName: "Hernández",
                birthdate: "30-05-1992",
                countryId: "32",
                documentTypeId: 2,
                originId: 2,
                taxId: 200,
                id: "P-004",
                originName: "Extranjero",
                sex: "Femenino",
                taxName: "Estudiante egresado"
            }
        ],
        status: "SCHEDULED",
        nextExpectedRetentionTime: 1729612800000, // Oct 22, 2025 16:00:00 GMT
        startingBookingTime: 1728921600000 // Oct 14, 2025 16:00:00 GMT
    }
];

async function fetchBookings(token: string) {
    const response = await fetch(`${CLIENT_CONFIG.get("API_URL")}/bookings`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    // return fakeBookings;
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
    const navigate = useNavigate();
    const { isError, isPending, isSuccess, data, error } = useQuery({
        queryKey: ["bookings", token],
        queryFn: ({ queryKey }) => fetchBookings(queryKey[1]!)
    });
    const cards = data?.map(booking => (
        <BookingCard key={booking.bookingId} booking={booking} />
    ));
    useEffect(() => {
        if (error?.message === "Unauthorized") {
            navigate({ pathname: "/" });
        }
    }, [error]);
    return (
        <main className="min-h-screen bg-ctp-frappe-base flex flex-col items-center">
            {
                isError &&
                <main className="border m-20 border-ctp-frappe-overlay-0 rounded-lg p-7 bg-ctp-frappe-surface-0 shadow-xl">
                    <section className="flex flex-col gap-3 items-center text-ctp-frappe-text">
                        <AlertTriangleIcon className="size-10" />
                        <p className="mt-5 text-center font-semibold text-xl">Error al cargar las reservas</p>
                        <p className="text-ctp-frappe-subtext-0">Ocurrió un error al mostrar las reservas, puede intentar refrescando la página.</p>
                    </section>
                </main>
            }
            {
                !isError &&
                <section className="max-w-7xl w-full bg-ctp-frappe-surface-0 rounded-xl mx-20 my-20 border-ctp-frappe-surface-2 border shadow-xl px-7 py-10">
                    <header className="flex gap-5 justify-between items-center">
                        <div className="">
                            <p className="text-ctp-frappe-text font-semibold text-2xl">Reservas programadas</p>
                            <p className="text-ctp-frappe-subtext-0">Lista de reservas</p>
                        </div>
                        <Link to="/book" className="flex items-center gap-2 px-4 text-sm py-3 rounded-md bg-ctp-frappe-green text-green-950 font-medium hover:scale-95 transition-all">
                            <BookPlusIcon className="size-5" />
                            <p>Programar reserva</p>
                        </Link>
                    </header>
                    {
                        isPending &&
                        <div className="mt-5">
                            <BouncingLoader className="size-5 bg-ctp-frappe-mauve" />
                        </div>
                    }
                    {
                        isSuccess &&
                        <main className="flex flex-col gap-5 mt-10">
                            {cards}
                        </main>
                    }
                </section>
            }
        </main>
    );
}
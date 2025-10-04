import FormDateInput from "@/components/FormDateInput";
import FormSelect from "@/components/FormSelect";
import PassengerForm from "@/components/PassengerForm";
import { PlusIcon, ScrollTextIcon, TicketCheckIcon, TrafficConeIcon } from "lucide-react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchemaValidator } from "@/lib/booking.validator";
import { ROAD_OPTIONS } from "@/lib/data";
import { data, Link, redirect, useFetcher } from "react-router";
import BouncingLoader from "@/components/BouncingLoader";
import { customDayjs } from "@/lib/utils";
import { sessionContext } from "@/stores/session.context";
import CLIENT_CONFIG from "@/config/client.config";
import { useDisplayResponseToast } from "@/hooks/useDisplayResponseToast";
import { useEffect } from "react";
import type { Route } from "./+types/book";
import { requireAuthentication } from "@/middlewares/authentication.middleware";

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    requireAuthentication as Route.ClientMiddlewareFunction
];

export async function clientAction({ context, request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const passenger = formData.get("passengers") as string;
    const date = formData.get("date");
    const road = formData.get("road");
    const url = new URL(`${CLIENT_CONFIG.get("API_URL")}/tickets/book`);
    try {
        const response = await fetch(url.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${context.get(sessionContext)?.token}`
            },
            body: JSON.stringify({ date, road: Number(road), passengers: JSON.parse(passenger!) })
        });
        switch (response.status) {
            case 500:
                return data({ error: "Ocurrió un error en el servidor, por favor intente más tarde" });
            case 400:
                return data({ error: "Datos de reserva inválidos, por favor verifique e intente nuevamente" });
            case 409:
                return data({ error: "No hay disponibilidad para la fecha y ruta seleccionadas" });
            case 401:
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth_token');
                }
                throw redirect("/");
        }
        // return data({ message: "Reserva programada exitosamente" });
        return redirect("/bookings");
    } catch (error) {
        return data({ error: "Problema de conexión, por favor intente más tarde" });
    }
}

export default function BookPage() {
    const fetcher = useFetcher();
    const isPending = fetcher.state !== "idle";

    const formHandler = useForm({
        resolver: zodResolver(BookingSchemaValidator),
        defaultValues: {
            passengers: [{
                name: "",
                lastName: "",
                secondLastName: "",
                birthdate: "",
                countryId: "",
                passport: "",
                sex: "" as "Femenino" | "Masculino",
                documentTypeId: "",
                taxId: ""
            }]
        }
    });
    const { control, reset, handleSubmit } = formHandler;
    const { append, fields, remove, replace } = useFieldArray({
        control,
        name: "passengers"
    });

    const passengerForms = fields.map((field, index) => (
        <PassengerForm key={field.id} index={index} removePassenger={() => removePassenger(index)} />
    ));

    const addPassenger = () => {
        append({
            name: "",
            lastName: "",
            secondLastName: "",
            birthdate: "",
            countryId: "",
            passport: "",
            sex: "" as "Femenino" | "Masculino",
            documentTypeId: "",
            taxId: ""
        });
    };

    const removePassenger = (index: number) => {
        remove(index);
    }

    const submit = handleSubmit(data => {
        const passengers = data.passengers.map(passenger => ({
            ...passenger,
            documentTypeId: Number(passenger.documentTypeId),
            taxId: Number(passenger.taxId),
            birthdate: customDayjs(passenger.birthdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
            taxName: Number(passenger.taxId)
        }));
        fetcher.submit({
            date: customDayjs(data.date, "DD/MM/YYYY").format("YYYY-MM-DD"),
            road: Number(data.road),
            passengers: JSON.stringify(passengers)
        }, { method: "POST" });
    });

    useDisplayResponseToast(fetcher);

    useEffect(() => {
        if (fetcher.data?.message) {
            reset();
            replace([{
                name: "",
                lastName: "",
                secondLastName: "",
                birthdate: "",
                countryId: "",
                passport: "",
                sex: "" as "Femenino" | "Masculino",
                documentTypeId: "",
                taxId: ""
            }]);
        }
    }, [fetcher.data]);

    return (
        <main className="min-h-screen bg-ctp-frappe-base flex flex-col items-center">
            <section className="max-w-7xl w-full bg-ctp-frappe-surface-0 rounded-xl mx-20 my-20 border-ctp-frappe-surface-2 border shadow-xl px-7 py-10">
                <header className="flex gap-5 justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <p className="text-ctp-frappe-text font-semibold text-2xl">Crear reserva</p>
                        <p className="text-ctp-frappe-subtext-0">Registrar datos de pasajeros</p>
                    </div>
                    <Link to="/bookings" className="flex items-center gap-2 px-4 text-sm py-3 rounded-md bg-ctp-frappe-peach text-ctp-frappe-crust shadow font-medium transition-all hover:scale-95">
                        <ScrollTextIcon className="size-5" />
                        <p>Reservas programadas</p>
                    </Link>
                </header>
                <main className="mt-8">
                    <section className="grid grid-cols-2 gap-10">
                        <FormDateInput
                            control={control}
                            label="Fecha de reserva"
                            name="date"
                        />
                        <FormSelect
                            control={control}
                            icon={<TrafficConeIcon className="size-5 text-ctp-frappe-text" />}
                            label="Ruta"
                            name="road"
                            options={ROAD_OPTIONS}
                            placeholder="Seleccione una ruta"
                        />
                    </section>
                    <section className="mt-8">
                        <header className="flex items-center justify-between">
                            <p className="text-ctp-frappe-text font-semibold text-lg">Pasajeros ({fields.length})</p>
                            <button onClick={addPassenger} className="bg-ctp-frappe-mantle px-3  py-2 cursor-pointer font-medium flex items-center gap-2 rounded-lg shadow-md transition-all text-ctp-frappe-text hover:scale-95">
                                <PlusIcon className="size-5s" />
                                <p>Agregar pasajero</p>
                            </button>
                        </header>
                        <main className="grid grid-cols-2 gap-10">
                            <FormProvider {...formHandler}>
                                {passengerForms}
                            </FormProvider>
                        </main>
                    </section>
                    <footer className="mt-8 flex justify-end">
                        <button onClick={submit} disabled={isPending} className="px-5 py-3 text-ctp-frappe-crust rounded-lg cursor-pointer transition-all flex items-center gap-2 shadow-lg bg-ctp-frappe-lavender font-medium hover:shadow-lg hover:scale-95">
                            {
                                isPending &&
                                <BouncingLoader className="size-4 bg-white" />
                            }
                            {
                                !isPending &&
                                <>
                                    <TicketCheckIcon className="size-5" />
                                    <p>Reservar</p>
                                </>
                            }
                        </button>
                    </footer>
                </main>
            </section>
        </main>
    );
}
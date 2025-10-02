import FormDateInput from "@/components/FormDateInput";
import FormSelect from "@/components/FormSelect";
import { TrafficConeIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export default function BookingPage() {
    const { control } = useForm();
    return (
        <main className="min-h-screen bg-ctp-frappe-base flex flex-col items-center">
            <section className="max-w-3xl w-full bg-ctp-frappe-surface-0 m-auto rounded-xl border-ctp-frappe-surface-2 border shadow-xl px-7 py-10">
                <header className="flex flex-col gap-2">
                    <p className="text-ctp-frappe-text font-semibold text-2xl">Crear reserva</p>
                    <p className="text-ctp-frappe-subtext-0">Registrar datos de pasajeros</p>
                </header>
                <main className="mt-8">
                    <section className="grid grid-cols-2 gap-10">
                        <FormDateInput 
                            control={control}
                            label="Fecha de reserva"
                            name="bookingDate"
                        />
                        <FormSelect 
                            control={control}
                            icon={<TrafficConeIcon className="size-5 text-ctp-frappe-text" />}
                            label="Ruta"
                            name="road"
                            options={[]}
                            placeholder="Seleccione una ruta"
                        />
                    </section>
                </main>
            </section>
        </main>
    );
}
import { LockIcon, MailIcon } from "lucide-react";
import type { Route } from "./+types/log-in";
import FormInput from "@/components/FormInput";
import { useForm } from "react-hook-form";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Reservar pasajeros" },
        { name: "description", content: "Página de inicio de sesión para reservar pasajeros" },
    ];
}

export default function LogInPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <main className="min-h-screen bg-ctp-frappe-base flex flex-col items-center">
            <section className="max-w-lg w-full bg-ctp-frappe-surface-0 m-auto rounded-xl border-ctp-frappe-surface-2 border shadow-xl px-7 py-10">
                <header className="flex flex-col items-center gap-4">
                    <div className="p-3 rounded-full bg-ctp-frappe-lavender">
                        <LockIcon className="size-6 text-ctp-frappe-crust" />
                    </div>
                    <p className="font-medium text-2xl text-ctp-frappe-text">Iniciar sesión</p>
                </header>
                <main className="flex flex-col gap-5 mt-7">
                    <FormInput 
                        label="Correo electrónico"
                        icon={<MailIcon className="size-5" />}
                        errors={errors.email}
                        inputType="email"
                        registerProps={register("email")}
                    />
                    <FormInput 
                        label="Contraseña"
                        icon={<LockIcon className="size-5" />}
                        errors={errors.password}
                        inputType="password"
                        registerProps={register("password")}
                    />
                </main>
                <button className="cursor-pointer mt-7 rounded-md w-full bg-ctp-frappe-lavender text-ctp-frappe-crust transtiion-all font-medium px-3 flex justify-center py-2 shadow hover:shadow-lg">
                    Iniciar sesión
                </button>
            </section>
        </main>
    );
}

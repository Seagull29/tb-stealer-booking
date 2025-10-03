import { ChevronRightIcon, LockIcon, MailIcon } from "lucide-react";
import type { Route } from "./+types/log-in";
import FormInput from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { data, redirect, useFetcher } from "react-router";
import BouncingLoader from "@/components/BouncingLoader";
import CLIENT_CONFIG from "@/config/client.config";
import { sessionContext } from "@/stores/session.context";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Reservar pasajeros" },
        { name: "description", content: "Página de inicio de sesión para reservar pasajeros" },
    ];
}

export async function clientAction({ context, request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const basicAuthenticationHeader = `Basic ${btoa(`${email}:${password}`)}`;
    try {
        const response = await fetch(`${CLIENT_CONFIG.get("API_URL")}/auth/sessions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": basicAuthenticationHeader
            },
            body: JSON.stringify({ }),
        });
        switch (response.status) {
            case 500:
                return data({ error: "Ocurrió un error en el servidor, por favor intente más tarde" });
            case 401:
                return data({ error: "Correo electrónico o contraseña incorrectos" });
        }
        const { accessToken } = await response.json();
        context.set(sessionContext, { token: accessToken });
        localStorage.setItem("auth_token", accessToken);
        return redirect("/booking");
    } catch (error) {
        return data({ error: "Problema de conexión, por favor intente más tarde" });
    }
}

export default function LogInPage() {
    const fetcher = useFetcher();
    const isPending = fetcher.state !== "idle";
    const { register, handleSubmit, formState: { errors } } = useForm();
    const submit = handleSubmit(data => {
        fetcher.submit(data, { method: "POST" });
    });
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
                <button onClick={submit} disabled={isPending} className="gap-2 cursor-pointer items-center mt-7 rounded-md w-full bg-ctp-frappe-lavender text-ctp-frappe-crust transtiion-all font-medium px-3 flex justify-center py-2 shadow hover:shadow-lg">
                    {
                        isPending &&
                        <BouncingLoader className="size-4 bg-white" />
                    }
                    {
                        !isPending &&
                        <>
                            <ChevronRightIcon className="size-5" />
                            Iniciar sesión
                        </>
                    }
                </button>
            </section>
        </main>
    );
}

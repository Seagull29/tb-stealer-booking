import { AlarmClockOffIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useFetcher } from "react-router";
import { useEffect, useState } from "react";
import { useDisplayResponseToast } from "@/hooks/useDisplayResponseToast";
import BouncingLoader from "./BouncingLoader";

interface Props {
    bookingId: string;
}

export default function StopBookingButton({ bookingId }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const fetcher = useFetcher();
    const isPending = fetcher.state !== "idle";
    useEffect(() => {
        if (fetcher.data?.message) {
            setOpen(false);
        }
    }, [fetcher.data])
    useDisplayResponseToast(fetcher);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="cursor-pointer flex items-center px-3 py-2 rounded-lg gap-2 text-ctp-frappe-crust text-sm font-medium bg-ctp-frappe-red transition-all hover:scale-95">
                    <AlarmClockOffIcon className="size-5" />
                    <p>Eliminar</p>
                </button>
            </PopoverTrigger>
            <PopoverContent className="bg-ctp-frappe-crust border border-ctp-frappe-surface-2 w-72 shadow-lg shadow-xl">
                <p className="text-ctp-frappe-text text-sm font-medium">Cancelar reserva</p>
                <p className="text-ctp-frappe-subtext-0 text-sm mt-2">Al cancelar la reserva, una vez sean liberados los boletos, estos no serán tomados de vuelta</p>
                <fetcher.Form method="POST" action={`/stop-booking/${bookingId}`}>
                    <button type="submit" disabled={isPending} className="cursor-pointer mt-5 text-sm shadow px-3 py-2 mx-auto rounded-md bg-ctp-frappe-red text-red-950 flex items-center gap-2 transition-all hover:scale-95">
                        {
                            isPending &&
                            <BouncingLoader className="size-4 bg-white" />
                        }
                        {
                            !isPending &&
                            <>
                                <AlarmClockOffIcon className="size-5" />
                                <p>Cancelar</p>
                            </>
                        }
                    </button>
                </fetcher.Form>
            </PopoverContent>
        </Popover>
    );
}
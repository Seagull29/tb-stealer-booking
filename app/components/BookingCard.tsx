import { ROAD_OPTIONS } from "@/lib/data";
import { customDayjs } from "@/lib/utils";
import type { BookingSchema } from "@/types/types";
import { AlarmClockOffIcon, BookPlusIcon, CalendarClockIcon, CalendarIcon, MapPinIcon, TicketIcon, UsersIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import PassengerTable from "./PassengerTable";
import StopBookingButton from "./StopBookingButton";

interface Props {
    booking: BookingSchema;
}

export default function BookingCard({ booking }: Props) {
    const roadName = ROAD_OPTIONS.find(road => road.value === String(booking?.road))?.label;

    return (
        <article className="bg-ctp-frappe-mantle border rounded-lg p-5 border-ctp-frappe-surface-1 shadow-md">
            <header className="flex gap-5 justify-between items-center text-ctp-frappe-text">
                <div className="flex items-center gap-2">
                    <MapPinIcon className="size-5" />
                    <p className="font-medium text-lg">{roadName}</p>
                </div>
                <StopBookingButton bookingId={booking.bookingId} />
            </header>
            <section className="mt-5">
                <main className="flex gap-10">
                    <article className="flex flex-col gap-1 text-sm">
                        <div className="flex text-ctp-frappe-subtext-0 items-center gap-1">
                            <CalendarIcon className="size-4" />
                            <p className="">Fecha de reserva</p>
                        </div>
                        <p className="text-ctp-frappe-text">{customDayjs(booking.date, "YYYY-MM-DD").format("DD/MM/YYYY")}</p>
                    </article>
                    <article className="flex flex-col gap-1 text-sm">
                        <div className="flex text-ctp-frappe-subtext-0 items-center gap-1">
                            <TicketIcon className="size-4" />
                            <p className="">Tickets consumidos</p>
                        </div>
                        <p className="text-ctp-frappe-text">{booking.tickets.toString().padStart(2, "0")}</p>
                    </article>
                    <article className="flex flex-col gap-1 text-sm">
                        <div className="flex text-ctp-frappe-subtext-0 items-center gap-1">
                            <CalendarClockIcon className="size-4" />
                            <p className="">Primera ejecución</p>
                        </div>
                        <p className="text-ctp-frappe-text">{customDayjs(booking.startingBookingTime).format("DD/MM/YYYY HH:mm")}</p>
                    </article>
                    <article className="flex flex-col gap-1 text-sm">
                        <div className="flex text-ctp-frappe-subtext-0 items-center gap-1">
                            <CalendarClockIcon className="size-4" />
                            <p className="">Siguiente ejecución</p>
                        </div>
                        <p className="text-ctp-frappe-text">{customDayjs(booking.nextExpectedRetentionTime).format("DD/MM/YYYY HH:mm:ss")}</p>
                    </article>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <article className="cursor-pointer flex flex-col gap-1 text-sm">
                                            <div className="flex text-ctp-frappe-subtext-0 items-center gap-1">
                                                <UsersIcon className="size-4" />
                                                <p className="">Pasajeros</p>
                                            </div>
                                            <p className="text-ctp-frappe-text text-left">{booking.passengers?.length.toString().padStart(2, "0")}</p>
                                        </article>
                                    </PopoverTrigger>
                                    <PopoverContent className="bg-ctp-frappe-crust border border-ctp-frappe-surface-2 w-fit shadow-2xl">
                                        <PassengerTable passengers={booking.passengers} />
                                    </PopoverContent>
                                </Popover>
                            </TooltipTrigger>
                            <TooltipContent>Ver información de pasajeros</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </main>
            </section>
        </article>
    );
}
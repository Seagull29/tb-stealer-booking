import { CalendarIcon, TriangleAlertIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { useController, type Control, type FieldValues, type Path} from "react-hook-form"
import dayjs from "dayjs"
import { customDayjs, getNestedError } from "@/lib/utils"

interface Props<FormType extends FieldValues> {
    label: string;
    control: Control<FormType>;
    name: string;
    inputInfo?: string;
}

export default function FormDateInput<FormType extends FieldValues>({ label, inputInfo, control, name, }: Props<FormType>) {

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date | undefined>(date);

    const { field: { onChange, value, ref }, formState: { errors } } = useController({
        name: name as Path<FormType>,
        control
    });

    useEffect(() => {
        if (value) {
            const parsedDate = customDayjs(value, "DD/MM/YYYY");
            if (parsedDate.isValid()) {
                setDate(parsedDate.toDate());
                setMonth(parsedDate.toDate());
            }
        }
    }, [value]);

    const fieldErrors = getNestedError(errors, name);

    return (
        <div className="group w-full text-sm space-y-2 ">
            <p className="font-medium text-ctp-frappe-text">{label}</p>
            <div className="flex relative items-center rounded-md ring-1 shadow ring-ctp-frappe-overlay-0 group-has-[:focus]:ring-ctp-frappe-lavender group-has-[:focus]:bg-ctp-frappe-surface-1 group-has-[:focus]:ring-[3px] group-hover:bg-ctp-frappe-surface-1 group-hover:ring-ctp-frappe-overlay-0 transition group-has-[:disabled]:opacity-70">
                <input
                    value={value}
                    ref={ref}
                    className="rounded-md font-medium w-full outline-none py-2 pr-3 pl-5 focus:bg-ctp-frappe-surface-1 text-ctp-frappe-text group-hover:bg-ctp-frappe-surface-1 transition"
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        onChange(inputValue);
                        // Only update the calendar if it's a valid date
                        const dateDayjs = customDayjs(inputValue, "DD/MM/YYYY");
                        if (dateDayjs.isValid()) {
                            setDate(dateDayjs.toDate());
                            setMonth(dateDayjs.toDate());
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2 cursor-pointer text-ctp-frappe-text hover:bg-ctp-frappe-surface-1"
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Seleccione la fecha</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0 z-[1500]"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(selectedDate) => {
                                if (selectedDate) {
                                    setDate(selectedDate);
                                    onChange(dayjs(selectedDate).format("DD/MM/YYYY"));
                                    setOpen(false);
                                }
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            {
                Boolean(fieldErrors) &&
                <section className="bg-ctp-frappe-red text-ctp-frappe-crust w-fit shadow rounded-md flex gap-2 py-1 px-3 items-center text-xs">
                    <div>
                        <TriangleAlertIcon className="w-4" />
                    </div>
                    <p className="font-semibold">{fieldErrors?.message?.toString()}</p>

                </section>
            }
            {
                Boolean(inputInfo) &&
                <p className="text-xs text-ctp-frappe-subtext-0">{inputInfo}</p>
            }
        </div>

    )
}

import { TriangleAlertIcon } from "lucide-react";
import { useController, type Control, type FieldValues } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { getNestedError } from "@/lib/utils";

interface Props<FormType extends FieldValues> {
    label: string;
    icon: React.ReactNode;
    name: string;
    options: { value: string; label: string; }[];
    control: Control<FormType>;
    placeholder: string;
    inputInfo?: string;
}

export default function FormSelect<FormType extends FieldValues>({ label, icon, options, name, control, placeholder, inputInfo }: Props<FormType>) {

    const { field: { value, onChange, ref }, formState: { errors } } = useController({
        name: name as any,
        control
    });

    const fieldError = getNestedError(errors, name);

    const selectOptions = options?.map((option, index) => (
        <SelectItem key={`${index}-${option?.value}`} value={option?.value?.toString()} className="cursor-pointer text-ctp-frappe-text">
            {option?.label}
        </SelectItem>
    ));
    
    return (
        <label className="w-full group space-y-2">
            <p className="text-sm font-medium text-ctp-frappe-text">{label}</p>
            <Select  value={value} onValueChange={value => onChange(value)}>
                <SelectTrigger ref={ref} autoFocus className="!px-3 !text-sm cursor-pointer outline-none !h-auto !shadow w-full font-medium text-ctp-frappe-text focus:!border-none group-focus:!outline-none  flex justify-between items-center gap-2 !py-2 !ring-1 ring-ctp-frappe-overlay-0 group-focus:!ring-ctp-frappe-lavender group-focus:!bg-ctp-frappe-surface-1 group-focus:!ring-[3px] group-hover:bg-ctp-frappe-surface-1 !border-none group-hover:!ring-ctp-frappe-overlay-0 transition group-has-[:disabled]:opacity-70 data-[placeholder]:!text-ctp-frappe-text">
                    <div className="flex items-center gap-6 ">
                        <div>
                            {icon}
                        </div>
                        <SelectValue placeholder={placeholder} className="cursor-pointer" />
                    </div>
                </SelectTrigger>
                <SelectContent className="relative z-[10000]">
                    {selectOptions}
                </SelectContent>
            </Select>

            {
                Boolean(fieldError) &&
                <section className="bg-ctp-frappe-red text-ctp-frappe-crust w-fit shadow rounded-md flex gap-2 py-1 px-3 items-center text-xs">
                    <div>
                        <TriangleAlertIcon className="w-4" />
                    </div>
                    <p className="font-semibold">{fieldError.message?.toString()}</p>
                </section>
            }
            {
                Boolean(inputInfo) &&
                <p className="text-xs text-ctp-frappe-subtext-0">{inputInfo}</p>
            }
        </label>
    )
}
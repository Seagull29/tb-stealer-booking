import { TriangleAlertIcon } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface Props<FormType extends string> {
    label: string;
    icon: React.ReactNode;
    registerProps: UseFormRegisterReturn<FormType>;
    inputType: string;
    errors: any;
    inputInfo?: string;
}

export default function FormInput<FormType extends string>({ label, icon, registerProps, inputType, errors, inputInfo }: Props<FormType>) {
    return (
        <label className="group space-y-2">
            <p className="text-sm font-medium text-ctp-frappe-text">{label}</p>
            <div className="flex text-sm items-center rounded-md ring-1 shadow ring-ctp-frappe-overlay-0 group-has-[:focus]:ring-ctp-frappe-lavender group-has-[:focus]:bg-ctp-frappe-surface-1 group-has-[:focus]:ring-[3px] group-hover:bg-ctp-frappe-surface-1 group-hover:ring-ctp-frappe-overlay-0 transition group-has-[:disabled]:opacity-70">
                <div className="px-3.5 py-3 rounded-l-lg cursor-pointer text-ctp-frappe-text">
                    {icon}
                </div>
                {
                    inputType === "number" &&
                    <input {...registerProps} type={inputType} min={0} className="rounded-r-md font-medium w-full outline-none py-2.5 px-2 focus:bg-ctp-frappe-surface-1 text-ctp-frappe-text group-hover:bg-ctp-frappe-surface-1 transition"></input>
                }
                {
                    inputType !== "number" &&
                    <input {...registerProps} type={inputType} className="rounded-r-md font-medium w-full outline-none py-2.5 px-2 focus:bg-ctp-frappe-surface-1 text-ctp-frappe-text group-hover:bg-ctp-frappe-surface-1 transition"></input>
                }
            </div>
            {
                Boolean(errors) &&
                <section className="bg-ctp-frappe-red text-red-900 w-fit shadow rounded-md flex gap-2 py-1 px-3 items-center text-xs ">
                    <div>
                        <TriangleAlertIcon className="w-4" />
                    </div>
                    <p className="font-semibold">{errors?.message}</p>
                </section>
            }
            {
                Boolean(inputInfo) &&
                <p className="text-xs text-ctp-frappe-subtext-0">{inputInfo}</p>
            }
        </label>
    );
}
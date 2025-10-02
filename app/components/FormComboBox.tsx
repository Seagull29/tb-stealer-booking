import { CheckIcon, ChevronsUpDownIcon, TriangleAlertIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useController, type Control } from "react-hook-form";
import React, { useState } from "react";
import { getNestedError } from "@/lib/utils";
import type { FormComboBoxOption } from "@/types/types";

interface Props {
    options: FormComboBoxOption[];
    control: Control<any>;
    name: string;
    placeholder: string;
    label: string;
    icon: React.ReactNode;
}

export default function FormComboBox({ options, control, name, placeholder, label, icon }: Props) {

    const [open, setOpen] = useState<boolean>(false);
    const { field: { value, onChange, ref }, formState: { errors } } = useController({
        control,    
        name
    });

    const selectOption = (currentValue: string) => {
        const item = options.find(option => currentValue === option.searchTerm);
        onChange(item?.value === value ? "" : item?.value);
        setOpen(false);
    };

    const items = options.map((item, index) => {
        const isSelected = item.value === value;
        return (
            <CommandItem className="text-catppuccin-latte-text" key={`combobox-${index}-${item.value}`} value={item.searchTerm} onSelect={selectOption}>
                {item.optionLabel}
                <CheckIcon className={`ml-auto transition-all size-4 ${isSelected ? "opacity-100" : "opacity-0"}`} />
            </CommandItem>
        );
    });

    const selectedOption = options.find(option => option.value === value)?.displayLabel;

    const fieldErrors = getNestedError(errors, name);

    return (
        <div className="group w-full text-sm space-y-2">
            <p className="font-medium text-grouptravel-900">{label}</p>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button ref={ref} className="cursor-pointer py-2 px-3 gap-2 text-grouptravel-900 font-medium w-full flex justify-between relative items-center rounded-md ring-1 shadow ring-stone-300 group-has-[:focus]:ring-grouptravel-600/40 group-has-[:focus]:bg-grouptravel-50 group-has-[:focus]:ring-[3px] group-hover:bg-grouptravel-50 group-hover:ring-grouptravel-600/45 transition group-has-[:disabled]:opacity-70 dark:bg-catppuccin-macchiato-surface-0 dark:group-hover:bg-catppuccin-macchiato-mantle dark:ring-catppuccin-macchiato-surface-1 dark:group-has-[:focus]:bg-catppuccin-macchiato-mantle dark:group-hover:ring-catppuccin-macchiato-overlay-0/50 dark:group-has-[:focus]:ring-catppuccin-macchiato-overlay-0/50">
                        <div className="flex items-center gap-2">
                            <div className="">
                                {icon}
                            </div>
                            {
                                value ?
                                    <span className="px-3.5">{selectedOption}</span>
                                    :
                                    <span className="px-3.5 text-grouptravel-900/80">{placeholder}</span>
                            }
                        </div>
                        <ChevronsUpDownIcon className="opacity-50 size-5" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="!z-[1510] w-fit">
                    <Command filter={(value, search, __) => {
                        const normalizedValue = value.toLowerCase().replaceAll("í", "i").replaceAll("é", "e").replaceAll("á", "a").replaceAll("ó", "o").replaceAll("ú", "u");
                        const normalizedSearch = search.toLowerCase().replaceAll("í", "i").replaceAll("é", "e").replaceAll("á", "a").replaceAll("ó", "o").replaceAll("ú", "u");
                        return normalizedValue.includes(normalizedSearch) ? 1 : 0;
                    }}>
                        <CommandInput placeholder="Buscar" className="text-catppuccin-latte-text" />
                        <CommandList className="vertical-scrollbar">
                            <CommandEmpty className="text-catppuccin-latte-subtext-0 text-sm text-center mt-4">Sin resultados</CommandEmpty>
                            <CommandGroup>
                                {items}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {
                Boolean(fieldErrors) &&
                <section className="bg-red-500 text-white w-fit shadow rounded-md flex gap-2 py-1 px-3 items-center text-xs dark:bg-catppuccin-macchiato-red dark:text-red-950">
                    <div>
                        <TriangleAlertIcon className="w-4" />
                    </div>
                    <p className="font-semibold">{fieldErrors.message?.toString()}</p>
                </section>
            }
        </div>
    );
}
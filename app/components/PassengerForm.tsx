import { useFormContext } from "react-hook-form";
import FormInput from "./FormInput";
import { CreditCardIcon, GlobeIcon, IdCardIcon, TextIcon, TransgenderIcon, Trash2Icon } from "lucide-react";
import FormDateInput from "./FormDateInput";
import FormSelect from "./FormSelect";
import { COUNTRY_IDS, DOCUMENT_TYPE_OPTIONS, SEX_OPTIONS, TAX_ID_OPTIONS } from "@/lib/data";
import FormComboBox from "./FormComboBox";
import type { BookingSchemaValidatorType } from "@/lib/booking.validator";

interface Props {
    index: number;
    removePassenger: () => void;
}

export default function PassengerForm({ index, removePassenger }: Props) {
    const { register, control, formState: { errors } } = useFormContext<BookingSchemaValidatorType>();
    return (
        <article className="p-5 border rounded-lg border-ctp-frappe-overlay-0 mt-8">
            <header className="flex justify-between items-center">
                <p className="text-ctp-frappe-text">Pasajero {index + 1}</p>
                {
                    Number(index) > 0 &&
                    <button onClick={removePassenger} className="p-2 rounded-lg transition-all cursor-pointer bg-ctp-frappe-red hover:scale-105">
                        <Trash2Icon className="size-5 text-ctp-frappe-crust" />
                    </button>
                }
            </header>
            <main className="grid grid-cols-2 gap-5 mt-5">
                <FormInput
                    label="Nombre"
                    errors={errors.passengers?.[index]?.name}
                    icon={<TextIcon className="size-5" />}
                    inputType="text"
                    registerProps={register(`passengers.${index}.name` as const)}
                />
                <FormInput
                    label="Apellido paterno"
                    errors={errors.passengers?.[index]?.lastName}
                    icon={<TextIcon className="size-5 " />}
                    inputType="text"
                    registerProps={register(`passengers.${index}.lastName` as const)}
                />
                <FormInput
                    label="Apellido materno"
                    errors={errors.passengers?.[index]?.secondLastName}
                    icon={<TextIcon className="size-5" />}
                    inputType="text"
                    registerProps={register(`passengers.${index}.secondLastName` as const)}
                />
                <FormInput
                    label="Pasaporte"
                    errors={errors.passengers?.[index]?.passport}
                    icon={<IdCardIcon className="size-5" />}
                    inputType="text"
                    registerProps={register(`passengers.${index}.passport` as const)}
                />
                <FormDateInput
                    control={control}
                    label="Fecha de nacimiento"
                    name={`passengers.${index}.birthdate` as const}
                />
                <FormSelect
                    control={control}
                    name={`passengers.${index}.sex` as const}
                    label="Sexo"
                    options={SEX_OPTIONS}
                    icon={<TransgenderIcon className="size-5 text-ctp-frappe-text" />}
                    placeholder="Seleccione el sexo"
                />
                <FormSelect
                    control={control}
                    name={`passengers.${index}.documentTypeId` as const}
                    label="Tipo de documento"
                    options={DOCUMENT_TYPE_OPTIONS}
                    icon={<IdCardIcon className="size-5 text-ctp-frappe-text" />}
                    placeholder="Seleccione una opción"
                />
                <FormSelect
                    control={control}
                    name={`passengers.${index}.taxId` as const}
                    label="Tipo de tarifa"
                    options={TAX_ID_OPTIONS}
                    icon={<CreditCardIcon className="size-5 text-ctp-frappe-text" />}
                    placeholder="Seleccione una opción"
                />
                <FormComboBox
                    control={control}
                    name={`passengers.${index}.countryId` as const}
                    label="País"
                    icon={<GlobeIcon className="size-5 text-ctp-frappe-text" />}
                    options={COUNTRY_IDS}
                    placeholder="Seleccione el país"
                />

            </main>
        </article>
    );
}
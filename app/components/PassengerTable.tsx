import { COUNTRY_IDS } from "@/lib/data";
import { customDayjs } from "@/lib/utils";
import type { PassengerModel } from "@/types/types";

interface Props {
    passengers: PassengerModel[];
}

export default function PassengerTable({ passengers }: Props) {
    
    const passengerRows = passengers.map(passenger => {
        const sex = passenger.sex === "Femenino" ? "F" : "M";
        const countryName = COUNTRY_IDS.find(country => country.value === passenger.countryId)?.displayLabel || "";
        return (
            <tr key={passenger.id} className="*:px-2 *:text-sm text-ctp-frappe-text *:py-1 *:font-medium">
                <td>{passenger.name}</td>
                <td>{passenger.lastName} {passenger.secondLastName}</td>
                <td>{customDayjs(passenger.birthdate, "DD-MM-YYYY").format("DD/MM/YYYY")}</td>
                <td>{passenger.id}</td>
                <td>{countryName}</td>
                <td>{sex}</td>
            </tr>
        );
    });

    return (
        <table>
            <thead>
                <tr className="*:text-left *:text-ctp-frappe-subtext-0 *:text-sm *:px-2 *:py-2">
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>F. nacimiento</th>
                    <th>Pasaporte</th>
                    <th>País</th>
                    <th>Sexo</th>
                </tr>
            </thead>
            <tbody className="mt-2">
                { passengerRows }
            </tbody>
        </table>
    );
}
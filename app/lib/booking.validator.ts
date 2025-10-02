import z from "zod";
import { customDayjs } from "./utils";

export const PassengerSchemaValidator = z.object({
    name: z.string({ error: "Debe ingresar el nombre del pasajero" }).trim().min(1, "Debe ingresar el nombre del pasajero").max(50, "El nombre del pasajero no debe exceder los 50 caracteres"),
    lastName: z.string({ error: "Debe ingresar el apellido paterno del pasajero" }).trim().min(1, "Debe ingresar el apellido paterno del pasajero").max(50, "El apellido paterno del pasajero no debe exceder los 50 caracteres"),
    secondLastName: z.string({ error: "Debe ingresar el apellido materno del pasajero" }).trim().max(50, "El apellido materno del pasajero no debe exceder los 50 caracteres").optional().default(""),
    birthdate: z.string({ message: "Debe indicar la fecha de nacimiento" }).trim().length(10, "Debe ingresar la fecha de nacimiento").regex(/^\d{2}\/\d{2}\/\d{4}$/, "La fecha de nacimiento debe tener el formato DD/MM/YYYY").refine(date => {
        const [day, month, year] = date.split("/");
        if (Number(day) > 31 || Number(month) > 12 || year?.length !== 4) {
            return false;
        }
        if (Number(day) === 29 && Number(month) === 2) {
            return customDayjs(date, "DD/MM/YYYY").isLeapYear();
        }
        return true;
    }, { message: "Debe ingresar una fecha correcta" }),
    sex: z.enum(["Masculino", "Femenino"], { error: "Debe seleccionar el sexo del pasajero" }),
    passport: z.string({ error: "Debe ingresar el número de documento del pasajero" }).trim().min(5, "El número de documento del pasajero debe tener al menos 5 caracteres").max(25, "El número de documento del pasajero no debe exceder los 25 caracteres"),
    countryId: z.string({ error: "Debe seleccionar el país de expedición del documento" }).trim().min(1, "Debe seleccionar el país de expedición del documento").max(2, "El código del país de expedición del documento no debe exceder los 2 caracteres").regex(/^[0-9]+$/, "El id debe ser un número"),
    documentTypeId: z.string({ error: "Debe seleccionar el tipo de documento" }).refine(value => {
        return ["3", "7"].includes(value);
    }, { error: "Debe seleccionar un tipo de documento válido" }),
    taxId: z.string({ error: "Debe seleccionar el tipo de tarifa" }).refine(value => {
        return ["1", "2", "3"].includes(value);
    }, { error: "Debe seleccionar un tipo de tarifa válido" })
});

export const BookingSchemaValidator = z.object({
    date: z.string({ message: "Debe indicar la fecha de la reserva" }).trim().length(10, "Debe ingresar la fecha de la reserva").regex(/^\d{2}\/\d{2}\/\d{4}$/, "La fecha de la reserva debe tener el formato DD/MM/YYYY").refine(date => {
        const [day, month, year] = date.split("/");
        if (Number(day) > 31 || Number(month) > 12 || year?.length !== 4) {
            return false;
        }
        if (Number(day) === 29 && Number(month) === 2) {
            return customDayjs(date, "DD/MM/YYYY").isLeapYear();
        }
        return true;
    }, { message: "Debe ingresar una fecha correcta" }),
    road: z.string({ error: "Debe seleccionar la ruta" }).refine(value => {
        return ["1", "5"].includes(value);
    }, { error: "Debe seleccionar una ruta válida" }),
    passengers: z.array(PassengerSchemaValidator, { error: "Datos de pasajero incorrectos" }).min(1, "Debe agregar al menos un pasajero").max(16, "No puede agregar más de 16 pasajeros")
});

export type BookingSchemaValidatorType = z.infer<typeof BookingSchemaValidator>;

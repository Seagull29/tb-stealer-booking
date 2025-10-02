import z from "zod";

export const LogInSchemaValidator = z.object({
    email: z.email({ error: "Debe ingresar un correo válido" }).trim().min(1, "Debe ingresar el correo electrónico").max(100, "El correo electrónico no debe exceder los 100 caracteres"),
    password: z.string({ error: "Debe ingresar la contraseña" }).trim().min(1, "Debe ingresar la contraseña").min(8, "La contraseña debe tener al menos 8 caracteres").max(100, "La contraseña no debe exceder los 100 caracteres")
});

export type LogInSchemaValidatorType = z.infer<typeof LogInSchemaValidator>;
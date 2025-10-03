export type FormComboBoxOption = {
    value: string;
    searchTerm: string;
    displayLabel: string;
    optionLabel: React.ReactNode;
};

export type SessionSchema = {
    token: string;
};

export type PassengerModel = {
    name: string;
    lastName: string;
    secondLastName: string;
    birthdate: string;
    countryId: string;
    documentTypeId: number;
    originId: number;
    taxId: number;
    id: string;
    originName: string;
    sex: string;
    taxName: string;
};

export type BookingSchema = {
    bookingId: string;
    road: number;
    date: string;
    tickets: number;
    passengers: PassengerModel[];
    status: "SCHEDULED" | "BOOKED" | "PAID";
    nextExpectedRetentionTime: number;
    startingBookingTime: number;
}
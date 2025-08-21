import type { Tables } from "./database.types";

export type EmployeeSelect = Pick<Tables<"employees">, "id" | "name" | "surname">;
export type PatientSelect = Pick<Tables<"patients">, "id" | "name" | "surname">;
export type RoomSelect = Pick<Tables<"rooms">, "id" | "name">;

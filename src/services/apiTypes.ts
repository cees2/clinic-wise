import type { Tables } from "./database.types";

export type EmployeeSearchSelect = Pick<Tables<"employees">, "id" | "name" | "surname">;

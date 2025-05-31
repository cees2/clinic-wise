export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            appointments: {
                Row: {
                    additional_note: string;
                    created_at: string;
                    duration: number | null;
                    employee_id: number | null;
                    id: number;
                    number_of_patients: number | null;
                    patient_id: number | null;
                    start_date: string | null;
                    status: string | null;
                };
                Insert: {
                    additional_note: string;
                    created_at?: string;
                    duration?: number | null;
                    employee_id?: number | null;
                    id?: number;
                    number_of_patients?: number | null;
                    patient_id?: number | null;
                    start_date?: string | null;
                    status?: string | null;
                };
                Update: {
                    additional_note?: string;
                    created_at?: string;
                    duration?: number | null;
                    employee_id?: number | null;
                    id?: number;
                    number_of_patients?: number | null;
                    patient_id?: number | null;
                    start_date?: string | null;
                    status?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "appointments_employee_id_fkey";
                        columns: ["employee_id"];
                        isOneToOne: false;
                        referencedRelation: "employees";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "appointments_patient_id_fkey";
                        columns: ["patient_id"];
                        isOneToOne: false;
                        referencedRelation: "patients";
                        referencedColumns: ["id"];
                    },
                ];
            };
            employees: {
                Row: {
                    address: string | null;
                    appointment_ids: number | null;
                    created_at: string;
                    date_of_birth: string | null;
                    document_id: string | null;
                    gender: string | null;
                    id: number;
                    name: string | null;
                    nationality: string | null;
                    phone_number: string | null;
                    start_date: string | null;
                    surname: string | null;
                };
                Insert: {
                    address?: string | null;
                    appointment_ids?: number | null;
                    created_at?: string;
                    date_of_birth?: string | null;
                    document_id?: string | null;
                    gender?: string | null;
                    id?: number;
                    name?: string | null;
                    nationality?: string | null;
                    phone_number?: string | null;
                    start_date?: string | null;
                    surname?: string | null;
                };
                Update: {
                    address?: string | null;
                    appointment_ids?: number | null;
                    created_at?: string;
                    date_of_birth?: string | null;
                    document_id?: string | null;
                    gender?: string | null;
                    id?: number;
                    name?: string | null;
                    nationality?: string | null;
                    phone_number?: string | null;
                    start_date?: string | null;
                    surname?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "employees_appointment_ids_fkey";
                        columns: ["appointment_ids"];
                        isOneToOne: false;
                        referencedRelation: "appointments";
                        referencedColumns: ["id"];
                    },
                ];
            };
            patients: {
                Row: {
                    address: string | null;
                    appointment_ids: number | null;
                    created_at: string;
                    date_of_birth: string | null;
                    gender: string | null;
                    id: number;
                    name: string | null;
                    nationality: string | null;
                    phone_number: string | null;
                    surname: string | null;
                };
                Insert: {
                    address?: string | null;
                    appointment_ids?: number | null;
                    created_at?: string;
                    date_of_birth?: string | null;
                    gender?: string | null;
                    id?: number;
                    name?: string | null;
                    nationality?: string | null;
                    phone_number?: string | null;
                    surname?: string | null;
                };
                Update: {
                    address?: string | null;
                    appointment_ids?: number | null;
                    created_at?: string;
                    date_of_birth?: string | null;
                    gender?: string | null;
                    id?: number;
                    name?: string | null;
                    nationality?: string | null;
                    phone_number?: string | null;
                    surname?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "patients_appointment_ids_fkey";
                        columns: ["appointment_ids"];
                        isOneToOne: false;
                        referencedRelation: "appointments";
                        referencedColumns: ["id"];
                    },
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
              Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
            DefaultSchema["Views"])
      ? (DefaultSchema["Tables"] &
            DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
        | keyof DefaultSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
      ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
      : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof DefaultSchema["CompositeTypes"]
        | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
      ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
      : never;

export const Constants = {
    public: {
        Enums: {},
    },
} as const;

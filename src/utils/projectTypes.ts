import type { ButtonHTMLAttributes, FormHTMLAttributes, RefObject, SetStateAction } from "react";
import type React from "react";
import type { Database, Tables } from "../services/database.types";
import type { Control, FieldPath, FormState, Path, RegisterOptions } from "react-hook-form";
import type { Props as SelectProps } from "react-select";
import type { KnownTarget } from "styled-components/dist/types";
import type { User } from "@supabase/supabase-js";

export interface Children {
    children: React.ReactNode;
}

export interface MainNavigationConfigItem {
    to: string;
    icon: React.ReactNode;
    title: string;
    visible?: boolean;
}

export interface HeaderActions {
    title: string;
    isInDropdown?: boolean;
    onClick?: () => void;
    path?: string;
}

export enum TableVariant {
    PRIMARY,
    BARE,
}

export interface TableProps extends React.ComponentProps<"table"> {
    gridTemplateColumns?: string;
    numberOfColumns?: number;
    className?: string;
    variant?: TableVariant;
}

export interface TableHeaderCellProps extends React.ComponentProps<"th"> {
    columnIndex: number;
    className?: string;
}

export interface TableRowProps extends React.ComponentProps<"tr"> {
    className?: string;
}
export interface TableRowCellProps extends React.ComponentProps<"td"> {
    className?: string;
}
export interface TableRowCellProps extends React.ComponentProps<"td"> {
    className?: string;
}

export interface TableDataColumn<T extends Record<string, any>> {
    id: keyof T;
    name: string;
    render?: (dataItem: T) => React.ReactNode | number | string;
    foreignTableColumnsName?: string[];
    customInclude?: string;
    disableSorting?: true;
}

export type FilterCondition = "e" | "ne" | "c" | "gt" | "gte" | "lt" | "lte";

export enum FilterType {
    NUMBER,
    TEXT,
    ENUM,
    DATE,
}

export interface EnumFilterOption {
    value: string;
    name: string;
}

export interface TableDataFilterConfig<T extends TableDataResourceType> {
    id: keyof T;
    name: string;
    type: FilterType;
    conditions?: FilterCondition[];
    maxValue?: number;
    minValue?: number;
    options?: EnumFilterOption[];
}

export interface TableDataAction<T extends TableDataResourceType> {
    id: string;
    name: string;
    path?: (item: T) => string;
    action?: (item: T) => void | Promise<void>;
    visible?: (item: T) => boolean;
}

export interface TableDataConfig<T extends TableDataResourceType> {
    columns: TableDataColumn<T>[];
    gridTemplateColumns?: string;
    resourceName: keyof Database["public"]["Tables"];
    filters?: TableDataFilterConfig<T>[];
    actions?: TableDataAction<T>[];
}

export type TableDataResourceType = Record<string, any> & { id: number };

// TODO: TableDataConfig with generic type which will allow fields like a TableDataColumn.id have proper type?
// TODO: Create differenet files for types??

export interface TableDataFilterState<T> {
    id: keyof T;
    filterValue: string;
    filterCondition: FilterCondition;
    filterType: FilterType;
}

export interface TableDataSortState<T> {
    id: keyof T;
    isAscending: boolean;
}

export interface TableDataState<T extends TableDataResourceType> {
    selectedSort: TableDataSortState<T> | null;
    selectedFilters: TableDataFilterState<T>[];
    selectedPage: number;
    selectedPaginationSize: number;
}

export interface TableDataContextType<T> {
    config: TableDataConfig<T>;
    tableDataState: TableDataState<T>;
    dispatch: React.ActionDispatch<React.AnyActionArg>;
    resources: T[];
    itemsCount?: number | null;
}

export enum TableDataActionsEnum {
    SET_SORT,
    ADD_FILTER,
    REMOVE_FILTER,
    REPLACE_FILTER,
    SET_PAGINATION_SIZE,
    SET_PAGE,
    SET_NEXT_PAGE,
    SET_PREVIOUS_PAGE,
}

export type TableDataActionsType<T extends TableDataResourceType> =
    | {
          type: TableDataActionsEnum.SET_SORT;
          payload: {
              id: keyof T;
              isAscending: boolean;
          } | null;
      }
    | {
          type: TableDataActionsEnum.ADD_FILTER;
          payload: TableDataFilterState<T>;
      }
    | {
          type: TableDataActionsEnum.REMOVE_FILTER;
          payload: string;
      }
    | {
          type: TableDataActionsEnum.REPLACE_FILTER;
          payload: TableDataFilterState<T>;
      }
    | {
          type: TableDataActionsEnum.SET_PAGINATION_SIZE;
          payload: number;
      }
    | {
          type: TableDataActionsEnum.SET_PAGE;
          payload: number;
      }
    | {
          type: TableDataActionsEnum.SET_NEXT_PAGE;
      }
    | {
          type: TableDataActionsEnum.SET_PREVIOUS_PAGE;
      };

export interface DropdownContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpening: boolean;
    setIsOpening: React.Dispatch<React.SetStateAction<boolean>>;
    dropdownToggleRef: RefObject<HTMLButtonElement | null>;
    setDropdownToggleRef: (dropdownToggleRef: RefObject<HTMLButtonElement> | null) => void;
    placement: DropdownPlacementType;
    autoClose: boolean;
}

export interface StyledDropdownMenuProps {
    toggleHeight: number;
    toggleWidth: number;
    placement: DropdownPlacementType;
}

export type DropdownPlacementType = "top" | "bottom" | "left" | "right";

export interface DropdownItemsProps<T> {
    render: (item: T) => React.ReactNode;
    items: T[];
    onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

export interface DropdownToggleProps extends Children {
    hideDefaultIcon?: true;
    className?: string;
    isForm?: true;
}

export type NumberFilterForm = {
    [K in Exclude<FilterCondition, "c">]: number | undefined | "";
};

export type TextFilterCondition = Extract<FilterCondition, "e" | "c">;

export type TextFilterForm = {
    [K in TextFilterCondition]: string;
};

export enum SortTableEnum {
    ASCENDING,
    DESCENDING,
    NONE,
}

interface EmployeeFormAdditionalData {
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: UserRole;
}

export type AppointmentFormType = Partial<Omit<Tables<"appointments">, "created_at" | "id" | "status">>;
export type AppointmentUpdateType = Partial<Omit<Tables<"appointments">, "created_at">>;
export type PatientFormType = Partial<Omit<Tables<"patients">, "created_at" | "id">>;
export type PatientUpdateType = Partial<Omit<Tables<"employees">, "created_at">>;
export type EmployeeFormType = Partial<Omit<Tables<"employees">, "created_at" | "id">> & EmployeeFormAdditionalData;
export type EmployeeUpdateType = Partial<Omit<Tables<"employees">, "created_at">>;
export type RoomOccupationFormType = Partial<Omit<Tables<"rooms_occupancy">, "created_at" | "id">>;
export type RoomOccupationGenerateType = Omit<Tables<"rooms_occupancy">, "created_at" | "id">;
export type RoomFormType = Omit<Tables<"rooms">, "created_at" | "id">;

export interface Person {
    name: string;
    surname: string;
    date_of_birth: string;
    nationality: string;
    address: string;
    gender: string;
    phone_number: string;
    document_id: string;
}

export interface ModalContextType {
    showModal: boolean;
    onHide: () => void;
}

export interface ConfirmationType {
    title?: string;
    caption?: string;
    onConfirm: () => void;
    onReject?: () => void;
}

export interface ConfirmationContextType {
    confirmation: (confirmation: ConfirmationType) => void;
}

export enum TimePickerMode {
    HOURS,
    MINUTES,
}

export interface FormSelectOption {
    value: string;
    label: string;
}

export interface GridLayoutProps {
    templateColumns?: string;
    templateRows?: string;
    columns?: number;
    rows?: number;
    columnMinWidth?: string;
    columnMaxWidth?: string;
    columnGap?: string;
    rowGap?: string;
    gap?: string;
    className?: string;
}

export interface FormSubmitProps<FormType extends Record<string, any>> extends FormHTMLAttributes<HTMLFormElement> {
    onSubmit: (event: React.SyntheticEvent) => Promise<void>;
    children: React.ReactNode;
    formState: FormState<FormType>;
    onCancel?: () => void;
    customButtons?: React.ReactNode;
}

export interface FormSelectInputProps<
    OptionsType extends Record<string, any>,
    isMulti extends boolean,
    FormType extends Record<string, any>,
> extends SelectProps<OptionsType, isMulti> {
    options?: OptionsType[];
    loadOptions?: (inputValue: string) => Promise<OptionsType[]>;
    control: Control<FormType>;
    registerName: FieldPath<FormType>;
    label: string;
    rules?: Omit<
        RegisterOptions<OptionsType, Path<OptionsType>>,
        "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
    >;
}

export interface FormSelectInputSimpleProps<
    OptionsType extends Record<string, any>,
    isMulti extends boolean,
    FormType extends Record<string, any>,
> extends FormSelectInputProps<OptionsType, isMulti, FormType> {
    options: OptionsType[];
}

export interface FormSelectInputAsyncProps<
    OptionsType extends Record<string, any>,
    isMulti extends boolean,
    FormType extends Record<string, any>,
> extends FormSelectInputProps<OptionsType, isMulti, FormType> {
    loadOptions: (inputValue: string) => Promise<OptionsType[]>;
}

export type ButtonVariant = "primary" | "danger" | "inactive";

export interface HeaderButton {
    title: string;
    variant?: ButtonVariant;
    onClick?: () => void;
    path?: string;
    visible?: boolean;
}

export interface HeaderProps {
    title: string;
    as: KnownTarget;
    buttons?: HeaderButton[];
    className?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: ButtonVariant;
    disabled?: boolean;
}

export type SupportedCountriesShortNames = "us" | "ca" | "mx" | "de" | "pl" | "fr" | "no" | "it";

export interface DropdownMenuProps extends Children {
    onHideDropdown?: () => void;
    className?: string;
}

export interface LoginApi {
    email: string;
    password: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    user?: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | undefined | null>>;
}

export enum UserRole {
    ADMIN = "ADMIN",
    DOCTOR = "DOCTOR",
    REGISTRATION = "REGISTRATION",
}

export interface UpdateUserFormType {
    email: string;
    fullName: string;
    avatar: FileList | string | null;
}

export interface UpdateUserCompleteInfo extends UpdateUserFormType {
    userId: string;
    previousAvatarName?: string;
    role: UserRole;
}

export interface UpdateUserRequestType {
    email: string;
    data: { fullName: string; avatarURL: string | null; role: UserRole };
}

export interface UpdatePasswordType {
    newPassword: string;
    confirmNewPassword: string;
}

export interface SettingsFormSectionProps<FormType extends Record<string, any>>
    extends GridLayoutProps,
        FormSubmitProps<FormType> {
    headerTitle: string;
}

export enum RoomsFilterIds {
    ROOM,
    DATE,
}

export enum RoomDateFilters {
    TODAY = "Today",
    TOMORROW = "Tomorrow",
}

export const RoomsTimeFilterOptionsArray = [RoomDateFilters.TODAY, RoomDateFilters.TOMORROW];
export const RoomsFilterIdsArray = [RoomsFilterIds.ROOM];

export interface RoomsFilterType {
    id: RoomsFilterIds;
    value: string;
}

export interface RoomsContextType {
    filters: RoomsFilterType[];
    setFilters: React.Dispatch<React.SetStateAction<RoomsFilterType[]>>;
}

export interface TooltipOverlayProps extends Children {
    className?: string;
    Tooltip: React.ReactElement;
    show?: boolean;
    showOnHover?: true;
}

export type tooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps extends Children {
    placement?: tooltipPlacement;
    className?: string;
}

export interface TimePickerProps {
    value: Date | string;
    onChange: (updatedValue: string | Date) => void;
    customHours?: number[];
    customMinutes?: number[];
}

export type NumberFilterConditionType = Exclude<FilterCondition, "c">;
export type DateFilterCondition = "gte" | "lte";

export interface FilterState<FilterType, FilterCondition> {
    filterValue: FilterType;
    filterCondition: FilterCondition;
}

export enum AppColorMode {
    LIGHT = "light",
    DARK = "dark",
}

export interface DarkModeContextType {
    appMode: AppColorMode;
    setAppMode: React.Dispatch<SetStateAction<AppColorMode>>;
}

export interface EmptyPageAction {
    title: string;
    variant?: ButtonVariant;
    action?: () => void;
    path?: string;
}

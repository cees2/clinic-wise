import type {
    ActionDispatch,
    ButtonHTMLAttributes,
    FormHTMLAttributes,
    ReactNode,
    RefObject,
    SetStateAction,
} from "react";
import type React from "react";
import type { Database, Tables } from "../services/database.types";
import type { Control, FieldPath, FormState, RegisterOptions } from "react-hook-form";
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

export enum MainNavigationState {
    OPEN,
    CLOSED,
}

export interface HeaderActions {
    title: string;
    isInDropdown?: boolean;
    onClick?: () => void;
    path?: string;
}

export interface TableBaseProps {
    gridTemplateColumns?: string;
    numberOfColumns?: number;
    className?: string;
}

export type TableProps = React.ComponentProps<"table"> & TableBaseProps;

export interface TableHeaderCellProps extends React.ComponentProps<"th"> {
    className?: string;
}

export interface TableRowProps extends TableBaseProps, React.ComponentProps<"tr"> {
    className?: string;
}
export interface TableRowCellProps extends React.ComponentProps<"td"> {
    className?: string;
}
export interface TableRowCellProps extends React.ComponentProps<"td"> {
    className?: string;
}

export interface TableDataColumn<TableDataResource extends TableDataResourceType> {
    id: Extract<keyof TableDataResource, string>;
    name: string;
    render?: (dataItem: TableDataResource) => React.ReactNode | number | string;
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

export interface TableDataFilterConfig {
    id: string;
    name: string;
    type: FilterType;
    conditions?: FilterCondition[];
    maxValue?: number;
    minValue?: number;
    options?: EnumFilterOption[];
}

export interface TableDataAction<TableDataResource extends TableDataResourceType> {
    id: string;
    name: string;
    path?: (item: TableDataResource) => string;
    action?: (item: TableDataResource) => void | Promise<void>;
    visible?: (item: TableDataResource) => boolean;
}

export interface TableDataConfig<TableDataResource extends TableDataResourceType> {
    columns: TableDataColumn<TableDataResource>[];
    gridTemplateColumns?: string;
    resourceName: keyof Database["public"]["Tables"];
    filters?: TableDataFilterConfig[];
    actions?: TableDataAction<TableDataResource>[];
}

export type TableDataResourceType = Record<string, any> & { id: number };

export type TableDataNumberFilterState = {
    filterValue: number;
    filterType: FilterType.NUMBER;
    filterCondition: NumberFilterConditionType;
};

export type TableDataTextFilterState = {
    filterValue: string;
    filterType: FilterType.TEXT;
    filterCondition: TextFilterCondition;
};

export type TableDataEnumFilterState = {
    filterValue: string;
    filterType: FilterType.ENUM;
    filterCondition: EnumFilterCondition;
};

export type TableDataDateFilterState = {
    filterValue: string;
    filterType: FilterType.DATE;
    filterCondition: DateFilterCondition;
};

export type TableDataFilterState = {
    id: string;
} & (TableDataNumberFilterState | TableDataTextFilterState | TableDataEnumFilterState | TableDataDateFilterState);

export interface TableDataSortState<TableDataResource> {
    id: Extract<keyof TableDataResource, string>;
    isAscending: boolean;
}

export interface TableDataState<TableDataResource extends TableDataResourceType> {
    selectedSort: TableDataSortState<TableDataResource> | null;
    selectedFilters: TableDataFilterState[];
    selectedPage: number;
    selectedPaginationSize: number;
}

export interface TableDataContextType<TableDataResource extends TableDataResourceType> {
    config: TableDataConfig<TableDataResource>;
    tableDataState: TableDataState<TableDataResource>;
    dispatch: ActionDispatch<[action: TableDataActionsType<TableDataResourceType>]>;
    resources?: TableDataResource[];
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

export type TableDataActionsType<TableDataResource extends TableDataResourceType> =
    | {
          type: TableDataActionsEnum.SET_SORT;
          payload: {
              id: Extract<keyof TableDataResource, string>;
              isAscending: boolean;
          } | null;
      }
    | {
          type: TableDataActionsEnum.ADD_FILTER;
          payload: TableDataFilterState;
      }
    | {
          type: TableDataActionsEnum.REMOVE_FILTER;
          payload: string;
      }
    | {
          type: TableDataActionsEnum.REPLACE_FILTER;
          payload: TableDataFilterState;
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
    setDropdownToggleRef: (dropdownToggleRef: RefObject<HTMLButtonElement | null>) => void;
    placement: DropdownPlacementType;
    autoClose: boolean;
}

export interface StyledDropdownMenuProps {
    $toggleHeight: number;
    $toggleWidth: number;
    $placement: DropdownPlacementType;
}

export type DropdownPlacementType = "top" | "bottom" | "left" | "right";

export interface DropdownItemsProps<Resource> {
    render: (item: Resource) => React.ReactNode;
    items: Resource[];
    onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

export interface DropdownToggleProps extends Children {
    hideDefaultIcon?: true;
    className?: string;
    isForm?: true;
}

export type NumberFilterForm = {
    [K in NumberFilterConditionType]: number | undefined | "";
};

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
}

interface OptionalID {
    id?: number;
}

export type AppointmentGenerateType = Omit<Tables<"appointments">, "id" | "created_at" | "user_id">;
export type AppointmentFormType = Omit<Tables<"appointments">, "created_at" | "status" | "id"> & OptionalID;
export type PatientFormType = Omit<Tables<"patients">, "created_at" | "id"> & OptionalID;
export type EmployeeFormType = Omit<Tables<"employees">, "created_at" | "id"> & EmployeeFormAdditionalData & OptionalID;
export type EmployeeGenerateType = Omit<Tables<"employees">, "created_at" | "id" | "user_id">;
export type RoomOccupancyFormType = Omit<Tables<"rooms_occupancy">, "created_at" | "id"> & OptionalID;
export type RoomFormType = Omit<Tables<"rooms">, "created_at" | "id"> & OptionalID;

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
    $templateColumns?: string;
    $templateRows?: string;
    $columns?: number;
    $rows?: number;
    $columnMinWidth?: string;
    $columnMaxWidth?: string;
    $columnGap?: string;
    $rowGap?: string;
    $gap?: string;
    $className?: string;
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
    rules?: Omit<RegisterOptions<FormType>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
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
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
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
    customHours?: number[];
    customMinutes?: number[];
    onChangeTimePicker: (value: Date) => void;
}

export type NumberFilterConditionType = Exclude<FilterCondition, "c">;
export type DateFilterCondition = Extract<FilterCondition, "gte" | "lte">;
export type TextFilterCondition = Extract<FilterCondition, "c" | "e">;
export type EnumFilterCondition = Extract<FilterCondition, "e">;

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

export interface RoomsOccupanciesResponseType {
    id: number;
    start: string;
    end: string;
    employees: {
        id: number;
        name: string;
        surname: string;
    };
    rooms: {
        name: string;
        id: number;
    };
}

export type RoomsResponseType = {
    id: number;
    name: string;
};

export interface AppointmentForeignResourceType {
    id: number;
    name: string;
    surname: string;
}

export interface AppointmentsListResponseType extends Omit<Tables<"appointments">, "patient_id" | "employee_id"> {
    patient_id: AppointmentForeignResourceType;
    employee_id: AppointmentForeignResourceType;
}

export interface SingleAppointmentResponseType extends Tables<"appointments"> {
    patient: AppointmentForeignResourceType | null;
    employee: AppointmentForeignResourceType | null;
}

export interface TableDataRendererProps<TableDataResource extends TableDataResourceType> {
    config: TableDataConfig<TableDataResource>;
}

export interface TableDataProps<TableDataResource extends TableDataResourceType> {
    children: ReactNode;
    config: TableDataConfig<TableDataResource>;
    resources?: TableDataResource[];
    tableDataState: TableDataState<TableDataResource>;
    dispatch: ActionDispatch<[action: TableDataActionsType<TableDataResourceType>]>;
    itemsCount?: number | null;
}

export type AlertWarning = "warning" | "error" | "info";

export interface AlertProps {
    variant?: AlertWarning;
    className?: string;
    title?: string;
    message?: string;
}

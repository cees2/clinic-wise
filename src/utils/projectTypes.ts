import type { RefObject } from "react";
import type React from "react";
import type { Database, Tables } from "../services/database.types";

export interface MainNavigationConfigItem {
    to: string;
    icon: React.ReactNode;
    title: string;
}

export interface HeaderActions {
    title: string;
    isInDropdown?: boolean;
    onClick?: () => void;
    path?: string;
}

export interface TableDataColumn<T extends Record<string, any>> {
    id: keyof T;
    name: string;
    render?: (dataItem: T) => React.ReactNode | number | string;
}

export type FilterCondition = "e" | "ne" | "c" | "gt" | "gte" | "lt" | "lte";

export enum FilterType {
    NUMBER,
    TEXT,
    ENUM,
}

export interface TableDataFilterConfig<T extends TableDataConfigGenericExtend> {
    id: keyof T;
    name: string;
    type: FilterType;
    conditions?: FilterCondition[];
    maxValue?: number;
    minValue?: number;
    options?: Record<string, string>;
}

export interface TableDataConfig<T extends TableDataConfigGenericExtend> {
    columns: TableDataColumn<T>[];
    gridTemplateColumns?: string;
    resourceName: keyof Database["public"]["Tables"];
    filters?: TableDataFilterConfig<T>[];
}

export type TableDataConfigGenericExtend = Record<string, any> & { id: number };

// TODO: TableDataConfig with generic type which will allow fields like a TableDataColumn.id have proper type?
// TODO: Create differenet files for types??

export interface TableHeaderCellProps {
    children: React.ReactNode;
    columnIndex: number;
}

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

export interface TableDataState<T extends TableDataConfigGenericExtend> {
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

export type TableDataActionsType<T extends TableDataConfigGenericExtend> =
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
    dropdownToggleRef: RefObject<HTMLButtonElement> | null;
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

export type AppointmentFormType = Omit<Tables<"appointments">, "created_at" | "id">;
export type PatientFormType = Omit<Tables<"patients">, "created_at" | "id">;
export type EmployeeFormType = Omit<Tables<"employees">, "created_at" | "id">;

export interface Person {
    name: string;
    surname: string;
    date_of_birth: string;
    nationality: string;
    address: string;
    gender: string;
    phone_number: string;
}

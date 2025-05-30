import type { UseQueryResult } from "@tanstack/react-query";
import type React from "react";

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

export interface TableDataConfig<T extends TableDataConfigGenericExtend> {
  columns: TableDataColumn<T>[];
  getResources: () => UseQueryResult<T[]>;
  gridTemplateColumns?: string;
}

export type TableDataConfigGenericExtend = Record<string, any> & { id: number };

// TODO: TableDataConfig with generic type which will allow fields like a TableDataColumn.id have proper type?
// TODO: Create differenet files for types??

export interface TableHeaderCellProps {
  children: React.ReactNode;
  columnIndex: number;
}

export interface TableDataFilter {
  id: string;
  value: string;
}

export interface TableDataState {
  selectedSort: string;
  selectedFilters: TableDataFilter[];
  selectedPage: number;
  selectedPaginationSize: number;
}

export interface TableDataContextType<T> {
  config: TableDataConfig<T>;
  tableDataState: TableDataState;
  dispatch: React.ActionDispatch<React.AnyActionArg>;
  resources: T[];
}

export enum TableDataActionsEnum {
  SET_SORT,
  SET_FILTER,
  SET_PAGINATION_SIZE,
  SET_PAGE,
  SET_NEXT_PAGE,
  SET_PREVIOUS_PAGE,
}

export type TableDataActionsType =
  | {
      type: TableDataActionsEnum.SET_SORT;
      payload: string;
    }
  | {
      type: TableDataActionsEnum.SET_FILTER;
      payload: TableDataFilter[];
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
}

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
  getResources: UseQueryResult<T[]>;
  gridTemplateColumns?: string;
}

export type TableDataConfigGenericExtend = Record<string, any> & { id: number };

// TODO: TableDataConfig with generic type which will allow fields like a TableDataColumn.id have proper type?
// TODO: Create differenet files for types??

export interface TableHeaderCellProps {
  children: React.ReactNode;
  columnIndex: number;
}

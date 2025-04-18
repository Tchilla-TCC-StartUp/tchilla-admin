import { useState, useEffect } from "react";
import Typography from "./Typography";

export type Column<T> = {
  key: keyof T | string;
  title: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
};

type GlobalTableProps<T> = {
  data: T[];
  filteredData?: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  withCheckbox?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  actions?: (item: T) => React.ReactNode;
  selectable?: boolean;
  paginated?: boolean;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  styleVariant?: "primary" | "secondary" | "danger" | "clean";
  onFilter?: (search: string) => void;
};

export function GlobalTable<T>({
  data,
  filteredData,
  columns,
  itemsPerPage = 10,
  withCheckbox = true,
  onRowSelect,
  actions,
  paginated = true,
  currentPage: propCurrentPage,
  onPageChange,
  styleVariant = "primary",
}: GlobalTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(propCurrentPage || 1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (propCurrentPage !== undefined) {
      setCurrentPage(propCurrentPage);
    }
  }, [propCurrentPage]);

  const displayData = filteredData ?? data;
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = paginated
    ? displayData.slice(startIndex, startIndex + itemsPerPage)
    : displayData;

  const toggleRow = (index: number) => {
    const updated = new Set(selectedRows);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
    }
    setSelectedRows(updated);
    onRowSelect?.(Array.from(updated).map((i) => displayData[i]));
  };

  const toggleAll = () => {
    const newSelected = new Set<number>();
    if (selectedRows.size < paginatedData.length) {
      paginatedData.forEach((_, idx) => newSelected.add(startIndex + idx));
    }
    setSelectedRows(newSelected);
    onRowSelect?.(Array.from(newSelected).map((i) => displayData[i]));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const tableClasses = {
    primary: "bg-primary-800 text-primary-50",
    secondary: "bg-gray-800 text-white",
    danger: "bg-red-600 text-white",
    clean: "bg-white text-gray-900",
  };

  return (
    <div className="flex flex-col h-full">
      <div className="block lg:hidden px-2 py-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3">
        {paginatedData.map((item, rowIndex) => (
          <div
            key={rowIndex}
            className="border rounded-md shadow-sm p-3 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              {withCheckbox && (
                <input
                  type="checkbox"
                  checked={selectedRows.has(startIndex + rowIndex)}
                  onChange={() => toggleRow(startIndex + rowIndex)}
                  className="h-4 w-4"
                />
              )}
              {actions && <div className="ml-auto">{actions(item)}</div>}
            </div>

            <div className="grid grid-cols-1 gap-y-1.5 text-xs text-gray-800">
              {columns.map((col, colIndex) => (
                <div key={colIndex} className="flex justify-between">
                  <Typography variant="p_bold">{col.title}</Typography>
                  <span className="text-right">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto flex-1 hidden lg:block">
        <table className="min-w-[700px] w-full text-sm sm:text-base bg-white">
          <thead className={`text-left ${tableClasses[styleVariant]}`}>
            <tr>
              {withCheckbox && (
                <th className="p-2 sm:p-3 whitespace-nowrap text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    onChange={toggleAll}
                    checked={paginatedData.every((_, idx) =>
                      selectedRows.has(startIndex + idx)
                    )}
                  />
                </th>
              )}
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`p-2 sm:p-3 whitespace-nowrap text-xs sm:text-sm ${
                    col.className || ""
                  }`}
                >
                  {col.title}
                </th>
              ))}
              {actions && (
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                {withCheckbox && (
                  <td className="p-2 sm:p-3 whitespace-nowrap text-xs sm:text-sm">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(startIndex + rowIndex)}
                      onChange={() => toggleRow(startIndex + rowIndex)}
                    />
                  </td>
                )}
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-2 sm:p-3 whitespace-nowrap text-xs sm:text-sm"
                  >
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                    {actions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 Paginação */}
      {paginated && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-4 text-sm text-gray-500">
          <span>
            Mostrando {displayData.length === 0 ? 0 : startIndex + 1} -{" "}
            {Math.min(startIndex + itemsPerPage, displayData.length)} de{" "}
            {displayData.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:text-gray-400"
            >
              ←
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:text-gray-400"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";

export type Column<T> = {
  key: keyof T | string;
  title: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
};

type GlobalTableProps<T> = {
  data: T[];
  filteredData?: T[]; // novo
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
  onFilter?: (search: string) => void; // novo
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

  // Atualiza a página interna se o prop mudar
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
      <div className="overflow-x-auto flex-1">
        <table className={`min-w-full bg-white ${tableClasses[styleVariant]}`}>
          <thead className={`text-left ${tableClasses[styleVariant]}`}>
            <tr>
              {withCheckbox && (
                <th className="p-3">
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
                <th key={i} className={`p-3 ${col.className || ""}`}>
                  {col.title}
                </th>
              ))}
              {actions && <th className="p-3 text-center">Ações</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                {withCheckbox && (
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(startIndex + rowIndex)}
                      onChange={() => toggleRow(startIndex + rowIndex)}
                    />
                  </td>
                )}
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-3">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="p-3 text-center">{actions(item)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginated && (
        <div className="flex justify-between items-center p-4 text-sm text-gray-500">
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

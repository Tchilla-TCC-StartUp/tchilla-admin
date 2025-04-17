export interface CategoryData {
    id: number;
    nome: string;
    descricao: string;
    foto: string;
}

export interface CategoryFormFields {
    nome: string;
    descricao: string;
    foto: File | null;
}

export interface CategoryTableProps {
    categorias: CategoryData[];
    filteredCategorias: CategoryData[];
    searchTerm: string;
    currentPage: number;
    onSearch: (term: string) => void;
    onPageChange: (page: number) => void;
    onAdd: () => void;
    onViewDetails: (categoria: CategoryData) => void;
    onDelete: (categoria: CategoryData) => void;
}
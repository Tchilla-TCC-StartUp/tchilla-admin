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
export interface CategoryFormProps {
  onSubmit: (formFields: CategoryFormFields) => void;
  onCancel: () => void;
  title: string;
  subtitle: string;
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

export interface CategoryDetailsProps {
  categoria: CategoryData | null;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSave: (formFields: CategoryFormFields) => void;
  onBack: () => void;
}

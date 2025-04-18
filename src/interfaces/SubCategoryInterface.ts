export interface SubCategoryData {
  id: number;
  nome: string;
  descricao: string;
  tipo: number;
  categoriaId: number;
}

export interface SubCategoryTableProps {
  subCategorias: SubCategoryData[];
  categoriaId: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onAdd: (subCategoria: SubCategoryFormData) => void;
  onDelete: (subCategoria: SubCategoryData) => void;
}

export interface SubCategoryFormData {
  nome: string;
  descricao: string;
  tipo: number;
  categoriaId: number;
}

export interface TypeOption {
  label: string;
  value: number;
}

export interface SubCategoryFormProps {
  onSubmit: (formFields: SubCategoryFormData) => void;
  title: string;
  categoriaId: number;
}

import { useState, useEffect } from "react";
import { CategoryData } from "../interfaces/CategoryInterface";
import CategoryService from "../service/category_service";

export const useCategories = () => {
    const [categorias, setCategorias] = useState<CategoryData[]>([]);
    const [filteredCategorias, setFilteredCategorias] = useState<CategoryData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriaToDelete, setCategoriaToDelete] = useState<CategoryData | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { fetchAllCategories, deleteCategory } = CategoryService();

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        const data = await fetchAllCategories();
        setCategorias(data);
        setFilteredCategorias(data);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        const filtered = categorias.filter((cat) =>
            cat.nome.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCategorias(filtered);
    };

    const handleDeleteClick = (categoria: CategoryData) => {
        setCategoriaToDelete(categoria);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!categoriaToDelete) return;
        await deleteCategory(categoriaToDelete.id);
        const updatedList = categorias.filter((cat) => cat.id !== categoriaToDelete.id);
        setCategorias(updatedList);
        setFilteredCategorias(updatedList);
        cancelDelete();
    };

    const cancelDelete = () => {
        setCategoriaToDelete(null);
        setShowDeleteModal(false);
    };

    return {
        categorias,
        filteredCategorias,
        searchTerm,
        currentPage,
        categoriaToDelete,
        showDeleteModal,
        handleSearch,
        handleDeleteClick,
        confirmDelete,
        cancelDelete,
        setCurrentPage,
        fetchCategorias,
    };
};
import { useState, useEffect } from "react";
import useClientService from "../service/ClientService";
import { ClientesData, DeleteClientResponse } from "../interfaces/ClientsInterface";


export const useClients = () => {
    const { getAllClients, deleteUser } = useClientService();
    const [data, setData] = useState<ClientesData[]>([]);
    const [filteredData, setFilteredData] = useState<ClientesData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<ClientesData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clients = await getAllClients();
                console.log("Clientes recebidos:", clients);
                setData(clients);
                setFilteredData(clients);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
                setData([]);
                setFilteredData([]);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = data.filter((item: ClientesData) =>
            [item.id.toString(), item.nome, item.email, item.telefone].some((field) =>
                field?.toLowerCase().includes(term)
            )
        );
        console.log("Clientes filtrados:", filtered);
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchTerm, data]);
    const handleDeleteClick = (user: ClientesData) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        try {
            const response: DeleteClientResponse = await deleteUser(userToDelete.id);
            console.log("Resposta do delete:", response);
            if (response.isSuccess) {
                const updatedData = data.filter((u) => u.id !== userToDelete.id);
                setData(updatedData);
                setFilteredData(updatedData);
                setShowDeleteModal(false);
                setUserToDelete(null);
            } else {
                console.error("Erro ao excluir:", response.errorMessage || "Erro desconhecido");
            }
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    };

    // Cancelar exclusão
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    return {
        data,
        filteredData,
        currentPage,
        setCurrentPage,
        searchTerm,
        setSearchTerm,
        showDeleteModal,
        userToDelete,
        handleDeleteClick,
        confirmDelete,
        cancelDelete,
    };
};
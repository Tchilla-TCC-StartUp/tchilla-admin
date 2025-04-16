import { useEffect, useState } from "react";
import GlobalHelloUser from "../components/Global/global_hello_user";
import { AppGlobalUserAvatarName } from "../components/Global/global_user_avatar_name";
import { GlobalTable } from "../components/Global/global_table";
import { Card, CardContent } from "../components/Global/global_cards";
import Typography from "../components/typography";
import GlobalInput from "../components/Global/global_input";
import { IoSearchOutline } from "react-icons/io5";
import GlobalConfirmModal from "../components/Global/gloal_modals";
import { UserInterface } from "../interfaces/user_interface";
import ClientService from "../service/client_service";

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<UserInterface[]>([]);
  const [filteredData, setFilteredData] = useState<UserInterface[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserInterface | null>(null);

  const { getAllClients, deleteUser } = ClientService();

  useEffect(() => {
    const fetchData = async () => {
      const clients = await getAllClients();
      setData(clients);
      setFilteredData(clients);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = data.filter((item: UserInterface) => {
      return (
        item.id.toString().toLowerCase().includes(term) ||
        item.nome?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.telefone?.toLowerCase().includes(term)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  }, []);

  const handleDeleteClick = (user: UserInterface) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        setShowDeleteModal(false);
        console.log("Deleting user:", userToDelete.id);
        const response = await deleteUser(userToDelete.id);
        if (response.isSuccess) {
          setData((prev) => prev.filter((user) => user.id !== userToDelete.id));
          setFilteredData((prev) =>
            prev.filter((user) => user.id !== userToDelete.id)
          );
        } else {
          console.error(
            "Erro ao excluir:",
            response.errorMessage || "Erro desconhecido"
          );
        }
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      } finally {
        setUserToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const columns = [
    { key: "id", title: "Id" },
    {
      key: "avatar",
      title: "Avatar",
      render: (item: UserInterface) =>
        item.nome ? (
          <AppGlobalUserAvatarName size={30} name={item.nome} />
        ) : null,
    },
    { key: "name", title: "Nome" },
    { key: "email", title: "Email" },
    { key: "phone", title: "Telefone" },
    {
      key: "delete",
      title: "Apagar",
      render: (item: UserInterface) => (
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDeleteClick(item)}
        >
          <Typography variant="p_normal">Apagar</Typography>
        </button>
      ),
    },
    {
      key: "details",
      title: "Ver Detalhes",
      render: (item: UserInterface) => (
        <button
          className="bg-gray-500 text-white px-2 py-1 rounded"
          onClick={() => console.log("Ver Detalhes", item.id)}
        >
          <Typography variant="p_normal">Detalhes</Typography>
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen gap-5">
      <GlobalHelloUser />
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col justify-between items-center md:flex-row gap-6">
            <Typography variant="h2_bold" className="w-full">
              Lista de Clientes
            </Typography>
            <GlobalInput
              placeholder="Pesquisar"
              icon={<IoSearchOutline />}
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              className="border rounded-md px-1 py-3 text-primary-950 w-[30rem]"
            />
          </div>

          {filteredData.length > 0 ? (
            <GlobalTable
              data={data}
              filteredData={filteredData}
              columns={columns}
              selectable
              paginated
              styleVariant="clean"
              itemsPerPage={10}
              withCheckbox={false}
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
              onRowSelect={(selectedItems) =>
                console.log("Selecionados:", selectedItems)
              }
            />
          ) : (
            <div className="text-center text-gray-500 py-10">
              <Typography variant="p_normal">
                Nenhum cliente encontrado.
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>

      <GlobalConfirmModal
        show={showDeleteModal}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o usuário "${userToDelete?.nome}"?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default UsersPage;

import GlobalHelloUser from "../components/global_hello_user";
import usersData from "../data/jsons/users.json";
import { AppGlobalUserAvatarName } from "../components/global_user_avatar_name";
import { useEffect, useState } from "react";
import { GlobalTable } from "../components/global_table";
import { Card } from "../components/global_cards";
import Typography from "../components/typography";
import GlobalInput from "../components/global_input";
import { IoSearchOutline } from "react-icons/io5";
import GlobalConfirmModal from "../components/gloal_modals";

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(usersData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const data = usersData;

  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deletado:", userToDelete?.id);
    // lógica real de exclusão aqui...
    setShowDeleteModal(false);
    setUserToDelete(null);
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
      render: (item: any) =>
        item.nome ? (
          <AppGlobalUserAvatarName size={30} name={item.nome} />
        ) : null,
    },
    { key: "nome", title: "Nome" },
    { key: "email", title: "Email" },
    { key: "telefone", title: "Telefone" },
    {
      key: "deletar",
      title: "Apagar",
      render: (item: any) => (
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDeleteClick(item)}
        >
          <Typography variant="p_normal">Apagar</Typography>
        </button>
      ),
    },
    {
      key: "detalhes",
      title: "Ver Detalhes",
      render: (item: any) => (
        <button
          className="bg-gray-500 text-white px-2 py-1 rounded"
          onClick={() => {
            console.log("Ver Detalhes", item.id);
          }}
        >
          <Typography variant="p_normal">Detalhes</Typography>
        </button>
      ),
    },
  ];

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = data.filter((item: any) => {
      return (
        item.name?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.method?.toLowerCase().includes(term) ||
        item.date?.toLowerCase().includes(term) ||
        item.services?.toLowerCase().includes(term)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="flex flex-col bg-white min-h-screen gap-5">
      <GlobalHelloUser />
      <Card>
        <div className="flex justify-between items-center p-4">
          <Typography variant="h2_bold">Lista de Clientes</Typography>
          <div className="flex gap-2">
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
        </div>

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

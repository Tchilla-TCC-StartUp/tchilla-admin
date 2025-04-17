import GlobalHelloUser from "../components/Global/global_hello_user";
import GlobalConfirmModal from "../components/Global/gloal_modals";
import { ClientsTable } from "../components/Clients/ClientsTable";
import { useClients } from "../hooks/ClientsHook";
import ErrorScreen from "./error_page";

const ClientsPage = () => {
  const {
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
    showErrorScreen,
  } = useClients();

  console.log("Dados para a tabela:", { data, filteredData });

  const renderBody = () => {
     return (
       <div className="flex flex-col bg-white min-h-screen gap-5">
         <GlobalHelloUser />
         <ClientsTable
           data={data}
           filteredData={filteredData}
           currentPage={currentPage}
           searchTerm={searchTerm}
           setCurrentPage={setCurrentPage}
           setSearchTerm={setSearchTerm}
           handleDeleteClick={handleDeleteClick}
         />
         <GlobalConfirmModal
           show={showDeleteModal}
           title="Confirmar Exclusão"
           message={`Tem certeza que deseja excluir o usuário "${userToDelete?.nome}"?`}
           onConfirm={confirmDelete}
           onCancel={cancelDelete}
         />
       </div>
     );
  }

  return showErrorScreen ? <ErrorScreen /> : renderBody();
};

export default ClientsPage;

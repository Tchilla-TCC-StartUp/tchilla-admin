import { useEffect, useState } from "react";
import { IoAddCircleOutline, IoSearchOutline } from "react-icons/io5";
import GlobalHelloUser from "../components/Global/global_hello_user";
import { GlobalTable } from "../components/Global/global_table";
import { Card, CardContent } from "../components/Global/global_cards";
import Typography from "../components/typography";
import GlobalInput from "../components/Global/global_input";
import GlobalButton from "../components/Global/global_button";
import GlobalConfirmModal from "../components/Global/gloal_modals";
import { CategoriaModal } from "../components/categoriamodal";

type Categoria = {
  id: number;
  nome: string;
  descricao: string;
};

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filteredCategorias, setFilteredCategorias] = useState<Categoria[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState<Categoria | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchCategorias = async () => {};

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {}, []);

  const handleSubmitCategoria = async () => {};

  const handleDeleteClick = (categoria: Categoria) => {
    setCategoriaToDelete(categoria);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {};

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCategoriaToDelete(null);
  };

  const columns = [
    { key: "nome", title: "Nome" },
    { key: "descricao", title: "Descrição" },
    {
      key: "actions",
      title: "Ações",
      render: (item: Categoria) => (
        <div className="flex gap-2">
          <GlobalButton
            variant="outline"
            onClick={() => console.log("Adicionar sub:", item)}
          >
            Adicionar Subcategoria
          </GlobalButton>
          <GlobalButton
            variant="primary"
            onClick={() => handleDeleteClick(item)}
          >
            Deletar
          </GlobalButton>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen gap-5">
      <GlobalHelloUser />
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col  justify-between gap-6 items-center md:flex-row">
            <Typography variant="h2_bold" className="w-full">
              Lista de Categorias
            </Typography>
            <GlobalInput
              placeholder="Pesquisar"
              icon={<IoSearchOutline />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md px-1 py-3 text-primary-950 w-[25rem]"
            />
            <GlobalButton
              variant="primary"
              fullWidth={true}
              onClick={() => setShowModal(true)}
            >
              Adicionar Categoria
              <IoAddCircleOutline />
            </GlobalButton>
          </div>

          {filteredCategorias.length > 0 ? (
            <GlobalTable
              data={categorias}
              filteredData={filteredCategorias}
              columns={columns}
              selectable
              paginated
              styleVariant="clean"
              itemsPerPage={5}
              withCheckbox={false}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              onRowSelect={(selected) => console.log("Selecionados:", selected)}
            />
          ) : (
            <div className="text-center text-gray-500 py-10">
              <Typography variant="p_normal">
                Nenhuma categoria encontrada.
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>

      <GlobalConfirmModal
        show={showDeleteModal}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir a categoria "${categoriaToDelete?.nome}"?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {showModal && (
        <CategoriaModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitCategoria}
        />
      )}
    </div>
  );
};

export default CategoriasPage;

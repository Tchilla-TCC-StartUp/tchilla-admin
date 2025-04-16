import { useEffect, useState } from "react";
import { IoAddCircleOutline, IoSearchOutline } from "react-icons/io5";

import GlobalHelloUser from "../components/Global/global_hello_user";
import { GlobalTable } from "../components/Global/global_table";
import { Card, CardContent } from "../components/Global/global_cards";
import Typography from "../components/typography";
import GlobalInput from "../components/Global/global_input";
import GlobalButton from "../components/Global/global_button";
import GlobalConfirmModal from "../components/Global/gloal_modals";
import { CategoryModel } from "../model/category_model";
import CategoryService from "../service/category_service";
import GlobalAvatar from "../components/Global/global_avatar";
import GlobalBackButton from "../components/Global/global_back_button";

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState<CategoryModel[]>([]);
  const [filteredCategorias, setFilteredCategorias] = useState<CategoryModel[]>(
    []
  );
  const [formFields, setFormFields] = useState({
    nome: "",
    descricao: "",
    foto: null as File | null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] =
    useState<CategoryModel | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { fetchAllCategories, deleteCategory, createCategory } =
    CategoryService();

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

  const handleDeleteClick = (categoria: CategoryModel) => {
    setCategoriaToDelete(categoria);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!categoriaToDelete) return;

    await deleteCategory(categoriaToDelete.id);
    const updatedList = categorias.filter(
      (cat) => cat.id !== categoriaToDelete.id
    );
    setCategorias(updatedList);
    setFilteredCategorias(updatedList);
    cancelDelete();
  };

  const cancelDelete = () => {
    setCategoriaToDelete(null);
    setShowDeleteModal(false);
  };

  const handleFormChange = (key: string, value: string | File) => {
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddCategoria = async () => {
    const { nome, descricao, foto } = formFields;

    if (!nome || !descricao || !foto) {
      alert("Preencha todos os campos!");
      return;
    }

    const formData = new FormData();
    formData.append("Nome", nome);
    formData.append("Descricao", descricao);
    formData.append("Foto", foto);

    try {
      await createCategory(formData);
      await fetchCategorias();
      resetForm();
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      alert("Erro ao criar categoria. Tente novamente.");
    }
  };

  const resetForm = () => {
    setFormFields({ nome: "", descricao: "", foto: null });
    setShowForm(false);
  };

  const columns = [
    {
      key: "foto",
      title: "Imagem",
      render: (item: CategoryModel) => (
        <GlobalAvatar src={item.foto} alt="Imagem" />
      ),
    },
    { key: "nome", title: "Nome" },
    { key: "descricao", title: "Descrição" },
    {
      key: "detail",
      title: "Ver Detalhes",
      render: (item: CategoryModel) => (
        <button
          onClick={() => console.log("Adicionar sub:", item)}
          className="bg-gray-500 p-2 rounded-md text-white"
        >
          Ver Detalhes
        </button>
      ),
    },
    {
      key: "delete",
      title: "Apagar Categoria",
      render: (item: CategoryModel) => (
        <button
          onClick={() => handleDeleteClick(item)}
          className="bg-red-500 p-2 rounded-md text-white"
        >
          Deletar
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen gap-5">
      {!showForm ? (
        <>
          <GlobalHelloUser />
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-3">
                <Typography variant="h2_bold" className="w-full">
                  Lista de Categorias
                </Typography>
                <GlobalInput
                  placeholder="Pesquisar"
                  icon={<IoSearchOutline />}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="border rounded-md px-1 py-3 text-primary-950 w-[25rem]"
                />
                <GlobalButton
                  variant="primary"
                  fullWidth
                  onClick={() => setShowForm(true)}
                >
                  Adicionar Categoria <IoAddCircleOutline />
                </GlobalButton>
              </div>

              {filteredCategorias.length > 0 ? (
                <GlobalTable
                  data={categorias}
                  filteredData={filteredCategorias}
                  columns={columns}
                  selectable
                  paginated
                  itemsPerPage={5}
                  withCheckbox={false}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  styleVariant="clean"
                  onRowSelect={(selected) =>
                    console.log("Selecionados:", selected)
                  }
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
        </>
      ) : (
        <Card className="bg-white w-full p-4">
          <GlobalBackButton onClick={() => setShowForm(false)} />
          <div className="flex justify-between items-start mb-6">
            <div>
              <Typography variant="h2_bold">Nova Categoria</Typography>
              <Typography variant="h3_normal" className="text-gray-500">
                Adicione uma nova categoria e subcategorias associadas
              </Typography>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <GlobalInput
              placeholder="Imagem da categoria"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFormChange("foto", file);
              }}
            />
            <GlobalInput
              placeholder="Nome da categoria"
              value={formFields.nome}
              onChange={(e) => handleFormChange("nome", e.target.value)}
            />
            <GlobalInput
              placeholder="Descrição"
              value={formFields.descricao}
              onChange={(e) => handleFormChange("descricao", e.target.value)}
            />
          </div>

          <div className="flex gap-4 mt-6">
            <GlobalButton variant="primary" onClick={handleAddCategoria}>
              Salvar Categoria
            </GlobalButton>
            <GlobalButton variant="outline" onClick={resetForm}>
              Cancelar
            </GlobalButton>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CategoriasPage;

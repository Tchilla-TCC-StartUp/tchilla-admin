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
  const [categoriaToDelete, setCategoriaToDelete] = useState<Categoria | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchCategorias = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch("https://ecotrack-udd9.onrender.com/api/Categoria/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (data.isSuccess && Array.isArray(data.data)) {
        setCategorias(data.data);
        setFilteredCategorias(data.data);
      } else {
        console.error("Erro ao buscar categorias:", data.message);
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };
  

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    console.log("Categorias filtradas:", filteredCategorias);
    const filtered = categorias.filter((item) =>
      item.nome.toLowerCase().includes(term) ||
      item.descricao.toLowerCase().includes(term)
    );
    setFilteredCategorias(filtered);
    setCurrentPage(1);
    
  }, [searchTerm, categorias,filteredCategorias] );

  const handleSubmitCategoria = async (categoria: any) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://ecotrack-udd9.onrender.com/api/Categoria/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoria),
      });

      const data = await response.json();

      if (data.isSuccess) {
        setShowModal(false);
        fetchCategorias();
      } else {
        console.error("Erro ao adicionar categoria:", data.message);
      }
    } catch (error) {
      console.error("Erro ao enviar categoria:", error);
    }
  };

  const handleDeleteClick = (categoria: Categoria) => {
    setCategoriaToDelete(categoria);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!categoriaToDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://ecotrack-udd9.onrender.com/api/Categoria/delete/${categoriaToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.isSuccess) {
        fetchCategorias();
      } else {
        console.error("Erro ao deletar categoria:", data.message);
      }
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    } finally {
      setShowDeleteModal(false);
      setCategoriaToDelete(null);
    }
  };

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
          <GlobalButton variant="outline" onClick={() => console.log("Adicionar sub:", item)}>
            Adicionar Subcategoria
          </GlobalButton>
          <GlobalButton variant="primary" onClick={() => handleDeleteClick(item)}>
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
          <div className="flex justify-between items-center p-4">
            <Typography variant="h2_bold">Lista de Categorias</Typography>
            <div className="flex gap-2 items-center">
              <GlobalInput
                placeholder="Pesquisar"
                icon={<IoSearchOutline />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-md px-1 py-3 text-primary-950 w-[25rem]"
              />
              <GlobalButton variant="primary" onClick={() => setShowModal(true)}>
                Adicionar Categoria
                <IoAddCircleOutline />
              </GlobalButton>
            </div>
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
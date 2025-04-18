import React, { useState, useEffect } from "react";
import GlobalButton from "../components/Global/GlobalButton";
import GlobalHelloUser from "../components/Global/GlobalHelloUser";
import { IoAddCircleOutline, IoSearchOutline } from "react-icons/io5";
import Typography from "../components/Global/Typography";
import GlobalAvatar from "../components/Global/GlobalAvatar";
import { GlobalTable } from "../components/Global/GlobalTable";
import GlobalInput from "../components/Global/GlobalInput";
import { Card } from "../components/Global/GlobalCards";
import serviceData from "../data/jsons/services.json";
import { ServicoForm } from "../components/servicoform";

const ServiceAndPack: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(serviceData);
  const [showForm, setShowForm] = useState(false);
  const [servicos, setServicos] = useState(serviceData);

  const columns = [
    { key: "id", title: "Id" },
    {
      key: "image",
      title: "Imagem",
      render: (item: any) =>
        item.image ? <GlobalAvatar src={item.image} /> : null,
    },
    { key: "title", title: "Título" },
    {
      key: "deletar",
      title: "Apagar",
      render: (item: any) => (
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDelete(item.id)}
        >
          <Typography variant="p_normal">Apagar</Typography>
        </button>
      ),
    },
    {
      key: "edit",
      title: "Editar",
      render: (item: any) => (
        <button
          className="bg-primary-500 text-white px-2 py-1 rounded"
          onClick={() => console.log("Editar", item.id)}
        >
          <Typography variant="p_normal">Editar</Typography>
        </button>
      ),
    },
  ];
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = servicos.filter((item) =>
      item.title?.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, servicos]);
  const handleAddService = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("preco", data.preco);
      formData.append("categoria", data.categoria);
      formData.append("diasDisponiveis", data.diasDisponiveis);
      formData.append("valorAtual", data.valorAtual);
      formData.append("valorPromocional", data.valorPromocional);
      formData.append("resultadoPercentual", data.resultadoPercentual);
      formData.append("descricao", data.descricao);
      data.fotos.forEach((foto: File | null, index: number) => {
        if (foto) formData.append(`foto${index + 1}`, foto);
      });
      const response = await fetch("/api/servicos", {
        method: "POST",
        body: formData,
      });
      const novoServico = await response.json();

      setServicos((prev) => [...prev, novoServico]);
    } catch (error) {
      console.error("Erro ao salvar serviço:", error);
    }
  };
  const handleDelete = (id: number) => {
    setServicos((prev) => prev.filter((s) => Number(s.id) !== id));
  };
  return (
    <div className="w-full flex flex-col">
      {!showForm ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <GlobalHelloUser />
            <GlobalButton variant="primary" onClick={() => setShowForm(true)}>
              Adicionar Serviço
              <IoAddCircleOutline />
            </GlobalButton>
          </div>
          <Card className="p-4">
            <div className="flex flex-col justify-center items-start p-0 gap-3 mb-1 md:flex-row md:justify-between md:items-center md:gap-0 border-b pb-5">
              <Typography variant="h2_bold" className="w-full">
                Tipos de Serviços
              </Typography>
              <GlobalInput
                placeholder="Pesquisar"
                icon={<IoSearchOutline />}
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>
            <GlobalTable
              data={servicos}
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
        </>
      ) : (
        <ServicoForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddService}
        />
      )}
    </div>
  );
};
export default ServiceAndPack;

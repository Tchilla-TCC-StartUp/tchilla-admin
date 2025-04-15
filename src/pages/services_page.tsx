import React, { useState, useEffect } from "react";
import GlobalButton from "../components/Global/global_button";
import GlobalHelloUser from "../components/Global/global_hello_user";
import { IoAddCircleOutline, IoSearchOutline } from "react-icons/io5";
import Typography from "../components/typography";
import GlobalAvatar from "../components/Global/global_avatar";
import { GlobalTable } from "../components/Global/global_table";
import GlobalInput from "../components/Global/global_input";
import { Card } from "../components/Global/global_cards";
import serviceData from "../data/jsons/services.json";
import { ServicoForm } from "../components/servicoform";

const ServiceAndPack: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(serviceData);
  const [showModal, setShowModal] = useState(false);
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
      setShowModal(false);
    }
    catch (error) {
      console.error("Erro ao salvar serviço:", error);
    }
  };
  const handleDelete = (id: number) => {
    setServicos((prev) => prev.filter((s) => Number(s.id) !== id));
  };
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <GlobalHelloUser />
        <GlobalButton variant="primary" onClick={() => setShowModal(true)}>
          Adicionar Serviço
          <IoAddCircleOutline />
        </GlobalButton>
      </div>
      <Card className="p-4">
        <div className="flex justify-between items-center p-4">
          <Typography variant="h2_bold" className="px-2">Serviços</Typography>
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
      {showModal && (
        <ServicoForm
          onClose={() => setShowModal(false)}
          onSubmit={handleAddService}
        />
      )}

    </div>
  );
};

export default ServiceAndPack;
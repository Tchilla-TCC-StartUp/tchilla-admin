import React, { useState, useEffect } from "react";
import GlobalButton from "../components/global_button";
import GlobalHelloUser from "../components/global_hello_user";
import { IoAddCircleOutline, IoSearchOutline } from "react-icons/io5";
import Typography from "../components/typography";
import GlobalAvatar from "../components/global_avatar";
import { GlobalTable } from "../components/global_table";

import serviceData from "../data/jsons/services.json";
import { Card } from "../components/global_cards";
import GlobalInput from "../components/global_input";

const data = serviceData;

const ServiceAndPack: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const columns = [
    { key: "id", title: "Id" },
    {
      key: "image",
      title: "Imagem",
      render: (item: any) =>
        item.image ? <GlobalAvatar src={item.image} /> : null,
    },
    { key: "title", title: "Titulo" },
  ];

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = data.filter((item) =>
      item.title?.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="w-full flex flex-col ">
      <div className="flex justify-between items-center mb-4">
        <GlobalHelloUser />
        <GlobalButton variant="primary">
          Adicionar Serviço
          <IoAddCircleOutline />
        </GlobalButton>
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center p-4">
          <Typography variant="h2_bold">Tipos de Serviços</Typography>
          <div className="flex gap-2">
            <GlobalInput
              placeholder="Pesquisar"
              icon={<IoSearchOutline  />}
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
    </div>
  );
};

export default ServiceAndPack;

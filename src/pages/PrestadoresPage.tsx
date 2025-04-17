import { useEffect, useState } from "react";
import GlobalHelloUser from "../components/Global/global_hello_user";
import { GlobalTable } from "../components/Global/global_table";
import { Card, CardContent } from "../components/Global/global_cards";
import Typography from "../components/Global/typography";
import GlobalInput from "../components/Global/global_input";
import { IoSearchOutline } from "react-icons/io5";
import { Prestador } from "../interfaces/PrestadorInterface";
import prestadoresData from "../data/jsons/prestadores_fake.json";

const PrestadoresPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Prestador[]>([]);
  const [filteredData, setFilteredData] = useState<Prestador[]>([]);

  useEffect(() => {
    setData(prestadoresData);
    setFilteredData(prestadoresData);
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.nome.toLowerCase().includes(term) ||
        item.descricao.toLowerCase().includes(term) ||
        item.nif.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const columns = [
    {
      key: "foto",
      title: "Foto",
      render: (item: Prestador) =>
        item.foto ? (
          <img
            src={item.foto}
            alt={item.nome}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300" />
        ),
    },
    { key: "nome", title: "Nome" },
    { key: "descricao", title: "Descrição" },
    { key: "nif", title: "NIF" },
    { key: "tipo", title: "Tipo" },
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen gap-5">
      <GlobalHelloUser />
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center p-4">
            <Typography variant="h2_bold" className="w-full">
              Lista de Prestadores
            </Typography>
            <GlobalInput
              placeholder="Pesquisar prestador"
              icon={<IoSearchOutline />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md px-1 py-3 text-primary-950 w-[30rem]"
            />
          </div>

          {filteredData.length > 0 ? (
            <GlobalTable
              data={data}
              filteredData={filteredData}
              columns={columns}
              selectable={false}
              paginated
              styleVariant="clean"
              itemsPerPage={10}
              withCheckbox={false}
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
              onRowSelect={() => {}}
            />
          ) : (
            <div className="text-center text-gray-500 py-10">
              <Typography variant="p_normal">
                Nenhum prestador encontrado.
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PrestadoresPage;

import { CalendarDays, Search } from "lucide-react";
import GlobalHelloUser from "../components/global_hello_user";
import GlobalButton from "../components/global_button";
import { EventoCard } from "../components/eventocard";
import FiltroHeader from "../components/filtroheader";
import { useEffect, useState } from "react";
import CalendarioMensal from "../components/calendariomensal";

// Tipos
type StatusEvento = "Confirmado" | "Pendente" | "Cancelado";

type Evento = {
  nome: string;
  data: string;
  local: string;
  status: StatusEvento;
};

type MesComEventos = {
  mes: string;
  cor: string;
  eventos: Evento[];
};

const agendamento = () => {
  const [abaAtiva, setAbaAtiva] = useState("todos");
  const [visao, setVisao] = useState("cartoes");
  const [eventosPorMes, setEventosPorMes] = useState<MesComEventos[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const dadosFicticios: MesComEventos[] = [
        {
          mes: "Abril - 2025",
          cor: "bg-purple-200",
          eventos: [
            {
              nome: "Paulo Lopes Estevão",
              data: "08/Abril/2025",
              local: "Hoje Ya Henda",
              status: "Confirmado",
            },
            {
              nome: "Cláudia Nascimento",
              data: "15/Abril/2025",
              local: "Escritório Central",
              status: "Pendente",
            },
          ],
        },
        {
          mes: "Maio - 2025",
          cor: "bg-pink-200",
          eventos: [
            {
              nome: "Carlos Alberto",
              data: "02/Maio/2025",
              local: "Sala 3B",
              status: "Cancelado",
            },
            {
              nome: "Rita Silva",
              data: "23/Maio/2025",
              local: "Videoconferência",
              status: "Confirmado",
            },
          ],
        },
        {
          mes: "Junho - 2025",
          cor: "bg-blue-200",
          eventos: [
            {
              nome: "Fernando Sousa",
              data: "12/Junho/2025",
              local: "Auditório Principal",
              status: "Pendente",
            },
          ],
        },
      ];

      setEventosPorMes(dadosFicticios);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between">
        <GlobalHelloUser />
      </div>

      <div className="border rounded-md  p-2 mt-4 bg-white flex items-center gap-4">
        <div className="flex flex-col flex-1 ">
          <label className="text-sm font-semibold text-gray-800  mb-1">Pesquisa</label>
          <input
            type="text"
            placeholder="Pesquise por nome ou data"
            className=" rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <select className=" rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none">
          <option>Selecionar período</option>
          <option>Hoje</option>
          <option>Últimos 7 dias</option>
          <option>Últimos 30 dias</option>
        </select>

        <select className=" rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none">
          <option>Selecionar tipo de eventos</option>
          <option>Reunião</option>
          <option>Chamada</option>
          <option>Email</option>
        </select>

        <GlobalButton className="flex items-center gap-2 px-4 py-2 rounded-md text-white ">
          <Search className="w-4 h-4" />
          Pesquisar contactos
        </GlobalButton>
      </div>

      <div className="mt-12">
        <div className="pb-6">
          <FiltroHeader
            abaAtiva={abaAtiva}
            visao={visao}
            onChangeAba={setAbaAtiva}
            onChangeVisao={setVisao}
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-500 mt-20">Carregando eventos...</div>
        ) : visao === "cartoes" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventosPorMes.map((mesObj, idx) => (
              <div key={idx}>
                <div
                  className={`${mesObj.cor} px-2 py-2 rounded-md flex justify-between items-center mb-4`}
                >
                  <h2 className="text-base font-bold p-2 text-black">{mesObj.mes}</h2>
                  <CalendarDays className="w-5 h-5 text-gray-600" />
                </div>
                {mesObj.eventos.map((evento, i) => (
                  <div key={i} className="mb-4">
                    <EventoCard
                      nome={evento.nome}
                      data={evento.data}
                      local={evento.local}
                      status={evento.status}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div ><CalendarioMensal
          ano={2025}
          mes={3} // Março (lembre: começa do 0)
          eventos={[
            { nome: "Evento ", data: "2025-04-08", status: "Confirmado" },
            { nome: "Evento 2", data: "2025-04-04", status: "Pendente" },
            { nome: "Evento 3", data: "2025-04-29", status: "Cancelado" },
          ]}
        /></div>
        )}
      </div>
    </div>
  );
};

export default agendamento;

import { CalendarDays, Search } from "lucide-react";
import GlobalHelloUser from "../components/Global/GlobalHelloUser";
import GlobalButton from "../components/Global/GlobalButton";
import FiltroHeader from "../components/filtroheader";
import { useEffect, useState } from "react";
import Typography from "../components/Global/Typography";
import GlobalInput from "../components/Global/GlobalInput";
import GlobalDropdown from "../components/Global/GlobalDropdown";
import { Card } from "../components/Global/GlobalCards";
import CalendarioMensal from "../components/Agendamentos/calendariomensal";
import { EventoCard } from "../components/Agendamentos/eventocard";

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
const Agendamento = () => {
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
            {
              nome: "Cláudia Nascimento",
              data: "15/Abril/2025",
              local: "Escritório Central",
              status: "Pendente",
            },
            {
              nome: "Cláudia Nascimento",
              data: "15/Abril/2025",
              local: "Escritório Central",
              status: "Pendente",
            },
            {
              nome: "Cláudia Nascimento",
              data: "15/Abril/2025",
              local: "Escritório Central",
              status: "Pendente",
            },
            {
              nome: "adfasfa Nascimento",
              data: "15/Abril/2025",
              local: "Escritório Central",
              status: "Pendente",
            },
            {
              nome: "ppppppppp Nascimento",
              data: "15/Abril/2025",
              local: "Escritório Central",
              status: "Pendente",
            },
          ],
        },
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
    <div className="bg-white min-h-screen">
      <GlobalHelloUser />
      <div className="sticky top-0 bg-white z-10 mt-3">
        <Card className="flex flex-col items-center justify-center gap-5 p-4 w-full md:flex-row md:gap-2">
          <GlobalInput placeholder="Pesquisar" />
          <GlobalDropdown
            placeholder="Selecionar período"
            onChange={() => {}}
            options={[
              { label: "Hoje", value: 3 },
              { label: "Últimos 7 dias", value: 1 },
              { label: "Últimos 30 dias", value: 2 },
            ]}
          ></GlobalDropdown>
          <GlobalDropdown
            placeholder="Tipo de Evento"
            onChange={() => {}}
            options={[
              { label: "Hoje", value: 3 },
              { label: "Últimos 7 dias", value: 1 },
              { label: "Últimos 30 dias", value: 2 },
            ]}
          ></GlobalDropdown>
          <GlobalButton className="w-full">
            <Search />
            Pesquisar
          </GlobalButton>
        </Card>
      </div>
      <div className="mt-1 overflow-y-auto">
        <FiltroHeader
          abaAtiva={abaAtiva}
          visao={visao}
          onChangeAba={setAbaAtiva}
          onChangeVisao={setVisao}
        />
      </div>
      <main className="p-2  overflow-hidden relative z-0 w-full h-screen bg-white">
        <div className="w-full h-full bg-white mt-6">
          {loading ? (
            <div className="text-center text-gray-500 mt-20">
              Carregando eventos...
            </div>
          ) : visao === "cartoes" ? (
            <div className="h-screen overflow-y-auto overflow-x-auto px-4 py-4 pb-20">
              <div className="flex gap-4 pb-10 min-w-max">
                {eventosPorMes.map((mesObj, idx) => (
                  <div
                    key={idx}
                    className="w-[250px] md:w-[300px] lg:w-[280px] flex-shrink-0"
                  >
                    <div
                      className={`${mesObj.cor} px-2 py-2 rounded-md flex justify-between items-center mb-4`}
                    >
                      <Typography variant="h2_bold"> {mesObj.mes}</Typography>
                      <CalendarDays />
                    </div>
                    <div className="flex flex-col gap-4">
                      {mesObj.eventos.map((evento, i) => (
                        <EventoCard
                          key={i}
                          nome={evento.nome}
                          data={evento.data}
                          local={evento.local}
                          status={evento.status}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <CalendarioMensal
                ano={2025}
                mes={3}
                eventos={[
                  { nome: "Evento ", data: "2025-04-08", status: "Confirmado" },
                  { nome: "Evento 2", data: "2025-04-04", status: "Pendente" },
                  { nome: "Evento 3", data: "2025-04-29", status: "Cancelado" },
                ]}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Agendamento;

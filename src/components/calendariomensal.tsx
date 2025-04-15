import { useMemo } from "react";
import {
  format,
  startOfMonth,
  eachDayOfInterval,
  startOfWeek,
  addDays,
  isSameMonth,
  isToday,
} from "date-fns";
import { pt, ptBR } from "date-fns/locale";
import Typography from "./typography";

type StatusEvento = "Confirmado" | "Pendente" | "Cancelado";

type Evento = {
  nome: string;
  data: string;
  status: StatusEvento;
};

type Props = {
  eventos: Evento[];
  ano: number;
  mes: number;
};

const statusColorMap: Record<StatusEvento, string> = {
  Confirmado: "bg-green-500",
  Pendente: "bg-yellow-400",
  Cancelado: "bg-red-400",
};

export default function CalendarioMensal({ eventos, ano, mes }: Props) {
  const primeiroDia = startOfMonth(new Date(ano, mes));

  const diasVisiveis = useMemo(() => {
    const inicio = startOfWeek(primeiroDia, { locale: pt });
    const fim = addDays(inicio, 41); // 6 semanas visíveis
    return eachDayOfInterval({ start: inicio, end: fim });
  }, [ano, mes]);

  return (
    <div>
      <Typography variant="h1_bold" className="mb-4 text-center capitalize">
        {format(primeiroDia, "MMMM yyyy", { locale: ptBR })}
      </Typography>

      <div className="grid grid-cols-7 gap-2">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia, idx) => (
          <div key={idx} className="text-center font-semibold text-gray-600">
            {dia}
          </div>
        ))}

        {diasVisiveis.map((dia, idx) => {
          const dataStr = format(dia, "yyyy-MM-dd");
          const eventosDoDia = eventos.filter((e) => e.data === dataStr);
          const isOutroMes = !isSameMonth(dia, primeiroDia);

          return (
            <div
              key={idx}
              className={`border rounded-md min-h-[80px] p-1 text-xs flex flex-col gap-1
                ${isOutroMes ? "bg-gray-50 text-gray-400" : "bg-white"}
                ${
                  isToday(dia)
                    ? "border-primary-500 border-2"
                    : "border-gray-200"
                }
              `}
              aria-label={format(dia, "PPPP", { locale: ptBR })}
            >
              <div className="font-semibold text-sm text-gray-700">
                {format(dia, "d")}
              </div>

              {eventosDoDia.length > 0 ? (
                eventosDoDia.map((evento, i) => (
                  <div
                    key={i}
                    className={`truncate text-white rounded-full px-2 py-0.5 text-[10px] w-fit max-w-full
                      ${statusColorMap[evento.status]} 
                      ${
                        isToday(new Date(evento.data))
                          ? "ring-2 ring-primary-500 font-bold"
                          : ""
                      }
                    `}
                    title={`${evento.nome} - ${format(
                      new Date(evento.data),
                      "dd/MM/yyyy"
                    )}`}
                  >
                    {evento.nome}
                  </div>
                ))
              ) : (
                <span className="text-gray-300 italic text-[10px]">
                  Sem eventos
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useMemo } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, addDays, isSameMonth, isToday } from "date-fns";
import { pt, ptBR } from "date-fns/locale";

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
    Confirmado: "bg-green-300",
    Pendente: "bg-yellow-300",
    Cancelado: "bg-red-300",
};

export default function CalendarioMensal({ eventos, ano, mes }: Props) {
    const primeiroDia = startOfMonth(new Date(ano, mes));
    const ultimoDia = endOfMonth(new Date(ano, mes));

    const diasVisiveis = useMemo(() => {
        const inicio = startOfWeek(primeiroDia, { locale: pt });
        const fim = addDays(inicio, 41); // 6 semanas
        return eachDayOfInterval({ start: inicio, end: fim });
    }, [ano, mes]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-center">{format(primeiroDia, "MMMM yyyy", { locale: ptBR })}</h2>

            <div className="grid grid-cols-7 gap-2">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia, idx) => (
                    <div key={idx} className="text-center font-semibold text-gray-600">{dia}</div>
                ))}

                {diasVisiveis.map((dia, idx) => {
                    const dataStr = format(dia, "yyyy-MM-dd");
                    const eventosDoDia = eventos.filter(e => e.data === dataStr);

                    return (
                        <div
                            key={idx}
                            className={`border rounded-md min-h-[80px] p-1 text-xs flex flex-col gap-1 ${isSameMonth(dia, primeiroDia) ? "" : "bg-gray-50 text-gray-400"
                                } ${isToday(dia) ? "border-blue-400 border-2" : ""}`}
                        >
                            <div className="font-semibold text-sm text-gray-700">{format(dia, "d")}</div>

                            {eventosDoDia.map((evento, i) => {
                                const dataEvento = new Date(evento.data);
                                const ehHoje = isToday(dataEvento); // verifica se o evento é hoje

                                return (
                                    <div
                                        key={i}
                                        className={`rounded-full px-2 py-1 text-white text-[10px] w-fit ${statusColorMap[evento.status]} ${ehHoje ? "ring-2 ring-blue-500 font-bold" : ""
                                            }`}
                                    >
                                        {format(dataEvento, "dd/MM/yyyy")}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
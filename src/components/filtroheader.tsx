import { CalendarDays, LayoutGrid } from "lucide-react";
import Typography from "./Global/typography";

interface Props {
  abaAtiva: string;
  visao: string;
  onChangeAba: (aba: string) => void;
  onChangeVisao: (visao: string) => void;
}

const abas = [
  { id: "todos", label: "Todos" },
  { id: "recentes", label: "Mais recentes" },
];

const visoes = [
  { id: "cartoes", label: "Cartões", icon: LayoutGrid },
  { id: "calendario", label: "Agenda", icon: CalendarDays },
];

const FiltroHeader = ({
  abaAtiva,
  visao,
  onChangeAba,
  onChangeVisao,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-5 border-b py-2">
      <div className="flex space-x-6">
        {abas.map((aba) => (
          <button
            key={aba.id}
            onClick={() => onChangeAba(aba.id)}
            className={`text-sm font-semibold pb-2 truncate overflow-hidden whitespace-nowrap transition-all duration-150 ${
              abaAtiva === aba.id
                ? "text-primary-950 border-b-2 border-primary-950"
                : "text-gray-500 hover:text-primary-800"
            }`}
            aria-label={`Selecionar aba ${aba.label}`}
          >
            <Typography variant="p_medium">{aba.label}</Typography>
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-3">
        {visoes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChangeVisao(id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-all duration-150 ${
              visao === id
                ? "bg-primary-950 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            aria-label={`Mudar visão para ${label}`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FiltroHeader;

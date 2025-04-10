import { CalendarDays, LayoutGrid } from "lucide-react";

interface Props {
  abaAtiva: string;
  visao: string;
  onChangeAba: (aba: string) => void;
  onChangeVisao: (visao: string) => void;
}

const FiltroHeader = ({ abaAtiva, visao, onChangeAba, onChangeVisao }: Props) => {
  return (
    <div className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex space-x-6">
        <button
          onClick={() => onChangeAba("todos")}
          className={`text-sm font-semibold pb-2 ${abaAtiva === "todos"
              ? "text-[#003459] border-b-2 border-[#003459]"
              : "text-gray-500"
            }`}
        >
          Todos
        </button>
        <button
          onClick={() => onChangeAba("recentes")}
          className={`text-sm font-medium pb-2 ${abaAtiva === "recentes"
              ? "text-[#003459] border-b-2 border-[#003459]"
              : "text-gray-500"
            }`}
        >
          Mais recentes
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => onChangeVisao("cartoes")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm ${visao === "cartoes"
              ? "bg-[#4B7083] text-white"
              : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <LayoutGrid className="w-4 h-4" />
          Cartões
        </button>
        <button
          onClick={() => onChangeVisao("calendario")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm ${visao === "calendario"
              ? "bg-[#4B7083] text-white"
              : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <CalendarDays className="w-4 h-4" />
          Agenda
        </button>
      </div>
    </div>
  );
};

export default FiltroHeader;

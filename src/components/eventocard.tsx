import { CalendarDays, MapPin, MoreHorizontal } from "lucide-react";
import { Card } from "./global_cards";
import Typography from "./typography";

const statusColors = {
  Confirmado: "bg-green-100 text-green-600",
  Pendente: "bg-yellow-100 text-yellow-600",
  Cancelado: "bg-red-100 text-red-600",
};

export const EventoCard = ({
  nome,
  data,
  local,
  status,
}: {
  nome: string;
  data: string;
  local: string;
  status: "Confirmado" | "Pendente" | "Cancelado";
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between  mt-8 p-3 ">
        <div className="flex gap-3">
          <img
            src="https://i.pravatar.cc/50?img=1"
            alt={nome}
            className="rounded-full w-9 h-9"
          />
          <div>
            <Typography variant="p_bold">{nome}</Typography>
            <Typography variant="p_normal">2 minutes</Typography>
          </div>
        </div>
        <MoreHorizontal className="w-4 h-4 text-gray-800 mt-1" />
      </div>

      <div className="ml-14">
        <div className="flex items-center gap-2 text-sm mb-1 text-gray-700">
          <CalendarDays className="w-4 h-4 text-gray-600" />
          <span>{data}</span>
        </div>

        <div className="flex items-center gap-2 text-sm mb-3 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-600" />
          <span>{local}</span>
        </div>

        <div className={` w-[100px] p-1 flex items-center justify-center  rounded-full ${statusColors[status]}`}>
          <Typography variant="p_normal">{status}</Typography>
        </div>
      </div>
    </Card>
  );
};

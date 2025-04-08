import { CalendarDays, MapPin, MoreHorizontal } from "lucide-react";

const statusColors = {
  Confirmado: "bg-green-100 text-green-600",
  Pendente: "bg-yellow-100 text-yellow-600",
  Cancelado: "bg-red-100 text-red-600",
};

export const EventoCard = ({ nome, data, local, status }: {
  nome: string;
  data: string;
  local: string;
  status: "Confirmado" | "Pendente" | "Cancelado";
}) => {
    return (
        <div className="max-w-[290px] mx-auto rounded-lg border-gray-900 shadow-[0_4px_8px_-2px_rgba(0,0,0,0.1)]">
         
    
            
            <div className="flex items-start justify-between mb-3 mt-8 p-3">
              <div className="flex gap-3">
                <img
                  src="https://i.pravatar.cc/50?img=1"
                  alt={nome}
                  className="rounded-full w-9 h-9"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-800">{nome}</p>
                  <p className="text-xs text-gray-500">2 minutes</p>
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
    
              <div className="pb-5">
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${statusColors[status]}`}>
                  {status}
                </span>
              </div>
            </div>
          </div>
        
      );
    };
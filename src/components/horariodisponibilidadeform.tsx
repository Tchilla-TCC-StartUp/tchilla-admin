import Typography from "./Global/Typography";
import GlobalInput from "./Global/GlobalInput";
import GlobalDropdown from "./Global/GlobalDropdown";

type HorarioDisponibilidadeProps = {
  tipoDisponibilidade: "sempre" | "intervalo" | "nenhum";
  setTipoDisponibilidade: (value: "sempre" | "intervalo" | "nenhum") => void;
  horarioInicio: string;
  setHorarioInicio: (value: string) => void;
  horarioFim: string;
  setHorarioFim: (value: string) => void;
};

const HorarioDisponibilidadeForm = ({
  tipoDisponibilidade,
  setTipoDisponibilidade,
  horarioInicio,
  setHorarioInicio,
  horarioFim,
  setHorarioFim,
}: HorarioDisponibilidadeProps) => {
  return (
    <div className="md:col-span-2 border-gray-500">
      <label className="block text-sm font-medium mt-2 text-gray-600 mb-1">
        Disponibilidade de horário
      </label>
      <div className="mb-2">
        <GlobalDropdown
          onChange={(value) =>
            setTipoDisponibilidade(value as "sempre" | "intervalo" | "nenhum")
          }
          placeholder="Disponibilidade de horário"
          options={[
            { label: "Sempre disponível", value: "sempre" },
            { label: "Não se aplica (sem horário)", value: "nenhum" },
            { label: "Intervalo", value: "intervalo" },
          ]}
        />
      </div>

      {tipoDisponibilidade === "intervalo" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography
              className="block text-sm font-medium text-gray-600 mb-1"
              variant={"h2_bold"}
            >
              Início
            </Typography>
            <GlobalInput
              type="time"
              value={horarioInicio}
              onChange={(e) => setHorarioInicio(e.target.value)}
            />
          </div>
          <div>
            <Typography
              className="block text-sm font-medium text-gray-600 mb-1"
              variant={"h2_bold"}
            >
              Fim
            </Typography>
            <GlobalInput
              type="time"
              value={horarioFim}
              onChange={(e) => setHorarioFim(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HorarioDisponibilidadeForm;

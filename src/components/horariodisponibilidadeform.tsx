import Typography from "./typography";
import GlobalInput from "./Global/global_input";
import GlobalDropdown from "./Global/global_dropdown";

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
          onChange={(value) => setTipoDisponibilidade(value)}
          placeholder="  Disponibilidade de horário"
          options={[
            { label: "Sempre disponível", value: "sempre" },
            { label: "Não se aplica (sem horário)", value: "nenhum" },
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

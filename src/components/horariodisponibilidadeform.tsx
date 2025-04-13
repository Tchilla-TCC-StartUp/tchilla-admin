import Typography from "./typography";
import GlobalInput from "./global_input";

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
        <div className="md:col-span-2 border-gray-500 border-t-4 ">
            <Typography className="text-lg font-semibold text-gray-700 mt-  mb-1" variant="h2_bold">
                Disponibilidade de horário
            </Typography>

            <div className="mb-2">
                <Typography className="block text-sm font-medium text-gray-600 mb-1 " variant={"h2_bold"}>Tipo de disponibilidade:</Typography>
                <select
                    className="w-full h-14 text-base px-4 py-2 border rounded-md"
                    value={tipoDisponibilidade}
                    onChange={(e) =>
                        setTipoDisponibilidade(e.target.value as "sempre" | "intervalo" | "nenhum")
                    }
                >
                    <option value="sempre">Sempre disponível</option>
                    <option value="intervalo">Disponível em um horário específico</option>
                    <option value="nenhum">Não se aplica (sem horário)</option>
                </select>
            </div>

            {tipoDisponibilidade === "intervalo" && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Typography className="block text-sm font-medium text-gray-600 mb-1" variant={"h2_bold"} >Início</Typography>
                        <GlobalInput
                            type="time"
                            value={horarioInicio}
                            onChange={(e) => setHorarioInicio(e.target.value)}
                        />
                    </div>
                    <div>
                        <Typography className="block text-sm font-medium text-gray-600 mb-1" variant={"h2_bold"} >Fim</Typography>
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

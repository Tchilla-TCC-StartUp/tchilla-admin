import GlobalInput from "./Global/global_input";
import Typography from "./typography";

type PromocaoFormProps = {
    valorAtual: string;
    setValorAtual: (value: string) => void;
    valorPromocional: string;
    setValorPromocional: (value: string) => void;
    resultadoPercentual: string;
    setResultadoPercentual: (value: string) => void;
};
const PromocaoForm = ({
    valorAtual,
    setValorAtual,
    valorPromocional,
    setValorPromocional,
    resultadoPercentual,
    setResultadoPercentual
}: PromocaoFormProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div>
                <Typography className="block text-sm font-medium text-gray-500 mb-1" variant={"h2_bold"}>Valor Atual</Typography>
                <GlobalInput
                    type="text"
                    value={valorAtual}
                    onChange={e => setValorAtual(e.target.value)}
                    placeholder="Valor atual"
                    className="border rounded px-3 py-4 w-full"
                />
            </div>
            <div>
                <Typography className="block text-sm font-medium text-gray-500 mb-1" variant={"h2_bold"}>Valor Promocional</Typography>
                <GlobalInput
                    type="text"
                    value={valorPromocional}
                    onChange={e => setValorPromocional(e.target.value)}
                    placeholder="Valor promocional"
                    className="border rounded px-3 py-4 w-full"
                />
            </div>
            <div>
                <Typography className="block text-sm font-medium text-gray-500 mb-1" variant={"h2_bold"} >Resultado em %</Typography>
                <GlobalInput
                    type="text"
                    value={resultadoPercentual}
                    onChange={e => setResultadoPercentual(e.target.value)}
                    placeholder="Resultado %"
                    className="border rounded px-3 py-4 w-full"
                />
            </div>
        </div>
    );
};

export default PromocaoForm;
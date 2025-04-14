import { useState } from 'react';
import GlobalButton from './Global/global_button';
import Typography from './typography';
import CategoriaDiasForm from './categoriadiasform';
import PromocaoForm from './promocaoform';
import NomePrecoForm from './servicoselecionadores';
import FotosForm from './fotosform';
import DescricaoForm from './descricaoform';
import HorarioDisponibilidadeForm from './horariodisponibilidadeform';
type ServicoData = {
    nome?: string;
    preco?: string;
    categoria?: string;
    ValorAtual?: string;
    valorPromocional?: string;
    resultadoPercentual?: string;
    descricao?: string;
    fotos?: (File | null)[];
    pacotes?: string[];
    DiasDaSemana?: string[]
};
type ServicoFormProps = {

    initialData?: ServicoData;
    onClose: () => void;
    onSubmit: (data: any) => void;
};
export const ServicoForm = ({ onSubmit, onClose, initialData = {} }: ServicoFormProps) => {
    const [tipoDisponibilidade, setTipoDisponibilidade] = useState<"sempre" | "intervalo" | "nenhum">("sempre");
    const [horarioInicio, setHorarioInicio] = useState("12:00");
    const [horarioFim, setHorarioFim] = useState("22:00");
    const [nome, setNome] = useState(initialData.nome || '');
    const [preco, setPreco] = useState(initialData.preco || '');
    const [categoria, setCategoria] = useState<string | number>('');
    const [DiasDaSemana, setDiasDisponiveis] = useState(initialData.DiasDaSemana || ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo']);
    const [valorPromocional, setValorPromocional] = useState(initialData.valorPromocional || '');
    const [valorAtual, setValorAtual] = useState(initialData.ValorAtual || '');
    const [resultadoPercentual, setResultadoPercentual] = useState(initialData.resultadoPercentual || '');
    const [descricao, setDescricao] = useState(initialData.descricao || '');
    const [fotos, setFotos] = useState(initialData.fotos || [null, null, null, null]);
    const handleFotoChange = (index: number, file: File | null) => {
        const newFotos = [...fotos];
        newFotos[index] = file;
        setFotos(newFotos);
    };
    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit({
                categoria: String(categoria),
                nome,
                preco,
                DiasDaSemana,
                valorPromocional,
                resultadoPercentual,
                descricao,
                fotos,
                disponibilidade:
                    tipoDisponibilidade === "sempre"
                        ? "Sempre disponível"
                        : tipoDisponibilidade === "nenhum"
                            ? "Sem horário necessário"
                            : `${horarioInicio} - ${horarioFim}`,
            });
        }
    };
    return (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white w-[95vw] max-w-5xl rounded-xl shadow-xl p-10 mt-12 overflow-y-auto max-h-[85vh]">

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <Typography className="text-2xl font-bold text-gray-900" variant="h1_medium">
                            Adicionar os seus serviços
                        </Typography>
                        <Typography className="text-gray-500 mt-1" variant="h2_normal">
                            Adicione os seus serviços e o descreva
                        </Typography>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">×</button>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NomePrecoForm nome={nome} setNome={setNome} preco={preco} setPreco={setPreco} />


                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <CategoriaDiasForm
                                categoria={categoria}
                                setCategoria={setCategoria}
                                diasDisponiveis={DiasDaSemana}
                                setDiasDisponiveis={setDiasDisponiveis}
                            />
                        </div>
                        <div className='mb-4'>
                            <HorarioDisponibilidadeForm
                                tipoDisponibilidade={tipoDisponibilidade}
                                setTipoDisponibilidade={setTipoDisponibilidade}
                                horarioInicio={horarioInicio}
                                setHorarioInicio={setHorarioInicio}
                                horarioFim={horarioFim}
                                setHorarioFim={setHorarioFim}
                            />
                        </div>
                    </div>

                </form>
                <Typography className="mt-6 text-lg font-semibold text-gray-500" variant="h2_bold">
                    Configurar promoção
                </Typography>
                <PromocaoForm
                    valorAtual={valorAtual}
                    setValorAtual={setValorAtual}
                    valorPromocional={valorPromocional}
                    setValorPromocional={setValorPromocional}
                    resultadoPercentual={resultadoPercentual}
                    setResultadoPercentual={setResultadoPercentual}
                />
                <Typography className="text-lg font-semibold mb-2 text-gray-500" variant="h2_bold">
                    Fotos do serviço
                </Typography>
                <FotosForm fotos={fotos} onFotoChange={handleFotoChange} />
                <DescricaoForm descricao={descricao} setDescricao={setDescricao} />
                <div className="flex gap-4 mt-6">
                    <GlobalButton variant="primary" onClick={handleSubmit}>Adicionar</GlobalButton>
                    <GlobalButton variant="outline" onClick={onClose}>Cancelar</GlobalButton>
                </div>
            </div>
        </div>
    );
};
import { useState } from 'react';
import GlobalButton from './global_button';
import Typography from './typography';
import CategoriaDiasForm from './categoriadiasform';
import PacoteSelectForm from './pacoteselectgorm';
import PromocaoForm from './promocaoform';
import NomePrecoForm from './servicoselecionadores';
import FotosForm from './fotosform';
import DescricaoForm from './descricaoform';
type ServicoData = {
    nome?: string;
    preco?: string;
    categoria?: string;
    diasDisponiveis?: string;
    valorAtual?: string;
    valorPromocional?: string;
    resultadoPercentual?: string;
    descricao?: string;
    fotos?: (File | null)[];
    pacotes?: string[];
};
type ServicoFormProps = {

    initialData?: ServicoData;
    onClose: () => void;
    onSubmit: (data: any) => void;
};
export const ServicoForm = ({ onSubmit, onClose, initialData = {} }: ServicoFormProps) => {
    const [nome, setNome] = useState(initialData.nome || '');
    const [preco, setPreco] = useState(initialData.preco || '');
    const [categoria, setCategoria] = useState<string | number>('');
    const [diasDisponiveis, setDiasDisponiveis] = useState<string | number>(''); const [valorAtual, setValorAtual] = useState(initialData.valorAtual || '');
    const [valorPromocional, setValorPromocional] = useState(initialData.valorPromocional || '');
    const [resultadoPercentual, setResultadoPercentual] = useState(initialData.resultadoPercentual || '');
    const [descricao, setDescricao] = useState(initialData.descricao || '');
    const [fotos, setFotos] = useState(initialData.fotos || [null, null, null, null]);
    const [pacotes, setPacotes] = useState(initialData.pacotes || ['Decoração', 'Garçons', 'Bufet']);
    const handleFotoChange = (index: number, file: File | null) => {
        const newFotos = [...fotos];
        newFotos[index] = file;
        setFotos(newFotos);
    };
    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit({
                categoria: String(categoria),
                diasDisponiveis: String(diasDisponiveis),
                nome, preco, valorAtual, valorPromocional, resultadoPercentual, descricao, fotos, pacotes
            });
        }
    };
    return (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white w-[95vw] max-w-5xl rounded-xl shadow-xl p-10 mt-12 overflow-y-auto max-h-[85vh]">

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <Typography className="text-2xl font-bold text-gray-900" variant="h2_bold">
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
                    <PacoteSelectForm pacotes={pacotes} setPacotes={setPacotes} />
                    <CategoriaDiasForm
                        categoria={categoria}
                        setCategoria={setCategoria}
                        diasDisponiveis={diasDisponiveis}
                        setDiasDisponiveis={setDiasDisponiveis}
                    />
                </form>
                <Typography className="mt-6 text-lg font-semibold text-gray-700" variant="h2_bold">
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
                <Typography className="text-lg font-semibold mb-2 text-gray-700" variant="h2_bold">
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
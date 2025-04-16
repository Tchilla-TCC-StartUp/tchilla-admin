import { useState } from "react";
import GlobalButton from "./Global/global_button";
import Typography from "./typography";
import CategoriaDiasForm from "./categoriadiasform";
import PromocaoForm from "./promocaoform";
import NomePrecoForm from "./servicoselecionadores";
import FotosForm from "./fotosform";
import DescricaoForm from "./descricaoform";
import HorarioDisponibilidadeForm from "./horariodisponibilidadeform";
import { Card } from "./Global/global_cards";
import GlobalBackButton from "./Global/global_back_button";
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
  DiasDaSemana?: string[];
};
type ServicoFormProps = {
  initialData?: ServicoData;
  onClose: () => void;
  onSubmit: (data: any) => void;
};
export const ServicoForm = ({
  onSubmit,
  onClose,
  initialData = {},
}: ServicoFormProps) => {
  const [tipoDisponibilidade, setTipoDisponibilidade] = useState<
    "sempre" | "intervalo" | "nenhum"
  >("sempre");
  const [horarioInicio, setHorarioInicio] = useState("12:00");
  const [horarioFim, setHorarioFim] = useState("22:00");
  const [nome, setNome] = useState(initialData.nome || "");
  const [preco, setPreco] = useState(initialData.preco || "");
  const [categoria, setCategoria] = useState<string | number>("");
  const [DiasDaSemana, setDiasDisponiveis] = useState(
    initialData.DiasDaSemana || [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sabado",
      "Domingo",
    ]
  );
  const [valorPromocional, setValorPromocional] = useState(
    initialData.valorPromocional || ""
  );
  const [valorAtual, setValorAtual] = useState(initialData.ValorAtual || "");
  const [resultadoPercentual, setResultadoPercentual] = useState(
    initialData.resultadoPercentual || ""
  );
  const [descricao, setDescricao] = useState(initialData.descricao || "");
  const [fotos, setFotos] = useState(
    initialData.fotos || [null, null, null, null]
  );
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
    <div className=" bg-white bg-opacity-60 flex items-center justify-center">
      <Card className="p-4">
        <GlobalBackButton onClick={onClose} />
        <div className="flex justify-between items-start">
          <div>
            <Typography variant="h2_bold">
              Adicionar os seus serviços
            </Typography>
            <Typography className="text-gray-500" variant="h3_normal">
              Adicione os seus serviços e o descreva
            </Typography>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NomePrecoForm
            nome={nome}
            setNome={setNome}
            preco={preco}
            setPreco={setPreco}
          />

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <CategoriaDiasForm
                categoria={categoria}
                setCategoria={setCategoria}
                diasDisponiveis={DiasDaSemana}
                setDiasDisponiveis={setDiasDisponiveis}
              />
            </div>
            <div className="mb-4">
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

        <Typography className=" text-gray-500" variant="h3_normal">
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

        <Typography className="text-lg mb-2 text-gray-500" variant="h3_normal">
          Fotos do serviço
        </Typography>
        <FotosForm fotos={fotos} onFotoChange={handleFotoChange} />

        <DescricaoForm descricao={descricao} setDescricao={setDescricao} />

        <div className="flex gap-4 mt-6">
          <GlobalButton variant="primary" onClick={handleSubmit}>
            Adicionar
          </GlobalButton>
          <GlobalButton variant="outline" onClick={onClose}>
            Cancelar
          </GlobalButton>
        </div>
      </Card>
    </div>
  );
};

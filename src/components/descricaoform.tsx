import GlobalInput from "./Global/GlobalInput";

type DescricaoFormProps = {
  descricao: string;
  setDescricao: (value: string) => void;
};
const DescricaoForm = ({ descricao, setDescricao }: DescricaoFormProps) => (
  <div className="my-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Descrição
    </label>
    <GlobalInput
      placeholder="Descrição"
      className="w-full"
      maxLength={800}
      value={descricao}
      onChange={(e) => setDescricao(e.target.value)}
    />
    <p className="text-right text-sm text-gray-400">{descricao.length}/800</p>
  </div>
);

export default DescricaoForm;

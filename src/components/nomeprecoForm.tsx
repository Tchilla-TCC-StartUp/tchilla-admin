import GlobalInput from "./global_input";

type NomePrecoFormProps = {
    nome: string;
    setNome: (value: string) => void;
    preco: string;
    setPreco: (value: string) => void;
  }; 
  const NomePrecoForm = ({ nome, setNome, preco, setPreco }: NomePrecoFormProps) => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Nome</label>
        <GlobalInput placeholder="Nome do serviço" value={nome} onChange={e => setNome(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Preço</label>
        <GlobalInput placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} />
      </div>
    </>
  );
  export default NomePrecoForm;
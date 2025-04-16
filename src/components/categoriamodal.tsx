import { useState } from "react";
import GlobalButton from "./Global/global_button";
import Typography from "./typography";
import GlobalInput from "./Global/global_input";
import { Card } from "./Global/global_cards";
import GlobalBackButton from "./Global/global_back_button";

type SubCategoria = {
  nome: string;
  descricao: string;
};

type CategoriaFormProps = {
  onClose: () => void;
  onSubmit: (data: any) => void;
};

export const CategoriaModal = ({ onClose, onSubmit }: CategoriaFormProps) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
  const [newSubNome, setNewSubNome] = useState("");
  const [newSubDescricao, setNewSubDescricao] = useState("");

  const handleAddSubCategoria = () => {
    if (!newSubNome) return;
    setSubCategorias([
      ...subCategorias,
      {
        nome: newSubNome,
        descricao: newSubDescricao,
      },
    ]);
    setNewSubNome("");
    setNewSubDescricao("");
  };

  const handleSubmit = () => {
    onSubmit({
      nome,
      descricao,
      subCategorias,
    });
  };

  return (
    <div className=" bg-white bg-opacity-60 flex items-center justify-center">
      <Card className="bg-white w-full p-4">
        <GlobalBackButton onClick={onClose} />
        <div className="flex justify-between items-start mb-6">
          <div>
            <Typography variant="h2_bold">Nova Categoria</Typography>
            <Typography variant="h3_normal" className="text-gray-500">
              Adicione uma nova categoria e subcategorias associadas
            </Typography>
          </div>
        </div>

        <div className="flex flex-col  gap-4">
          <GlobalInput
            placeholder="Imagem da categoria"
            type="file"
            value={nome}
          />
          <GlobalInput
            placeholder="Nome da categoria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <GlobalInput
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        {/* 
        <div className="border-t pt-4 mt-4">
          <Typography variant="h2_bold" className="mb-2 text-gray-600">
            Adicionar Subcategoria
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            <GlobalInput
              placeholder="Nome da subcategoria"
              value={newSubNome}
              onChange={(e) => setNewSubNome(e.target.value)}
            />
            <GlobalInput
              placeholder="Descrição"
              value={newSubDescricao}
              onChange={(e) => setNewSubDescricao(e.target.value)}
            />
          </div>
          <GlobalButton variant="outline" onClick={handleAddSubCategoria}>
            Adicionar Subcategoria
          </GlobalButton>
        </div>

        {subCategorias.length > 0 && (
          <div className="mt-6">
            <Typography variant="h2_bold" className="mb-2">
              Subcategorias Adicionadas
            </Typography>
            <ul className="list-disc pl-5 space-y-1">
              {subCategorias.map((sub, index) => (
                <li key={index}>
                  <span className="font-semibold">{sub.nome}</span>:{" "}
                  {sub.descricao}
                </li>
              ))}
            </ul>
          </div>
        )} */}

        <div className="flex gap-4 mt-6">
          <GlobalButton variant="primary" onClick={handleSubmit}>
            Salvar Categoria
          </GlobalButton>
          <GlobalButton variant="outline" onClick={onClose}>
            Cancelar
          </GlobalButton>
        </div>
      </Card>
    </div>
  );
};

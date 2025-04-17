import { useState } from "react";

import GlobalAvatar from "../Global/global_avatar";
import GlobalBackButton from "../Global/global_back_button";
import GlobalButton from "../Global/global_button";
import { Card } from "../Global/global_cards";
import GlobalInput from "../Global/global_input";
import Typography from "../Global/typography";
import {
  CategoryDetailsProps,
  CategoryFormFields,
} from "../../interfaces/CategoryInterface";

export const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  categoria,
  onSave,
  onBack,
}) => {
  const [formFields, setFormFields] = useState<CategoryFormFields>({
    nome: categoria?.nome || "",
    descricao: categoria?.descricao || "",
    foto: null,
  });

  const handleFormChange = (key: string, value: string | File) => {
    setFormFields((prev: CategoryFormFields) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="bg-white w-full p-6">
      <GlobalBackButton onClick={onBack} />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Typography variant="h2_bold">Detalhes da Categoria</Typography>
          <GlobalButton variant="primary" onClick={() => onSave(formFields)}>
            Salvar Alterações
          </GlobalButton>
        </div>
        <div className="flex flex-col gap-4">
          <GlobalAvatar src={categoria?.foto ?? ""} alt="Imagem" />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-gray-500">Imagem</label>
          <GlobalInput
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFormChange("foto", file);
            }}
          />
          <label className="text-gray-500">Name</label>
          <GlobalInput
            placeholder="Nome da categoria"
            value={formFields.nome}
            onChange={(e) => handleFormChange("nome", e.target.value)}
          />
          <label className="text-gray-500">Descrição</label>
          <GlobalInput
            placeholder="Descrição"
            value={formFields.descricao}
            onChange={(e) => handleFormChange("descricao", e.target.value)}
          />
          <div className="flex gap-4 mt-4"></div>
        </div>
      </div>
    </Card>
  );
};

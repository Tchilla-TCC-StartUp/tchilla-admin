import { useState } from "react";
import GlobalInput from "../Global/global_input";
import GlobalButton from "../Global/global_button";
import GlobalBackButton from "../Global/global_back_button";
import Typography from "../Global/typography";
import {
  CategoryFormFields,
  CategoryFormProps,
} from "../../interfaces/CategoryInterface";
import { Card } from "../Global/global_cards";

export const CategoryForm: React.FC<CategoryFormProps> = ({
  onSubmit,
  onCancel,
  title,
  subtitle,
}) => {
  const [formFields, setFormFields] = useState<CategoryFormFields>({
    nome: "",
    descricao: "",
    foto: null,
  });

  const handleFormChange = (key: string, value: string | File) => {
    setFormFields((prev: CategoryFormFields) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formFields);
  };

  return (
    <Card className="bg-white w-full p-4">
      <GlobalBackButton onClick={onCancel} />
      <div className="flex justify-between items-start mb-6">
        <div>
          <Typography variant="h2_bold">{title}</Typography>
          <Typography variant="h3_normal" className="text-gray-500">
            {subtitle}
          </Typography>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-gray-500">Imagem</label>
        <GlobalInput
          placeholder="Imagem da categoria"
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFormChange("foto", file);
          }}
        />
        <label className="text-gray-500">Nome</label>
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
      </div>

      <div className="flex gap-4 mt-6">
        <GlobalButton variant="primary" onClick={handleSubmit}>
          Salvar Categoria
        </GlobalButton>
        <GlobalButton variant="outline" onClick={onCancel}>
          Cancelar
        </GlobalButton>
      </div>
    </Card>
  );
};

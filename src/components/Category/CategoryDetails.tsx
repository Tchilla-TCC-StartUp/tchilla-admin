import { useState } from "react";

import GlobalAvatar from "../Global/global_avatar";
import GlobalBackButton from "../Global/global_back_button";
import GlobalButton from "../Global/global_button";
import { Card } from "../Global/global_cards";
import GlobalInput from "../Global/global_input";
import Typography from "../typography";
import { CategoryData, CategoryFormFields } from "../../interfaces/CategoryInterface";



interface CategoryDetailsProps {
  categoria: CategoryData | null;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSave: (formFields: CategoryFormFields) => void;
  onBack: () => void;
}

export const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  categoria,
  isEditing,
  onEdit,
  onCancelEdit,
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
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <Typography variant="h2_bold">Detalhes da Categoria</Typography>
          <GlobalBackButton onClick={onBack} />
        </div>


        {!isEditing ? (
          <div className="flex flex-col gap-4">
            <GlobalAvatar src={categoria?.foto ?? ""} alt="Imagem" />
            <Typography variant="h3_normal">Nome: {categoria?.nome}</Typography>
            <Typography variant="p_normal">
              Descrição: {categoria?.descricao}
            </Typography>
            <GlobalButton variant="primary" onClick={onEdit}>
              Editar Categoria
            </GlobalButton>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <GlobalInput
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFormChange("foto", file);
              }}
            />
            <GlobalInput
              placeholder="Nome da categoria"
              value={formFields.nome}
              onChange={(e) => handleFormChange("nome", e.target.value)}
            />
            <GlobalInput
              placeholder="Descrição"
              value={formFields.descricao}
              onChange={(e) => handleFormChange("descricao", e.target.value)}
            />
            <div className="flex gap-4 mt-4">
              <GlobalButton
                variant="primary"
                onClick={() => onSave(formFields)}
              >
                Salvar Alterações
              </GlobalButton>
              <GlobalButton variant="outline" onClick={onCancelEdit}>
                Cancelar
              </GlobalButton>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

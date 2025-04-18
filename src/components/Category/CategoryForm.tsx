import React, { useState } from "react";
import GlobalInput from "../Global/GlobalInput";
import GlobalButton from "../Global/GlobalButton";
import GlobalBackButton from "../Global/GlobalBackButton";
import Typography from "../Global/Typography";
import {
  CategoryFormFields,
  CategoryFormProps,
} from "../../interfaces/CategoryInterface";
import { Card } from "../Global/GlobalCards";
import UploadImagemPreview from "../Global/UploadImagemPreview";
import { useSnackbarStore } from "../../stores/snackbar_store";

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

  const { showSnackbar } = useSnackbarStore();

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (!formFields.nome.trim()) {
      errors.push("O nome da categoria é obrigatório");
    }
    if (!formFields.foto) {
      errors.push("A imagem da categoria é obrigatória");
    }
    if (errors.length > 0) {
      showSnackbar(errors.join(" e "), "warning");
      return false;
    }
    return true;
  };

  const handleFormChange = (
    key: keyof CategoryFormFields,
    value: string | File | null
  ) => {
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formFields);
    }
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
        <label htmlFor="foto" className="text-gray-500 font-medium">
          Imagem
        </label>
        <UploadImagemPreview
          foto={formFields.foto}
          index={0}
          className="w-[200px] h-[200px]"
          onChange={(_, file) => {
            handleFormChange("foto", file);
          }}
        />

        <GlobalInput
          label="  Nome"
          id="nome"
          placeholder="Nome da categoria"
          value={formFields.nome}
          onChange={(e) => handleFormChange("nome", e.target.value)}
        />

        <GlobalInput
          label="Descrição"
          id="descricao"
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

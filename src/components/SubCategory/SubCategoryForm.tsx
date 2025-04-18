import React, { useState } from "react";
import GlobalInput from "../Global/GlobalInput";
import GlobalButton from "../Global/GlobalButton";
import Typography from "../Global/Typography";
import { useSnackbarStore } from "../../stores/snackbar_store";
import {
  SubCategoryData,
  SubCategoryFormData,
  SubCategoryFormProps,
} from "../../interfaces/SubCategoryInterface";
import GlobalDropdown from "../Global/GlobalDropdown";
import { useSettings } from "../../hooks/SettingsHook";
import { mapToDropdownOptions } from "../../utils/Mapers";

export const SubCategoryForm: React.FC<SubCategoryFormProps> = ({
  onSubmit,
  title,
  categoriaId,
}) => {
  const [formFields, setFormFields] = useState<SubCategoryFormData>({
    nome: "",
    descricao: "",
    tipo: 0,
    categoriaId: categoriaId,
  });



  const { getEnum } = useSettings();
  const tipoEnum = getEnum("SubCategoriaTipo");
  const options = mapToDropdownOptions(tipoEnum);

  const { showSnackbar } = useSnackbarStore();

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (!formFields.nome.trim()) {
      errors.push("O nome da subcategoria é obrigatório");
    }
    if (formFields.tipo == null) {
      errors.push("O tipo da subcategoria é obrigatório");
    }
    if (errors.length > 0) {
      showSnackbar(errors.join(" e "), "warning");
      return false;
    }
    return true;
  };

  const handleFormChange = (
    key: keyof SubCategoryData,
    value: string | number | File | null
  ) => {
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formFields);
      console.log("Form submitted:", formFields);
    }
  };

  return (
    <div className="bg-white w-full">
      <Typography variant="h2_bold">{title}</Typography>
      <div className="flex flex-col gap-4">
        <label htmlFor="nome" className="text-gray-500 font-medium">
          Nome
        </label>
        <GlobalInput
          id="nome"
          placeholder="Nome da categoria"
          value={formFields.nome}
          onChange={(e) => handleFormChange("nome", e.target.value)}
        />

        <label htmlFor="descricao" className="text-gray-500 font-medium">
          Descrição
        </label>
        <GlobalInput
          id="descricao"
          placeholder="Descrição"
          value={formFields.descricao}
          onChange={(e) => handleFormChange("descricao", e.target.value)}
        />

        <GlobalDropdown
          options={options}
          onChange={(value) => handleFormChange("tipo", value)}
          selectedValue={formFields.tipo}
          placeholder="Tipo de Subcategoria"
          label="Tipo"
        />
      </div>

      <div className="flex gap-4 mt-6">
        <GlobalButton variant="primary" onClick={handleSubmit}>
          Adicionar Sub Categoria
        </GlobalButton>
      </div>
    </div>
  );
};

import GlobalDropdown from "./global_dropdown";

type CategoriaDiasFormProps = {
    categoria: string | number;
    setCategoria: (value: string | number) => void;
    diasDisponiveis: string | number;
    setDiasDisponiveis: (value: string | number) => void;
  };
  const CategoriaDiasForm = ({
    categoria,
    setCategoria,
    diasDisponiveis,
    setDiasDisponiveis,
  }: CategoriaDiasFormProps) => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Categoria</label>
        <GlobalDropdown
          options={[
            { label: 'Categoria 1', value: 'categoria1' },
            { label: 'Categoria 2', value: 'categoria2' },
          ]}
          selectedValue={categoria}
          onChange={setCategoria}
          placeholder="Selecionar categoria"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-600 mb-1">Dias disponíveis</label>
        <GlobalDropdown
          options={[
            { label: 'Segunda', value: 'segunda' },
            { label: 'Terça', value: 'terça' },
            { label: 'Quarta', value: 'quarta' },
            { label: 'Quinta', value: 'quinta' },
            { label: 'Sexta', value: 'sexta' },
            { label: 'Sábado', value: 'sabado' },
            { label: 'Domingo', value: 'domingo' },
          ]}
          selectedValue={diasDisponiveis}
          onChange={setDiasDisponiveis}
          placeholder="Selecionar dias"
        />
      </div>
    </>
  );
  
  export default CategoriaDiasForm;
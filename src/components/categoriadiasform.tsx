import GlobalDropdown from "./global_dropdown";
import GlobalSelect from "./global_select";

type CategoriaDiasFormProps = {
  categoria: string | number;
  setCategoria: (value: string | number) => void;

  diasDisponiveis: string[];
  setDiasDisponiveis: (diasDisponiveis: string[]) => void;
};
const DiasDaSemana = [
  { label: 'Segunda', value: 'Segunda' },
  { label: 'Terça', value: 'Terça' },
  { label: 'Quarta', value: 'Quarta' },
  { label: 'Quinta', value: 'Quinta' },
  { label: 'Sexta', value: 'Sexta' },
  { label: 'Sábado', value: 'Sabado' },
  { label: 'Domingo', value: 'Domingo' },
]
const CategoriaDiasForm = ({
  categoria,
  setCategoria,
  diasDisponiveis,
  setDiasDisponiveis,
}: CategoriaDiasFormProps) => (
  <>
    <div>
      <label className="block text-sm font-medium mt-2 text-gray-600 mb-1">Categoria</label>
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
      <label className="block text-sm font-medium mt-8 text-gray-600 mb-1">Dias disponíveis</label>
      <GlobalSelect 
      isMulti
      options={DiasDaSemana} 
      value={DiasDaSemana.filter(opt=> diasDisponiveis.includes(opt.value))} 
      onChange={selected=> setDiasDisponiveis(selected.map(opt=>opt.value))}
      />
    </div>
  </>
);

export default CategoriaDiasForm;
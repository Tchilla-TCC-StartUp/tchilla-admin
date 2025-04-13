import GlobalSelect from "./Global/global_select";

type PacoteSelectFormProps = {
    pacotes: string[];
    setPacotes: (pacotes: string[]) => void;
  };
  const opcoesPacotes = [
    { label: 'Decoração', value: 'Decoração' },
    { label: 'Garçons', value: 'Garçons' },
    { label: 'Bufet', value: 'Bufet' },
    { label: 'Som', value: 'Som' },
    { label: 'Iluminação', value: 'Iluminação' },
    { label: 'Segurança', value: 'Segurança' },
  ];
  
  const PacoteSelectForm = ({ pacotes, setPacotes }: PacoteSelectFormProps) => (
    <div>
      <GlobalSelect
        label="Pacotes"
        isMulti
        options={opcoesPacotes}
        value={opcoesPacotes.filter(opt => pacotes.includes(opt.value))}
        onChange={selected => setPacotes(selected.map(opt => opt.value))}
      />
    </div>
  );
  
  export default PacoteSelectForm;
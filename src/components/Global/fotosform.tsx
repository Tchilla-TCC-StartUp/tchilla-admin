import UploadImagemPreview from "./uploadImagempreview";

type FotosFormProps = {
  fotos: (File | null)[];
  onFotoChange: (index: number, file: File | null) => void;
};

const FotosForm = ({ fotos, onFotoChange }: FotosFormProps) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
    {fotos.map((foto, index) => (
      <UploadImagemPreview
        key={index}
        index={index}
        foto={foto}
        onChange={onFotoChange}
      />
    ))}
  </div>
);

export default FotosForm;

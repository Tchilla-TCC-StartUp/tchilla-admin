import { useState } from "react";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import AppAssetsImages from "../resource/app_assets_images";
import Typography from "../components/typography";
import GlobalInput from "../components/global_input";
import GlobalButton from "../components/global_button";
import NavigationHooks from "../hooks/navigation_hook";
import authService from "../service/authService";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    tipo: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.register(formData);
      console.log("Usuário cadastrado com sucesso:", response);
      alert("Cadastro realizado com sucesso!");
    } catch (err: any) {
      console.error("Erro ao registrar:", err);
      setError(err.message || "Erro ao registrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-between px-60 pt-40 h-screen bg-primary-50">
      <div className="flex flex-col items-start gap-4">
        <img
          className="w-[268px] h-auto"
          src={AppAssetsImages.vectores.logotipo}
          alt="Logo"
        />
        <Typography variant="h1_ultra_bold" color="var(--primary-950)">
          Crie uma conta
          <br />
          na plataforma
        </Typography>
        <Typography variant="h3_ligth" color="var(--gray-700)">
  Crie a conta para contribuir com a comunidade
</Typography>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col w-[400px] gap-1">
        <GlobalInput
          label="Seu nome"
          type="text"
          name="nome"
          placeholder="Informe o seu nome"
          tabIndex={1}
          icon={<GoPerson />}
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <GlobalInput
          label="Seu email"
          type="email"
          name="email"
          placeholder="Informe o seu email"
          tabIndex={2}
          icon={<MdAlternateEmail />}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <GlobalInput
          label="Seu telefone"
          type="text"
          name="telefone"
          placeholder="Informe o seu telefone"
          tabIndex={3}
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <GlobalInput
          label="Sua senha"
          type="password"
          name="senha"
          placeholder="Informe a senha"
          tabIndex={4}
          icon={<MdLockOutline />}
          value={formData.senha}
          onChange={handleChange}
          required
        />
        <GlobalButton onClick={() => handleSubmit(new Event("submit"))} disabled={loading}>
  {loading ? "Cadastrando..." : "Registrar"}
</GlobalButton>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center items-center gap-3 cursor-pointer">
          <div className="w-[100%] h-[1px] bg-gray-400"></div>
          <Typography variant="p_bold" color="var(--gray-700)">Ou</Typography>
          <div className="w-[100%] h-[1px] bg-gray-400"></div>
        </div>
        <GlobalButton variant="secondary" >
          Entrar com o Google
          <img src={AppAssetsImages.vectores.google} alt="google" />
        </GlobalButton>
        <div
          className="flex justify-center gap-1 cursor-pointer"
          onClick={NavigationHooks().navigateToLogin}
        >
          <Typography variant="p_light" color="var(--gray-700)">
            Já tem uma conta?
          </Typography>
          <Typography variant="p_bold" color="var(--primary-950)">
            Entrar
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

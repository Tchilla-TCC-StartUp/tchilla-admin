import { useState, ChangeEvent, FormEvent } from "react";
import { MdAlternateEmail, MdCategory, MdLockOutline } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import AppAssetsImages from "../resource/app_assets_images";
import Typography from "../components/typography";
import GlobalInput from "../components/Global/global_input";
import GlobalButton from "../components/Global/global_button";
import NavigationHooks from "../hooks/NavigationHook";
import GlobalDropdown from "../components/Global/global_dropdown";
import AuthLayout from "../layouts/AuthLayout";
import { RegisterInterface } from "../interfaces/UserInterface";

const RegisterPage = () => {
  const categories = [
    { label: "Adimin", value: 3 },
    { label: "Prestador", value: 1 },
    { label: "Agente", value: 2 },
  ];

  const [formData, setFormData] = useState<RegisterInterface>({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    tipo: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );

  const navigation = NavigationHooks();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
  };

  return (
    <AuthLayout
      left={
        <div className="flex flex-col items-start gap-4 md:gap-6 w-full">
          <img
            className="w-[168px] h-auto lg:w-[268px] md:w-[200px] sm:w-[168px]"
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
      }
      right={
        <form
          className="flex flex-col gap-5 w-full md:w-full md:gap-5 lg:w-[550px]"
          onSubmit={handleSubmit}
        >
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
          <GlobalDropdown
            label="Categoria"
            options={categories}
            selectedValue={selectedCategory}
            onChange={(value) =>
              setSelectedCategory(typeof value === "number" ? value : undefined)
            }
            placeholder="Escolha uma categoria"
            icon={<MdCategory />}
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

          <GlobalButton type="submit" className="mt-3">
            Criar Conta
          </GlobalButton>

          <div
            className="flex justify-center gap-1 cursor-pointer"
            onClick={navigation.navigateToLogin}
          >
            <Typography variant="p_light" color="var(--gray-700)">
              Já tem uma conta?
            </Typography>
            <Typography variant="p_bold" color="var(--primary-950)">
              Entrar
            </Typography>
          </div>
        </form>
      }
    />
  );
};

export default RegisterPage;

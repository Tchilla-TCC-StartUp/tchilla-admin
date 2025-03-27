import React from "react";
import Sidebar from "../components/side_bar";
import Typography from "../components/typography";
import { FaBell } from "react-icons/fa"; // Ícone de notificação
import perfilImg from "../assets/images/perfil2.png";
const PageLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64 w-full min-h-screen ">
        {/* Header */}
        <div className="w-full h-20 flex items-center justify-between px-6 border-b bg-primary-950  ">
          <Typography variant="h3_bold" color="white">
            {title}
          </Typography>

          {/* Perfil e Notificação */}
          <div className="flex items-center gap-4">
            <FaBell className="text-gray-500 cursor-pointer" size={20} color="white" />

            <div className="flex items-center gap-2">
              <img
                src={perfilImg} // Substitua pela URL real da imagem do usuário
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <Typography variant="p_bold" color="white">Celson Mamboo</Typography>
                <Typography variant="h3_ligth" color="gray">
                  Celsonmamboo@gmail.com
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
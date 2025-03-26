import Typography from "../components/typography";
import { list_card_info } from "../data/dashborad_local_data";
const DashboardPage = () => {
  return (
    <div className="flex flex-col justify-s items-start gap-7 h-screen  bg-primary-50 ">
      <HeloUser />
      <ListInfoCards />
      <GraphInfo />
    </div>
  );
};

export default DashboardPage;

export const HeloUser = () => {
  return (
    <div className="flex flex-col items-start ">
      <Typography variant="h3_normal" color="var(--gray-800)">
        Olá Admin,
      </Typography>
      <Typography variant="h2_bold" color="var(--gray-900)">
        Celson Paixão
      </Typography>
    </div>
  );
};

export const ListInfoCards = () => {
  return (
    <div className="flex gap-4">
      {list_card_info.map((card, index) => (
        <div
          key={index}
          className="bg-primary-50 p-6 rounded-lg shadow-lg h-[170px] w-[350px] flex-col items-center justify-between"
        >
          <Typography variant="h3_bold" color="var(--gray-900)">
            {card.title}
          </Typography>
          <p className="text-gray-700 text-xl font-bold">{card.value}</p>
          <p className="text-gray-700">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export const GraphInfo = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-80">
      <Typography variant="h3_bold" color="var(--gray-900)">
        Gráficos de Análise
      </Typography>
      <p className="text-gray-700">Aqui vai um gráfico sobre o desempenho.</p>
    </div>
  );
};

import { FaBox } from "react-icons/fa";
import Typography from "./typography";

type MetricCardProps = {
  title: string;
  value: string | number;
  description: string;
};

const MetricCard = ({ title, value, description }: MetricCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center">
        <Typography variant="h3_bold">{title}</Typography>

        <FaBox className="text-gray-400" />
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

export default MetricCard;

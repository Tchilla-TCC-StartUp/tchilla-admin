import Typography from "./typography";
import { Box } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string | number;
  description: string;
};

const MetricCard = ({ title, value, description }: MetricCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 flex flex-col h-full">
      <div className="flex-grow">
      <div className="flex justify-between items-center">
        <Typography variant="h3_bold">{title}</Typography>

        <Box className="text-gray-500 w-10 h-10 p-2 border border-gray-300 rounded-full" />
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
    </div>
  );
};

export default MetricCard;

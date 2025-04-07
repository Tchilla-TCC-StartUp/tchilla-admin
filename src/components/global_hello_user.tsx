import Typography from "./typography";

const GlobalHelloUser = ({ name, rule }: { name: string; rule: string }) => {
  return (
    <div>
      <Typography variant="p_medium" className="text-gray-500">
        Hello{rule},
      </Typography>
      <Typography variant="h2_bold">{name}</Typography>
    </div>
  );
};

export default GlobalHelloUser;

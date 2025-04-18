import GlobalBackButton from "./GlobalBackButton";

const GlobalAbsolutBackButton = ({ href }: { href: string }) => {
  return (
    <div className=" fixed z-[60] top-6 left-4 right-0">
      <GlobalBackButton href={href} />
    </div>
  );
};

export default GlobalAbsolutBackButton;

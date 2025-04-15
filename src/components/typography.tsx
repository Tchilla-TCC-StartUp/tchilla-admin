import React, { ReactNode } from "react";

type TypographyProps = {
  variant:
    | "p_normal"
    | "p_light"
    | "p_medium"
    | "p_bold"
    | "h1_normal"
    | "h1_medium"
    | "h1_bold"
    | "h1_ultra_bold"
    | "h2_normal"
    | "h2_medium"
    | "h2_bold"
    | "h3_normal"
    | "h3_ligth"
    | "h3_medium"
    | "h3_bold"
    | "italic"
    | "underline"
    | "caption"
    | "button_text"
    | "subtitle"
    | "side_bar_tab"
    | "overline"
    | "onboarding_title";

  color?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const variantStyles: Record<TypographyProps["variant"], string> = {
  p_normal: "text-[15px] font-normal",
  p_light: "text-[15px] font-light",
  p_medium: "text-[15px] font-medium",
  p_bold: "text-[15px] font-bold",

  h1_normal: "text-[22px] md:text-[30px] lg:text-[38px] font-normal",
  h1_medium: "text-[22px] md:text-[30px] lg:text-[38px] font-medium",
  h1_bold: "text-[22px] md:text-[30px] lg:text-[38px] font-bold",
  h1_ultra_bold: "text-[22px] md:text-[30px] lg:text-[38px] font-extrabold",

  h2_normal: "text-[18px] md:text-[20px] lg:text-[24px] font-normal",
  h2_medium: "text-[18px] md:text-[20px] lg:text-[24px] font-medium",
  h2_bold: "text-[18px] md:text-[20px] lg:text-[24px] font-bold",

  h3_normal: "text-[14px] md:text-[16px] lg:text-[18px] font-normal",
  h3_ligth: "text-[14px] md:text-[16px] lg:text-[18px] font-light",
  h3_medium: "text-[14px] md:text-[16px] lg:text-[18px] font-medium",
  h3_bold: "text-[14px] md:text-[16px] lg:text-[18px] font-bold",

  italic: "italic",
  underline: "underline",
  caption: "text-[12px]",
  button_text: "text-[14px] font-bold",
  subtitle: "text-[16px] font-normal",
  overline: "text-[10px]",
  onboarding_title: "text-[18px] md:text-[21px] font-extrabold",

  side_bar_tab:
    "text-[16px] md:text-[18px] font-normal text-primary-50 flex items-center gap-2 cursor-pointer hover:bg-primary-50 p-2 rounded-md transition-all",
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  color,
  onClick,
  children,
  className,
}) => {
  return (
    <p
      onClick={onClick}
      className={`${variantStyles[variant]} ${className} ${
        color ? `text-[${color}]` : ""
      }`}
      style={{ color }}
    >
      {children}
    </p>
  );
};

export default Typography;

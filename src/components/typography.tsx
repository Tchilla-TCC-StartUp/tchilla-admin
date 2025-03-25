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
    | "h3_medium"
    | "h3_bold"
    | "italic"
    | "underline"
    | "caption"
    | "button_text"
    | "subtitle"
    | "overline"
    | "onboarding_title";
  color?: string;
  children: ReactNode;
};

const variantStyles: Record<TypographyProps["variant"], string> = {
  p_normal: "text-[15px] font-normal text-primary-950",
  p_light: "text-[15px] font-light text-primary-950",
  p_medium: "text-[15px] font-medium text-primary-950",
  p_bold: "text-[15px] font-bold text-primary-950",

  h1_normal: "text-[48px] font-normal text-primary-950",
  h1_medium: "text-[48px] font-medium text-primary-950",
  h1_bold: "text-[48px] font-bold text-primary-950",
  h1_ultra_bold: "text-[48px] font-extrabold text-primary-950",

  h2_normal: "text-[20px] font-normal text-primary-950",
  h2_medium: "text-[20px] font-medium text-primary-950",
  h2_bold: "text-[20px] font-bold text-primary-950",

  h3_normal: "text-[16px] font-normal text-primary-950",
  h3_medium: "text-[16px] font-medium text-primary-950",
  h3_bold: "text-[16px] font-bold text-primary-950",

  italic: "italic text-primary-950",
  underline: "underline text-primary-950",
  caption: "text-[12px] text-primary-950",
  button_text: "text-[14px] font-bold text-primary-950",
  subtitle: "text-[16px] font-normal text-primary-950",
  overline: "text-[10px] text-primary-950",
  onboarding_title: "text-[21px] font-extrabold text-primary-950",
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  color,
  children,
}) => {
  return (
    <p className={`${variantStyles[variant]}`} style={{ color }}>
      {children}
    </p>
  );
};

export default Typography;

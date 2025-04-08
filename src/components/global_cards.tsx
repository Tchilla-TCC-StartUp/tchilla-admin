import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string; // Permite passar className como prop
}

export function Card({ children, className }: CardProps) {
  return <div className={`border rounded-lg p-1 shadow-md bg-white ${className}`}>{children}</div>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
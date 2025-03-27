import React from "react";

type TableProps = {
  children: React.ReactNode;
  className?: string;
};

export const Table: React.FC<TableProps> = ({ children, className }) => {
  return <table className={`w-full border-collapse ${className ?? ""}`}>{children}</table>;
};

export const TableRow: React.FC<TableProps> = ({ children, className }) => {
  return <tr className={className ?? ""}>{children}</tr>;
};

export const TableHead: React.FC<TableProps> = ({ children, className }) => {
  return <th className={`p-2 text-left ${className ?? ""}`}>{children}</th>;
};

export const TableBody: React.FC<TableProps> = ({ children, className }) => {
  return <tbody className={className ?? ""}>{children}</tbody>;
};

export const TableCell: React.FC<TableProps> = ({ children, className }) => {
  return <td className={`p-2 ${className ?? ""}`}>{children}</td>;
};
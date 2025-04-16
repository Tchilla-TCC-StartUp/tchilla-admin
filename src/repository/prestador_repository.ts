import { Prestador } from "../interfaces/prestador_interface";


export async function getAllPrestadores(token: string): Promise<Prestador[]> {
  const response = await fetch("/api/Prestador/getAll", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar prestadores");
  }

  const data: Prestador[] = await response.json();
  return data;
}

export async function getAllPrestadoresFake(): Promise<Prestador[]> {
  const response = await fetch("/data/prestadores_fake.json");
  return await response.json();
}

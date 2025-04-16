import { Prestador } from "../interfaces/prestador_interface";
import { getAllPrestadoresFake, getAllPrestadores } from "../repository/prestador_repository";

const USE_FAKE_DATA = false;

export async function fetchPrestadores(token: string): Promise<Prestador[]> {
  if (USE_FAKE_DATA) {
    return await getAllPrestadoresFake();
  }

  return await getAllPrestadores(token);
}

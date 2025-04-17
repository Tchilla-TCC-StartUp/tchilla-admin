import { Prestador } from "../interfaces/PrestadorInterface";
import {
  getAllPrestadoresFake,
  getAllPrestadores,
} from "../repository/PrestadorRepository";

const USE_FAKE_DATA = false;

export async function fetchPrestadores(token: string): Promise<Prestador[]> {
  if (USE_FAKE_DATA) {
    return await getAllPrestadoresFake();
  }

  return await getAllPrestadores(token);
}

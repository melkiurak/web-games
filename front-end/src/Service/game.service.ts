import { Game, IGameQuery } from "@/types";
import axiosInput from "./api.config";

export const getFilteredGames = async(params: IGameQuery): Promise<Game[]> => {
    const response = await axiosInput.get<Game[]>('/', { params });
    return response.data;
}

import axios from "axios";
import { catchAxiosError } from "./authService";

export const getContextId = async () => {
    try {
        const res = await axios.get("/sportsbook/context-id");
        return res.data;
    } catch (error) {
        catchAxiosError(error)
    }
}


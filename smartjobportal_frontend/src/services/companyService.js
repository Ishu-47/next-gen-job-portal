import API from "../api/axios"

export const createCompany = async(data) => {
    const res = await API.post("/companies", data);
    return res.data;
}
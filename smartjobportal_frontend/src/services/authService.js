import API from "../api/axios"

export const registerUser = async(data) => {
    const res = await API.post("http://localhost:8080/auth/register", data);
    return res.data;
};


export const loginUser = async(data) => {
    const res = await API.post("http://localhost:8080/auth/login", data);
    return res.data;
};
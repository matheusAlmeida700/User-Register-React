// Axios facilita a conexão entre front e back-end através de diversas funcionalidades
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
})

export default api
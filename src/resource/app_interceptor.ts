import { AxiosInstance } from "axios";

const setupInterceptors = (api: AxiosInstance) => {
    api.interceptors.request.use(
        (config) => {
            console.log("📤 Enviando requisição:", {
                url: config.url,
                method: config.method,
                headers: config.headers,
                params: config.params,
                data: config.data,
            });
            return config;
        },
        (error) => {
            console.error("🚨 Erro na requisição:", error);
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => {
            console.log("📥 Resposta recebida:", {
                url: response.config.url,
                status: response.status,
                data: response.data,
            });
            return response;
        },
        (error) => {
            if (error.response) {
                console.error("🚨 Erro na resposta:", {
                    url: error.config?.url,
                    status: error.response.status,
                    data: error.response.data,
                });
            } else {
                console.error("❌ Erro inesperado:", error.message);
            }
            return Promise.reject(error);
        }
    );
};

export default setupInterceptors;

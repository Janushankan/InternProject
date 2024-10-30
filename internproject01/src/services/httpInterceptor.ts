import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

class HttpInterceptor {
  private instance: AxiosInstance;

  constructor() {
    const defaultOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    this.instance = axios.create(defaultOptions);

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (!error.response) {
          console.error("[ERROR]", "Network Error", error);
        } else {
          const status = error.response.status;
          console.error("[ERROR]", `Status Code: ${status}`, error.message);
          if (status === 401) {
            console.warn("[WARNING]", "Unauthorized Access");
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(endpoint, { params });
  }

  async post<T>(endpoint: string, data: Record<string, any>): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(endpoint, data);
  }

  async put<T>(endpoint: string, data: Record<string, any>): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(endpoint);
  }
}

export default HttpInterceptor;

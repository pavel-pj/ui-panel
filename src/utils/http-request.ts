import { ref } from "vue";
import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";
import type { Ref } from "vue";

type Method = AxiosRequestConfig["method"];


interface SendRequestParams<R = unknown> {
  url?: string;
  method?: Method;
  data?: R | null;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

interface ErrorResponse {
  message: string;
  // Add other properties if your API returns more fields
}

interface HttpResponse<T = unknown> {
  data: T,
  status: number,
  isOk: boolean,

}

export function useHttpRequest<T = unknown>() {

  const data: Ref<T | null> = ref(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const handleError = (err: any) => {
    const errorMessage = err.response?.data?.message || err.message;
    error.value = errorMessage;
    loading.value = false;
  };

  const sendRequest = async <R = T>(
    {
      url = '',
      method = "GET",
      data: requestData = null,
      headers = {},
    }: SendRequestParams<R> = {}
  ) : Promise<HttpResponse<R> | null> => {

    loading.value = true;
    error.value = null;

    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        headers,
        ...(method !== "GET" && requestData ? { data: requestData } : {}),

      };

      const response = await axios<R>(config);


      data.value = response.data as unknown as T;

      return {
        data: response.data,
        status: response.status,
        isOk:
          response.status === 200 ||
          response.status === 202 ||
          response.status === 201,

      };
    } catch (err) {

      handleError(err );

      return err;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    sendRequest,
  };

}


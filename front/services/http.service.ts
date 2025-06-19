/* eslint-disable @typescript-eslint/no-explicit-any */
enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type PARAMS = {
  [key: string]: any;
};
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

class HttpService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      withCredentials: false,
    });
  }

  private getBaseUrl() {
    return typeof window === 'undefined' ? process.env.NEXT_PUBLIC_SERVER_API_URL : '/api';
  }

  private getAuthorization() {
    return process.env.API_TOKEN ? { Authorization: `Bearer ${process.env.API_TOKEN}` } : {};
  }

  private setUpHeaders(hasAttachment: boolean) {
    return hasAttachment
      ? { 'Content-Type': 'multipart/form-data', ...this.getAuthorization }
      : { 'Content-Type': 'application/json', ...this.getAuthorization };
  }

  private normalizeError(error: any) {
    return Promise.reject(error);
  }

  private async request<T>(method: HTTP_METHOD, path: string, options: AxiosRequestConfig): Promise<T> {
    const baseUrl = this.getBaseUrl();
    try {
      const response: AxiosResponse<T> = await this.http.request<T>({
        method,
        url: `${baseUrl}/${path}`,
        ...options,
      });
      return response.data;
    } catch (error: any) {
      console.error('Request failed:', error.message);
      if (error.response) {
        console.error('Error response:', error.response.status, error.response.data);
      }
      return this.normalizeError(error);
    }
  }

  public async GET<T>(path: string, params?: PARAMS, headers?: PARAMS): Promise<T> {
    return this.request<T>(HTTP_METHOD.GET, path, {
      params,
      headers: { ...headers, ...this.getAuthorization() },
    });
  }

  public async POST<T, P>(path: string, data: P, params?: PARAMS, headers?: PARAMS): Promise<T> {
    return this.request<T>(HTTP_METHOD.POST, path, {
      params,
      data,
      headers: { ...headers, ...this.getAuthorization() },
    });
  }

  public async PUT<T, P>(path: string, data: P, params?: PARAMS, headers?: PARAMS): Promise<T> {
    return this.request<T>(HTTP_METHOD.PUT, path, {
      params,
      data,
      headers: { ...headers, ...this.getAuthorization() },
    });
  }

  public async DELETE<T>(url: string, params?: PARAMS, headers?: PARAMS): Promise<T> {
    return this.request<T>(HTTP_METHOD.DELETE, url, {
      params,
      headers: { ...headers, ...this.getAuthorization() },
    });
  }
}

export { HttpService as default };

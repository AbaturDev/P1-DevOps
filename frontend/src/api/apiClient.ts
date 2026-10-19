import axios, { AxiosError } from 'axios'
import type { ProblemDetails } from '../models/problemDetails'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export class ApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ProblemDetails>) => {
    const problem = error.response?.data
    const message =
      problem?.detail ??
      problem?.title ??
      (error.response ? `Żądanie nie powiodło się (${error.response.status})` : 'Brak połączenia z serwerem')

    return Promise.reject(new ApiError(message, error.response?.status))
  },
)

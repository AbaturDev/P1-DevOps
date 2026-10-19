import { apiClient } from '../api/apiClient'
import type { CreateTaskRequest, Task } from '../models/task'

const TASKS_URL = '/api/tasks'

export const taskService = {
  async getAll(): Promise<Task[]> {
    const { data } = await apiClient.get<Task[]>(TASKS_URL)
    return data
  },

  async create(request: CreateTaskRequest): Promise<Task> {
    const { data } = await apiClient.post<Task>(TASKS_URL, request)
    return data
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`${TASKS_URL}/${id}`)
  },
}

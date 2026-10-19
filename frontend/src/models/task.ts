export interface Task {
  id: string
  title: string
  description: string | null
  createdAt: string
  modifiedAt: string
}

export interface CreateTaskRequest {
  title: string
  description?: string | null
}

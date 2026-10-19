import { useCallback, useEffect, useState } from 'react'
import type { CreateTaskRequest, Task } from '../models/task'
import { taskService } from '../services/taskService'

const toMessage = (error: unknown) => (error instanceof Error ? error.message : 'Coś poszło nie tak')

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      setTasks(await taskService.getAll())
    } catch (e) {
      setError(toMessage(e))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const createTask = useCallback(async (request: CreateTaskRequest) => {
    setIsCreating(true)
    setError(null)
    try {
      const created = await taskService.create(request)
      setTasks((prev) => [...prev, created])
      return true
    } catch (e) {
      setError(toMessage(e))
      return false
    } finally {
      setIsCreating(false)
    }
  }, [])

  const deleteTask = useCallback(async (id: string) => {
    setDeletingIds((prev) => new Set(prev).add(id))
    setError(null)
    try {
      await taskService.remove(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (e) {
      setError(toMessage(e))
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { tasks, isLoading, isCreating, deletingIds, error, refresh, createTask, deleteTask, clearError }
}

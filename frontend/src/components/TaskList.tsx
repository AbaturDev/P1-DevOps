import type { Task } from '../models/task'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  isLoading: boolean
  deletingIds: Set<string>
  onDelete: (id: string) => void
}

export function TaskList({ tasks, isLoading, deletingIds, onDelete }: TaskListProps) {
  if (isLoading) {
    return (
      <ul className="task-list" aria-busy="true" aria-label="Ładowanie zadań">
        {Array.from({ length: 3 }, (_, i) => (
          <li key={i} className="task-card task-card--skeleton">
            <div className="skeleton skeleton--title" />
            <div className="skeleton skeleton--text" />
          </li>
        ))}
      </ul>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon" aria-hidden="true">✓</div>
        <p className="empty-state__title">Brak zadań</p>
        <p className="empty-state__text">Dodaj pierwsze zadanie, aby zacząć.</p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} isDeleting={deletingIds.has(task.id)} onDelete={onDelete} />
      ))}
    </ul>
  )
}

import type { Task } from '../models/task'
import { formatDate } from '../utils/formatDate'

interface TaskCardProps {
  task: Task
  isDeleting: boolean
  onDelete: (id: string) => void
}

export function TaskCard({ task, isDeleting, onDelete }: TaskCardProps) {
  return (
    <li className={`task-card${isDeleting ? ' task-card--deleting' : ''}`}>
      <div className="task-card__body">
        <h3 className="task-card__title">{task.title}</h3>
        {task.description ? <p className="task-card__description">{task.description}</p> : null}
        <time className="task-card__date" dateTime={task.createdAt}>
          {formatDate(task.createdAt)}
        </time>
      </div>

      <button
        type="button"
        className="button button--icon button--danger"
        onClick={() => onDelete(task.id)}
        disabled={isDeleting}
        aria-label={`Usuń zadanie ${task.title}`}
        title="Usuń"
      >
        {isDeleting ? (
          <span className="spinner" aria-hidden="true" />
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M9 3h6a1 1 0 0 1 1 1v1h4a1 1 0 1 1 0 2h-1l-1 12a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3L5 7H4a1 1 0 1 1 0-2h4V4a1 1 0 0 1 1-1Zm1 2v0h4V5h-4Zm-3 2 1 11.9a1 1 0 0 0 1 .9h6a1 1 0 0 0 1-.9L17 7H7Zm3 3a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Z"
            />
          </svg>
        )}
      </button>
    </li>
  )
}

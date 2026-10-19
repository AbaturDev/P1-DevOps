import { ErrorBanner } from '../components/ErrorBanner'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { useTasks } from '../hooks/useTasks'

export function TasksPage() {
  const { tasks, isLoading, isCreating, deletingIds, error, refresh, createTask, deleteTask, clearError } = useTasks()

  return (
    <div className="page">
      <header className="page__header">
        <div className="brand">
          <span className="brand__logo" aria-hidden="true">T</span>
          <span className="brand__name">Taskly</span>
        </div>
        <p className="page__subtitle">Proste zarządzanie zadaniami</p>
      </header>

      <main className="page__content">
        <aside>
          <TaskForm isSubmitting={isCreating} onSubmit={createTask} />
        </aside>

        <section className="card" aria-labelledby="tasks-heading">
          <div className="card__header">
            <h2 id="tasks-heading" className="card__title">
              Zadania
            </h2>
            {!isLoading ? <span className="badge">{tasks.length}</span> : null}
          </div>

          {error ? <ErrorBanner message={error} onRetry={refresh} onDismiss={clearError} /> : null}

          <TaskList tasks={tasks} isLoading={isLoading} deletingIds={deletingIds} onDelete={deleteTask} />
        </section>
      </main>
    </div>
  )
}

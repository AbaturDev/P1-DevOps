import { useState, type FormEvent } from 'react'
import type { CreateTaskRequest } from '../models/task'

const TITLE_MAX = 200
const DESCRIPTION_MAX = 2000

interface TaskFormProps {
  isSubmitting: boolean
  onSubmit: (request: CreateTaskRequest) => Promise<boolean>
}

export function TaskForm({ isSubmitting, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const canSubmit = title.trim().length > 0 && !isSubmitting

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return

    const success = await onSubmit({
      title: title.trim(),
      description: description.trim() || null,
    })

    if (success) {
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form className="card task-form" onSubmit={handleSubmit}>
      <h2 className="card__title">Nowe zadanie</h2>

      <div className="field">
        <label htmlFor="task-title" className="field__label">
          Tytuł
        </label>
        <input
          id="task-title"
          className="field__input"
          value={title}
          maxLength={TITLE_MAX}
          placeholder="Co jest do zrobienia?"
          onChange={(e) => setTitle(e.target.value)}
          required
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="task-description" className="field__label">
          Opis <span className="field__optional">(opcjonalnie)</span>
        </label>
        <textarea
          id="task-description"
          className="field__input field__input--textarea"
          value={description}
          maxLength={DESCRIPTION_MAX}
          placeholder="Dodatkowe szczegóły"
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="field__counter" aria-live="polite">
          {description.length}/{DESCRIPTION_MAX}
        </span>
      </div>

      <button type="submit" className="button button--primary" disabled={!canSubmit}>
        {isSubmitting ? <span className="spinner" aria-hidden="true" /> : null}
        {isSubmitting ? 'Dodawanie…' : 'Dodaj zadanie'}
      </button>
    </form>
  )
}

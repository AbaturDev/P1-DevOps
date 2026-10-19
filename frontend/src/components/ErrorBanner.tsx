interface ErrorBannerProps {
  message: string
  onRetry?: () => void
  onDismiss: () => void
}

export function ErrorBanner({ message, onRetry, onDismiss }: ErrorBannerProps) {
  return (
    <div className="error-banner" role="alert">
      <span className="error-banner__message">{message}</span>
      <div className="error-banner__actions">
        {onRetry ? (
          <button type="button" className="button button--ghost" onClick={onRetry}>
            Spróbuj ponownie
          </button>
        ) : null}
        <button type="button" className="button button--ghost" onClick={onDismiss} aria-label="Zamknij">
          ✕
        </button>
      </div>
    </div>
  )
}

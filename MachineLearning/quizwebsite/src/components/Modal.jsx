import { useEffect, useRef } from "react";

// App-styled replacement for native alert()/confirm(). Controlled via `open`.
export default function Modal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  hideCancel = false,
  onConfirm,
  onCancel,
}) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    function onKey(e) {
      if (e.key === "Escape") onCancel?.();
      if (e.key === "Enter") onConfirm?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onConfirm, onCancel]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel?.();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title" className="modal-title">{title}</h2>
        {message && <p className="modal-msg">{message}</p>}
        <div className="modal-actions">
          {!hideCancel && (
            <button className="secondary-action" onClick={onCancel}>
              {cancelLabel}
            </button>
          )}
          <button
            ref={confirmRef}
            className={tone === "danger" ? "danger-action" : ""}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

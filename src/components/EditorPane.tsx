type EditorPaneProps = {
  id: string;
  label: string;
  value: string;
  helper: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
};

export function EditorPane({
  id,
  label,
  value,
  helper,
  placeholder,
  readOnly = false,
  onChange
}: EditorPaneProps) {
  return (
    <section className="editor-pane" aria-label={`${label} pane`}>
      <div className="pane-header">
        <div>
          <label id={`${id}-label`} htmlFor={id} className="pane-label">
            {label}
          </label>
          <p className="pane-helper">{helper}</p>
        </div>
        <span className="pane-count">{value.length.toLocaleString()} chars</span>
      </div>
      <textarea
        id={id}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck={false}
        className="markdown-editor"
        onChange={(event) => onChange?.(event.target.value)}
      />
    </section>
  );
}

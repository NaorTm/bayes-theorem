import PropTypes from "prop-types";

export default function ProgressSidebar({ modules, activeId, progress, onSelect, onToggleComplete }) {
  return (
    <aside className="module-sidebar" aria-label="Tutorial modules">
      <h2>Modules</h2>
      <ul>
        {modules.map((module) => (
          <li key={module.id} className={module.id === activeId ? "active" : ""}>
            <button type="button" onClick={() => onSelect(module.id)} className="module-link">
              <span>{module.id}</span>
              <strong>{module.title}</strong>
            </button>
            <label className="complete-toggle">
              <input
                type="checkbox"
                checked={Boolean(progress[module.id])}
                onChange={() => onToggleComplete(module.id)}
                aria-label={`Mark ${module.id} complete`}
              />
              <span>{progress[module.id] ? "Done" : "In progress"}</span>
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
}

ProgressSidebar.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  activeId: PropTypes.string.isRequired,
  progress: PropTypes.objectOf(PropTypes.bool).isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired
};

function ProgressBar({ stats }) {
  const percentage =
    stats.total === 0
      ? 0
      : Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="progress-card">
      <h2>📈 Overall Progress</h2>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p>
        {stats.completed} of {stats.total} Tasks Completed ({percentage}%)
      </p>
    </div>
  );
}

export default ProgressBar;
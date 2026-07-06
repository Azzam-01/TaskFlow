function StatsCards({ stats }) {
  return (
    <div className="stats-container">

      <div className="stat-card">
        <h3>Total</h3>
        <p>{stats.total}</p>
      </div>

      <div className="stat-card">
        <h3>Pending</h3>
        <p>{stats.pending}</p>
      </div>

      <div className="stat-card">
        <h3>In Progress</h3>
        <p>{stats.inProgress}</p>
      </div>

      <div className="stat-card">
        <h3>Completed</h3>
        <p>{stats.completed}</p>
      </div>

      <div className="stat-card">
        <h3>High Priority</h3>
        <p>{stats.highPriority}</p>
      </div>

    </div>
  );
}

export default StatsCards;
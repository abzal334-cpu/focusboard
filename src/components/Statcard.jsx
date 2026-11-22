// Reusable card for one dashboard statistic.
function StatCard({ title, value, icon: Icon, tone = "purple", helper, progress }) {
  return (
    <article className={`stat-card tone-${tone}`}>
      <div className="stat-card-top">
        <span className="stat-icon" aria-hidden="true">
          <Icon size={20} />
        </span>
        <h3 className="stat-title">{title}</h3>
      </div>

      <p className="stat-value">{value}</p>

      {typeof progress === "number" ? (
        <div
          className="progress"
          role="progressbar"
          aria-label={`${title} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      ) : (
        helper && <p className="stat-helper">{helper}</p>
      )}
    </article>
  );
}

export default StatCard;

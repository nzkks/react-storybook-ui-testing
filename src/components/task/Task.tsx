import { Task as TaskType } from '../../entities';

type TaskProps = {
  task: TaskType;
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
};

export const Task = ({ task: { id, title, state }, onArchiveTask, onPinTask }: TaskProps) => {
  return (
    <div className={`list-item ${state}`}>
      <label htmlFor="checked" aria-label={`archiveTask-${id}`} className="checkbox">
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === 'TASK_ARCHIVED'}
        />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>

      <label htmlFor="title" aria-label={title} className="title">
        <input
          type="text"
          value={title}
          readOnly={true}
          name="title"
          placeholder="Input title"
          style={{ textOverflow: 'ellipsis' }}
        />
      </label>

      {state !== 'TASK_ARCHIVED' && (
        <button
          key={`pinTask-${id}`}
          id={`pinTask-${id}`}
          aria-label={`pinTask-${id}`}
          className="pin-button"
          onClick={() => onPinTask(id)}
        >
          <span className={`icon-star`} />
        </button>
      )}
    </div>
  );
};

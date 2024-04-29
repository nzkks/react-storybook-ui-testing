import { Task as TaskType } from '../../entities';

type TaskProps = {
  task: TaskType;
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
};

export const Task = ({ task: { id, title, state }, onArchiveTask, onPinTask }: TaskProps) => {
  return (
    <div className="list-item">
      <label htmlFor="title" aria-label={title}>
        <input type="text" value={title} readOnly={true} name="title" />
      </label>
    </div>
  );
};

import { Task as TaskType } from '../../entities';
import { Task } from '../task/Task';

type TaskListProps = {
  loading: boolean;
  tasks: TaskType[];
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
};

export const TaskList = ({ loading, tasks, onArchiveTask, onPinTask }: TaskListProps) => {
  const events = { onArchiveTask, onPinTask };

  if (loading) {
    return <div className="list-items">loading</div>;
  }

  if (tasks.length === 0) {
    return <div className="list-items">No tasks</div>;
  }

  return (
    <div className="list-items">
      {tasks.map(task => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};

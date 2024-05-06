import { Task } from '../task/Task';
import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import { updateTaskState } from '../../lib/taskSlice';

export const TaskList = () => {
  const tasks = useAppSelector(state => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter(t => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter(t => t.state !== 'TASK_PINNED')
    ];

    const filteredTasks = tasksInOrder.filter(t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED');
    return filteredTasks;
  });
  const { status } = useAppSelector(state => state.taskbox);
  const dispatch = useAppDispatch();

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="list-items" key={'loading'} data-testid="loading">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" key={'empty'} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" key={'success'} data-testid="success">
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onArchiveTask={() => dispatch(updateTaskState({ id: task.id, newTaskState: 'TASK_ARCHIVED' }))}
          onPinTask={() => dispatch(updateTaskState({ id: task.id, newTaskState: 'TASK_PINNED' }))}
        />
      ))}
    </div>
  );
};

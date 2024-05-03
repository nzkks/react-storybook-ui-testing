import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { TaskList } from '../task-list/TaskList';
import { fetchTasks } from '../../lib/taskSlice';

const InboxScreen = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => state.taskbox);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">Taskbox</h1>
      </nav>
      <TaskList />
    </div>
  );
};

export default InboxScreen;

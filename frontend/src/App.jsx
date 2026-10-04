import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const response = await axios.post(API_BASE_URL, { title: newTaskTitle });
      setTasks([response.data, ...tasks]);
      setNewTaskTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskCompletion = async (id, currentStatus) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, {
        completed: !currentStatus
      });
      
      setTasks(tasks.map(task => 
        task._id === id ? response.data : task
      ));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditingTaskTitle(task.title);
  };

  const saveTaskEdit = async (id) => {
    if (!editingTaskTitle.trim()) return;
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, {
        title: editingTaskTitle
      });
      setTasks(tasks.map(task => 
        task._id === id ? response.data : task
      ));
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error updating task title:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Task Master</h1>
        <p>Organize your life, one task at a time.</p>
      </header>

      <form className="add-task-form" onSubmit={addTask}>
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          maxLength={100}
        />
        <button 
          type="submit" 
          className="add-btn"
          disabled={!newTaskTitle.trim()}
        >
          Add
        </button>
      </form>

      {isLoading ? (
        <div className="loading">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          No tasks yet. Add one above!
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task._id} className="task-item">
              {editingTaskId === task._id ? (
                <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                  <input
                    type="text"
                    className="task-input"
                    value={editingTaskTitle}
                    onChange={(e) => setEditingTaskTitle(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem' }}
                    autoFocus
                  />
                  <button onClick={() => saveTaskEdit(task._id)} className="add-btn" style={{ padding: '0 1rem' }}>Save</button>
                  <button onClick={() => setEditingTaskId(null)} className="delete-btn">Cancel</button>
                </div>
              ) : (
                <>
                  <div 
                    className="task-content"
                    onClick={() => toggleTaskCompletion(task._id, task.completed)}
                  >
                    <div className={`checkbox ${task.completed ? 'completed' : ''}`}>
                      <svg 
                        className="check-icon" 
                        width="14" 
                        height="10" 
                        viewBox="0 0 14 10" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M1 5L5 9L13 1" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => startEditing(task)}
                    aria-label="Edit task"
                    style={{ marginRight: '5px' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteTask(task._id)}
                    aria-label="Delete task"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

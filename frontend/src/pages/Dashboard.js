import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
  });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.search) params.append('search', filters.search);

      const response = await axios.get(`/api/tasks?${params.toString()}`);
      setTasks(response.data.data.tasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskCreated = () => {
    fetchTasks();
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCancelEdit = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === 'completed').length;
    const pending = tasks.filter((task) => task.status === 'pending').length;
    const inProgress = tasks.filter((task) => task.status === 'in-progress').length;

    return {
      total, completed, pending, inProgress,
    };
  };

  const stats = getTaskStats();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={() => setShowTaskForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Create Task
        </button>
      </div>

      {/* Welcome Message */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Welcome, {user?.username}!</h2>
        <p className="text-gray-600">
          This is your task management dashboard. Here you can create, view, and manage your tasks.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Total Tasks</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">In Progress</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search tasks..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Form */}
      {showTaskForm && (
        <div className="mb-6">
          <TaskForm
            onTaskCreated={handleTaskCreated}
            onCancel={handleCancelEdit}
            editTask={editingTask}
          />
        </div>
      )}

      {/* Task List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Your Tasks</h3>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading tasks...</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onTaskUpdated={fetchTasks}
              onEditTask={handleEditTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

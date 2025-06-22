import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const TaskList = ({ tasks, onTaskUpdated, onEditTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`/api/tasks/${taskId}`, { status: newStatus });
      toast.success('Task status updated!');
      onTaskUpdated();
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleComplete = async (taskId) => {
    try {
      await axios.patch(`/api/tasks/${taskId}/complete`);
      toast.success('Task marked as completed!');
      onTaskUpdated();
    } catch (error) {
      toast.error('Failed to complete task');
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${taskId}`);
        toast.success('Task deleted successfully!');
        onTaskUpdated();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks found. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 mb-3">{task.description}</p>
              )}
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                {task.dueDate && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              {task.status !== 'completed' && (
                <button
                  onClick={() => handleComplete(task._id)}
                  className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Complete
                </button>
              )}
              
              <button
                onClick={() => onEditTask(task)}
                className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              
              <button
                onClick={() => handleDelete(task._id)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            Created: {format(new Date(task.createdAt), 'MMM dd, yyyy HH:mm')}
            {task.completedAt && (
              <span className="ml-4">
                Completed: {format(new Date(task.completedAt), 'MMM dd, yyyy HH:mm')}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList; 
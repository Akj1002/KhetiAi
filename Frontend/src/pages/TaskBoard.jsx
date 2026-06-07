import React, { useState } from "react";
import { motion } from "framer-motion";
import { ListTodo, Plus, GripVertical, CheckCircle2, Circle } from "lucide-react";

const initialTasks = {
  todo: [
    { id: '1', title: 'Repair Fence in Sector 2', assignee: 'Ramesh', priority: 'High' },
    { id: '2', title: 'Order Fertilizer', assignee: 'Admin', priority: 'Medium' }
  ],
  inProgress: [
    { id: '3', title: 'Harvesting Wheat', assignee: 'Team A', priority: 'High' }
  ],
  done: [
    { id: '4', title: 'Soil Testing', assignee: 'Lab', priority: 'Low' }
  ]
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (task, sourceCol) => {
    setDraggedTask({ ...task, sourceCol });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetCol) => {
    if (!draggedTask) return;
    if (draggedTask.sourceCol === targetCol) return;

    setTasks(prev => {
      const newTasks = { ...prev };
      // Remove from source
      newTasks[draggedTask.sourceCol] = newTasks[draggedTask.sourceCol].filter(t => t.id !== draggedTask.id);
      // Add to target
      const taskWithoutSource = { ...draggedTask };
      delete taskWithoutSource.sourceCol;
      newTasks[targetCol] = [...newTasks[targetCol], taskWithoutSource];
      return newTasks;
    });
    setDraggedTask(null);
  };

  const Column = ({ title, columnId, items }) => (
    <div 
      className="bg-black/20 border border-white/5 rounded-2xl p-4 min-h-[400px]"
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(columnId)}
    >
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="font-bold text-slate-300">{title} <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full ml-2">{items.length}</span></h3>
      </div>
      <div className="space-y-3">
        {items.map(task => (
          <div 
            key={task.id}
            draggable
            onDragStart={() => handleDragStart(task, columnId)}
            className="bg-[#0f172a] border border-white/10 p-4 rounded-xl cursor-grab active:cursor-grabbing hover:border-white/20 transition group"
          >
            <div className="flex items-start gap-2">
              <GripVertical size={16} className="text-slate-600 mt-0.5 opacity-0 group-hover:opacity-100 transition" />
              <div className="flex-1">
                <h4 className="font-bold text-sm mb-2">{task.title}</h4>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 bg-white/5 px-2 py-1 rounded">{task.assignee}</span>
                  <span className={`px-2 py-1 rounded font-bold ${
                    task.priority === 'High' ? 'text-red-400 bg-red-500/10' : 
                    task.priority === 'Medium' ? 'text-yellow-400 bg-yellow-500/10' : 
                    'text-green-400 bg-green-500/10'
                  }`}>{task.priority}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="h-24 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-slate-500 text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <ListTodo className="text-emerald-400" size={40} />
            <div>
              <h1 className="text-3xl font-bold">Farm Task Board</h1>
              <p className="text-slate-400">Manage labor and daily operations</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition flex items-center gap-2">
            <Plus size={20} /> New Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column title="To Do" columnId="todo" items={tasks.todo} />
          <Column title="In Progress" columnId="inProgress" items={tasks.inProgress} />
          <Column title="Done" columnId="done" items={tasks.done} />
        </div>
      </motion.div>
    </div>
  );
};

export default TaskBoard;

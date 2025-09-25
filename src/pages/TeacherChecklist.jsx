import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckSquare, Clock, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const TeacherChecklist = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [adminTasks, setAdminTasks] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const mockStudents = [
      { id: 1, name: 'João Silva', status: 'confirmed', attendance: 'present', late: 0 },
      { id: 2, name: 'Maria Santos', status: 'confirmed', attendance: 'present', late: 0 },
      { id: 3, name: 'Pedro Costa', status: 'confirmed', attendance: 'absent', late: 0 },
      { id: 4, name: 'Ana Lima', status: 'confirmed', attendance: 'late', late: 15 },
      { id: 5, name: 'Carlos Mendes', status: 'confirmed', attendance: 'present', late: 0 },
      { id: 6, name: 'Lucia Ferreira', status: 'confirmed', attendance: 'present', late: 0 },
      { id: 7, name: 'Rafael Oliveira', status: 'confirmed', attendance: 'late', late: 10 },
      { id: 8, name: 'Beatriz Rocha', status: 'confirmed', attendance: 'present', late: 0 }
    ];

    const mockAdminTasks = [
      { id: 1, task: 'Aula concluída', completed: false },
      { id: 2, task: 'Aquecimento realizado', completed: true },
      { id: 3, task: 'Técnicas ensinadas', completed: true },
      { id: 4, task: 'Sparring supervisionado', completed: false },
      { id: 5, task: 'Tatame limpo', completed: false }
    ];

    setStudents(mockStudents);
    setAdminTasks(mockAdminTasks);
  }, [classId]);

  const updateStudentAttendance = (studentId, attendance, late = 0) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId
          ? { ...student, attendance, late }
          : student
      )
    );
  };

  const toggleAdminTask = (taskId) => {
    setAdminTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleFinishChecklist = () => {
    const presentCount = students.filter(s => s.attendance === 'present' || s.attendance === 'late').length;
    const completedTasks = adminTasks.filter(t => t.completed).length;
    
    toast({
      title: "Checklist finalizado!",
      description: `${presentCount} alunos presentes • ${completedTasks}/${adminTasks.length} tarefas concluídas`
    });
    
    navigate('/teacher');
  };

  const getAttendanceColor = (attendance) => {
    switch (attendance) {
      case 'present': return 'bg-green-500';
      case 'late': return 'bg-yellow-500';
      case 'absent': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAttendanceLabel = (attendance) => {
    switch (attendance) {
      case 'present': return 'Presente';
      case 'late': return 'Atrasado';
      case 'absent': return 'Ausente';
      default: return 'Não definido';
    }
  };

  return (
    <div className="min-h-screen pb-20 p-6 dojo-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <CheckSquare className="w-6 h-6" />
            Checklist da Aula
          </h1>
          <p className="text-gray-300">BJJ Fundamentals • 19:00-20:00</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="dojo-card p-3 text-center">
            <div className="text-lg font-bold text-green-500">
              {students.filter(s => s.attendance === 'present').length}
            </div>
            <p className="text-xs text-gray-400">Presentes</p>
          </div>
          <div className="dojo-card p-3 text-center">
            <div className="text-lg font-bold text-yellow-500">
              {students.filter(s => s.attendance === 'late').length}
            </div>
            <p className="text-xs text-gray-400">Atrasados</p>
          </div>
          <div className="dojo-card p-3 text-center">
            <div className="text-lg font-bold text-red-500">
              {students.filter(s => s.attendance === 'absent').length}
            </div>
            <p className="text-xs text-gray-400">Ausentes</p>
          </div>
        </div>

        {/* Students List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5" />
            Alunos Confirmados
          </h3>
          
          {students.map((student) => (
            <div key={student.id} className="dojo-card p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold">{student.name}</h4>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceColor(student.attendance)}`}>
                  {getAttendanceLabel(student.attendance)}
                  {student.attendance === 'late' && ` (+${student.late}min)`}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => updateStudentAttendance(student.id, 'present')}
                  variant={student.attendance === 'present' ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs"
                >
                  Presente
                </Button>
                
                <Button
                  onClick={() => updateStudentAttendance(student.id, 'late', 10)}
                  variant={student.attendance === 'late' ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs"
                >
                  Atrasado
                </Button>
                
                <Button
                  onClick={() => updateStudentAttendance(student.id, 'absent')}
                  variant={student.attendance === 'absent' ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs"
                >
                  Ausente
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Admin Tasks */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Tarefas Administrativas</h3>
          
          <div className="dojo-card p-4 space-y-3">
            {adminTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleAdminTask(task.id)}
                />
                <span className={task.completed ? 'line-through text-gray-400' : ''}>
                  {task.task}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Notas da Aula
          </h3>
          
          <div className="dojo-card p-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicione comentários sobre a aula (opcional)..."
              className="w-full h-24 bg-transparent border border-gray-600 rounded-lg p-3 resize-none focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={() => navigate('/teacher')}
            variant="outline"
            className="flex-1"
          >
            Cancelar
          </Button>
          
          <Button
            onClick={handleFinishChecklist}
            className="flex-1 dojo-button"
          >
            Finalizar Checklist
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherChecklist;
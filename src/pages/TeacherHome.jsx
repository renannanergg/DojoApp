import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, CheckSquare, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const TeacherHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [todayClasses, setTodayClasses] = useState([]);
  const [confirmedStudents, setConfirmedStudents] = useState([]);

  useEffect(() => {
    const mockTodayClasses = [
      {
        id: 1,
        name: 'BJJ Fundamentals',
        time: '19:00',
        confirmed: 8,
        total: 12,
        status: 'upcoming'
      },
      {
        id: 2,
        name: 'Wrestling',
        time: '20:30',
        confirmed: 6,
        total: 10,
        status: 'ready_for_checklist'
      }
    ];

    const mockConfirmedStudents = [
      { id: 1, name: 'João Silva', avatar: '👨' },
      { id: 2, name: 'Maria Santos', avatar: '👩' },
      { id: 3, name: 'Pedro Costa', avatar: '👨' },
      { id: 4, name: 'Ana Lima', avatar: '👩' },
      { id: 5, name: 'Carlos Mendes', avatar: '👨' },
      { id: 6, name: 'Lucia Ferreira', avatar: '👩' },
      { id: 7, name: 'Rafael Oliveira', avatar: '👨' },
      { id: 8, name: 'Beatriz Rocha', avatar: '👩' }
    ];

    setTodayClasses(mockTodayClasses);
    setConfirmedStudents(mockConfirmedStudents);
  }, []);

  const handleOpenChecklist = (classId) => {
    navigate(`/teacher-checklist/${classId}`);
  };

  const switchToStudentView = () => {
    toast({
      title: "🚧 Esta funcionalidade não está implementada ainda",
      description: "Mas não se preocupe! Você pode solicitar na próxima mensagem! 🚀"
    });
  };

  return (
    <div className="min-h-screen pb-20 p-6 dojo-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Olá, Prof. {user?.name}!</h1>
            <p className="text-gray-300">Visão Professor</p>
          </div>
          <Button
            onClick={switchToStudentView}
            variant="outline"
            size="sm"
          >
            Visão Aluno
          </Button>
        </div>

        {/* Confirmados para hoje */}
        <div className="dojo-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-red-500" />
              Confirmados para Hoje
            </h3>
            <span className="text-2xl font-bold text-red-500">
              {confirmedStudents.length}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {confirmedStudents.slice(0, 8).map((student) => (
              <div
                key={student.id}
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm"
                title={student.name}
              >
                {student.avatar}
              </div>
            ))}
            {confirmedStudents.length > 8 && (
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-sm font-bold">
                +{confirmedStudents.length - 8}
              </div>
            )}
          </div>
        </div>

        {/* Aulas de hoje */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Suas Aulas Hoje
          </h3>
          
          {todayClasses.map((cls) => (
            <motion.div
              key={cls.id}
              className="dojo-card p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{cls.name}</h4>
                  <p className="text-gray-300">{cls.time}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-500">
                    {cls.confirmed}/{cls.total}
                  </div>
                  <p className="text-xs text-gray-400">confirmados</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {cls.status === 'ready_for_checklist' ? (
                  <Button
                    onClick={() => handleOpenChecklist(cls.id)}
                    className="flex-1 dojo-button flex items-center gap-2"
                  >
                    <CheckSquare className="w-4 h-4" />
                    Abrir Checklist
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="flex-1 bg-gray-600 text-gray-400"
                  >
                    Aguardando aula
                  </Button>
                )}
                
                <Button
                  onClick={() => toast({
                    title: "🚧 Esta funcionalidade não está implementada ainda",
                    description: "Mas não se preocupe! Você pode solicitar na próxima mensagem! 🚀"
                  })}
                  variant="outline"
                  size="sm"
                >
                  Detalhes
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Próximas aulas */}
        <div className="dojo-card p-4">
          <h3 className="font-semibold mb-3">Próximas Aulas</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <div>
                <p className="font-medium">BJJ Avançado</p>
                <p className="text-sm text-gray-400">Amanhã • 19:00</p>
              </div>
              <span className="text-sm text-gray-400">4 confirmados</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">No-Gi</p>
                <p className="text-sm text-gray-400">Quinta • 20:00</p>
              </div>
              <span className="text-sm text-gray-400">7 confirmados</span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => toast({
              title: "🚧 Esta funcionalidade não está implementada ainda",
              description: "Mas não se preocupe! Você pode solicitar na próxima mensagem! 🚀"
            })}
            className="dojo-button-secondary p-4 h-auto flex flex-col gap-2"
          >
            <Star className="w-6 h-6" />
            <span>Avaliar Academia</span>
          </Button>
          
          <Button
            onClick={() => toast({
              title: "🚧 Esta funcionalidade não está implementada ainda",
              description: "Mas não se preocupe! Você pode solicitar na próxima mensagem! 🚀"
            })}
            className="dojo-button-secondary p-4 h-auto flex flex-col gap-2"
          >
            <Users className="w-6 h-6" />
            <span>Ver Alunos</span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherHome;
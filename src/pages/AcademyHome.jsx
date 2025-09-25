import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Calendar, Star, TrendingUp, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AcademyHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [recentClasses, setRecentClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const mockStats = {
      activeStudents: 127,
      classesThisMonth: 89,
      academyRating: 4.8,
      teacherRating: 4.6,
      growthRate: 12
    };

    const mockRecentClasses = [
      {
        id: 1,
        name: 'BJJ Fundamentals',
        teacher: 'Prof. Carlos',
        attendance: 12,
        rating: 4.9,
        date: 'Hoje'
      },
      {
        id: 2,
        name: 'Wrestling',
        teacher: 'Prof. Anderson',
        attendance: 8,
        rating: 4.7,
        date: 'Hoje'
      },
      {
        id: 3,
        name: 'No-Gi',
        teacher: 'Prof. Bruno',
        attendance: 15,
        rating: 4.8,
        date: 'Ontem'
      }
    ];

    const mockTeachers = [
      {
        id: 1,
        name: 'Prof. Carlos Silva',
        specialty: 'BJJ',
        rating: 4.9,
        classes: 24
      },
      {
        id: 2,
        name: 'Prof. Anderson Lima',
        specialty: 'Wrestling',
        rating: 4.7,
        classes: 18
      },
      {
        id: 3,
        name: 'Prof. Bruno Santos',
        specialty: 'No-Gi',
        rating: 4.8,
        classes: 21
      }
    ];

    setStats(mockStats);
    setRecentClasses(mockRecentClasses);
    setTeachers(mockTeachers);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`star ${i < Math.floor(rating) ? '' : 'empty'}`}
      >
        ★
      </span>
    ));
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
          <h1 className="text-2xl font-bold">Painel da Academia</h1>
          <p className="text-gray-300">Visão Geral • {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="dojo-card p-4 text-center">
            <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.activeStudents}</div>
            <p className="text-sm text-gray-400">Alunos Ativos</p>
          </div>
          
          <div className="dojo-card p-4 text-center">
            <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.classesThisMonth}</div>
            <p className="text-sm text-gray-400">Aulas este Mês</p>
          </div>
          
          <div className="dojo-card p-4 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.academyRating}</div>
            <p className="text-sm text-gray-400">Avaliação Academia</p>
          </div>
          
          <div className="dojo-card p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">+{stats.growthRate}%</div>
            <p className="text-sm text-gray-400">Crescimento</p>
          </div>
        </div>

        {/* Aulas Recentes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Aulas Recentes
          </h3>
          
          {recentClasses.map((cls) => (
            <div key={cls.id} className="dojo-card p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{cls.name}</h4>
                  <p className="text-sm text-gray-300">{cls.teacher}</p>
                </div>
                <span className="text-xs text-gray-400">{cls.date}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{cls.attendance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(cls.rating)}
                    <span className="text-sm ml-1">{cls.rating}</span>
                  </div>
                </div>
                
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
            </div>
          ))}
        </div>

        {/* Professores */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Award className="w-5 h-5" />
            Professores
          </h3>
          
          {teachers.map((teacher) => (
            <div key={teacher.id} className="dojo-card p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{teacher.name}</h4>
                  <p className="text-sm text-gray-300">{teacher.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      {renderStars(teacher.rating)}
                      <span className="text-sm">{teacher.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {teacher.classes} aulas
                    </span>
                  </div>
                </div>
                
                <Button
                  onClick={() => toast({
                    title: "🚧 Esta funcionalidade não está implementada ainda",
                    description: "Mas não se preocupe! Você pode solicitar na próxima mensagem! 🚀"
                  })}
                  variant="outline"
                  size="sm"
                >
                  Avaliar
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => toast({
              title: "🚧 Esta funcionalidade não está implementada ainda",
              description: "Mas não se preocupe! Você pode solicitar na próxima mensagem! 🚀"
            })}
            className="dojo-button p-4 h-auto flex flex-col gap-2"
          >
            <Calendar className="w-6 h-6" />
            <span>Gerenciar Agenda</span>
          </Button>
          
          <Button
            onClick={() => toast({
              title: "🚧 Esta funcionalidade não está implementada ainda",
              description: "Mas não se preocupe! Você pode solicitar na próxima mensagem! 🚀"
            })}
            className="dojo-button p-4 h-auto flex flex-col gap-2"
          >
            <Users className="w-6 h-6" />
            <span>Cadastrar Professor</span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AcademyHome;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, MapPin, Trophy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import ShieldProfile from '@/components/ShieldProfile';
import ProgressBar from '@/components/ProgressBar';

const StudentHome = () => {
  const { user } = useAuth();
  const [todayClasses, setTodayClasses] = useState([]);
  const [nextClasses, setNextClasses] = useState([]);

  useEffect(() => {
    const mockTodayClasses = [
      {
        id: 1,
        name: 'BJJ Fundamentals',
        time: '19:00',
        teacher: 'Prof. Carlos',
        confirmed: false
      },
      {
        id: 2,
        name: 'Wrestling',
        time: '20:30',
        teacher: 'Prof. Anderson',
        confirmed: true
      }
    ];

    const mockNextClasses = [
      {
        id: 3,
        name: 'BJJ Avançado',
        date: 'Amanhã',
        time: '19:00',
        teacher: 'Prof. Rafael'
      },
      {
        id: 4,
        name: 'No-Gi',
        date: 'Quinta',
        time: '20:00',
        teacher: 'Prof. Bruno'
      }
    ];

    setTodayClasses(mockTodayClasses);
    setNextClasses(mockNextClasses);
  }, []);

  const handleRSVP = (classId) => {
    setTodayClasses(prev => 
      prev.map(cls => 
        cls.id === classId 
          ? { ...cls, confirmed: !cls.confirmed }
          : cls
      )
    );
    
    toast({
      title: "Presença confirmada!",
      description: "Você confirmou presença na aula"
    });
  };

  const handleCheckIn = () => {
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
        {/* Header com perfil */}
        <div className="text-center">
          <ShieldProfile 
            type="black"
            years={user?.years || 1}
            size="large"
          />
          <h2 className="text-xl font-bold mt-4">Olá, {user?.name}!</h2>
          <p className="text-gray-300">Faixa {user?.belt} • {user?.weight}kg</p>
        </div>

        {/* Progresso */}
        <div className="dojo-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Progresso para próxima faixa</h3>
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          <ProgressBar 
            current={user?.progress || 20} 
            max={user?.maxProgress || 60}
            label="aulas"
          />
        </div>

        {/* Aulas de hoje */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Aulas de Hoje
          </h3>
          
          {todayClasses.map((cls) => (
            <motion.div
              key={cls.id}
              className="dojo-card p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{cls.name}</h4>
                  <p className="text-sm text-gray-300">{cls.time} • {cls.teacher}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="text-xs">Tatame 1</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => handleRSVP(cls.id)}
                  variant={cls.confirmed ? "secondary" : "default"}
                  className="flex-1"
                >
                  {cls.confirmed ? 'Confirmado ✓' : 'Confirmar Presença'}
                </Button>
                
                {cls.confirmed && (
                  <Button
                    onClick={handleCheckIn}
                    className="dojo-button"
                  >
                    Check-in
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Próximas aulas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Próximas Aulas</h3>
          
          {nextClasses.map((cls) => (
            <div key={cls.id} className="dojo-card p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{cls.name}</h4>
                  <p className="text-sm text-gray-300">{cls.date} • {cls.time}</p>
                  <p className="text-xs text-gray-400">{cls.teacher}</p>
                </div>
                <Button
                  onClick={() => toast({
                    title: "🚧 Esta funcionalidade não está implementada ainda",
                    description: "Mas não se preocupe! Você pode solicitar na próxima mensagem! 🚀"
                  })}
                  variant="outline"
                  size="sm"
                >
                  Ver detalhes
                </Button>
              </div>
            </div>
          ))}
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
            <span>Avaliar Aula</span>
          </Button>
          
          <Button
            onClick={() => toast({
              title: "🚧 Esta funcionalidade não está implementada ainda",
              description: "Mas não se preocupe! Você pode solicitar na próxima mensagem! 🚀"
            })}
            className="dojo-button-secondary p-4 h-auto flex flex-col gap-2"
          >
            <Trophy className="w-6 h-6" />
            <span>Ver Ranking</span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentHome;
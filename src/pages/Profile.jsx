import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Edit, Trophy, Calendar, Star, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import ShieldProfile from '@/components/ShieldProfile';
import ProgressBar from '@/components/ProgressBar';

const Profile = () => {
  const { user, userType, logout } = useAuth();
  const [selectedFrame, setSelectedFrame] = useState('black');

  const frameTypes = [
    { id: 'black', label: 'Preta Brilhante', description: 'Clássica e elegante' },
    { id: 'coral', label: 'Coral Brilhante', description: 'Vibrante e energética' },
    { id: 'white', label: 'Branca Clássica', description: 'Limpa e minimalista' }
  ];

  const stats = {
    student: [
      { label: 'Aulas Frequentadas', value: '47', icon: Calendar },
      { label: 'Progresso Atual', value: '20/60', icon: Trophy },
      { label: 'Avaliação Média', value: '4.8', icon: Star },
      { label: 'Posição no Ranking', value: '#12', icon: Trophy }
    ],
    teacher: [
      { label: 'Aulas Ministradas', value: '156', icon: Calendar },
      { label: 'Alunos Ativos', value: '34', icon: Trophy },
      { label: 'Avaliação Média', value: '4.9', icon: Star },
      { label: 'Anos de Ensino', value: '8', icon: Trophy }
    ],
    academy: [
      { label: 'Alunos Ativos', value: '127', icon: Trophy },
      { label: 'Professores', value: '8', icon: Calendar },
      { label: 'Avaliação Geral', value: '4.8', icon: Star },
      { label: 'Anos de Operação', value: '15', icon: Trophy }
    ]
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Até logo! Volte sempre ao Dojo App"
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado!",
      description: "Suas alterações foram salvas com sucesso"
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
        <div className="text-center">
          <h1 className="text-2xl font-bold">Meu Perfil</h1>
          <p className="text-gray-300 capitalize">{userType}</p>
        </div>

        {/* Profile Picture */}
        <div className="text-center">
          <ShieldProfile 
            type={selectedFrame}
            years={user?.years || 1}
            size="large"
          />
          <h2 className="text-xl font-bold mt-4">{user?.name}</h2>
          {userType === 'student' && (
            <p className="text-gray-300">
              Faixa {user?.belt} • {user?.weight}kg • {user?.height}cm
            </p>
          )}
        </div>

        {/* Frame Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Moldura do Perfil</h3>
          
          <div className="grid grid-cols-1 gap-3">
            {frameTypes.map((frame) => (
              <button
                key={frame.id}
                onClick={() => setSelectedFrame(frame.id)}
                className={`dojo-card p-4 text-left transition-all ${
                  selectedFrame === frame.id
                    ? 'border-red-500 bg-red-500/10'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <ShieldProfile type={frame.id} years={user?.years || 1} size="small" />
                  <div>
                    <h4 className="font-semibold">{frame.label}</h4>
                    <p className="text-sm text-gray-400">{frame.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress (Student only) */}
        {userType === 'student' && (
          <div className="dojo-card p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Progresso para Próxima Faixa
            </h3>
            <ProgressBar 
              current={user?.progress || 20} 
              max={user?.maxProgress || 60}
              label="aulas"
            />
          </div>
        )}

        {/* Stats */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Estatísticas</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {stats[userType]?.map((stat, index) => (
              <div key={index} className="dojo-card p-4 text-center">
                <stat.icon className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Info */}
        <div className="dojo-card p-4 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Informações Pessoais
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 focus:border-red-500 focus:outline-none text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 focus:border-red-500 focus:outline-none text-sm"
              />
            </div>
            
            {userType === 'student' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Peso (kg)</label>
                    <input
                      type="number"
                      defaultValue={user?.weight}
                      className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 focus:border-red-500 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Altura (cm)</label>
                    <input
                      type="number"
                      defaultValue={user?.height}
                      className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 focus:border-red-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Faixa Atual</label>
                  <select className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 focus:border-red-500 focus:outline-none text-sm">
                    <option value="Branca">Branca</option>
                    <option value="Azul">Azul</option>
                    <option value="Roxa">Roxa</option>
                    <option value="Marrom">Marrom</option>
                    <option value="Preta">Preta</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleSaveProfile}
            className="w-full dojo-button"
          >
            Salvar Alterações
          </Button>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair do App
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
import { useState, useEffect } from 'react';

interface User {
  email: string;
  role: string;
  name: string;
}

const USER_STORAGE_KEY = 'yoopay_user';

export const useUserPersistence = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage ao inicializar
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const savedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          // Validar se os dados do usuário estão completos
          if (userData.email && userData.role && userData.name) {
            setUser(userData);
          } else {
            console.warn('Dados de usuário inválidos no localStorage');
            localStorage.removeItem(USER_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error);
        localStorage.removeItem(USER_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Função para fazer login e salvar no localStorage
  const login = (userData: User) => {
    try {
      setUser(userData);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Erro ao salvar usuário no localStorage:', error);
    }
  };

  // Função para fazer logout e remover do localStorage
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao remover usuário do localStorage:', error);
    }
  };

  // Função para verificar se o usuário está logado
  const isAuthenticated = !!user;

  // Função para atualizar dados do usuário
  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const newUserData = { ...user, ...updatedData };
      login(newUserData);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };
};

export default useUserPersistence;
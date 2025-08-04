import { useState, useEffect } from 'react';

interface VersionInfo {
  version: string;
  commit: string;
  branch: string;
  buildDate: string;
}

export const useVersion = () => {
  const [versionInfo, setVersionInfo] = useState<VersionInfo>({
    version: '1.0.0',
    commit: 'unknown',
    branch: 'main',
    buildDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Tentar obter informações do Git via variáveis de ambiente do Vite
    const getVersionInfo = async () => {
      try {
        // Em produção, essas informações seriam injetadas durante o build
        const version = import.meta.env.VITE_APP_VERSION || '1.0.0';
        const commit = import.meta.env.VITE_GIT_COMMIT || 'dev-local';
        const branch = import.meta.env.VITE_GIT_BRANCH || 'main';
        const buildDate = import.meta.env.VITE_BUILD_DATE || new Date().toISOString().split('T')[0];

        setVersionInfo({
          version,
          commit: commit.substring(0, 7), // Mostrar apenas os primeiros 7 caracteres do commit
          branch,
          buildDate
        });
      } catch (error) {
        console.warn('Não foi possível obter informações de versão:', error);
      }
    };

    getVersionInfo();
  }, []);

  return versionInfo;
};
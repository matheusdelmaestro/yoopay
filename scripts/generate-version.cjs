const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Função para executar comandos Git de forma segura
function execGitCommand(command, fallback = 'unknown') {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch (error) {
    console.warn(`Comando Git falhou: ${command}. Usando fallback: ${fallback}`);
    return fallback;
  }
}

// Obter informações do Git
const getVersionInfo = () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const versionInfo = {
    version: packageJson.version || '1.0.0',
    commit: execGitCommand('git rev-parse HEAD', 'dev-local'),
    shortCommit: execGitCommand('git rev-parse --short HEAD', 'dev'),
    branch: execGitCommand('git rev-parse --abbrev-ref HEAD', 'main'),
    buildDate: new Date().toISOString().split('T')[0],
    buildTime: new Date().toISOString()
  };
  
  return versionInfo;
};

// Gerar arquivo .env com informações de versão
const generateVersionEnv = () => {
  const versionInfo = getVersionInfo();
  
  const envContent = `# Informações de versão geradas automaticamente
VITE_APP_VERSION=${versionInfo.version}
VITE_GIT_COMMIT=${versionInfo.commit}
VITE_GIT_SHORT_COMMIT=${versionInfo.shortCommit}
VITE_GIT_BRANCH=${versionInfo.branch}
VITE_BUILD_DATE=${versionInfo.buildDate}
VITE_BUILD_TIME=${versionInfo.buildTime}
`;
  
  // Ler .env existente se houver
  let existingEnv = '';
  const envPath = '.env.local';
  
  if (fs.existsSync(envPath)) {
    existingEnv = fs.readFileSync(envPath, 'utf8');
    // Remover linhas de versão existentes
    existingEnv = existingEnv
      .split('\n')
      .filter(line => !line.startsWith('VITE_APP_VERSION') && 
                     !line.startsWith('VITE_GIT_') && 
                     !line.startsWith('VITE_BUILD_'))
      .join('\n');
  }
  
  // Combinar env existente com novas informações de versão
  const finalEnvContent = existingEnv.trim() + '\n\n' + envContent;
  
  fs.writeFileSync(envPath, finalEnvContent);
  
  console.log('✅ Informações de versão geradas:');
  console.log(`   Versão: ${versionInfo.version}`);
  console.log(`   Commit: ${versionInfo.shortCommit}`);
  console.log(`   Branch: ${versionInfo.branch}`);
  console.log(`   Data: ${versionInfo.buildDate}`);
  console.log(`   Arquivo: ${envPath}`);
};

// Executar se chamado diretamente
if (require.main === module) {
  generateVersionEnv();
}

module.exports = { generateVersionEnv, getVersionInfo };
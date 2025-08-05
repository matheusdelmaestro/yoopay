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

// Função para incrementar versão
function incrementVersion(version, type = 'patch') {
  const parts = version.split('.').map(Number);
  
  switch (type) {
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'patch':
    default:
      parts[2]++;
      break;
  }
  
  return parts.join('.');
}

// Obter informações do Git
const getVersionInfo = (shouldIncrement = false, incrementType = 'patch') => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  let currentVersion = packageJson.version || '0.0.0';
  
  // Incrementar versão se solicitado
  if (shouldIncrement) {
    currentVersion = incrementVersion(currentVersion, incrementType);
    packageJson.version = currentVersion;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`📦 Versão incrementada para: ${currentVersion}`);
  }
  
  const versionInfo = {
    version: currentVersion,
    commit: execGitCommand('git rev-parse HEAD', 'dev-local'),
    shortCommit: execGitCommand('git rev-parse --short HEAD', 'dev'),
    branch: execGitCommand('git rev-parse --abbrev-ref HEAD', 'main'),
    buildDate: new Date().toISOString().split('T')[0],
    buildTime: new Date().toISOString()
  };
  
  return versionInfo;
};

// Função para criar arquivo de documentação de versão
function createVersionDoc(versionInfo) {
  const docContent = `# Versão ${versionInfo.version}

**Data de Build:** ${versionInfo.buildDate} às ${versionInfo.buildTime}
**Commit:** ${versionInfo.commit}
**Branch:** ${versionInfo.branch}

---
*Arquivo gerado automaticamente pelo sistema de versionamento Yoo*
`;
  
  fs.writeFileSync('VERSION.md', docContent);
  console.log('📄 Arquivo VERSION.md criado');
}

// Função para fazer commit das mudanças
function commitChanges(version) {
  try {
    // Verificar se há mudanças para commitar
    const status = execGitCommand('git status --porcelain', '');
    if (!status) {
      console.log('📝 Nenhuma mudança para commitar.');
      return;
    }
    
    // Adicionar apenas arquivos que não estão no .gitignore
    execSync('git add package.json VERSION.md', { stdio: 'inherit' });
    
    // Fazer commit
    const commitMessage = `chore: bump version to ${version}`;
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    
    console.log(`🚀 Commit realizado: ${commitMessage}`);
    
    // Criar tag
    execSync(`git tag -a v${version} -m "Version ${version}"`, { stdio: 'inherit' });
    console.log(`🏷️  Tag criada: v${version}`);
    
  } catch (error) {
    console.error('❌ Erro ao fazer commit:', error.message);
  }
}

// Gerar arquivo .env com informações de versão
const generateVersionEnv = (shouldIncrement = false, incrementType = 'patch', shouldCommit = false) => {
  const versionInfo = getVersionInfo(shouldIncrement, incrementType);
  
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
    // Remover linhas de versão existentes e comentários duplicados
    existingEnv = existingEnv
      .split('\n')
      .filter(line => !line.startsWith('VITE_APP_VERSION') && 
                     !line.startsWith('VITE_GIT_') && 
                     !line.startsWith('VITE_BUILD_') &&
                     !(line.trim() === '# Informações de versão geradas automaticamente' && existingEnv.includes('# Informações de versão geradas automaticamente')))
      .join('\n')
      .replace(/\n\n+/g, '\n\n'); // Remover linhas em branco excessivas
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
  
  // Criar documentação de versão se for incremento
  if (shouldIncrement) {
    createVersionDoc(versionInfo);
  }
  
  // Fazer commit se solicitado
  if (shouldCommit && shouldIncrement) {
    commitChanges(versionInfo.version);
  }
  
  return versionInfo;
};

// Executar se chamado diretamente
if (require.main === module) {
  const args = process.argv.slice(2);
  
  // Verificar argumentos
  const shouldIncrement = args.includes('--increment') || args.includes('-i');
  const shouldCommit = args.includes('--commit') || args.includes('-c');
  
  // Determinar tipo de incremento
  let incrementType = 'patch';
  if (args.includes('--major')) incrementType = 'major';
  else if (args.includes('--minor')) incrementType = 'minor';
  else if (args.includes('--patch')) incrementType = 'patch';
  
  // Mostrar ajuda
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🔧 Gerador de Versão Yoo
`);
    console.log('Uso: node scripts/generate-version.cjs [opções]\n');
    console.log('Opções:');
    console.log('  -i, --increment    Incrementar versão');
    console.log('  -c, --commit       Fazer commit das mudanças');
    console.log('  --major            Incremento major (x.0.0)');
    console.log('  --minor            Incremento minor (x.y.0)');
    console.log('  --patch            Incremento patch (x.y.z) [padrão]');
    console.log('  -h, --help         Mostrar esta ajuda\n');
    console.log('Exemplos:');
    console.log('  npm run version:generate              # Apenas gerar .env');
    console.log('  npm run version:patch                 # Incrementar patch e commitar');
    console.log('  npm run version:minor                 # Incrementar minor e commitar');
    console.log('  npm run version:major                 # Incrementar major e commitar\n');
    process.exit(0);
  }
  
  console.log('🚀 Iniciando geração de versão...\n');
  
  generateVersionEnv(shouldIncrement, incrementType, shouldCommit);
  
  if (shouldIncrement && shouldCommit) {
    console.log('\n✨ Processo concluído! Nova versão criada e commitada.');
  } else if (shouldIncrement) {
    console.log('\n✨ Versão incrementada! Execute "git add . && git commit" para commitar.');
  } else {
    console.log('\n✨ Informações de versão atualizadas!');
  }
}

module.exports = { generateVersionEnv, getVersionInfo, incrementVersion };
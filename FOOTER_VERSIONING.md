# 🏷️ Sistema de Versionamento Automático no Footer

## 📋 Implementação Completa

Foi implementado um sistema completo de versionamento automático que exibe informações do Git diretamente no footer da aplicação.

### ✅ Componentes Criados

#### 1. **Hook useVersion** (`src/hooks/useVersion.ts`)
- Obtém informações de versão das variáveis de ambiente do Vite
- Retorna: versão, commit, branch e data de build
- Fallback para valores padrão em desenvolvimento

#### 2. **Componente Footer** (`src/components/Footer.tsx`)
- Exibe informações de versão de forma elegante
- Mostra: versão, hash do commit, branch e data de build
- Design responsivo com ícones do Lucide React
- Copyright automático com ano atual

#### 3. **Script de Geração** (`scripts/generate-version.cjs`)
- Executa comandos Git para obter informações do repositório
- Gera arquivo `.env.local` com variáveis de ambiente
- Executa automaticamente antes do build e desenvolvimento

### 🔧 Configuração Automática

#### **Scripts do package.json atualizados:**
```json
{
  "dev": "node scripts/generate-version.cjs && vite",
  "build": "node scripts/generate-version.cjs && vite build",
  "build:dev": "node scripts/generate-version.cjs && vite build --mode development",
  "version:generate": "node scripts/generate-version.cjs"
}
```

#### **Variáveis de ambiente geradas:**
- `VITE_APP_VERSION`: Versão do package.json
- `VITE_GIT_COMMIT`: Hash completo do commit
- `VITE_GIT_SHORT_COMMIT`: Hash curto do commit (7 caracteres)
- `VITE_GIT_BRANCH`: Branch atual
- `VITE_BUILD_DATE`: Data do build (YYYY-MM-DD)
- `VITE_BUILD_TIME`: Timestamp completo do build

### 🎯 Funcionalidades

#### **Informações Exibidas no Footer:**
1. **Nome da aplicação** + **Badge de versão**
2. **Hash do commit** com ícone de hash
3. **Branch atual** com ícone de branch
4. **Data de build** com ícone de calendário
5. **Copyright** com ano automático

#### **Comportamento Inteligente:**
- ✅ **Desenvolvimento**: Gera informações a cada `npm run dev`
- ✅ **Build**: Gera informações a cada build
- ✅ **Fallback**: Valores padrão se Git não estiver disponível
- ✅ **Responsivo**: Layout adaptável para diferentes telas

### 📊 Exemplo de Saída

**Footer exibe:**
```
Yooga Flow Assist [v0.0.0] # 68d489b ⎇ main 📅 2025-08-04
                                    © 2025 Yooga. Todos os direitos reservados.
```

### 🚀 Como Usar

#### **Desenvolvimento:**
```bash
npm run dev
# Gera versão automaticamente e inicia servidor
```

#### **Build:**
```bash
npm run build
# Gera versão automaticamente e faz build
```

#### **Gerar versão manualmente:**
```bash
npm run version:generate
# Apenas gera informações de versão
```

### 🔄 Integração com CI/CD

O sistema está pronto para integração com pipelines de CI/CD:
- Executa automaticamente em qualquer ambiente com Git
- Gera informações precisas do commit em builds de produção
- Mantém rastreabilidade completa das versões deployadas

### 📁 Arquivos Modificados

1. **Criados:**
   - `src/hooks/useVersion.ts`
   - `src/components/Footer.tsx`
   - `scripts/generate-version.cjs`

2. **Modificados:**
   - `src/components/Layout.tsx` (adicionado Footer)
   - `package.json` (scripts atualizados)
   - `.env.local` (variáveis de versão)

### ✅ Status

- ✅ **Hook de versão**: Implementado
- ✅ **Componente Footer**: Criado e integrado
- ✅ **Script de geração**: Funcionando
- ✅ **Integração automática**: Configurada
- ✅ **Layout responsivo**: Implementado
- ✅ **Fallbacks**: Configurados

**Resultado**: Footer com versionamento automático baseado em commits Git funcionando perfeitamente! 🎉

# Para releases patch (correções)
npm run version:patch

# Para releases minor (novas funcionalidades)
npm run version:minor

# Para releases major (breaking changes)
npm run version:major
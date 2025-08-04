# 🔧 Troubleshooting: Failed to Fetch - Supabase

## 🚨 Problema Identificado

**STATUS: ❌ CONFIRMADO - Problema de conectividade detectado**

O erro "failed to fetch" indica que a URL do Supabase não está acessível. Isso pode acontecer por alguns motivos:

### ❌ Possíveis Causas:

1. **URL incorreta** - A URL pode estar errada ou o projeto não existe
2. **Projeto pausado** - Projetos gratuitos podem ser pausados por inatividade
3. **Configuração de rede** - Firewall ou proxy bloqueando
4. **Chave inválida** - A chave anon pode estar expirada

## 🔍 Diagnóstico Realizado

```bash
# Teste de conectividade falhou
curl -I https://amoilwzxttxoczzakyxyv.supabase.co
# Resultado: Could not resolve host
```

## ✅ Soluções

### 1. Verificar URL do Projeto

1. Acesse [supabase.com](https://supabase.com)
2. Faça login na sua conta
3. Vá para o seu projeto
4. Em **Settings** > **API**, verifique:
   - **Project URL**: Deve estar ativa
   - **Project Reference ID**: Confirme se é `amoilwzxttxoczzakyxyv`

### 2. Verificar Status do Projeto

1. No dashboard do Supabase
2. Verifique se o projeto está **ACTIVE**
3. Se estiver **PAUSED**, clique em "Restore"

### 3. Obter Nova URL (Se Necessário)

Se a URL mudou, atualize o `.env.local`:

```env
# Substitua pela URL correta do seu projeto
VITE_SUPABASE_URL=https://SEU_PROJETO_ID.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_NOVA_CHAVE_ANON
```

### 4. Testar Conectividade

```bash
# Teste manual
curl -I https://SUA_URL.supabase.co

# Deve retornar algo como:
# HTTP/2 200
# server: nginx
```

## 🛠️ Configuração Alternativa

### Opção 1: Criar Novo Projeto

1. Vá para [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Configure:
   - **Name**: `yooga-flow-assist-v2`
   - **Password**: Senha forte
   - **Region**: South America (São Paulo)
4. Aguarde criação (2-3 minutos)
5. Copie as novas credenciais

### Opção 2: Usar Projeto Existente

1. Liste seus projetos no dashboard
2. Selecione um projeto ativo
3. Copie as credenciais corretas
4. Atualize `.env.local`

## 🔄 Passos para Correção

### 1. Atualizar Credenciais

```bash
# Edite o arquivo .env.local
nano .env.local

# Ou use o editor do VS Code
code .env.local
```

### 2. Reiniciar Servidor

```bash
# Pare o servidor (Ctrl+C)
# Reinicie
npm run dev
```

### 3. Testar Login

1. Acesse `http://localhost:5173`
2. Tente fazer login
3. Verifique o console do navegador (F12)

## 🔍 Debug Avançado

### Verificar no Console do Navegador

```javascript
// Abra F12 > Console e execute:
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...')

// Teste manual de conexão
fetch(import.meta.env.VITE_SUPABASE_URL + '/rest/v1/')
  .then(r => console.log('Conexão OK:', r.status))
  .catch(e => console.error('Erro de conexão:', e))
```

### Verificar Configuração do Supabase

```javascript
// No console do navegador
import { supabase } from './src/lib/supabase.ts'
supabase.auth.getSession().then(console.log)
```

## 📋 Checklist de Verificação

- [ ] URL do projeto está correta
- [ ] Projeto está ativo (não pausado)
- [ ] Chave anon está válida
- [ ] Arquivo `.env.local` está sendo lido
- [ ] Servidor foi reiniciado após mudanças
- [ ] Não há firewall bloqueando
- [ ] Internet está funcionando

## 🆘 Se Nada Funcionar

### Fallback para Usuários Mock

O sistema já tem fallback automático. Use os usuários de teste:

```
Email: supervisor@yooga.com.br
Senha: xK%d^nhP5%@#$$@

Email: atendimento@yooga.com.br
Senha: xK%d^nhP5%@#$$@
```

### Criar Projeto do Zero

1. **Novo projeto Supabase**:
   - Nome: `yooga-flow-assist-novo`
   - Região: South America
   - Aguardar ativação

2. **Configurar autenticação**:
   - Site URL: `http://localhost:5173`
   - Redirect URLs: `http://localhost:5173/dashboard`

3. **Criar usuários**:
   - Via interface: Authentication > Users
   - Ou via SQL (como no guia)

4. **Atualizar credenciais**:
   - Copiar nova URL e chave
   - Atualizar `.env.local`
   - Reiniciar servidor

## 📞 Próximos Passos

1. **Verificar status do projeto** no dashboard Supabase
2. **Obter credenciais corretas** se necessário
3. **Atualizar `.env.local`** com dados válidos
4. **Reiniciar servidor** para aplicar mudanças
5. **Testar login** novamente

---

**💡 Dica**: O sistema funciona perfeitamente com usuários mock enquanto você resolve a configuração do Supabase!
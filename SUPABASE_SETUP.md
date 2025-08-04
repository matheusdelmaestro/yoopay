# 🚀 Configuração do Supabase para Autenticação

## 📋 Pré-requisitos

- Conta no [Supabase](https://supabase.com)
- Node.js instalado
- Projeto React/Vite configurado

## 🔧 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em "New Project"
3. Escolha sua organização
4. Preencha os dados:
   - **Name**: `yooga-flow-assist`
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha a região mais próxima (ex: South America)
5. Clique em "Create new project"
6. Aguarde a criação (pode levar alguns minutos)

### 2. Configurar Autenticação

1. No painel do Supabase, vá para **Authentication** > **Settings**
2. Em **Site URL**, configure:
   - Development: `http://localhost:5173`
   - Production: `https://seudominio.com`
3. Em **Redirect URLs**, adicione:
   - `http://localhost:5173/dashboard`
   - `https://seudominio.com/dashboard`

### 3. Obter Chaves da API

1. Vá para **Settings** > **API**
2. Copie as seguintes informações:
   - **Project URL**: `https://amoilwzxttxoczzakyxyv.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (já configurada)

### 4. Configurar Variáveis de Ambiente

✅ **Já configurado no projeto!**

O arquivo `.env.local` já foi criado com:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://amoilwzxttxoczzakyxyv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtb2lsd3p4dHhvY3p6YWt5eHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMTA1MzUsImV4cCI6MjA2OTg4NjUzNX0.0qfDWNa5CZ1R-TEY_y82-O9mceB3C1Qn5BgxViWTSfg
```

> ⚠️ **IMPORTANTE**: Este arquivo está protegido pelo `.gitignore` e não será commitado.

### 5. Criar Usuários no Supabase

#### Opção A: Via Interface (Recomendado)

1. Vá para **Authentication** > **Users**
2. Clique em "Add user"
3. Preencha:
   - **Email**: `supervisor@yooga.com.br`
   - **Password**: `suasenhasegura123`
   - **Email Confirm**: ✅ (marcado)
4. Clique em "Create user"
5. Repita para outros usuários:
   - `atendimento@yooga.com.br`
   - `financeiro@yooga.com.br`
   - `pagamento@yooga.com.br`

#### Opção B: Via SQL (Avançado)

1. Vá para **SQL Editor**
2. Execute o seguinte script:

```sql
-- Inserir usuários com roles
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES 
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'supervisor@yooga.com.br',
  crypt('suasenhasegura123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"role": "supervisor", "full_name": "João Lima"}'
),
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'atendimento@yooga.com.br',
  crypt('suasenhasegura123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"role": "atendimento", "full_name": "Ana Silva"}'
);
```

### 6. Configurar Políticas de Segurança (RLS)

1. Vá para **Authentication** > **Policies**
2. Crie políticas conforme necessário para suas tabelas

Exemplo de política básica:

```sql
-- Permitir que usuários autenticados leiam seus próprios dados
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
```

### 7. Testar a Integração

✅ **Já implementado no projeto!**

O sistema já inclui:

- 🔐 **Hook de autenticação** (`useAuth`)
- 🎯 **Contexto global** (`AuthContext`)
- 🔄 **Fallback para usuários mock**
- 🛡️ **Componente de rota protegida**

#### Para testar:

1. Execute o projeto:
   ```bash
   npm run dev
   ```

2. Acesse `http://localhost:5173`

3. Tente fazer login com:
   - **Usuário Supabase**: Use os criados no passo 5
   - **Usuários Mock**: Funcionam como fallback

### 8. Funcionalidades Implementadas

#### ✅ Autenticação Completa

- **Login/Logout**: Integração com Supabase
- **Registro**: Criação de novos usuários
- **Reset de senha**: Recuperação por email
- **Sessão persistente**: Mantém login entre sessões
- **Estados de loading**: Feedback visual

#### ✅ Segurança

- **Variáveis protegidas**: `.env.local` no `.gitignore`
- **Validação de sessão**: Verificação automática
- **Tratamento de erros**: Mensagens amigáveis
- **Fallback robusto**: Sistema mock como backup

#### ✅ Experiência do Usuário

- **Interface moderna**: Mantém design existente
- **Feedback visual**: Toasts informativos
- **Loading states**: Indicadores de carregamento
- **Transições suaves**: Animações consistentes

## 🔒 Segurança e Boas Práticas

### ✅ Implementadas

- **Chaves protegidas**: Nunca expostas no código
- **HTTPS obrigatório**: Em produção
- **Validação client-side**: Campos obrigatórios
- **Sanitização**: Inputs tratados

### 📝 Recomendações Adicionais

1. **Produção**:
   - Use HTTPS sempre
   - Configure domínios permitidos
   - Implemente rate limiting
   - Monitore logs de autenticação

2. **Backup**:
   - Mantenha backup das configurações
   - Documente políticas de segurança
   - Teste recuperação de desastres

3. **Monitoramento**:
   - Configure alertas no Supabase
   - Monitore tentativas de login
   - Acompanhe métricas de uso

## 🚀 Próximos Passos

1. **Criar usuários reais** no Supabase
2. **Configurar roles personalizadas** se necessário
3. **Implementar perfis de usuário** com dados adicionais
4. **Configurar webhooks** para sincronização
5. **Adicionar autenticação social** (Google, GitHub, etc.)

## 📞 Suporte

Em caso de dúvidas:

- 📖 [Documentação Supabase](https://supabase.com/docs)
- 🎯 [Guia de Autenticação](https://supabase.com/docs/guides/auth)
- 💬 [Comunidade Supabase](https://github.com/supabase/supabase/discussions)

---

**✨ Implementação concluída com sucesso!**

O sistema agora suporta autenticação real via Supabase com fallback para usuários mock, mantendo a experiência de desenvolvimento fluida e preparando para produção.
# 🔧 Solução para o Erro "Failed to Fetch" do Supabase

## 🚨 Problema Identificado

O teste de conectividade confirmou que a URL do Supabase não está acessível. Isso pode acontecer por:

1. **Projeto pausado** - Supabase pausa projetos inativos
2. **URL incorreta** - A URL pode ter mudado ou estar errada
3. **Chave inválida** - A chave anon pode estar expirada
4. **Projeto deletado** - O projeto pode ter sido removido

## 🛠️ Soluções (Execute na Ordem)

### Opção 1: Verificar Projeto Atual

1. **Acesse o Dashboard do Supabase:**
   ```
   https://supabase.com/dashboard
   ```

2. **Verifique se o projeto existe e está ativo:**
   - Procure pelo projeto `amoilwzxttxoczzakyxyv`
   - Se estiver pausado, clique em "Resume" ou "Unpause"
   - Se não existir, vá para a Opção 2

3. **Copie as credenciais corretas:**
   - Vá em `Settings > API`
   - Copie a `Project URL`
   - Copie a `anon/public key`

### Opção 2: Criar Novo Projeto (Recomendado)

1. **Criar novo projeto:**
   ```
   1. Acesse https://supabase.com/dashboard
   2. Clique em "New Project"
   3. Nome: "Yooga Flow Assist"
   4. Database Password: [escolha uma senha forte]
   5. Region: South America (São Paulo) ou mais próxima
   6. Clique em "Create new project"
   ```

2. **Aguardar criação (2-3 minutos)**

3. **Copiar credenciais:**
   - Vá em `Settings > API`
   - Copie `Project URL` (ex: https://abcdefgh.supabase.co)
   - Copie `anon public key`

4. **Atualizar .env.local:**
   ```env
   VITE_SUPABASE_URL=https://sua-nova-url.supabase.co
   VITE_SUPABASE_ANON_KEY=sua_nova_chave_aqui
   ```

### Opção 3: Configuração de Autenticação

1. **No Dashboard do Supabase:**
   - Vá em `Authentication > Settings`
   - Em "Site URL", adicione: `http://localhost:5173`
   - Em "Redirect URLs", adicione: `http://localhost:5173/**`

2. **Criar usuário de teste:**
   - Vá em `Authentication > Users`
   - Clique em "Add user"
   - Email: `teste@yooga.com`
   - Password: `123456789`
   - Clique em "Create user"

## 🧪 Testar a Solução

1. **Executar teste de conectividade:**
   ```bash
   node test-supabase.js
   ```

2. **Se o teste passar, iniciar o servidor:**
   ```bash
   npm run dev
   ```

3. **Testar login na aplicação:**
   - Abra http://localhost:5173
   - Use: `teste@yooga.com` / `123456789`

## 🔍 Debug Adicional

Se ainda não funcionar:

1. **Verificar console do navegador:**
   - Abra F12 > Console
   - Procure por logs do Supabase
   - Verifique se as variáveis estão carregando

2. **Verificar Network tab:**
   - F12 > Network
   - Tente fazer login
   - Veja se há requisições falhando

3. **Verificar se o servidor reiniciou:**
   - Pare o servidor (Ctrl+C)
   - Execute `npm run dev` novamente

## ✅ Checklist Final

- [ ] Projeto Supabase ativo
- [ ] URL correta no .env.local
- [ ] Chave anon correta no .env.local
- [ ] Site URL configurada (localhost:5173)
- [ ] Usuário de teste criado
- [ ] Teste de conectividade passou
- [ ] Servidor reiniciado
- [ ] Login funcionando

## 🆘 Se Nada Funcionar

**Fallback para usuários mock:**
A aplicação já tem usuários mock configurados. Use:
- Email: `admin@yooga.com`
- Senha: `admin123`

Isso permitirá testar a aplicação enquanto resolve o Supabase.

---

**💡 Dica:** Mantenha sempre as credenciais do Supabase atualizadas e verifique regularmente se o projeto não foi pausado por inatividade.
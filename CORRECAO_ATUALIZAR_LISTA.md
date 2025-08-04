# 🔧 Correção: Botão "Atualizar Lista" - Credenciamentos

## 📋 Problema Identificado

O componente `Credenciamentos.tsx` estava fazendo a busca automática de dados **sempre** que o componente era renderizado, causando:
- Requisições desnecessárias à API
- Possível sobrecarga do servidor
- Experiência do usuário inconsistente

## ✅ Solução Implementada

### 🎯 Comportamento Corrigido

Agora a lista de credenciamentos PIX é atualizada **apenas**:
1. **Na primeira vez** que a página carrega
2. **Quando o usuário clica** no botão "Atualizar Lista"
3. **Após aprovar/rejeitar** um credenciamento (comportamento já existente)

### 🔧 Mudanças Técnicas

**Antes:**
```typescript
// Carregar dados ao montar o componente
useEffect(() => {
  try {
    fetchPendingRequests();
  } catch (error) {
    console.error('Error fetching pending requests:', error);
  }
}, [fetchPendingRequests]);
```

**Depois:**
```typescript
// Estado para controlar se é a primeira vez que a página carrega
const [isFirstLoad, setIsFirstLoad] = useState(true);

// Carregar dados apenas na primeira vez que o componente monta
useEffect(() => {
  if (isFirstLoad) {
    try {
      fetchPendingRequests();
      setIsFirstLoad(false);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  }
}, [fetchPendingRequests, isFirstLoad]);
```

### 🎯 Benefícios da Correção

1. **Performance Melhorada**: Menos requisições desnecessárias
2. **Controle do Usuário**: Atualização manual quando necessário
3. **Economia de Recursos**: Reduz carga no servidor
4. **UX Consistente**: Comportamento previsível

### 🧪 Como Testar

1. Acesse `http://localhost:8080/credenciamentos`
2. Faça login normalmente
3. **Primeira vez**: Lista carrega automaticamente
4. **Navegue para outra página e volte**: Lista NÃO recarrega automaticamente
5. **Clique em "Atualizar Lista"**: Lista recarrega manualmente
6. **Aprove/Rejeite um item**: Lista recarrega automaticamente

### 📊 Status

- ✅ **Implementado**: Controle de primeira carga
- ✅ **Testado**: Hot reload funcionando
- ✅ **Compatível**: Mantém funcionalidades existentes
- ✅ **Otimizado**: Reduz requisições desnecessárias

---

**Arquivo modificado**: `src/pages/Credenciamentos.tsx`  
**Linhas alteradas**: 108-118  
**Tipo de mudança**: Otimização de performance e UX
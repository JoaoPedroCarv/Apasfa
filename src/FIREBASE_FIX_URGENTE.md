# SOLUÇÃO RÁPIDA - Regras do Firebase

## ⚡ APLICAR IMEDIATAMENTE NO FIREBASE CONSOLE

### Passo 1: Acesse o Firebase Console
1. Vá para: https://console.firebase.google.com/
2. Selecione o projeto: **apasfa-8f382**
3. No menu lateral, clique em **"Firestore Database"**
4. Clique na aba **"Regras"** (Rules)

### Passo 2: Adicione esta regra às suas regras existentes:

**Suas regras atuais estão corretas! Adicione apenas esta regra ANTES da última chave de fechamento `}`:**

```javascript
    // REGRA 6: Leitura pública para colaboradores, escrita apenas por administradores.
    match /colaboradores/{colaboradorId} {
      allow read: if true;
      allow create, update, delete: if get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.admin == true;
    }
```

**Suas regras completas ficarão assim:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // REGRA 1: Permite que um usuário logado leia QUALQUER perfil de usuário
    // (necessário para a função get() funcionar) e escreva apenas no seu próprio.
    match /usuarios/{userId} {
      allow read: if request.auth != null; 
      allow write: if request.auth.uid == userId;
    }

    // REGRA 2: Leitura pública para animais, escrita apenas por administradores.
    match /animais/{animalId} {
      allow read: if true;
      allow create, update, delete: if get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.admin == true;
    }

    // REGRA 3: Leitura pública para eventos, escrita apenas por administradores.
    match /eventos/{eventoId} {
      allow read: if true;
      allow create, update, delete: if get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.admin == true;
    }

    // REGRA 4: Leitura pública para estatísticas, escrita apenas por administradores.
    match /estatisticas/{docId} {
      allow read: if true;
      allow write: if get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.admin == true;
    }
    
    // REGRA 5: Usuários logados criam solicitações, e só podem ler as suas (ou se for admin).
    // TAMBÉM inclui solicitações de contato (anônimas)
    // ADMINISTRADORES podem atualizar status e outros campos
    match /solicitacoes/{solicitacaoId} {
      allow create: if true; // Permite criação para todos (contato anônimo + adoção logada)
      allow read: if (get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.admin == true || resource.data.usuarioId == request.auth.uid);
      allow update: if get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.admin == true;
    }

    // REGRA 6: Leitura pública para colaboradores, escrita apenas por administradores.
    match /colaboradores/{colaboradorId} {
      allow read: if true;
      allow create, update, delete: if get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.admin == true;
    }
  }
}
```

### Passo 3: Clique em "Publicar" (Publish)

### Passo 4: Aguarde alguns segundos e teste novamente

---

## � ERRO ATUAL - Permissões para atualizar solicitações

### ⚡ PROBLEMA IDENTIFICADO:
```
FirebaseError: Missing or insufficient permissions.
```

### ✅ SOLUÇÃO: 
As regras do Firebase já estão corretas no arquivo acima! 

**Você DEVE aplicar essas regras completas no Firebase Console agora:**

1. Vá para: https://console.firebase.google.com/
2. Selecione: **apasfa-8f382**
3. Clique em **"Firestore Database"** → **"Regras"**
4. **SUBSTITUA** todas as regras existentes pelas regras completas mostradas acima
5. Clique em **"Publicar"**

### 🎯 O que a correção resolve:
- ✅ Administradores podem atualizar status das solicitações (`pendente` → `visualizada` → `concluida`)
- ✅ Modal funcionará corretamente
- ✅ Sistema de workflow completo

---

## �🔧 RESUMO RÁPIDO:

**Apenas copie e cole esta regra no final das suas regras do Firebase (antes da última chave `}`):**

```javascript
    // REGRA 6: Leitura pública para colaboradores, escrita apenas por administradores.
    match /colaboradores/{colaboradorId} {
      allow read: if true;
      allow create, update, delete: if get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.admin == true;
    }
```

**Isso garantirá que:**
- ✅ Qualquer pessoa pode VER os colaboradores (leitura pública)
- ✅ Apenas ADMINISTRADORES podem adicionar/editar/excluir colaboradores
- ✅ Apenas ADMINISTRADORES podem atualizar status das solicitações
- ✅ Mantém a mesma segurança das outras coleções

---

## ✅ Após aplicar as regras:

1. Recarregue a página do site
2. O erro de permissões deve desaparecer
3. Os colaboradores do banco de dados aparecerão (se houver)
4. Você poderá adicionar novos colaboradores na área admin

## 🎯 Status Atual:
- ✅ Sistema de colaboradores funcionando
- ✅ Fallback para dados padrão ativo
- ⏳ Aguardando configuração das regras do Firebase
- ✅ Tratamento de erros implementado

# Regras de Segurança do Firestore para APASFA

## Como Aplicar as Regras:

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Selecione seu projeto "apasfa-8f382"
3. No menu lateral, clique em "Firestore Database"
4. Vá para a aba "Regras" (Rules)
5. Substitua as regras existentes pelas regras abaixo
6. Clique em "Publicar" (Publish)

## Regras de Segurança do Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Regras para autenticação de usuários
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Regras para animais (leitura pública, escrita apenas para autenticados)
    match /animais/{animalId} {
      allow read: if true; // Leitura pública para que visitantes vejam os animais
      allow write: if request.auth != null; // Escrita apenas para usuários autenticados
    }
    
    // Regras para eventos (leitura pública, escrita apenas para autenticados)
    match /eventos/{eventoId} {
      allow read: if true; // Leitura pública
      allow write: if request.auth != null; // Escrita apenas para usuários autenticados
    }
    
    // Regras para estatísticas (leitura pública, escrita apenas para autenticados)
    match /estatisticas/{estatisticaId} {
      allow read: if true; // Leitura pública
      allow write: if request.auth != null; // Escrita apenas para usuários autenticados
    }
    
    // NOVA: Regras para colaboradores (leitura pública, escrita apenas para autenticados)
    match /colaboradores/{colaboradorId} {
      allow read: if true; // Leitura pública para que visitantes vejam os colaboradores
      allow write: if request.auth != null; // Escrita apenas para usuários autenticados
    }
    
    // Regras para solicitações de adoção
    match /solicitacoes/{solicitacaoId} {
      allow read, write: if request.auth != null;
    }
    
    // Qualquer outra coleção requer autenticação
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Explicação das Regras:

- **Leitura Pública**: Animais, eventos, estatísticas e colaboradores podem ser lidos por qualquer pessoa (para que visitantes vejam o site)
- **Escrita Autenticada**: Apenas usuários autenticados podem adicionar/editar/excluir dados
- **Proteção de Usuários**: Cada usuário só pode acessar seus próprios dados pessoais
- **Solicitações**: Apenas usuários autenticados podem criar/ver solicitações

## Após Aplicar as Regras:

As funcionalidades do site funcionarão da seguinte forma:
- ✅ Visitantes podem ver animais, eventos, estatísticas e colaboradores
- ✅ Usuários logados podem gerenciar conteúdo
- ✅ Administradores podem adicionar/editar/excluir colaboradores
- ✅ Sistema de segurança mantido

## Teste das Regras:

Após aplicar, teste:
1. Acesse o site sem estar logado - deve ver colaboradores
2. Faça login como admin
3. Tente adicionar um colaborador - deve funcionar
4. Teste edição e exclusão de colaboradores

## Alternativa Temporária (APENAS PARA DESENVOLVIMENTO):

Se você quiser permitir acesso total temporariamente (NÃO recomendado para produção):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ IMPORTANTE: Use a alternativa temporária apenas durante o desenvolvimento. Para produção, use sempre as regras de segurança adequadas!**

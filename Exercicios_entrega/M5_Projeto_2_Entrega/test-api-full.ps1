# Script completo de testes - Todos os endpoints da API
Write-Host "===== SUITE COMPLETA DE TESTES API ClickUp =====" -ForegroundColor Magenta
Write-Host "Testando: Users, Comments, Tags" -ForegroundColor Gray
Write-Host ""

$testsTotal = 0
$testsPassed = 0
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# ==================== SEÇÃO 1: TAREFAS ====================
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║           1. TESTES DE TAREFAS         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# TEST 1: GET /tasks
Write-Host "TEST 1: GET /tasks" -ForegroundColor Yellow
$testsTotal++
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/tasks" -Method GET
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    $tasks = $response.Content | ConvertFrom-Json
    Write-Host "  Tarefas: $($tasks.Count)" -ForegroundColor Cyan
    $testsPassed++
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# TEST 2: GET /tasks/stats
Write-Host "TEST 2: GET /tasks/stats" -ForegroundColor Yellow
$testsTotal++
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/tasks/stats" -Method GET
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    $stats = $response.Content | ConvertFrom-Json
    Write-Host "  Total: $($stats.totalTasks) | Concluídas: $($stats.completedTasks)" -ForegroundColor Cyan
    $testsPassed++
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# ==================== SEÇÃO 2: UTILIZADORES ====================
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        2. TESTES DE UTILIZADORES       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# TEST 3: GET /users
Write-Host "TEST 3: GET /users" -ForegroundColor Yellow
$testsTotal++
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/users" -Method GET
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    $users = $response.Content | ConvertFrom-Json
    Write-Host "  Utilizadores: $($users.Count)" -ForegroundColor Cyan
    $testsPassed++
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# TEST 4: GET /users/stats
Write-Host "TEST 4: GET /users/stats" -ForegroundColor Yellow
$testsTotal++
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/users/stats" -Method GET
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    $stats = $response.Content | ConvertFrom-Json
    Write-Host "  Total: $($stats.totalUsers) | Ativos: $($stats.activeUsers) | Taxa: $($stats.activePercentage)" -ForegroundColor Cyan
    $testsPassed++
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# TEST 5: POST /users (Criar novo utilizador)
Write-Host "TEST 5: POST /users (Criar Utilizador)" -ForegroundColor Yellow
$testsTotal++
try {
    $body = @{
        nome = "Teste User $((Get-Random))"
        email = "teste$(Get-Random)@test.com"
        telefone = "987654321"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3000/users" `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $body `
        -ErrorAction Stop
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    $user = $response.Content | ConvertFrom-Json
    Write-Host "  ID: $($user.id)" -ForegroundColor Cyan
    $testsPassed++
    $newUserId = $user.id
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# TEST 6: PUT /users/:id (Atualizar utilizador)
Write-Host "TEST 6: PUT /users/:id (Atualizar Utilizador)" -ForegroundColor Yellow
$testsTotal++
if ($null -ne $newUserId) {
    try {
        $body = @{
            nome = "Utilizador Atualizado"
            email = "atualizado@test.com"
        } | ConvertTo-Json
        
        $response = Invoke-WebRequest -Uri "http://localhost:3000/users/$newUserId" `
            -Method PUT `
            -Headers @{"Content-Type"="application/json"} `
            -Body $body `
            -ErrorAction Stop
        Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
        $testsPassed++
    } catch {
        Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⊘ Pulado (usuário não foi criado)" -ForegroundColor Gray
}

Write-Host ""

# TEST 7: PATCH /users/:id (Toggle Active)
Write-Host "TEST 7: PATCH /users/:id (Toggle Active)" -ForegroundColor Yellow
$testsTotal++
if ($null -ne $newUserId) {
    try {
        $body = @{
            activo = 1
        } | ConvertTo-Json
        
        $response = Invoke-WebRequest -Uri "http://localhost:3000/users/$newUserId" `
            -Method PATCH `
            -Headers @{"Content-Type"="application/json"} `
            -Body $body `
            -ErrorAction Stop
        Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
        $testsPassed++
    } catch {
        Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⊘ Pulado (usuário não foi criado)" -ForegroundColor Gray
}

Write-Host ""

# ==================== SEÇÃO 3: COMENTARIOS E TAGS ====================
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   3. TESTES DE COMENTÁRIOS E TAGS      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# TEST 8: GET /tasks/:id/comments
Write-Host "TEST 8: GET /tasks/:id/comments" -ForegroundColor Yellow
$testsTotal++
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/tasks/1/comments" -Method GET
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    $comments = $response.Content | ConvertFrom-Json
    Write-Host "  Comentários: $($comments.Count)" -ForegroundColor Cyan
    $testsPassed++
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# TEST 9: POST /tasks/:id/comments
Write-Host "TEST 9: POST /tasks/:id/comments" -ForegroundColor Yellow
$testsTotal++
try {
    $body = @{
        userId = 1
        content = "Comentário de teste $($timestamp)"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3000/tasks/2/comments" `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $body `
        -ErrorAction Stop
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    $comment = $response.Content | ConvertFrom-Json
    Write-Host "  ID: $($comment.id)" -ForegroundColor Cyan
    $testsPassed++
    $commentId = $comment.id
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# TEST 10: DELETE /tasks/:id/comments/:commentId
Write-Host "TEST 10: DELETE /tasks/:id/comments/:commentId" -ForegroundColor Yellow
$testsTotal++
if ($null -ne $commentId) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000/tasks/2/comments/$commentId" `
            -Method DELETE `
            -ErrorAction Stop
        Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
        $testsPassed++
    } catch {
        Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⊘ Pulado (comentário não foi criado)" -ForegroundColor Gray
}

Write-Host ""

# TEST 11: PATCH /tasks/:id/comments/:commentId (Marcar como resolvido)
Write-Host "TEST 11: PATCH /tasks/:id/comments/:commentId (Marcar como resolvido)" -ForegroundColor Yellow
$testsTotal++
try {
    # Primeiro cria um comentário
    $body = @{
        userId = 1
        content = "Comentário para teste de resolução $($timestamp)"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3000/tasks/3/comments" `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $body `
        -ErrorAction Stop
    
    $commentForResolve = $response.Content | ConvertFrom-Json
    
    # Agora marca como resolvido usando PATCH
    $bodyResolve = @{
        resolved = $true
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3000/tasks/3/comments/$($commentForResolve.id)" `
        -Method PATCH `
        -Headers @{"Content-Type"="application/json"} `
        -Body $bodyResolve `
        -ErrorAction Stop
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "  Comentário marcado como resolvido" -ForegroundColor Cyan
    $testsPassed++
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# TEST 12: POST /tasks/:id/tags (Adicionar Tag)
Write-Host "TEST 12: POST /tasks/:id/tags (Adicionar Tag)" -ForegroundColor Yellow
$testsTotal++
try {
    # Criar uma nova tag e depois associá-la para garantir sucesso
    $tagBody = @{
        nome = "Tag Teste Associação $((Get-Random))"
    } | ConvertTo-Json
    
    $tagResponse = Invoke-WebRequest -Uri "http://localhost:3000/tags" `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $tagBody `
        -ErrorAction Stop
    
    $newTag = $tagResponse.Content | ConvertFrom-Json
    
    # Agora associa a tag à tarefa
    $body = @{
        tagId = $newTag.id
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3000/tasks/5/tags" `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $body `
        -ErrorAction Stop
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "  Tag ID: $($newTag.id) associada à tarefa 5" -ForegroundColor Cyan
    $testsPassed++
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# TEST 13: GET /tasks/:id/tags
Write-Host "TEST 13: GET /tasks/:id/tags" -ForegroundColor Yellow
$testsTotal++
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/tasks/3/tags" -Method GET
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    $tags = $response.Content | ConvertFrom-Json
    Write-Host "  Tags: $($tags.Count)" -ForegroundColor Cyan
    $testsPassed++
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# TEST 14: DELETE /tasks/:id/tags/:tagId (Remover Tag)
Write-Host "TEST 14: DELETE /tasks/:id/tags/:tagId (Remover Tag)" -ForegroundColor Yellow
$testsTotal++
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/tasks/5/tags/1" `
        -Method DELETE `
        -ErrorAction Stop
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "  Tag removida com sucesso" -ForegroundColor Cyan
    $testsPassed++
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# TEST 15: GET /tags
Write-Host "TEST 15: GET /tags" -ForegroundColor Yellow
$testsTotal++
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/tags" -Method GET
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    $tags = $response.Content | ConvertFrom-Json
    Write-Host "  Total Tags: $($tags.Count)" -ForegroundColor Cyan
    $testsPassed++
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# TEST 16: POST /tags (Criar Tag)
Write-Host "TEST 16: POST /tags (Criar Tag)" -ForegroundColor Yellow
$testsTotal++
try {
    $body = @{
        nome = "Tag Teste $((Get-Random))"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3000/tags" `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $body `
        -ErrorAction Stop
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    $tag = $response.Content | ConvertFrom-Json
    Write-Host "  ID: $($tag.id)" -ForegroundColor Cyan
    $testsPassed++
    $newTagId = $tag.id
} catch {
    Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# TEST 17: DELETE /tags/:id (Remover Tag)
Write-Host "TEST 17: DELETE /tags/:id (Remover Tag)" -ForegroundColor Yellow
$testsTotal++
if ($null -ne $newTagId) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000/tags/$newTagId" `
            -Method DELETE `
            -ErrorAction Stop
        Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "  Tag deletada com sucesso" -ForegroundColor Cyan
        $testsPassed++
    } catch {
        Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⊘ Pulado (tag não foi criada)" -ForegroundColor Gray
}

Write-Host ""

# ==================== RESUMO FINAL ====================
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║          RESUMO FINAL DOS TESTES       ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Magenta
Write-Host ""
Write-Host "Total de Testes: $testsTotal" -ForegroundColor White
Write-Host "Testes Passados: $testsPassed / $testsTotal" -ForegroundColor Green

$percentual = if ($testsTotal -gt 0) { [math]::Round(($testsPassed / $testsTotal) * 100, 1) } else { 0 }
Write-Host "Taxa de Sucesso: $percentual%" -ForegroundColor Cyan

if ($testsPassed -eq $testsTotal) {
    Write-Host "`n🎉 TODOS OS TESTES PASSARAM! 🎉" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  $($testsTotal - $testsPassed) teste(s) falharam" -ForegroundColor Yellow
    Write-Host "Taxa de Sucesso: $percentual%" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Timestamp: $timestamp" -ForegroundColor Gray
Write-Host ""

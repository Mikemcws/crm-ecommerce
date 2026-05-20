// ===== RENDERIZAR TAREFAS =====
function renderizarTarefas() {
  const todasTarefas = getTarefas()
  const filtroAtivo = document.querySelector('.filtro-btn.active').dataset.filtro
  const hoje = new Date().toISOString().split('T')[0]

  let tarefas = todasTarefas

  if (filtroAtivo === 'pendentes') {
    tarefas = todasTarefas.filter(t => !t.concluida)
  } else if (filtroAtivo === 'concluidas') {
    tarefas = todasTarefas.filter(t => t.concluida)
  } else if (filtroAtivo === 'atrasadas') {
    tarefas = todasTarefas.filter(t => !t.concluida && t.prazo < hoje)
  }

  const container = document.getElementById('lista-tarefas')

  if (tarefas.length === 0) {
    container.innerHTML = '<p class="vazio">Nenhuma tarefa encontrada.</p>'
    return
  }

  container.innerHTML = tarefas.map(tarefa => {
    const atrasada = !tarefa.concluida && tarefa.prazo < hoje
    const prazoFormatado = tarefa.prazo
      ? new Date(tarefa.prazo + 'T00:00:00').toLocaleDateString('pt-BR')
      : 'Sem prazo'

    return `
      <div class="tarefa-item ${tarefa.concluida ? 'concluida' : ''} ${atrasada ? 'atrasada' : ''}">
        <button class="tarefa-check" onclick="marcarTarefa(${tarefa.id})">
          ${tarefa.concluida ? '✅' : '⬜'}
        </button>
        <div class="tarefa-info">
          <span class="tarefa-titulo">${tarefa.titulo}</span>
          <div class="tarefa-meta">
            <span class="tarefa-prazo ${atrasada ? 'prazo-atrasado' : ''}">
              📅 ${prazoFormatado} ${atrasada ? '— Atrasada!' : ''}
            </span>
            <span class="tarefa-prioridade prioridade-${tarefa.prioridade.toLowerCase()}">
              ${tarefa.prioridade}
            </span>
          </div>
        </div>
        <button class="tarefa-excluir" onclick="confirmarExcluirTarefa(${tarefa.id})">🗑️</button>
      </div>
    `
  }).join('')
}

// ===== AÇÕES =====
function marcarTarefa(id) {
  toggleTarefa(id)
  renderizarTarefas()
}

function confirmarExcluirTarefa(id) {
  if (confirm('Excluir esta tarefa?')) {
    excluirTarefa(id)
    renderizarTarefas()
  }
}

// ===== MODAL =====
function abrirModalTarefa() {
  document.getElementById('modal-tarefa').classList.remove('hidden')
}

function fecharModalTarefa() {
  document.getElementById('modal-tarefa').classList.add('hidden')
  document.getElementById('tarefa-titulo').value = ''
  document.getElementById('tarefa-prazo').value = ''
  document.getElementById('tarefa-prioridade').value = 'Alta'
}

document.getElementById('btn-salvar-tarefa').addEventListener('click', function() {
  const titulo = document.getElementById('tarefa-titulo').value.trim()
  const prazo = document.getElementById('tarefa-prazo').value
  const prioridade = document.getElementById('tarefa-prioridade').value

  if (!titulo) {
    alert('O título é obrigatório.')
    return
  }

  adicionarTarefa({ titulo, prazo, prioridade })
  fecharModalTarefa()
  renderizarTarefas()
})

// ===== EVENTOS =====
document.getElementById('btn-nova-tarefa').addEventListener('click', abrirModalTarefa)
document.getElementById('btn-fechar-modal-tarefa').addEventListener('click', fecharModalTarefa)
document.getElementById('btn-cancelar-tarefa').addEventListener('click', fecharModalTarefa)

document.querySelectorAll('.filtro-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'))
    this.classList.add('active')
    renderizarTarefas()
  })
})

document.getElementById('btn-logout').addEventListener('click', function() {
  localStorage.removeItem('logado')
  window.location.href = 'index.html'
})

// Inicia
verificarLogin()
renderizarTarefas()
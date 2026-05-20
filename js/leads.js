const colunas = ['Novo', 'Contatado', 'Negociando', 'Convertido', 'Perdido']
let dragandoId = null

// ===== RENDERIZAR KANBAN =====
function renderizarKanban() {
  const leads = getLeads()

  colunas.forEach(status => {
    const coluna = document.getElementById(`col-${status.toLowerCase()}`)
    const contador = document.getElementById(`count-${status.toLowerCase()}`)
    const leadsColuna = leads.filter(l => l.status === status)

    contador.textContent = leadsColuna.length

    if (leadsColuna.length === 0) {
      coluna.innerHTML = '<p class="kanban-vazio">Nenhum lead</p>'
    } else {
      coluna.innerHTML = leadsColuna.map(lead => `
        <div class="kanban-card" draggable="true" data-id="${lead.id}">
          <div class="kanban-card-header">
            <span class="kanban-card-nome">${lead.nome}</span>
            <button class="kanban-card-excluir" onclick="confirmarExcluirLead(${lead.id})">🗑️</button>
          </div>
          <p class="kanban-card-email">${lead.email}</p>
          <span class="kanban-card-origem">${lead.origem}</span>
        </div>
      `).join('')
    }

    // Eventos de drag nas colunas
    coluna.addEventListener('dragover', function(e) {
      e.preventDefault()
      coluna.classList.add('dragover')
    })

    coluna.addEventListener('dragleave', function() {
      coluna.classList.remove('dragover')
    })

    coluna.addEventListener('drop', function() {
      coluna.classList.remove('dragover')
      if (dragandoId) {
        atualizarStatusLead(dragandoId, status)
        dragandoId = null
        renderizarKanban()
      }
    })
  })

  // Eventos de drag nos cards
  document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', function() {
      dragandoId = Number(this.dataset.id)
      this.classList.add('dragging')
    })

    card.addEventListener('dragend', function() {
      this.classList.remove('dragging')
    })
  })
}

// ===== EXCLUIR =====
function confirmarExcluirLead(id) {
  if (confirm('Excluir este lead?')) {
    excluirLead(id)
    renderizarKanban()
  }
}

// ===== MODAL =====
function abrirModalLead() {
  document.getElementById('modal-lead').classList.remove('hidden')
}

function fecharModalLead() {
  document.getElementById('modal-lead').classList.add('hidden')
  document.getElementById('lead-nome').value = ''
  document.getElementById('lead-email').value = ''
}

document.getElementById('btn-salvar-lead').addEventListener('click', function() {
  const nome = document.getElementById('lead-nome').value.trim()
  const email = document.getElementById('lead-email').value.trim()
  const origem = document.getElementById('lead-origem').value

  if (!nome || !email) {
    alert('Nome e e-mail são obrigatórios.')
    return
  }

  adicionarLead({ nome, email, origem, status: 'Novo' })
  fecharModalLead()
  renderizarKanban()
})

// ===== EVENTOS =====
document.getElementById('btn-novo-lead').addEventListener('click', abrirModalLead)
document.getElementById('btn-fechar-modal-lead').addEventListener('click', fecharModalLead)
document.getElementById('btn-cancelar-lead').addEventListener('click', fecharModalLead)

document.getElementById('btn-logout').addEventListener('click', function() {
  localStorage.removeItem('logado')
  window.location.href = 'index.html'
})

// Inicia
verificarLogin()
renderizarKanban()
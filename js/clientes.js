// ID do cliente sendo editado (null = novo cadastro)
let editandoId = null

// ===== RENDERIZAR CLIENTES =====
function renderizarClientes(lista) {
  const container = document.getElementById('lista-clientes')

  if (lista.length === 0) {
    container.innerHTML = '<p class="vazio">Nenhum cliente encontrado.</p>'
    return
  }

  container.innerHTML = lista.map(cliente => `
    <div class="cliente-card">
      <div class="cliente-avatar">${cliente.nome.charAt(0).toUpperCase()}</div>
      <div class="cliente-info">
        <h3>${cliente.nome}</h3>
        <p>${cliente.email}</p>
        <p>${cliente.telefone}</p>
      </div>
      <span class="tag tag-${cliente.tag.toLowerCase()}">${cliente.tag}</span>
      <div class="cliente-acoes">
        <button onclick="abrirEditar(${cliente.id})">✏️</button>
        <button onclick="confirmarExcluir(${cliente.id})">🗑️</button>
      </div>
    </div>
  `).join('')
}

// ===== FILTRO E BUSCA =====
function aplicarFiltros() {
  let clientes = getClientes()

  // Filtro por tag
  const tagAtiva = document.querySelector('.filtro-btn.active').dataset.tag
  if (tagAtiva !== 'todos') {
    clientes = clientes.filter(c => c.tag === tagAtiva)
  }

  // Filtro por busca
  const busca = document.getElementById('busca').value.toLowerCase()
  if (busca) {
    clientes = clientes.filter(c => c.nome.toLowerCase().includes(busca))
  }

  renderizarClientes(clientes)
}

// ===== MODAL =====
function abrirModal() {
  document.getElementById('modal').classList.remove('hidden')
}

function fecharModal() {
  document.getElementById('modal').classList.add('hidden')
  limparModal()
  editandoId = null
}

function limparModal() {
  document.getElementById('campo-nome').value = ''
  document.getElementById('campo-email').value = ''
  document.getElementById('campo-telefone').value = ''
  document.getElementById('campo-tag').value = 'Lead'
  document.getElementById('modal-titulo').textContent = 'Novo Cliente'
}

function abrirEditar(id) {
  const cliente = getClientes().find(c => c.id === id)
  editandoId = id

  document.getElementById('campo-nome').value = cliente.nome
  document.getElementById('campo-email').value = cliente.email
  document.getElementById('campo-telefone').value = cliente.telefone
  document.getElementById('campo-tag').value = cliente.tag
  document.getElementById('modal-titulo').textContent = 'Editar Cliente'

  abrirModal()
}

function confirmarExcluir(id) {
  if (confirm('Tem certeza que deseja excluir este cliente?')) {
    excluirCliente(id)
    aplicarFiltros()
  }
}

// ===== SALVAR =====
document.getElementById('btn-salvar').addEventListener('click', function () {
  const nome = document.getElementById('campo-nome').value.trim()
  const email = document.getElementById('campo-email').value.trim()
  const telefone = document.getElementById('campo-telefone').value.trim()
  const tag = document.getElementById('campo-tag').value

  if (!nome || !email) {
    alert('Nome e e-mail são obrigatórios.')
    return
  }

  if (editandoId) {
    atualizarCliente(editandoId, { nome, email, telefone, tag })
  } else {
    adicionarCliente({ nome, email, telefone, tag })
  }

  fecharModal()
  aplicarFiltros()
})

// ===== EVENTOS =====
document.getElementById('btn-novo-cliente').addEventListener('click', abrirModal)
document.getElementById('btn-fechar-modal').addEventListener('click', fecharModal)
document.getElementById('btn-cancelar').addEventListener('click', fecharModal)
document.getElementById('busca').addEventListener('input', aplicarFiltros)

document.querySelectorAll('.filtro-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'))
    this.classList.add('active')
    aplicarFiltros()
  })
})

document.getElementById('btn-logout').addEventListener('click', function () {
  localStorage.removeItem('logado')
  window.location.href = 'index.html'
})

// Inicia
verificarLogin()
aplicarFiltros()
// ===== CLIENTES =====

function getClientes() {
  return JSON.parse(localStorage.getItem('clientes')) || []
}

function salvarClientes(clientes) {
  localStorage.setItem('clientes', JSON.stringify(clientes))
}

function adicionarCliente(cliente) {
  const clientes = getClientes()
  cliente.id = Date.now() // ID único baseado no tempo
  clientes.push(cliente)
  salvarClientes(clientes)
}

function excluirCliente(id) {
  const clientes = getClientes().filter(c => c.id !== id)
  salvarClientes(clientes)
}

function atualizarCliente(id, dadosNovos) {
  const clientes = getClientes().map(c => c.id === id ? { ...c, ...dadosNovos } : c)
  salvarClientes(clientes)
}

// ===== LEADS =====

function getLeads() {
  return JSON.parse(localStorage.getItem('leads')) || []
}

function salvarLeads(leads) {
  localStorage.setItem('leads', JSON.stringify(leads))
}

function adicionarLead(lead) {
  const leads = getLeads()
  lead.id = Date.now()
  leads.push(lead)
  salvarLeads(leads)
}

function excluirLead(id) {
  const leads = getLeads().filter(l => l.id !== id)
  salvarLeads(leads)
}

function atualizarStatusLead(id, novoStatus) {
  const leads = getLeads().map(l => l.id === id ? { ...l, status: novoStatus } : l)
  salvarLeads(leads)
}
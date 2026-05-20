// Usuário fixo por enquanto (simula um banco de dados)
const USUARIO = {
  email: 'admin@crm.com',
  senha: '123456'
}

// Pega os elementos da tela
const btnLogin = document.getElementById('btn-login')
const erroLogin = document.getElementById('erro-login')

// Escuta o clique no botão
btnLogin.addEventListener('click', function() {
  const email = document.getElementById('email').value.trim()
  const senha = document.getElementById('senha').value.trim()

  // Validação básica
  if (!email || !senha) {
    erroLogin.textContent = 'Preencha todos os campos.'
    return
  }

  // Verifica as credenciais
  if (email === USUARIO.email && senha === USUARIO.senha) {
    localStorage.setItem('logado', 'true')
    window.location.href = 'dashboard.html'
  } else {
    erroLogin.textContent = 'E-mail ou senha incorretos.'
  }
})
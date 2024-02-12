const localStorageKey = 'user_list'

function newTask() {
  const taskText = document.getElementById("imput-new-task")
  taskText.style.border = "none"


  // Validação

  // Se a entrada estiver vazia
  if (!taskText.value) {
    taskText.style.border = "1px solid red"
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Insira uma tarefa para continuar!'
    })

  }
  // Verifica se a task inserida já existe
  else if (validator()){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Já você já adicionou essa tarefa!'
    })
    taskText.value = ''
  }
  // Confirmando o processo e Cadastrando as tarefas no JSON
  else
  // Utilizando LocalStorage
  {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    // Insere a tarefa no arquivo JSON
    values.push({
      name: taskText.value
    })
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    taskText.value = ''
    showTasks()
  }
}

// Exibe na interface as tarefas já cadastradas
function showTasks() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let list = document.getElementById('to-do-list')
  list.innerHTML = ''

  // Lê cada item do JSON gerado e imprime os valores contidos
  for (let i = 0; i < values.length; i++) {
    // Gera uma barra para cada tarefa cadastrada no JSON
    list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' title='Remover tarefa' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`
  }
}

// Ao clicar no botão "check" (botão verde), a task será eliminada do JSON e da interface
function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showTasks()
}

function validator(params) {
  let values     = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  const taskInput = document.getElementById("imput-new-task").value
  let exist      = values.find(x => x.name == taskInput)
  return !exist ? false : true
}

  showTasks()
function showSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}

const abas = document.querySelectorAll('.aba-categoria')
const secaoFitness = document.querySelector('.secao-cartoes.fitness')
const secaoReceitas = document.querySelector('.secao-cartoes.receitas')

abas.forEach(aba => {
    aba.addEventListener('click', () => {
        abas.forEach(a => a.classList.remove('ativa'))
        aba.classList.add('ativa')

        const categoriaSelecionada = aba.dataset.categoria

        if (categoriaSelecionada === 'fitness') {
            secaoFitness.classList.remove('hidden')
            secaoReceitas.classList.add('hidden')
        } else {
            secaoReceitas.classList.remove('hidden')
            secaoFitness.classList.add('hidden')
        }
    })
})
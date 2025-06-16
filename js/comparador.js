function showSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}

const selectAnimal = document.getElementById('select-animal');
const selectVegetal = document.getElementById('select-vegetal');
const imgAnimal = document.getElementById('img-animal');
const imgVegetal = document.getElementById('img-vegetal');
const btnComparar = document.getElementById('btn-comparar');
const resultado = document.getElementById('resultado');
const infoAnimal = document.getElementById('info-animal');
const infoVegetal = document.getElementById('info-vegetal');
const analise = document.getElementById('analise-comparativa');

const imagens = {
    frango: 'img/comparador/frango.jpg',
    carne: 'img/comparador/carne.jpg',
    ovo: 'img/comparador/ovo.jpg',
    leite: 'img/comparador/leite.jpg',
    tofu: 'img/comparador/tofu.jpg',
    lentilha: 'img/comparador/lentilha.jpg',
    grao_de_bico: 'img/comparador/grao-de-bico.jpg',
    soja: 'img/comparador/soja.jpg',
    leite_soja: 'img/comparador/leite-soja.jpg',
    seitan: 'img/comparador/seitan.jpg'
};

const traducoes = {
    frango: 'grilled chicken breast',
    carne: 'beef',
    ovo: 'egg',
    leite: '1 cup milk',
    tofu: 'tofu',
    lentilha: 'lentils',
    grao_de_bico: 'chickpeas',
    soja: '40g textured vegetable protein',
    leite_soja: '1 cup soy milk',
    seitan: 'seitan'
};

const nomesExibicao = {
    frango: 'Frango 100g',
    carne: 'Carne vermelha 100g',
    ovo: 'Aprox. 2 ovos',
    leite: 'Leite 200ml',
    tofu: 'Tofu 100g',
    lentilha: 'Lentilha 100g',
    grao_de_bico: 'Grão-de-bico 100g',
    soja: 'PTS desidratada 40g',
    leite_soja: 'Leite de soja 200ml',
    seitan: 'Seitan 100g'
};

selectAnimal.addEventListener('change', () => {
    const valor = selectAnimal.value;
    imgAnimal.src = imagens[valor];
    imgAnimal.alt = nomesExibicao[valor] || valor;
});

selectVegetal.addEventListener('change', () => {
    const valor = selectVegetal.value;
    imgVegetal.src = imagens[valor];
    imgVegetal.alt = nomesExibicao[valor] || valor;
});

btnComparar.addEventListener('click', async () => {
    const alimentoAnimal = selectAnimal.value;
    const alimentoVegetal = selectVegetal.value;

    const [dadosAnimal, dadosVegetal] = await Promise.all([
        buscarInfo(alimentoAnimal),
        buscarInfo(alimentoVegetal)
    ]);

    exibirResultado(dadosAnimal, dadosVegetal);
});

async function buscarInfo(nome) {
    const KEY = "vKZZIp8dkxVmI/npFDNy3g==IeNdSivKEeTUdDQh";
    const termoAPI = traducoes[nome] || nome;
    try {
        const res = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(termoAPI)}`, {
            headers: { "X-Api-Key": KEY }
        });
        const data = await res.json();
        if (!data.items?.length) throw "Não encontrado";
        const it = data.items[0];
        return {
            nome: nomesExibicao[nome] || nome,
            calorias: it.calories,
            proteina: it.protein_g + 'g',
            gordura: it.fat_total_g + 'g',
            carboidratos: it.carbohydrates_total_g + 'g'
        };
    } catch (e) {
        return {
            nome: nomesExibicao[nome] || nome,
            calorias: 'N/D',
            proteina: 'N/D',
            gordura: 'N/D',
            carboidratos: 'N/D'
        };
    }
}

function exibirResultado(animal, vegetal) {
    resultado.classList.remove('hidden');

    infoAnimal.innerHTML = `
    <h3>${animal.nome}</h3>
    <p>Calorias: ${animal.calorias}</p>
    <p>Proteína: ${animal.proteina}</p>
    <p>Gordura: ${animal.gordura}</p>
    <p>Carboidratos: ${animal.carboidratos}</p>
  `;

    infoVegetal.innerHTML = `
    <h3>${vegetal.nome}</h3>
    <p>Calorias: ${vegetal.calorias}</p>
    <p>Proteína: ${vegetal.proteina}</p>
    <p>Gordura: ${vegetal.gordura}</p>
    <p>Carboidratos: ${vegetal.carboidratos}</p>
  `;

    analise.innerHTML = `
    <p>Optar por alimentos de origem vegetal traz benefícios à saúde e ao meio ambiente, reduzindo o risco de desenvolver câncer e outras doenças crônicas. No entanto, pode exigir atenção a nutrientes como cálcio, zinco e vitamina B12.</p>
  `;
}

// CONFIGURAÇÃO: substitua pelos contatos reais antes de publicar.
const CONFIG = {
    whatsapp: '554797008349',
    email: 'naportaa@gmail.com'
}; // WhatsApp: DDI + DDD + número, apenas dígitos (ex.: 5548999999999)
function feedback(title, description, type = 'error') {
    const old = document.getElementById('site-feedback');
    if (old) old.remove();
    const el = document.createElement('section');
    el.id = 'site-feedback';
    el.className = 'site-feedback ' + type;
    el.setAttribute('role', type === 'error' ? 'alert' : 'status');
    const h = document.createElement('h2');
    h.textContent = title;
    const d = document.createElement('p');
    d.textContent = description;
    el.append(h, d);
    const main = document.querySelector('main');
    (main || document.querySelector('#app') || document.body).prepend(el);
    el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function errorPage() {
    return `<main class="page site-error-page"><div class="site-error-content"><span class="site-error-cookie" aria-hidden="true">🍪</span><h1>Ops! Parece que algo saiu do forno antes da hora.</h1><p>Tivemos um pequeno imprevisto por aqui. Que tal tentar novamente? Se precisar, nossa equipe está pronta para ajudar! 🤎</p><div class="site-error-actions"><a class="btn" href="#/">Voltar ao início</a><a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener noreferrer">Falar com a NAPORTA ➜</a></div></div></main>`
}

function whats(text) {
    if (!/^\d{12,13}$/.test(CONFIG.whatsapp)) {
        feedback('Ops! Não conseguimos abrir o WhatsApp.', 'Tente novamente em instantes ou envie um e-mail para ' + CONFIG.email + '.');
        return;
    }
    window.open('https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
}

function emailTo(subject, body) {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(CONFIG.email)) {
        feedback('Ops! Não conseguimos abrir o e-mail.', 'Você pode falar com a gente pelo WhatsApp.');
        return;
    }
    window.location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}
const asset = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
const photos = {
    hero: asset('photo-1499636136210-6f4ee915583e'),
    cookie: asset('photo-1499636136210-6f4ee915583e'),
    chocolate: asset('photo-1598373182133-52452f7691ef'),
    gift: 'assets/presente-rustico-floral.png',
    event: 'assets/eventos-naporta.png',
    catering: 'assets/combos-e-promocoes-catering.png',
    shop: 'assets/equipe-naporta-cafe.png'
};
const items = [{
        id: 'beijinho',
        name: 'Cookie Beijinho',
        price: 12,
        img: photos.cookie,
        desc: 'Cookie Beijinho, preparado artesanalmente com carinho. Consulte a equipe para confirmar ingredientes e alergênicos.'
    },
    {
        id: 'brigadeirao',
        name: 'Cookie Brigadeirão',
        price: 12,
        img: photos.chocolate,
        desc: 'Cookie Brigadeirão, uma opção especial para quem ama chocolate. Consulte a equipe para confirmar ingredientes e alergênicos.'
    },
    {
        id: 'tradicional',
        name: 'Cookie Tradicional',
        price: 6,
        img: photos.cookie,
        desc: 'Nosso Cookie Tradicional, preparado artesanalmente para acompanhar bons momentos. Consulte a equipe para confirmar ingredientes e alergênicos.'
    },
    {
        id: 'cacau',
        name: 'Cookie Cacau',
        price: 6,
        img: photos.chocolate,
        desc: 'Cookie Cacau, com sabor marcante de chocolate. Consulte a equipe para confirmar ingredientes e alergênicos.'
    }
];
// Produtos 5 a 12 do cardápio. Fotos ilustrativas até o envio das imagens oficiais.
const novosSabores = [
    ['Cookie Red Velvet', 15, 'Cookie Red Velvet artesanal, com sabor inspirado no clássico red velvet.'],
    ['Cookie Kinder Bueno', 18, 'Cookie Kinder Bueno, uma combinação especial para quem gosta de chocolate.'],
    ['Cookie Ovomaltine', 15, 'Cookie Ovomaltine, com sabor de chocolate e um toque crocante.'],
    ["Cookie MM's", 18, "Um pouquinho de cor, muito chocolate e carinho em cada mordida! Nosso Cookie de M&M's combina uma massa artesanal deliciosa com pedacinhos coloridos de chocolate, trazendo uma mistura irresistível de sabores e texturas."],
    ["Cookie S'more", 18, "Cookie S'more, inspirado na combinação de chocolate e marshmallow."],
    ['Cookie Bolo de Cenoura', 15, 'Sabe aquele bolinho de cenoura com chocolate que tem gostinho de carinho e lembra os momentos mais gostosos de casa? Agora imagine essa delícia em forma de cookie! Nosso Cookie de Bolo de Cenoura combina uma massa artesanal com um pedacinho fofinho de bolo de cenoura no meio e uma generosa cobertura de chocolate por cima.'],
    ['Duo da Felicidade', 50, 'Nosso Duo da Felicidade combina o sabor aconchegante do cookie artesanal com a doçura irresistível do chocolate. Cada pedacinho é metade cookie, metade chocolate e inteirinho feito para adoçar o seu dia.'],
    ['Biscoitos Amanteigados no Pote', 100, 'Tem sabores que fazem a gente se sentir em casa! Nossos biscoitos amanteigados são preparados com carinho, têm um sabor delicado e uma textura que derrete na boca. Perfeitos para acompanhar um cafezinho, compartilhar uma conversa gostosa ou aproveitar um momento só seu. Em um potinho cheio de afeto, são também uma forma delicada de presentear e demonstrar carinho. Porque os pequenos gestos também podem guardar grandes sentimentos.']
];
novosSabores.forEach(([name, price, desc], i) => items.push({
    id: 'novo-' + (i + 5),
    name,
    price,
    img: i === 5 ? 'assets/cookie-bolo-de-cenoura.png' : i === 7 ? 'assets/pote-amanteigado.png' : i === 6 ? 'assets/duo-da-felicidade.png' : i === 3 ? 'assets/cookie-mms.png' : [photos.cookie, photos.chocolate, photos.cookie, photos.chocolate, photos.cookie, photos.cookie, photos.gift, photos.gift][i],
    desc: (i === 7 || i === 6 || i === 5) ? desc : desc + ' Imagem ilustrativa; consulte a equipe para detalhes da composição.',
    available: true,
    placeholder: false
}));
const services = [{
    id: 'brindes',
    title: 'Afeto para Presentear',
    img: photos.gift,
    short: 'Transforme carinho em presente. Personalize detalhes e surpreenda alguém especial com um mimo cheio de afeto.',
    body: 'Presentes personalizados para empresas, com embalagens especiais e opções de quantidade.'
}, {
    id: 'eventos',
    title: 'Um mimo',
    img: photos.event,
    short: 'Pequenos mimos, grandes sorrisos. Descubra nossos brindes preparados com carinho para você.',
    body: 'Biscoitos para festas, encontros e celebrações, com opções de apresentação personalizadas.'
}, {
    id: 'catering',
    title: 'Afeto Triplo',
    img: photos.catering,
    short: 'Monte a mesa perfeita com nossos biscoitos clássicos, pães e delícias caseiras.',
    body: 'Que tal um carinho a mais? Descubra nossos combos e promoções especiais.'
}];
const store = {
    get() {
        try {
            return localStorage.getItem('naporta-cart')
        } catch (e) {
            return null
        }
    },
    set(v) {
        try {
            localStorage.setItem('naporta-cart', v)
        } catch (e) {}
    }
};
// Lê o carrinho salvo e descarta dados corrompidos, produtos que não existem mais, sem preço ou com quantidade inválida.
const loadCart = () => {
    try {
        const raw = JSON.parse(store.get() || '[]');
        if (!Array.isArray(raw)) return [];
        const sum = {};
        raw.forEach(c => {
            const x = c && items.find(i => i.id === c.id),
                q = Math.floor(Number(c && c.qty));
            if (x && q > 0) sum[x.id] = Math.min(99, (sum[x.id] || 0) + q)
        });
        return Object.keys(sum).map(id => ({
            id,
            qty: sum[id]
        }))
    } catch (e) {
        return []
    }
};
let cart = loadCart();
const money = n => n.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});
const save = () => store.set(JSON.stringify(cart));
const count = () => cart.reduce((s, x) => s + x.qty, 0);
const app = document.getElementById('app');

function header() {
    return `<header class="header"><a class="logo" href="#/"><img class="brand-door-image" src="assets/logo-porta-oficial.png" alt=""><img class="brand-wordmark-image" src="assets/logo-nome-oficial.png" alt="NAPORTA — Culinária com Afeto"></a><nav><a href="#/">Início</a><a href="#/cardapio">Cardápio</a><a href="#/sobre">Sobre</a><a href="#/contato">Contato</a></nav><div class="icons"><a class="cart-floral-link" title="Carrinho" aria-label="Carrinho" href="#/carrinho"><img class="cart-floral-icon" src="assets/icone-carrinho-flores.png" alt="" aria-hidden="true"> <small class="cart-floral-count" aria-label="${count()} produtos no carrinho">${count()}</small></a></div></header>`
}

function footer() {
    return `<div class="footer-wrap"><footer class="footer footer-new">
<div class="footer-links"><h4>Explore</h4><a href="#/cardapio">Cardápio</a><a href="#/sobre">Nossa história</a><a href="#/contato">Contato</a></div>
<div class="footer-center"><div class="footer-logo"><img class="footer-brand-image" src="assets/logo-porta-oficial.png" alt=""><span>NAPORTA</span><small>CULINÁRIA COM AFETO</small></div><h2>Tem coisa boa na porta. <em>Feita com afeto.</em></h2>
<a class="footer-whatsapp-link" href="https://wa.me/${CONFIG.whatsapp}?text=Ol%C3%A1%2C%20NAPORTA%21%20Gostaria%20de%20falar%20com%20voc%C3%AAs." target="_blank" rel="noopener noreferrer">Conversar pelo WhatsApp</a>
<div class="footer-social" aria-label="Redes sociais e contatos"><a href="https://www.instagram.com/com.afeto.nphortos?obrf=eXQ3ejJodHZjd3Bq" target="_blank" rel="noopener noreferrer" aria-label="Instagram da NAPORTA" title="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" class="dot"/></svg></a><a href="mailto:${CONFIG.email}" aria-label="Enviar e-mail à NAPORTA" title="E-mail"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg></a><a href="https://www.linkedin.com/company/115848926/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da NAPORTA" title="LinkedIn da NAPORTA"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="2"/><path d="M7 10v7M7 7v.2M11 17v-7M11 13c0-2 5-3.3 5 1v3"/></svg></a></div></div>
<div class="footer-links footer-right"><h4>Podemos ajudar?</h4><a href="#/faq">Perguntas frequentes</a><a href="#/envio">Envios e entregas</a><a href="#/contato">Encomendas especiais</a></div>
</footer><div class="footer-legal"><span>© ${new Date().getFullYear()} NAPORTA · Culinária com Afeto</span><nav aria-label="Informações legais"><a href="#/termos">Termos de uso</a><a href="#/privacidade">Política de privacidade</a><a href="#/envio">Informações de envio</a></nav></div></div>`
}

function productCard(x) {
    return `<article class="product"><a href="#/produto/${x.id}"><img src="${x.img}" alt="${x.name}" loading="lazy"><h3>${x.name === "Biscoitos Amanteigados no Pote" ? "Biscoitos Amanteigados" : x.name}</h3></a><div class="product-card-actions"><a class="product-view" href="#/produto/${x.id}">Ver informações ➜</a>${`<button type="button" data-add="${x.id}">Adicionar ao carrinho · ${x.placeholder?"Preço a definir":money(x.price)}</button>`}</div></article>`
}

function home() {
    return `<section class="hero"><div class="hero-content"><h1>Biscoitos grandes, com ingredientes reais e muito afeto.</h1><p>Receitas caseiras, feitas diariamente na nossa cozinha, com ingredientes selecionados e o sabor que transforma o dia.</p><a class="btn" href="#/cardapio">Conheça o cardápio ➜</a></div></section><section class="perks perks-three" aria-label="Nossos diferenciais"><div class="perk"><b aria-hidden="true">✦</b><span>Produtos selecionados</span></div><div class="perk"><b class="perk-flower" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 12C11 3 6 8 10 14C1 11 1 20 10 20C6 27 13 30 16 22C19 30 26 27 22 20C31 20 31 11 22 14C26 8 21 3 16 12Z"/><circle cx="16" cy="17" r="2.7"/></svg></b><span>Produção artesanal</span></div><div class="perk"><b aria-hidden="true">♡</b><span>Com afeto</span></div></section><section class="section home-featured"><div class="heading home-featured-heading"><div class="home-featured-heading-text"><h2>Os favoritos</h2><p>Uma seleção especial dos sabores mais vendidos para você conhecer.</p></div><a class="home-featured-link" href="#/cardapio">Ver cardápio completo</a></div><div class="products">${items.slice(0,4).map(productCard).join('')}</div></section><section class="section"><h2>Cookies para todas as ocasiões</h2><div class="services">${services.map(x=>`<article class="service"><a href="#/servico/${x.id}"><img src="${x.img}" alt="${x.title}"></a><div class="inner"><h3>${x.title}</h3><p>${x.short}</p><a class="textlink" href="#/servico/${x.id}">Saiba mais ➜</a></div></article>`).join('')}</div></section><section class="about about-home-feature"><img src="assets/espaco-trabalho-com-afeto.png" alt="Notebook com a identidade NAPORTA em um ambiente acolhedor"><div class="inner"><h2>Uma porta aberta para bons momentos.</h2><p>A NAPORTA nasceu do desejo de transformar a rotina em momentos mais doces e significativos. Aqui, cada receita é preparada com ingredientes de verdade, técnicas artesanais e muito carinho, criando sabores que aproximam pessoas e tornam o dia a dia mais especial.</p><a class="btn" href="#/sobre">Conheça a nossa história ➜</a></div></section>`
}
// Catálogos demonstrativos independentes por serviço; edite os dados quando o catálogo oficial estiver disponível.
const catalogExamples = {
    brindes: [
        ['Cookie individual personalizado', 'Opção ilustrativa de lembrança com embalagem individual.'],
        ['Caixa presente com cookies', 'Sugestão de seleção artesanal para presentear.'],
        ['Kit de boas-vindas', 'Ideia de presente para integrar equipes.'],
        ['Lembrança para clientes', 'Proposta de mimo em ações de relacionamento.'],
        ['Mini seleção de cookies', 'Sugestão de variedade em embalagem compacta.'],
        ['Caixa comemorativa', 'Ideia para datas especiais da empresa.'],
        ['Cookie com cartão', 'Sugestão de presente acompanhado de mensagem.'],
        ['Kit para reuniões', 'Seleção ilustrativa para encontros de equipe.'],
        ['Presente de agradecimento', 'Proposta de lembrança para parceiros.'],
        ['Box corporativa', 'Sugestão de conjunto para ocasiões especiais.']
    ],
    eventos: [
        ['Cookie para lembrancinha', 'Sugestão de doce embalado individualmente.'],
        ['Mini cookies para mesa', 'Opção ilustrativa para servir em eventos.'],
        ['Caixa para convidados', 'Proposta de lembrança para convidados.'],
        ['Seleção de sabores', 'Sugestão de variedade para compartilhar.'],
        ['Cookie de celebração', 'Ideia de doce para datas comemorativas.'],
        ['Kit de recepção', 'Seleção ilustrativa para receber convidados.'],
        ['Porções individuais', 'Sugestão de apresentação prática.'],
        ['Caixa para anfitriões', 'Ideia de presente para quem organiza.'],
        ['Mesa de biscoitos', 'Proposta de composição artesanal para o evento.'],
        ['Lembrança de despedida', 'Sugestão de mimo ao final da celebração.']
    ],
    catering: [
        ['Cookies clássicos', 'Sugestão de biscoitos artesanais para servir.'],
        ['Cookies com chocolate', 'Opção ilustrativa de cookie com gotas de chocolate.'],
        ['Mini cookies variados', 'Seleção sugerida em porções menores.'],
        ['Pães artesanais', 'Sugestão de acompanhamento para cafés.'],
        ['Bolo caseiro', 'Opção ilustrativa para mesa de café.'],
        ['Seleção para coffee break', 'Combinação sugerida para intervalos.'],
        ['Biscoitos para reuniões', 'Sugestão prática para encontros de trabalho.'],
        ['Caixa de doces', 'Proposta de seleção para compartilhar.'],
        ['Mesa de café', 'Ideia de composição com opções doces e salgadas.'],
        ['Kit individual', 'Sugestão de porção para cada participante.']
    ]
};

function serviceCatalog(x) {
    const entries = catalogExamples[x.id];
    return `<main class="page catalog-page"><a class="back" href="#/servico/${x.id}">← Voltar para ${x.title}</a><div class="catalog-intro"><span class="catalog-eyebrow">NAPORTA · CULINÁRIA COM AFETO</span><h1>Catálogo de ${x.title}</h1><p>Conheça dez ideias para compor sua encomenda. As imagens e descrições são ilustrativas; opções, personalização, quantidades e valores serão confirmados pela nossa equipe.</p></div><div class="catalog-grid">${entries.map(([name,desc],i)=>`<article class="catalog-card"><div class="catalog-photo"><img loading="lazy" src="${[photos.cookie,photos.gift,photos.chocolate,photos.catering,photos.event][i%5]}" alt="Imagem ilustrativa do item ${i+1}"><span>REFERÊNCIA VISUAL</span></div><div class="catalog-card-copy"><span class="catalog-number">${String(i+1).padStart(2,'0')} / 10</span><h2>${name}</h2><p>${desc}</p><small>Disponibilidade e valores sob consulta</small></div></article>`).join('')}</div><div class="catalog-bottom"><h2>Vamos preparar algo especial?</h2><p>Conte para a gente o que você imagina e solicite um orçamento personalizado.</p><a class="btn" href="https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Olá, NAPORTA! Vi o catálogo de '+x.title+' e gostaria de solicitar um orçamento.')}" target="_blank" rel="noopener noreferrer">Fazer orçamento pelo WhatsApp ➜</a></div></main>`
}

function contactForm(subject = 'Contato') {
    return `<form class="form" id="contact-form"><input name="nome" placeholder="Seu nome" required><input type="email" name="email" placeholder="Seu e-mail" required><input type="hidden" name="assunto" value="${subject}"><textarea name="mensagem" placeholder="Como podemos ajudar?" required></textarea><div class="contact-send-actions"><button class="btn" type="submit" data-contact-channel="whatsapp">Enviar pelo WhatsApp</button><button class="btn" type="submit" data-contact-channel="email">Enviar por e-mail</button></div><p class="contact-send-note">Escolha como prefere enviar sua mensagem. Ela será direcionada ao WhatsApp ou seu aplicativo de e-mail com o texto preenchido para você conferir e confirmar o envio.</p></form>`
}

function page(path) {
    const parts = path.split('/').filter(Boolean),
        route = parts[0] || '';

    if (!route) return home();
    if (route === 'cardapio') return `<main class="page"><h1>Nosso cardápio</h1><p>Escolha seu favorito, feito com carinho.</p><div class="products">${items.map(productCard).join('')}</div></main>`;

    if (route === 'produto') {
        const x = items.find(i => i.id === parts[1]);
        return x ? `<main class="page product-detail"><a class="back" href="#/cardapio">← Voltar ao cardápio</a><div class="product-layout"><div class="product-photo"><img src="${x.img}" alt="${x.name}"></div><div class="product-information"><h1>${x.name}</h1><p>${x.desc}</p><h3>${x.placeholder ? 'Preço a definir' : money(x.price)}</h3><button class="btn" data-add="${x.id}">Adicionar ao carrinho · ${x.placeholder ? 'Preço a definir' : money(x.price)}</button><div class="product-accordions"><details><summary>Alérgenos <span class="accordion-symbol"></span></summary><div class="accordion-body"><p>Contém trigo, leite, ovos, derivados de soja, glúten e lactose.</p></div></details>${(x.name === 'Biscoitos Amanteigados no Pote' || x.name === 'Duo da Felicidade') ? '' : `<details><summary>Cuidado com os Cookies <span class="accordion-symbol"></span></summary><div class="accordion-body"><p>Conserve em local fresco e seco. Para saborear seu cookie macio aqueça por 30 segundos no micro-ondas, se preferir uma textura mais crocante leve à air fryer por 1 minuto a 180 °C. Recomendamos consumir em até 7 dias para aproveitar todo o frescor e sabor dos ingredientes.</p></div></details>`}<details><summary>Detalhes de envio <span class="accordion-symbol"></span></summary><div class="accordion-body"><p>Oferecemos retirada e entrega sob encomenda para Sombrio, Araranguá, Blumenau e cidades próximas, mediante agendamento. Ao finalizar seu carrinho, você será direcionado ao nosso WhatsApp, onde confirmaremos a disponibilidade, os prazos e as taxas de entrega, cuidando de cada detalhe do seu pedido com carinho e atenção.</p></div></details></div></div></div><section class="packaging-section packaging-section-compact" aria-labelledby="packaging-title"><div class="packaging-copy"><span class="packaging-eyebrow">FEITO PARA PRESENTEAR</span><h2 id="packaging-title">Perfeitamente assado, cuidadosamente embalado.</h2><p>Do forno até a sua porta, cada pedido é preparado com carinho. Nossos cookies são acomodados com cuidado para preservar o sabor e tornar cada entrega um momento especial.</p><div class="packaging-benefits" aria-label="Diferenciais do presente"><span><b aria-hidden="true">♧</b> Embalagens especiais</span><span><b aria-hidden="true">♡</b> Mensagem personalizada</span><span><b aria-hidden="true">✿</b> Feito para cada ocasião</span></div><button type="button" class="packaging-cta" data-whatsapp="Olá! Gostaria de conhecer as opções de embalagem para presente da NAPORTA.">Conhecer embalagens ➜</button></div><div class="packaging-visual"><img src="${photos.gift}" alt="Referência ilustrativa de embalagem para presente"><span>Imagem ilustrativa • opções sujeitas à disponibilidade</span></div></section></main>` : notfound();
    }

    if (route === 'catalogo') {
        const x = services.find(s => s.id === parts[1]);
        return x ? serviceCatalog(x) : notfound();
    }

    if (route === 'servico') {
        const x = services.find(s => s.id === parts[1]);
        return x ? `<main class="page about service-detail"><div class="service-detail-photo"><img src="${x.img}" alt="${x.title}"></div><div class="inner"><h1>${x.title}</h1><p>${x.body}</p><div class="service-detail-actions"><a class="btn" href="#/catalogo/${x.id}">Ver catálogo ➜</a><a class="btn" href="https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Olá, NAPORTA! Gostaria de solicitar um orçamento para ' + x.title + '.') }" target="_blank" rel="noopener noreferrer">Fazer orçamento ➜</a></div></div></main>` : notfound();
    }

    if (route === 'sobre') return `<main class="page about-page"><div class="about-intro"><span class="about-eyebrow">NAPORTA · CULINÁRIA COM AFETO</span><h1>Nossa essência está em cada detalhe</h1><p>Com carinho do começo ao fim.</p></div><div class="about-story-grid about-story-alternating"><article class="about-story-card"><div class="about-story-photo"><img src="${photos.shop}" alt="Fotografia ilustrativa do espaço e da história da NAPORTA" loading="lazy"></div><div class="about-story-copy"><span>Sobre nós</span><h2>Uma porta aberta para o afeto</h2><p>A Naporta nasceu de um sonho e ganhou ainda mais carinho com a presença da minha irmã. Entre nós, o amor, o cuidado e a parceria fazem parte de cada detalhe. Juntas colocamos um pouquinho do que somos em tudo o que fazemos, com o desejo de compartilhar esse mesmo afeto com você.</p></div></article><article class="about-story-card"><div class="about-story-photo"><img src="assets/cozinha-nosso-cuidado.png" alt="Cozinha artesanal aconchegante com flores, prateleiras de madeira e utensílios" loading="lazy"></div><div class="about-story-copy"><span>Nosso cuidado</span><h2>Feito com carinho, do início ao fim</h2><p>Valorizamos o preparo artesanal e os pequenos detalhes. Cada receita é uma oportunidade de compartilhar sabores, criar memórias e levar um pouco de afeto à sua mesa.</p></div></article></div><div class="about-outro"><p>Receitas que acolhem, histórias que ficam.</p><a class="btn" href="#/contato">Fale com a gente ➜</a></div></main>`;
    if (route === 'contato') return `<main class="page contact-page"><div class="contact-layout"><section class="contact-content"><h1>Fale com a gente:</h1><p>Pedidos especiais, eventos e dúvidas: envie uma mensagem.</p>${contactForm()}</section><aside class="contact-photo" aria-label="Fotografia da NAPORTA"><img src="assets/contato-naporta-celular.png" alt="Pessoa com avental NAPORTA segurando um celular com a marca" loading="lazy"></aside></div></main>`;

    if (route === 'carrinho') {
        const validCart = cart.filter(c => c && items.some(i => i.id === c.id) && Number.isFinite(c.qty) && c.qty > 0);
        const total = validCart.reduce((sum, c) => sum + c.qty * items.find(i => i.id === c.id).price, 0);
        const pending = validCart.some(c => items.find(i => i.id === c.id).placeholder);

        return `<main class="page"><h1>Seu carrinho</h1>${validCart.length ? `${validCart.map(c => {
            const x = items.find(i => i.id === c.id);
            return `<div class="cartitem"><span>${x.name} — ${x.placeholder ? 'Preço a definir' : money(x.price)} × ${c.qty}</span><span><button type="button" class="cart-quantity-action" data-minus="${c.id}" aria-label="Diminuir quantidade de ${x.name}">−</button> <button type="button" class="cart-quantity-action" data-add="${c.id}" aria-label="Aumentar quantidade de ${x.name}">+</button> <button type="button" class="cart-remove-action" data-remove="${c.id}" aria-label="Remover ${x.name} do carrinho">Remover</button></span></div>`;
        }).join('')}<h3>${pending ? 'Subtotal dos produtos com preço definido:' : 'Total:'} ${money(total)}</h3>${pending ? '<p>Produtos com preço a definir não estão incluídos no subtotal. A equipe confirmará os valores antes do fechamento.</p>' : ''}<button type="button" class="btn" id="checkout">Finalizar pedido pelo WhatsApp ➜</button><p>Pagamento, frete e disponibilidade serão confirmados pela loja.</p>` : '<div class="empty">Seu carrinho está vazio. <a href="#/cardapio">Explorar cardápio ➜</a></div>'}</main>`;
    }

    if (route === 'faq') return `<main class="page"><h1>Perguntas frequentes</h1><h3>Como faço um pedido?</h3><p>Adicione produtos ao carrinho e envie a solicitação à loja.</p><h3>Vocês fazem encomendas para eventos?</h3><p>Sim! Solicite um orçamento pelo formulário de contato.</p><h3>Quais formas de pagamento são aceitas?</h3><p>Confirme as opções disponíveis diretamente com a equipe.</p></main>`;
    if (route === 'envio') return `<main class="page"><h1>Envio e retirada</h1><p>As regiões atendidas, prazos, valores de frete e disponibilidade de entrega no mesmo dia precisam ser confirmados com a equipe antes do pagamento.</p></main>`;
    if (route === 'lojas') return `<main class="page"><h1>Nossas padarias</h1><p>Entre em contato para consultar endereços, horários e disponibilidade de retirada.</p><a class="btn" href="#/contato">Fale conosco ➜</a></main>`;
    if (route === 'equipe') return `<main class="page"><h1>Nossa equipe</h1><p>Por trás de cada receita há pessoas dedicadas a criar experiências especiais.</p><a class="btn" href="#/contato">Conheça a NAPORTA ➜</a></main>`;
    if (route === 'termos') return `<main class="page legal"><h1>Termos de uso</h1><p><strong>Última revisão:</strong> 22/10/2026 · Minuta para revisão antes da publicação.</p><h2>1. Sobre o site</h2><p>O site da NAPORTA apresenta produtos, serviços e permite preparar solicitações de compra enviadas pelo WhatsApp. O envio da mensagem não constitui confirmação automática de pedido.</p><h2>2. Produtos e valores</h2><p>Preços, sabores, estoque, disponibilidade, embalagens e prazos podem variar. A equipe confirma os dados, incluindo frete, antes do fechamento.</p><h2>3. Pedidos</h2><p>Ao finalizar o carrinho, o visitante é direcionado ao WhatsApp para enviar sua solicitação. A contratação depende da confirmação expressa da NAPORTA e das condições acordadas.</p><h2>4. Conteúdo</h2><p>Imagens podem ser ilustrativas. Informações sobre alergênicos devem ser confirmadas antes do consumo.</p><h2>5. Contato</h2><p>Dúvidas: <a href="mailto:${CONFIG.email}">${CONFIG.email}</a> ou <a href="https://wa.me/${CONFIG.whatsapp}">WhatsApp</a>.</p></main>`;
    if (route === 'privacidade') return `<main class="page legal"><h1>Política de privacidade</h1><p><strong>Última revisão:</strong> 22/10/2026 · Minuta sujeita à revisão conforme a LGPD.</p><h2>Dados tratados</h2><p>O carrinho é armazenado localmente no navegador. Quando você usa os botões de WhatsApp ou e-mail, os dados e mensagens que optar por enviar serão tratados pelos respectivos serviços e pela NAPORTA para atendimento e pedidos.</p><h2>Finalidades</h2><p>Atender solicitações, responder dúvidas e organizar pedidos enviados voluntariamente. Não há cadastro de cliente nem newsletter neste site.</p><h2>Compartilhamento</h2><p>O site utiliza imagens externas e fontes hospedadas por terceiros; esses provedores podem receber dados técnicos de acesso. WhatsApp e provedor de e-mail têm suas próprias políticas.</p><h2>Seus direitos</h2><p>Você pode solicitar informações, correção ou exclusão de dados pessoais tratados pela NAPORTA, quando aplicável, por <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>.</p><h2>Responsável</h2><p>NAPORTA — informações jurídicas da pessoa responsável pelo tratamento devem ser preenchidas antes da publicação.</p></main>`;
    if (route === 'doacoes') return `<main class="page"><h1>Programa de doações</h1><p>Esta campanha ilustrativa ainda não está ativa. Consulte a loja sobre ações sociais e promoções vigentes.</p><a class="btn" href="#/contato">Consultar ➜</a></main>`;

    return notfound();
}

function notfound() {
    return errorPage();
}

        function render(keepScroll) {
            try {
                app.innerHTML = `<div class="shell">${header()}${page(decodeURI(location.hash.slice(1)||'/'))}${footer()}</div>`
            } catch (err) {
                console.error('Erro ao renderizar a página:', err);
                app.innerHTML = `<div class="shell">${header()}${errorPage()}${footer()}</div>`
            }
            if (!keepScroll) window.scrollTo(0, 0)
        }
        window.addEventListener('hashchange', () => render());
        render();
        document.addEventListener('click', e => {
            let add = e.target.closest('[data-add]'),
                minus = e.target.closest('[data-minus]'),
                remove = e.target.closest('[data-remove]');
            if (add) {
                let id = add.dataset.add,
                    x = cart.find(c => c.id === id);
                x ? x.qty = Math.min(99, x.qty + 1) : cart.push({
                    id,
                    qty: 1
                });
                save();
                const inCart = location.hash.startsWith('#/carrinho');
                render(inCart);
                if (!inCart) feedback('Que delícia! Seu cookie está no carrinho.', 'Continue escolhendo seus favoritos ou confira seu pedido no carrinho.', 'success')
            }
            if (minus) {
                let x = cart.find(c => c.id === minus.dataset.minus);
                if (x) {
                    x.qty--;
                    cart = cart.filter(c => c.qty > 0);
                    save();
                    render(true)
                }
            }
            if (remove) {
                cart = cart.filter(c => c.id !== remove.dataset.remove);
                save();
                render(true)
            }
            if (e.target.closest('#checkout') && cart.length) {
                const total = cart.reduce((sum, c) => {
                    const item = items.find(i => i.id === c.id);
                    return sum + (item ? c.qty * item.price : 0)
                }, 0);
                const msg = 'Olá, NAPORTA! Gostaria de fazer este pedido:\n\n' + cart.map(c => {
                    const x = items.find(i => i.id === c.id);
                    return `${c.qty}x ${x.name} — ${x.placeholder?"Preço a definir":money(x.price*c.qty)}`
                }).join('\n') + '\n\nSubtotal dos itens com preço definido: ' + money(total) + '\n\nGostaria de confirmar disponibilidade, entrega/retirada e pagamento. Obrigado!';
                whats(msg);
            }
            const wa = e.target.closest('[data-whatsapp]');
            if (wa) whats(wa.dataset.whatsapp);
            const mail = e.target.closest('[data-email]');
            if (mail) emailTo('Contato NAPORTA', 'Olá, NAPORTA!');
        });
        document.addEventListener('submit', e => {
            if (e.target.id === 'footer-whatsapp-form') {
                e.preventDefault();
                const message = e.target.elements.mensagem.value.trim();
                if (message) whats('Olá, NAPORTA! ' + message);
                return;
            }
            if (e.target.id === 'contact-form') {
                e.preventDefault();
                let f = new FormData(e.target),
                    body = `Nome: ${f.get('nome')}\nE-mail para resposta: ${f.get('email')}\nAssunto: ${f.get('assunto')}\n\n${f.get('mensagem')}`;
                let channel = e.submitter?.dataset.contactChannel || 'whatsapp';
                if (channel === 'email') emailTo(f.get('assunto'), body);
                else whats('Olá, NAPORTA!\n' + body)
            }
        });
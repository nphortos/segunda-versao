(() => {
    const WA = 'https://wa.me/' + (typeof CONFIG !== 'undefined' ? CONFIG.whatsapp : '554797008349');
    const root = document.createElement('div');
    root.className = 'afeto-chat';
    root.innerHTML = `<button class="afeto-launch" type="button" aria-label="Abrir atendimento virtual" aria-expanded="false"><img src="assets/mascote-chat.webp" alt="Rottweiler da NAPORTA com um cookie" /><span class="afeto-launch-label">Posso ajudar?</span></button><section class="afeto-panel" aria-label="Assistente virtual Afeto" hidden><header class="afeto-head"><div><strong>♡ Afeto | NAPORTA</strong><small>Assistente virtual · respostas automáticas</small></div><button class="afeto-close" aria-label="Fechar chat">×</button></header><div class="afeto-messages" aria-live="polite"><p class="afeto-bot">Olá! Que bom ter você por aqui! 🤎 Como posso ajudar?</p></div><form class="afeto-form"><input aria-label="Digite sua pergunta" placeholder="Digite sua pergunta..." maxlength="300" required/><button aria-label="Enviar pergunta" type="submit">➜</button></form><small class="afeto-disclaimer">Atendimento automático. Informações específicas devem ser confirmadas com a equipe.</small></section>`;
    document.body.append(root);
    const panel = root.querySelector('.afeto-panel'),
        launch = root.querySelector('.afeto-launch'),
        messages = root.querySelector('.afeto-messages');

    function toggle(open) {
        panel.hidden = !open;
        launch.setAttribute('aria-expanded', String(open));
        if (open) root.querySelector('input').focus()
    }
    launch.addEventListener('click', () => toggle(panel.hidden));
    root.querySelector('.afeto-close').addEventListener('click', () => toggle(false));
    const answers = {
        carrinho: ['Seu carrinho está no ícone de cestinha no topo. Lá você confere e altera os itens.', 'Abrir carrinho', '#/carrinho'],
        finalizar: ['Abra seu carrinho e clique em Finalizar pedido pelo WhatsApp. A equipe confirmará valores, disponibilidade e entrega.', 'Finalizar pedido', '#/carrinho'],
        endereco: ['Informe bairro e cidade à nossa equipe para consultar a entrega no seu endereço.', 'Consultar endereço', WA + '?text=' + encodeURIComponent('Olá! Gostaria de consultar entrega no meu endereço.')],
        maisvendido: ['Os mais vendidos podem variar. Nossa equipe pode informar o sabor mais pedido atualmente.', 'Perguntar à equipe', WA + '?text=' + encodeURIComponent('Olá! Qual é o cookie mais vendido?')],
        sabores: ['Você pode conhecer nossos cookies no cardápio e adicioná-los ao carrinho.', 'Ver cardápio', '#/cardapio'],
        entrega: ['As opções de retirada, regiões atendidas, taxas e horários são confirmadas pela equipe no WhatsApp.', 'Consultar entrega', WA + '?text=' + encodeURIComponent('Olá! Gostaria de consultar entrega ou retirada.')],
        encomenda: ['Para presentes, eventos e encomendas especiais, conte o que você imagina à nossa equipe.', 'Solicitar orçamento', WA + '?text=' + encodeURIComponent('Olá! Gostaria de fazer uma encomenda especial.')],
        alergenos: ['Os ingredientes e possíveis alergênicos variam por produto. Antes de consumir, confirme diretamente com a equipe se há glúten, leite, ovos, castanhas ou risco de contaminação cruzada.', 'Consultar ingredientes', WA + '?text=' + encodeURIComponent('Olá! Gostaria de consultar ingredientes e alergênicos.')],
        conservacao: ['Para preservar os cookies, mantenha-os bem fechados em local fresco e seco. O prazo de validade e as orientações específicas devem ser confirmados para cada produto.', 'Perguntar sobre conservação', WA + '?text=' + encodeURIComponent('Olá! Gostaria de orientações de conservação dos cookies.')],
        contato: ['Você pode conversar com a NAPORTA pelo WhatsApp ou enviar um e-mail para ' + (typeof CONFIG !== 'undefined' ? CONFIG.email : 'naportaa@gmail.com') + '.', 'Abrir WhatsApp', WA]
    };

    function reply(topic, question) {
        if (question) {
            const p = document.createElement('p');
            p.className = 'afeto-user';
            p.textContent = question;
            messages.append(p)
        }
        const [answer, label, url] = answers[topic] || ['Ainda não tenho essa resposta, mas nossa equipe pode ajudar você pelo WhatsApp.', 'Perguntar à equipe', WA + '?text=' + encodeURIComponent('Olá, NAPORTA! Preciso de ajuda com: ' + (question || 'uma dúvida sobre o site'))];
        const p = document.createElement('p');
        p.className = 'afeto-bot';
        p.textContent = answer;
        const a = document.createElement('a');
        a.href = url;
        a.textContent = label + ' →';
        if (url.startsWith('https:')) {
            a.target = '_blank';
            a.rel = 'noopener noreferrer'
        }
        p.append(document.createElement('br'), a);
        messages.append(p);
        messages.scrollTop = messages.scrollHeight
    }
    root.querySelectorAll('[data-topic]').forEach(b => b.addEventListener('click', () => reply(b.dataset.topic)));
    root.querySelector('.afeto-form').addEventListener('submit', e => {
        e.preventDefault();
        const input = e.currentTarget.querySelector('input'),
            q = input.value.trim();
        if (!q) return;
        input.value = '';
        const s = q.toLowerCase();
        let topic = /finalizar|fechar pedido|concluir compra|checkout/.test(s) ? 'finalizar' : /carrinho|cestinha|minha cesta|meu pedido/.test(s) ? 'carrinho' : /endere[cç]o|cep|bairro|minha rua|onde entrega/.test(s) ? 'endereco' : /mais vendido|mais pedido|mais popular|favorito do pessoal/.test(s) ? 'maisvendido' : /al[eé]rg|gl[uú]ten|lactose|ingrediente|castanha/.test(s) ? 'alergenos' : /entrega|frete|retirada|motoboy|envio/.test(s) ? 'entrega' : /encomenda|presente|evento|corporativo|festa/.test(s) ? 'encomenda' : /guardar|conserv|validade|aquecer/.test(s) ? 'conservacao' : /cookie|sabor|card[aá]pio|pre[cç]o/.test(s) ? 'sabores' : /whatsapp|email|e-mail|contato|atendente/.test(s) ? 'contato' : null;
        reply(topic, q)
    });
})();
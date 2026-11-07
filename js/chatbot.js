(() => {
    const WA = 'https://wa.me/' + (typeof CONFIG !== 'undefined' ? CONFIG.whatsapp : '5547997008349');
    const root = document.createElement('div');
    root.className = 'afeto-chat';
    root.innerHTML = `<button class="afeto-launch" type="button" aria-label="Abrir atendimento virtual" aria-expanded="false"><img src="/assets/mascote-chat.webp" alt="Rottweiler da NAPORTA com um cookie" /><span class="afeto-launch-label">Posso ajudar?</span></button><section class="afeto-panel" aria-label="Assistente virtual Afeto" hidden><header class="afeto-head"><div><strong>♡ Afeto | NAPORTA</strong><small>Assistente virtual · respostas automáticas</small></div><button class="afeto-close" aria-label="Fechar chat">×</button></header><div class="afeto-messages" aria-live="polite"><p class="afeto-bot">Olá! Que bom ter você por aqui! 🤎 Como posso ajudar?</p></div><div class="afeto-options" role="group" aria-label="Assuntos para ajudar"><button type="button" data-topic="finalizar">Fazer pedido</button><button type="button" data-topic="entrega">Entrega e retirada</button><button type="button" data-topic="pagamento">Pagamento</button><button type="button" data-topic="conservacao">Cuidados com os doces</button><button type="button" data-topic="contato">Falar com a equipe</button><button type="button" data-topic="faq">Mais perguntas</button></div><form class="afeto-form"><input aria-label="Digite sua pergunta" placeholder="Digite sua pergunta..." maxlength="300" required/><button aria-label="Enviar pergunta" type="submit">➜</button></form></section>`;
    document.body.append(root);
    const panel = root.querySelector('.afeto-panel'),
        launch = root.querySelector('.afeto-launch'),
        messages = root.querySelector('.afeto-messages');

    function toggle(open) {
        panel.hidden = !open;
        launch.setAttribute('aria-expanded', String(open));
        const target = open ? root.querySelector('input') : launch;
        target.focus({ preventScroll: true });
    }
    launch.addEventListener('click', () => toggle(panel.hidden));
    root.querySelector('.afeto-close').addEventListener('click', () => toggle(false));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !panel.hidden) {
            e.preventDefault();
            toggle(false);
        }
    });
    const askTeam = message => WA + '?text=' + encodeURIComponent('Olá, NAPORTA! ' + message);
    const answers = {
        carrinho: ['A cestinha no topo do site guarda seus favoritos. Por lá, você confere as quantidades e envia sua escolha pelo WhatsApp.', 'Abrir carrinho', '/carrinho'],
        finalizar: ['Escolha seus doces e envie o carrinho pelo WhatsApp. Confirmamos os itens, o total e a entrega antes do pagamento. O Pix de 50% confirma a encomenda; os outros 50% são pagos na entrega.', 'Escolher meus doces', '/cardapio'],
        status: ['A confirmação do seu pedido é enviada pela equipe no WhatsApp após o recebimento do Pix de 50%. Não consigo consultar pedidos ou pagamentos por aqui, mas a equipe verifica para você.', 'Consultar meu pedido', askTeam('Gostaria de verificar a confirmação e o andamento do meu pedido.')],
        pagamento: ['Nossa chave Pix é o celular ' + (typeof CONFIG !== 'undefined' && CONFIG.pixKey ? CONFIG.pixKey : '47997008349') + '. O pagamento é dividido em 50% para confirmar sua encomenda e 50% na entrega. Combine o valor total com a equipe antes de pagar.', 'Combinar pagamento', askTeam('Gostaria de combinar o pagamento da minha encomenda.')],
        minimo: ['Não há quantidade nem valor mínimo. Escolha o carinho que combina com seu momento!', 'Ver cardápio', '/cardapio'],
        antecedencia: ['Em Sombrio, encomende os cardápios especiais com pelo menos 15 dias de antecedência. Nossos quatro sabores fixos podem ser retirados no mesmo dia. Para Blumenau, consulte as datas no orçamento.', 'Combinar minha encomenda', askTeam('Gostaria de consultar o prazo para uma encomenda especial.')],
        mesmodia: ['Nossos quatro sabores fixos podem ser retirados no mesmo dia! Combine o horário pelo WhatsApp antes de buscar. Para cardápios especiais e entregas, consulte a disponibilidade.', 'Combinar retirada hoje', askTeam('Gostaria de retirar sabores fixos no mesmo dia. Podemos combinar o horário?')],
        retirada: ['A retirada é gratuita no IFC Campus Sombrio, das 19h às 22h, com agendamento. Combinamos o ponto de encontro pelo WhatsApp.', 'Agendar retirada', askTeam('Gostaria de agendar uma retirada no IFC Campus Sombrio.')],
        sombrio: ['Em Sombrio, a entrega em domicílio custa R$ 10,00, em data e horário combinados. Se preferir outro ponto de encontro, confirme as condições pelo WhatsApp.', 'Combinar entrega', askTeam('Gostaria de combinar uma entrega em Sombrio.')],
        blumenau: ['Entregamos em Blumenau conforme disponibilidade. As datas e o valor da entrega são confirmados no orçamento, antes de fechar sua encomenda.', 'Consultar Blumenau', askTeam('Gostaria de consultar datas e valor de entrega em Blumenau.')],
        entrega: ['Em Sombrio, a retirada no IFC é gratuita e a entrega em domicílio custa R$ 10,00. Para Blumenau, consulte datas e valores. O local e o horário são sempre combinados com você.', 'Ver entregas e retiradas', '/envio'],
        terceiro: ['Outra pessoa pode receber ou retirar seu pedido. Basta avisar pelo WhatsApp quem ficará responsável, para combinarmos tudo com cuidado.', 'Avisar a equipe', askTeam('Outra pessoa vai receber ou retirar meu pedido. Gostaria de informar os detalhes.')],
        reagendar: ['Avise pelo WhatsApp se surgir um imprevisto. Para retirada, combinamos outro horário. Se a entrega precisar ser refeita por uma mudança solicitada por você, haverá uma nova taxa, informada no reagendamento.', 'Reagendar meu pedido', askTeam('Preciso reagendar a entrega ou retirada do meu pedido.')],
        encomenda: ['Preparamos presentes e encomendas para encontros, empresas e celebrações. Conte sua ideia para combinarmos os doces, a apresentação e os prazos.', 'Solicitar orçamento', askTeam('Gostaria de conversar sobre uma encomenda especial.')],
        presente: ['Podemos entregar seu carinho diretamente para a pessoa presenteada, desde que o endereço esteja na nossa área de cobertura. Combine o local, a data e os detalhes pelo WhatsApp.', 'Combinar um presente', askTeam('Gostaria de enviar um presente diretamente para outra pessoa.')],
        caixa: ['Pode misturar sabores, sim! Consulte pelo WhatsApp os sabores e as embalagens disponíveis para montar uma caixa cheia de afeto.', 'Montar minha caixa', askTeam('Gostaria de montar uma caixa com sabores diferentes. Quais sabores e embalagens estão disponíveis?')],
        cartao: ['Seu presente pode levar suas palavras também! Podemos escrever o cartão para você ou entregá-lo em branco. Combine sua preferência pelo WhatsApp.', 'Combinar meu cartão', askTeam('Gostaria de incluir um cartão no meu presente.')],
        horarios: ['Atendemos todos os dias, das 11h às 18h. A retirada no IFC é agendada das 19h às 22h. Entregas em outros horários podem ser combinadas conforme disponibilidade.', 'Falar com a equipe', WA],
        alergenos: [typeof allergenDescription !== 'undefined' ? allergenDescription : 'Contém trigo, leite, ovos, derivados de soja, glúten e lactose. Não indicado para pessoas alérgicas devido ao risco de contaminação cruzada.', 'Consultar ingredientes', askTeam('Gostaria de conferir os ingredientes e alergênicos de um produto.')],
        conservacao: ['Confira a validade e os cuidados específicos do seu produto com a equipe. O prazo considera a fabricação e não recomeça na entrega. O chocolate integrado segue a validade do produto final. Aquecer não renova a validade.', 'Consultar os cuidados', '/faq'],
        aquecer: [typeof cookieWarmingDescription !== 'undefined' ? cookieWarmingDescription : 'Retire a embalagem. Para ficar crocante, aqueça na air fryer preaquecida a 180 °C por 1 minuto; para ficar macio, use o micro-ondas por 30 segundos. Ajuste o tempo conforme o aparelho. O chocolate branco pode derreter e o marshmallow perder a textura: fotografe a decoração antes de aquecer. Aquecer não renova a validade.', 'Ver mais cuidados', '/faq'],
        congelar: ['Congele os cookies ainda dentro da validade, bem embalados, e consuma em até um mês após o congelamento, mantendo-os no freezer. Descongele na geladeira e depois aqueça como preferir. Confira os cuidados específicos do sabor escolhido.', 'Conferir os cuidados', '/faq'],
        natal: ['Nossas encomendas de Natal vão até 1º de dezembro ou enquanto durarem os estoques. A data de entrega ou retirada é combinada com a equipe. Escolha seu carinho com antecedência!', 'Ver o cardápio de Natal', '/catalogo/eventos'],
        alteracao: ['Você pode solicitar alterações em até 48 horas após o pedido. Fale com a equipe para combinar os ajustes e eventuais diferenças de valor.', 'Solicitar alteração', askTeam('Gostaria de alterar minha encomenda.')],
        cancelamento: ['Cancelamentos em até 48 horas após o pedido têm reembolso integral na hora do atendimento. Esse prazo não elimina os direitos previstos em lei. Para outras situações, a equipe avalia seu caso conforme os Termos de Uso.', 'Solicitar cancelamento', askTeam('Gostaria de solicitar o cancelamento e o reembolso da minha encomenda.')],
        problema: ['Sua satisfação é nossa prioridade. Se o pedido chegou diferente do combinado ou com algum problema, conte para a equipe pelo WhatsApp para que possamos cuidar da solução.', 'Resolver meu pedido', askTeam('Preciso de ajuda com um problema no meu pedido.')],
        avaliacao: ['Sua opinião nos ajuda a melhorar cada vez mais! Conte sua experiência no formulário de avaliação. Para resolver algum problema com o pedido, fale diretamente com a equipe pelo WhatsApp.', 'Avaliar minha experiência', typeof CONFIG !== 'undefined' && CONFIG.feedbackUrl ? CONFIG.feedbackUrl : 'https://forms.gle/PtTE7f4KT2TNKk5i9'],
        nota: ['No momento, não emitimos nota fiscal. Se precisar desse documento, fale com a equipe antes de fechar o pedido para verificar o atendimento à sua necessidade.', 'Falar sobre documentação', askTeam('Preciso de informações sobre a documentação do meu pedido.')],
        tamanho: ['O tamanho ou peso está na descrição de cada produto. Confira no cardápio e, se precisar de ajuda para escolher, fale com a equipe.', 'Conferir produtos', '/cardapio'],
        novidades: ['Acompanhe as novidades no site, no Instagram e no Status do WhatsApp. Mensagens promocionais diretas são enviadas somente se você solicitar ou autorizar. Você pode pedir para parar de receber quando quiser.', 'Conversar sobre novidades', askTeam('Gostaria de saber mais sobre as novidades da NAPORTA.')],
        maisvendido: ['Os favoritos podem variar. A equipe pode indicar os sabores mais pedidos e o que está disponível para você.', 'Pedir uma indicação', askTeam('Qual sabor vocês recomendam hoje?')],
        sabores: ['Tem sabor para adoçar seu momento! Confira nossos doces no cardápio. A disponibilidade para montar caixas e presentes é combinada pelo WhatsApp.', 'Conhecer os sabores', '/cardapio'],
        faq: ['Reunimos os detalhes sobre pedidos, presentes, entregas e cuidados com os doces nas Perguntas Frequentes.', 'Ver perguntas frequentes', '/faq'],
        contato: ['Fale com a equipe todos os dias, das 11h às 18h, pelo WhatsApp ou pelo e-mail ' + (typeof CONFIG !== 'undefined' ? CONFIG.email : 'contaporton@gmail.com') + '.', 'Abrir WhatsApp', WA]
    };

    function detectTopic(question) {
        const s = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        // Perguntas sobre um pedido real vão para a equipe; o chat não consulta pagamentos.
        if (/(?:meu pedido|minha encomenda).*(?:confirmad|pronto|esta|saiu)|onde.*(?:meu pedido|minha encomenda)|^(?:meu pedido|minha encomenda)\??$|meu pix|meu pagamento|ja paguei|paguei|rastre|andamento|status(?! do whats)|receberam.*pix/.test(s) && !/cancel|reembols|alter|mudar|trocar|problema|errad|avariad|reagend|atras|nao recebi|nao chegou|faltando|danific|estragad|nao.*(?:receber|retirar|buscar)/.test(s)) return 'status';
        const rules = [
            ['alergenos', /alerg|gluten|lactose|sem leite|sem ovo|castanha|amendoim|celiac|intoleran|contamin|ingrediente/],
            ['cancelamento', /cancel|reembols|estorn|devolu|desisti|arrepend/],
            ['problema', /reclam|problema|errad|avariad|danific|faltando|estragad|nao chegou|nao recebi|atrasou/],
            ['reagendar', /reagend|imprevist|contratempo|atrasar|nao.*(?:receber|retirar|buscar)|(?:mudar|trocar|alterar).*(?:horario|data|entrega|retirada)/],
            ['terceiro', /(?:outra pessoa|terceiro|alguem).*(?:receber|retirar|buscar)|(?:receber|retirar|buscar).*(?:outra pessoa|terceiro|alguem)/],
            ['congelar', /congel|freezer|descongel/],
            ['aquecer', /aquec|air\s*fryer|airfryer|micro.?ondas?|crocante|macio|esquent|marshmallow|chocolate branco|decoracao/],
            ['conservacao', /validade|conserv|guardar|geladeira|derret|quanto tempo.*dur|duram|dura /],
            ['avaliacao', /avali|feedback|anonim|opiniao|elogio/],
            ['nota', /nota fiscal|\bnf(?:e)?\b|documento fiscal|comprovante fiscal/],
            ['cartao', /cartao.*(?:presente|mensagem|escrev|branco)|(?:mensagem|escrev).*cartao|\bcartao\b(?!.*(?:credito|debito|paga))/],
            ['caixa', /sortid|mistur|sabores diferentes|(?:montar|personalizar).*(?:caixa|box)|(?:caixa|box).*(?:sabor|mistur)/],
            ['mesmodia', /mesmo dia|hoje|pronta.?entrega/],
            ['natal', /natal|natalin|ho\s*ho\s*ho|dezembro/],
            ['alteracao', /alter|trocar.*(?:pedido|encomenda|sabor)|mudar.*(?:pedido|encomenda|sabor)/],
            ['minimo', /minim|menor quantidade/],
            ['antecedencia', /anteced|prazo|quanto tempo.*(?:antes|prepar|encomend)/],
            ['finalizar', /como.*confirm|confirmar.*(?:pedido|encomenda)/],
            ['pagamento', /pag|pix|sinal|parcela|credito|debito|dinheiro/],
            ['presente', /entreg.*present|present.*entreg/],
            ['blumenau', /blumenau/],
            ['sombrio', /sombrio.*(?:entreg|frete|domicilio)|(?:entreg|frete|domicilio).*sombrio/],
            ['retirada', /retir|buscar|\bifc\b/],
            ['horarios', /horario|atend.*(?:hora|dia)|funciona.*(?:hora|dia)|abrem|fecham/],
            ['entrega', /entreg|frete|envio|cobertura|endereco|\bcep\b|bairro|motoboy/],
            ['presente', /presentead|presentear|presente|surpresa/],
            ['tamanho', /tamanho|peso|gramas|\d+\s*g\b|quantos.*(?:gram|pessoa)|rendimento/],
            ['novidades', /novidade|promoc|instagram|status do whats/],
            ['maisvendido', /mais vendido|mais pedido|mais popular|recomend|indicacao/],
            ['carrinho', /carrinho|cestinha|minha cesta/],
            ['finalizar', /finalizar|fechar pedido|concluir compra|checkout|como.*(?:pedir|comprar|pedido)|fazer.*pedido/],
            ['encomenda', /encomend|evento|corporativ|festa|orcamento/],
            ['sabores', /cookie|sabor|cardapio|preco|valor|bolo|biscoito/],
            ['contato', /whatsapp|email|e-mail|contato|atendente|equipe|humano/],
            ['faq', /pergunta|duvida|ajuda/]
        ];
        return rules.find(([, pattern]) => pattern.test(s))?.[0] || null;
    }

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
        reply(detectTopic(q), q)
    });
})();

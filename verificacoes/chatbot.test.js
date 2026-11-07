const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../js/chatbot.js'), 'utf8');
const context = {
    CONFIG: { whatsapp: '5547997008349', email: 'contaporton@gmail.com' },
    encodeURIComponent
};
vm.createContext(context);
const start = source.indexOf('    const askTeam =');
const end = source.indexOf('\n    function reply(', start);
vm.runInContext("const WA = 'https://wa.me/' + CONFIG.whatsapp;\n" + source.slice(start, end), context);
const topic = question => context.detectTopic(question);
const answer = key => vm.runInContext(`answers[${JSON.stringify(key)}]`, context);

test('processo de compra não é confundido com consulta de pedido real', () => {
    for (const question of ['Como faço meu pedido?', 'Como confirmo meu pedido?', 'Quero confirmar uma encomenda']) {
        assert.equal(topic(question), 'finalizar', question);
    }
    for (const question of ['Meu pedido já está confirmado?', 'Já paguei o Pix', 'Onde está minha encomenda?', 'Qual o status do meu pedido?']) {
        assert.equal(topic(question), 'status', question);
    }
    assert.match(answer('status')[0], /Não consigo consultar pedidos/);
    assert.match(answer('status')[2], /^https:\/\/wa\.me\/5547997008349\?text=/);
});

test('reconhece perguntas de atendimento e preserva prioridades específicas', () => {
    const questions = [
        ['Aceita cartão de crédito?', 'pagamento'],
        ['Qual o valor mínimo?', 'minimo'],
        ['Quanto tempo de antecedência para encomendar?', 'antecedencia'],
        ['Posso retirar hoje?', 'mesmodia'],
        ['Qual horário de retirada no IFC?', 'retirada'],
        ['Quanto custa o frete para Sombrio?', 'sombrio'],
        ['Vocês entregam em Blumenau?', 'blumenau'],
        ['Onde vocês entregam?', 'entrega'],
        ['Outra pessoa pode retirar meu pedido?', 'terceiro'],
        ['Não vou conseguir receber minha encomenda', 'reagendar'],
        ['Quero mudar o horário da entrega', 'reagendar'],
        ['Posso entregar um presente?', 'presente'],
        ['Posso montar uma caixa com sabores diferentes?', 'caixa'],
        ['O cartão pode ir em branco?', 'cartao'],
        ['Vocês atendem em quais horários?', 'horarios'],
        ['Tem cookie sem glúten?', 'alergenos'],
        ['Posso guardar o cookie na geladeira?', 'conservacao'],
        ['Como aquecer o cookie na airfryer?', 'aquecer'],
        ['Quanto tempo dura congelado?', 'congelar'],
        ['Até quando encomendar o Natal?', 'natal'],
        ['Quero alterar meu pedido', 'alteracao'],
        ['Já paguei, mas quero cancelar meu pedido', 'cancelamento'],
        ['Já paguei mas meu pedido não chegou', 'problema'],
        ['Qual o link de avaliação anônima?', 'avaliacao'],
        ['Vocês emitem nota fiscal?', 'nota'],
        ['Qual o peso do cookie?', 'tamanho'],
        ['Quero ver o status do WhatsApp', 'novidades'],
        ['Qual é o sabor mais vendido?', 'maisvendido'],
        ['Onde fica minha cestinha?', 'carrinho'],
        ['Quero orçamento para um evento', 'encomenda'],
        ['Quais os sabores de cookies?', 'sabores'],
        ['Quero falar com uma pessoa da equipe', 'contato'],
        ['Tenho uma dúvida', 'faq']
    ];
    for (const [question, expected] of questions) assert.equal(topic(question), expected, question);
});

test('respostas acompanham as condições atuais sem inventar disponibilidade', () => {
    assert.match(answer('pagamento')[0], /50%.*50%/);
    assert.match(answer('pagamento')[0], /47997008349/);
    assert.match(answer('sombrio')[0], /R\$ 10,00/);
    assert.match(answer('retirada')[0], /19h às 22h/);
    assert.match(answer('natal')[0], /1º de dezembro/);
    assert.match(answer('aquecer')[0], /180 °C por 1 minuto/);
    assert.match(answer('congelar')[0], /Descongele na geladeira/);
    assert.match(answer('blumenau')[0], /disponibilidade/);
    assert.match(answer('cancelamento')[0], /não elimina os direitos/);
    assert.match(answer('alergenos')[0], /contaminação cruzada/);
    assert.equal(topic('Um assunto totalmente desconhecido xyz'), null);
});

test('atalhos possuem respostas, links seguros e preservam o aviso de automação', () => {
    const shortcuts = [...source.matchAll(/data-topic="([a-z]+)"/g)].map(match => match[1]);
    assert.equal(shortcuts.length, 6);
    for (const key of shortcuts) assert.ok(answer(key), key);
    const answers = vm.runInContext('answers', context);
    for (const [key, [text, label, url]] of Object.entries(answers)) {
        assert.ok(text && label, key);
        assert.match(url, /^(?:\/(?!\/)|https:\/\/wa\.me\/5547997008349(?:\?|$)|https:\/\/forms\.gle\/PtTE7f4KT2TNKk5i9$)/, key);
    }
    assert.match(source, /respostas automáticas/);
    assert.doesNotMatch(source, /afeto-disclaimer/);
    assert.match(source, /p\.textContent = question/);
});

test('avaliação abre o formulário informado e aquecimento cobre decoração', () => {
    assert.equal(answer('avaliacao')[2], 'https://forms.gle/PtTE7f4KT2TNKk5i9');
    assert.equal(topic('O marshmallow pode esquentar?'), 'aquecer');
    assert.equal(topic('A decoração de chocolate branco derrete?'), 'aquecer');
    assert.match(answer('aquecer')[0], /chocolate branco/);
    assert.match(answer('aquecer')[0], /marshmallow/);
});

const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const out = __dirname;
const pause = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const targets = await (await fetch('http://127.0.0.1:9224/json/list')).json();
  const target = targets.find(t => t.type === 'page');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map();
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
    }
  };
  function call(method, params = {}) {
    return new Promise((resolve, reject) => {
      const n = ++id;
      pending.set(n, { resolve, reject });
      ws.send(JSON.stringify({ id: n, method, params }));
    });
  }
  async function evaluate(expression) {
    const result = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  }
  async function go(route) {
    await call('Page.navigate', { url: 'http://localhost:3000' + route });
    for (let i = 0; i < 100; i++) {
      await pause(100);
      if (await evaluate(`document.readyState === 'complete' && !!document.querySelector('main') && !document.querySelector('#catalog-state')`)) break;
    }
    await evaluate(`Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 6000))]) .then(() => true)`);
    await evaluate(`Promise.all([...document.images].filter(i => i.getBoundingClientRect().top < innerHeight).map(i => i.decode().catch(() => {}))).then(() => true)`);
    await pause(350);
  }
  async function shot(name) {
    const { data } = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    fs.writeFileSync(path.join(out, name + '.png'), Buffer.from(data, 'base64'));
    console.log('Print: ' + name);
  }
  await call('Page.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 640, deviceScaleFactor: 1, mobile: false });
  if (!process.argv.includes('--reuse')) {
  await go('/');
  await shot('01-home');
  await go('/cardapio');
  await shot('02-cardapio');
  await go('/produto/beijinho');
  await shot('03-produto');
  await evaluate(`document.querySelector('[data-add="beijinho"]').click(); true`);
  await go('/carrinho');
  await shot('04-carrinho');
  await go('/servico/brindes');
  await shot('05-encomendas');
  await go('/catalogo/brindes');
  await shot('06-catalogo');
  await go('/contato');
  await shot('07-contato');
  await evaluate(`document.querySelector('.afeto-launch').click(); document.querySelector('.afeto-form input').value = 'Como funciona a entrega?'; document.querySelector('.afeto-form').requestSubmit(); true`);
  await pause(300);
  await shot('08-assistente');
  }

  const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const source = file => fs.readFileSync(path.join(out, '..', file), 'utf8').split(/\r?\n/);
  const css = source('css/style.css');
  const js = source('js/script.js');
  const products = source('dados/produtos.json');
  const chat = source('js/chatbot.js');
  const cssStart = css.findIndex(s => s === '.hero h1 {' && css.indexOf(s) !== -1 && css[css.indexOf(s)+1]?.includes('780px'));
  const heroStart = css.findIndex((s,i) => s === '.hero h1 {' && css[i+1]?.includes('780px'));
  const checkoutStart = js.findIndex(s => s.includes("if (e.target.closest('#checkout') && cart.length)"));
  const toggleStart = chat.findIndex(s => s.includes('function toggle(open)'));
  const cases = [
    ['codigo-home', 'css/style.css', heroStart, css.slice(heroStart, heroStart+13)],
    ['codigo-produto', 'dados/produtos.json', 1, products.slice(1,10)],
    ['codigo-carrinho', 'js/script.js', checkoutStart, js.slice(checkoutStart,checkoutStart+12)],
    ['codigo-assistente', 'js/chatbot.js', toggleStart, chat.slice(toggleStart,toggleStart+9)]
  ];
  for (const [name,file,start,lines] of cases) {
    const indent = Math.min(...lines.filter(l=>l.trim()).map(l=>l.match(/^\s*/)[0].length));
    const content = lines.map((l,i) => `<div class="line"><span class="number">${start+i+1}</span><span class="code">${escape(l.slice(indent))}</span></div>`).join('');
    const codeHtml = `<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#1e1e1e;color:#d4d4d4;font-family:Consolas,monospace}.bar{height:55px;background:#292929;padding:17px 24px;font:18px Arial;color:#eee;border-bottom:1px solid #444}.note{color:#8bba82;font-size:17px;padding:15px 25px 12px}.line{display:flex;font-size:20px;line-height:1.5}.number{color:#858585;width:74px;flex-shrink:0;text-align:right;padding-right:20px;user-select:none}.code{white-space:pre-wrap;overflow-wrap:anywhere;flex:1;padding-right:22px;color:#d5b78e}main{padding-bottom:20px}</style><div class="bar">${file} &nbsp; · &nbsp; trecho do código do projeto</div><div class="note">// ${name === 'codigo-home' ? 'Estilo do título da Home e controle das linhas' : name === 'codigo-produto' ? 'Dados do Cookie Beijinho: nome, preço, imagem e descrição' : name === 'codigo-carrinho' ? 'Resumo do pedido e encaminhamento ao WhatsApp' : 'Abertura e fechamento do assistente virtual'}</div><main>${content}</main>`;
    fs.writeFileSync(path.join(out, name+'.html'), codeHtml, 'utf8');
    await call('Page.navigate',{url:pathToFileURL(path.join(out,name+'.html')).href});
    await pause(250);
    const height = await evaluate('document.documentElement.scrollHeight');
    if (height > 640) await evaluate(`document.querySelectorAll('.line').forEach(l => l.style.fontSize = '17px'); true`);
    await shot(name);
  }

  const pages = [
    { title: 'Página inicial e apresentação', subtitle: 'Como o código define a aparência da Home.', sections: [
      ['codigo-home', 'Código · Estilo do título', 'O CSS define o tamanho da fonte, o espaçamento e a largura do título. A classe hero-title-line coloca cada frase em uma linha, mantendo a apresentação organizada.'],
      ['01-home', 'Resultado · Página inicial', 'A Home apresenta a marca e convida o visitante a conhecer o cardápio. O título aparece em duas linhas e o menu oferece acesso às principais páginas e ao carrinho.']
    ]},
    { title: 'Cadastro e detalhes dos cookies', subtitle: 'Dos dados do produto à informação exibida para o cliente.', sections: [
      ['codigo-produto', 'Código · Dados do produto', 'O arquivo JSON guarda o identificador, o nome, o preço, a imagem e a descrição de cada produto. O sistema consulta esses dados para preencher o cardápio e a página do cookie.'],
      ['03-produto', 'Resultado · Cookie Beijinho', 'A página mostra a foto, a descrição e o preço do cookie. O cliente pode consultar alérgenos, conservação e envio, além de adicionar o produto ao carrinho.']
    ]},
    { title: 'Carrinho e pedido pelo WhatsApp', subtitle: 'Como o sistema organiza e encaminha a solicitação.', sections: [
      ['codigo-carrinho', 'Código · Preparação do pedido', 'Ao clicar em finalizar, o código calcula o total e monta uma mensagem com produtos e quantidades. A função whats abre o WhatsApp com esse resumo preenchido.'],
      ['04-carrinho', 'Resultado · Conferência do carrinho', 'O cliente ajusta quantidades, remove itens e confere o total. O botão de finalização leva ao WhatsApp; o cliente envia a mensagem e combina disponibilidade, pagamento e entrega com a loja.']
    ]},
    { title: 'Atendimento virtual Afeto', subtitle: 'Ajuda ao cliente durante a navegação.', sections: [
      ['codigo-assistente', 'Código · Controle da janela de atendimento', 'A função toggle mostra ou esconde o painel do assistente. Ela também atualiza o estado do botão e direciona o foco para a pergunta ou para o botão de abertura.'],
      ['08-assistente', 'Resultado · Conversa com o assistente', 'Ao abrir o painel, o cliente pode digitar dúvidas e receber respostas automáticas sobre cardápio, entrega e pedidos. Os atalhos levam ao site ou ao WhatsApp para falar com a equipe.']
    ]}
  ];
  const html = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>NAPORTA — Funcionalidades do sistema</title><style>
  @page {size: A4; margin: 0}
  * {box-sizing: border-box}
  body {margin:0; font-family:Arial,sans-serif; color:#34251f; background:#fff}
  .page {width:210mm; height:297mm; padding:13mm 15mm 12mm; break-after:page; position:relative; overflow:hidden}
  .page:last-child {break-after:auto}
  .brand {font-size:10px; letter-spacing:2px; font-weight:bold; color:#755342; padding-bottom:4mm; border-bottom:1px solid #ddcabb}
  h1 {font-family:Georgia,serif; font-size:27px; font-weight:normal; margin:5mm 0 2mm}
  .subtitle {font-size:12px; color:#725d50; margin:0 0 5mm}
  section {margin-bottom:5mm; break-inside:avoid}
  img {display:block; width:180mm; height:90mm; border:1px solid #e0d3c7; object-fit:contain; background:#f8f0e6; border-radius:4px}
  h2 {font-size:14px; margin:3mm 0 1.5mm; color:#4d392c}
  p {font-size:11.5px; line-height:1.45; margin:0}
  footer {position:absolute; bottom:9mm; left:15mm; right:15mm; display:flex; justify-content:space-between; border-top:1px solid #ddcabb; padding-top:3mm; font-size:9px; color:#806b5c}
  </style><body>${pages.map((p,i) => `<article class="page"><div class="brand">NAPORTA · CULINÁRIA COM AFETO</div><h1>${p.title}</h1><p class="subtitle">${p.subtitle}</p>${p.sections.map(([img,title,text]) => `<section><img src="${img}.png" alt="${title}"><h2>${title}</h2><p>${text}</p></section>`).join('')}<footer><span>Funcionalidades do sistema · Guia visual</span><span>${i+1} / 4</span></footer></article>`).join('')}</body></html>`;
  fs.writeFileSync(path.join(out, 'funcionalidades.html'), html, 'utf8');
  await call('Page.navigate', {url:pathToFileURL(path.join(out, 'funcionalidades.html')).href});
  await pause(1000);
  await evaluate(`Promise.all([...document.images].map(i => i.decode())).then(() => true)`);
  const { data } = await call('Page.printToPDF', { printBackground:true, preferCSSPageSize:true, displayHeaderFooter:false });
  fs.writeFileSync(path.join(out, 'NAPORTA-funcionalidades.pdf'), Buffer.from(data, 'base64'));
  console.log('PDF criado: NAPORTA-funcionalidades.pdf');
  await call('Emulation.setDeviceMetricsOverride', {width:794,height:1123,deviceScaleFactor:1,mobile:false});
  await shot('previa-pagina-1');
  console.log('Paginação: ' + JSON.stringify(await evaluate(`[...document.querySelectorAll('.page')].map(p => ({altura:p.clientHeight,conteudo:p.scrollHeight,ultimoBloco:p.querySelector('section:last-of-type').getBoundingClientRect().bottom-p.getBoundingClientRect().top,rodape:p.querySelector('footer').getBoundingClientRect().top-p.getBoundingClientRect().top}))`)));
  ws.close();
}
main().catch(e => {console.error(e);process.exit(1)});

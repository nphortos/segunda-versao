# NAPORTA — Site público

Site sem login, cadastro, painel administrativo ou painel de funcionários.

## Estrutura
- index.html — página inicial e navegação
- css/style.css — aparência do site
- js/script.js — catálogo, produtos, carrinho e links
- js/chatbot.js — chatbot com respostas automáticas
- assets/mascote-chat.webp — ícone flutuante do chatbot

## Como usar
Abra index.html no navegador ou use Live Server no VS Code.

O carrinho permite selecionar produtos e prepara a mensagem completa para o WhatsApp (+55 47 9700-8349), mas o cliente precisa confirmar o envio no WhatsApp. O contato por e-mail abre o aplicativo de e-mail para naportaa@gmail.com. As páginas de termos de uso e política de privacidade são minutas para revisão antes da publicação.

Os preços são editados diretamente em js/script.js. Não existe sistema de gestão, autenticação, banco de dados ou recebimento automático de pedidos.


Rodapé atualizado: links de contato, FAQ e envio ficam dentro do retângulo escuro; mensagem central envia texto para WhatsApp; ícones sociais abaixo; termos e privacidade aparecem fora, abaixo do retângulo. A marca no centro é uma composição tipográfica provisória, substituível pela logo oficial em SVG/PNG.

## Ajuste do rodapé
O campo de texto foi removido do rodapé. Agora há apenas um botão central de WhatsApp, de largura ajustada ao texto. Os ícones abaixo são Instagram, e-mail e LinkedIn. O LinkedIn está temporariamente apontando para uma busca de empresas por NAPORTA, porque o endereço oficial do perfil não foi fornecido; substitua-o pelo URL oficial antes de publicar.

LinkedIn público configurado: https://www.linkedin.com/company/115848926/


## Mensagens integradas à página
Páginas inexistentes e falhas de renderização exibem uma página de erro centralizada no próprio site, sem modal. Mensagens de ação (por exemplo, produto adicionado) aparecem no conteúdo principal, sem alertas do navegador. Falhas externas de WhatsApp/e-mail que ocorram após abrir aplicativos de terceiros não podem ser detectadas com segurança por este front-end.


## Ajuste mobile do rodapé
Em telas de até 760px, o rodapé apresenta bloco central compacto, botão único de WhatsApp, redes sociais e duas colunas de links. Informações legais continuam fora do retângulo. O mascote é reduzido para não ocupar tanto espaço.


### Ajuste mobile: ocasiões
Em telas de até 600 px, os três cartões de Biscoitos para todas as ocasiões aparecem um abaixo do outro, com mesma largura, altura e foto padronizada. A versão desktop permanece inalterada.


## Nova identidade visual
Paleta do moodboard: cacau #2E2410, creme #F5EDE1, caramelo #C89468, oliva #3A4A3E e terracota #A85B43. Cores de apoio: areia #E8D9C7, cappuccino #B8A78F, sálvia #80987E e vinho #7A2F2F. A porta usada no cabeçalho e rodapé foi extraída do moodboard e tem transparência aproximada. Recomenda-se substituí-la pelo arquivo vetorial oficial da logo. Os produtos ainda utilizam fotografias ilustrativas existentes.

Responsividade revisada por regras CSS para 350px, 390px, 600px, 900px e desktop; cartões de ocasiões empilhados em mobile, rodapé compacto, chatbot reduzido. Não foi possível gerar uma captura de navegador nesta execução devido ao bloqueio do ambiente de renderização.


## Logo oficial
A logo original enviada pela proprietária foi incorporada como arquivos PNG com transparência para o cabeçalho e a porta no rodapé. O rodapé usa versão monocromática clara da porta sobre o fundo cacau.

Rodapé reduzido: título curto, sem parágrafo longo, logo pequena, CTA compacto, ícones em linha e links em duas colunas. Links legais fora do retângulo.


Página Contato: área de fotografia proporcional à direita no desktop e abaixo do formulário no celular. O espaço é um placeholder, não uma fotografia real. Para adicionar uma foto, insira o arquivo em assets/ e substitua o placeholder por uma imagem com object-fit:cover.

Verde único atualizado para #246348 (verde floresta limpo), incluindo botões principais, WhatsApp e chatbot. Demais cores da identidade preservadas.


## Catálogos de serviços
Os botões Ver catálogo em Catering, Eventos e Brindes corporativos abrem páginas próprias com dez itens demonstrativos cada (`#/catalogo/catering`, `#/catalogo/eventos`, `#/catalogo/brindes`). Os dados podem ser editados em `js/script.js` no objeto `catalogExamples`. As imagens são referências externas, não fotografias dos produtos oficiais. Os botões Fazer orçamento usam WhatsApp 554797008349 e mensagem do serviço escolhido.

## Produtos
No cardápio, cada produto possui botão de detalhes e ação de adicionar ao carrinho. Os 8 espaços provisórios não têm preço cadastrado: seus botões consultam o WhatsApp em vez de adicionar itens de preço zero. A página de detalhes contém campos de descrição, preço, disponibilidade, ingredientes/alergênicos, conservação e entrega; informações específicas ainda precisam ser confirmadas pela loja.


## Correções recentes
- Carrinho: dados corrompidos, produtos removidos do catálogo ou itens sem preço no localStorage são descartados em vez de quebrar o site; quantidade limitada a 99 por item.
- Carrinho: +, − e Remover mantêm a posição da rolagem e não exibem a mensagem de "produto adicionado" dentro do próprio carrinho.
- Produtos sem preço mostram "Sob consulta" na página de detalhes (antes aparecia R$ 0,00).
- WhatsApp e e-mail agora vêm todos de `CONFIG` em js/script.js (inclusive rodapé, termos, privacidade e chatbot); basta editar em um só lugar.
- Imagens pesadas (fundo floral, identidade e mascote) convertidas para WebP: de cerca de 7,3 MB para cerca de 0,3 MB.
- Metadados (descrição, ícone da aba), aviso para navegador sem JavaScript, estilos das páginas legais e rótulos de acessibilidade nos botões do carrinho.

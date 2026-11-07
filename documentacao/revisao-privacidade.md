# Revisão de privacidade — NAPORTA

Data: 01/11/2026. Escopo: código local e informações fornecidas pela responsável. O site ainda não está hospedado. Esta revisão informativa não certifica conformidade jurídica integral nem verifica as contas, aparelhos e planilhas da equipe.

## Resultado

A política contém identificação e contato da controladora, categorias de dados, finalidades, bases legais, armazenamento local, serviços externos, critérios gerais de conservação e direitos dos titulares. O texto foi confrontado com o código disponível. Há pendências operacionais que impedem declarar conformidade integral.

Por solicitação da responsável, os avisos acessórios foram reduzidos: o formulário mantém somente um link curto para a política; o rodapé preserva o acesso em todas as páginas; retiraram-se a repetição nos termos, o alerta genérico de segurança e a segunda indicação de atendimento automático do chat. A indicação de respostas automáticas permanece no cabeçalho do chat. As informações materiais sobre os dados continuam na política. Não se afirmou que a LGPD exige literalmente cada um desses links ou um formato específico de aviso; a exigência é de transparência e acesso facilitado às informações pertinentes. Novos serviços ou rastreadores exigem reavaliação.

## Constatações e ajustes

- A proprietária confirmou que somente o primeiro nome e o pedido são anotados na planilha, com acesso exclusivo da equipe. Primeiro nome associado ao pedido ainda pode ser dado pessoal; a redução não equivale a anonimização.
- O formulário não envia um cadastro à API do site. Ele abre WhatsApp ou e-mail com mensagem preparada; o provedor pode receber o conteúdo do link ao ser aberto, antes de o usuário confirmar o envio da mensagem ao destinatário.
- Ajustado o formulário para pedir primeiro nome e tornar e-mail opcional, sem impedir contato pelo WhatsApp. Campo preenchido continua sujeito à validação de formato do navegador. Acrescentado link para a política no aviso de envio, sem impor aceite genérico.
- O carrinho contém códigos e quantidades no localStorage. Limpar o navegador não apaga a planilha ou mensagens enviadas. A política agora esclarece essa distinção.
- O chat usa regras locais e não chama API de IA. Não há rastreadores de audiência ou publicidade configurados no código inspecionado.
- Google Fonts e imagens do Unsplash geram conexões externas na navegação. Botões abrem os demais serviços. Não se comprovou o enquadramento jurídico de todos os fluxos internacionais; mencionar políticas próprias não dispensa a análise da responsabilidade da NAPORTA.
- Não foi inserido banner de consentimento genérico nem alegada ausência de todo tratamento técnico. A necessidade de controles adicionais depende dos serviços e bases legais efetivamente usados, especialmente após a hospedagem.
- Atualização da política não foi tratada como autorização automática para novo uso dos dados.

## O que falta definir ou verificar

**Avaliação externa adicionada:** a responsável forneceu `https://forms.gle/PtTE7f4KT2TNKk5i9`, do Google Forms. O link foi incluído no FAQ e no chat, com informação sobre o serviço na política. A ferramenta de navegação não conseguiu acessar o formulário nesta revisão; não se verificaram campos, coleta automática de e-mails, exigência de login, limitação por conta ou configurações de identificação. Não foi prometido anonimato no texto do link. Confirmar essas configurações antes de divulgar a avaliação como anônima; textos livres também podem identificar quem responde.

1. **Planilha — esclarecido pela responsável:** Google Planilhas, contendo primeiro nome e pedido, com acesso das duas pessoas que atendem e entregam. Permissões reais das contas ainda não foram auditadas. A política informa que o serviço armazena dados na nuvem.
2. **Conservação — parcialmente esclarecida:** registros na planilha por até um ano, depois removidos na renovação. Ainda verificar como são tratados histórico de versões, lixeira e cópias: limpar células não comprova exclusão de todas as versões. Conversas no WhatsApp e e-mail têm conservação separada, cujo prazo não foi informado. Não foi atribuída a elas a mesma duração anual.
3. **Estoque:** verificar se é necessário manter o primeiro nome depois de finalizar o atendimento. Para estatística de estoque, avaliar registros sem identificação do cliente.
4. **Entregas — esclarecido pela responsável:** realizadas pelas duas pessoas da equipe; ponto de encontro escolhido pelo cliente e combinado na conversa. Endereço não é copiado para a planilha. Não há entregadores externos declarados.
5. **Promoções — esclarecido pela responsável:** novidades no site, Instagram e Status do WhatsApp. Mensagens diretas somente se o cliente quiser receber. A política explicita autorização e saída gratuita pelo WhatsApp; recomenda-se guardar a manifestação do cliente na conversa. Salvar o contato para ver Status não foi tratado como autorização automática para mensagens diretas.
6. **Segurança — parcialmente esclarecida:** responsável declarou aparelhos protegidos e acesso limitado às duas pessoas da equipe. Não foram verificadas senhas, autenticação em dois fatores, sessões abertas, cópias de segurança ou procedimentos para incidentes. Não se declarou que medidas específicas não verificadas já existem.
7. **Hospedagem:** após selecionar o provedor, revisar HTTPS, registros técnicos, retenção, responsáveis, fornecedores e possíveis fluxos internacionais. O servidor Node não contém middleware de cadastro nem análise de audiência; a infraestrutura futura pode acrescentar processamento.
8. **Dados sensíveis:** o site não solicita laudos. Se o atendimento registrar informações de saúde identificáveis, como alergias, avaliar necessidade e fundamento específico do art. 11 da LGPD; não presumir que a base contratual comum cobre todos os casos.
9. **Direitos:** organizar o atendimento e exclusão/correção nos registros reais. Não presumir dispensa de encarregado ou prazo em dobro somente por ser produção artesanal: o enquadramento na Resolução 2/2022 precisa corresponder à operação.

## Fontes primárias

- [LGPD atualizada, em especial arts. 6º a 11, 15 a 20, 33 e 46 a 48](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html).
- [Resolução CD/ANPD 2/2022 — pequeno porte](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022).
- [ANPD — guia de segurança para agentes de pequeno porte](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte).
- [Resolução CD/ANPD 19/2024 — transferências internacionais](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024).

Antes da publicação, conferir essas pendências com o funcionamento real. Não foram contratados advogados, acessadas contas externas ou implementados processos administrativos por esta revisão.

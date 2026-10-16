# Horizonte Residencial

Landing page de um empreendimento fictício, criada como estudo de portfólio.

## Situação do projeto

O empreendimento, textos, plantas, metragens e imagens são conceituais. O mapa incorporado é real e aponta para a Praça Nossa Senhora da Paz, em Ipanema, usada somente como referência urbana; o Horizonte Residencial não está situado nesse endereço. O material não representa uma oferta imobiliária real. Os CTAs de contato abrem o WhatsApp informado para o portfólio com mensagem que identifica a proposta como conceitual. O formulário valida nome e planta e abre uma mensagem pré-preenchida; o visitante precisa revisar e confirmar o envio no WhatsApp. A página não armazena os dados do formulário.

## Tecnologias

- HTML semântico
- CSS responsivo
- JavaScript sem dependências
- Hospedagem estática na Netlify

## Estrutura

```text
index.html
css/styles.css
js/main.js
assets/icons/favicon.svg
assets/images/
netlify.toml
README.md
```

## Imagens

As imagens geradas serão adicionadas em `assets/images/` com estes nomes:

- `fachada-principal.webp`
- `sala-integrada.webp`
- `varanda-paisagismo.webp`
- `cozinha-jantar.webp`
- `suite-principal.webp`
- `deck-convivencia.webp`

As plantas demonstrativas são ilustrações vetoriais incluídas no HTML. O mapa usa uma incorporação do Google Maps para um ponto público real no Rio de Janeiro.

## Teste local

Abra `index.html` no navegador. Também é possível iniciar um servidor estático local a partir desta pasta. Não é necessário instalar dependências.

## Interações

- Seletor de duas plantas, que atualiza a descrição, as metragens e o desenho esquemático.
- Galeria com ampliação, setas de navegação, Escape para fechar e retorno do foco ao item que abriu a imagem.
- FAQ expansível e menu adaptado para telas pequenas.
- CTAs de contato direcionados ao WhatsApp, incluindo botão flutuante.
- Seletor de planta que atualiza o link de interesse e a mensagem do formulário.
- Formulário com validação nativa; abre o WhatsApp com nome e planta escolhida, sem envio automático.
- Eventos opcionais `cta_click`, `plan_select`, `gallery_open`, `gallery_close` e `whatsapp_lead_start` enviados a `dataLayer` somente se houver um contêiner configurado. Nenhum dado pessoal é incluído nos eventos.

## Contato conceitual

- Instagram fictício exibido: `@horizonteresidencial` (nenhuma conta real foi criada).
- WhatsApp para contato sobre o case conceitual: `+55 83 99873-9712`.
- Créditos: **Desenvolvido por LMX Soluções Digitais / Segundo Almeida.**

## Publicação

O arquivo `netlify.toml` publica a raiz do projeto como site estático. Configure o repositório e o deploy depois de adicionar e revisar todas as imagens. Defina domínio e URL canônica somente quando o endereço final for conhecido.

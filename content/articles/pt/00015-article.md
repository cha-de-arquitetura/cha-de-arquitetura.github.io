---
title: Resolvendo o problema do CORS com Angular + @angular/cli e Vuejs + @vue/cli
description: Recentemente percebi que muitas pessoas estão tendo problema de CORS ao iniciar
createdAt: 2020-11-10T17:00:00
updatedAt: 2020-11-10T17:00:00
author: giovane-souza
tags:
  - front-end
  - back-end
  - devops
---
Recentemente percebi que muitas pessoas estão tendo problema de CORS ao iniciar seus projetos, então decidi fazer esse post para tentar esclarecer o que é CORS, porque ele ocorre e como resolvê-lo, usando @angular/cli como exemplo.

## Primeiro, o que é CORS?
Cross-origin resource sharing ou compartilhamento de recursos de origem cruzada é uma especificação de segurança de browsers que tem como intenção fazer a segurança de recursos de diferentes origens.

Antes de você sair por aí vendo qualquer porção de código pela internet e tentar inserir Access-Control-Allow-Origin: * nos headers de suas requisições (já vi muita gente tentando isso, eu mesmo ja tentei antes de pesquisar direito hahaha), deixa eu simplificar melhor isso tudo.

Configurar o CORS é algo de responsabilidade do back-end que provê o recurso / API (backend). Pois os browsers usam um mecanismo chamado `preflight`.

O `preflight` é uma requisição que seu browser faz ao back-end que você deseja consumir recursos e verifica as políticas de CORS configuradas. O browser verifica se a origem (domínio) da sua requisição está autorizada, se seus `headers` estão de acordo com o esperado pelo back-end e se o verbo `HTTP` usado por você está autorizado a acessar os recursos do back-end.

Com tudo isso em mente podemos resumir de maneira grosseira que o CORS é a configuração de uma `whitelist` para acessar seus recursos. Se você não está autorizado, o browser simplesmente não realiza a requisição que você solicitou.

Aí você pode ter a ideia de ir até seu back-end e configura-lo para liberar geral, `Access-Control-Allow-Origin: *`, e continuar trabalhando no seu front-end sem problema algum.

Isso vai funcionar sem problema algum, porém se seus recursos não forem realmente abertos para qualquer um acessar, você terá de criar regras de segurança no servidor para cobrir essa abertura no seu back-end (*como se você ja não fosse fazer isso né*).

Mas vamos pensar no cenário em que você não quer esperar que seu amiguinho responsável pelo back-end configure essa **GAMBIARRA**(*já configurei o back-end… me julguem*) para você poder desenvolver seu front-end.

Você como um bom front-end deve estar subindo seu próprio server para desenvolvimento, e muito provavelmente esse server tem como configurar `Proxy` nele. E essa é a solução, porque com ele você fará a requisição para seu próprio server que provê seu front e ele fará a requisição pro back-end por baixo dos panos. E como o CORS é algo validado pelo browser, você estará livre das verificações de CORS.

## Configurando um proxy server para seu app

Para os exemplos de configuração vamos seguir o seguinte cenário:
- front-end servido em `http://localhost:4200`
- back-end servido em `http://localhost:8080`

### App Angular gerado pelo @angular/cli

Crie um arquivo proxy.config.js no mesmo diretório em que se encontra o seu package.json :

```javascript
const proxy = [
  {
    context: '/api',
    target: 'http://localhost:8080',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
```

Agora edite o script de start de sua aplicação no package.json :

```javascript
...
"scripts": {
  "start": "ng serve --proxy-config proxy.config.js",
...
```

Ou dentro configure dentro de seu .angular-cli.json , assim não precisa usar a flag --proxy-config no comando ng serve :

```javascript
...
"defaults": {
  "serve": {
    "proxyConfig": "./proxy.config.js"
  }
...
```

### App Vuejs gerado pelo @vue/cli

Se ja tiver um arquivo vue.config.js incremente-o com o a configuração de devServer a seguir, caso não tenha ainda, crie-o na raiz de seu projeto Vuejs com a seguinte configuração:

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/api' : ''}
      }
    }
  }
}
```

## Explicando a configuração

context: 'O contexto que deve ser requisitado para tratar o proxy/redirecionamento da requisição'
No vuejs no lugar de usar um array especificando o contexto do proxy no atributo "context" você deve utilizar um objeto onde o contexto é o atributo.
Assim no lugar de: 

```javascript
[
  { context: '/v1',... }, 
  { context: '/v2',... }
]
```

Você faz:

```javascript
{
  '/v1': {...},
  '/v2': {...}
}
```

target: 'endpoint ao qual você quer que seja feito o proxy/redirecionamento'

pathRewrite: 'Objeto opcional em que você escreve uma expressão regular como atributo e o que deve substituir o resultado da expressão para reescrever a url resultado do proxy/redirecionamento'

Exemplos:

Sem pathRewrite:
`http://localhost:4200/api/user => http://localhost:8080/api/user`

Com pathRewrite: `{ '^/api': '' }`  
`http://localhost:4200/api/user => http://localhost:8080/user`

Com pathRewrite: `{ '^/api': '/bacon' }`  
`http://localhost:4200/api/user => http://localhost:8080/bacon/user`

É importante que você entenda que independente do framework (Angular ou Vuejs) ou ferramenta (@angular/cli ou @vue/cli) isso é uma feature do Webpack que ambas tecnologias utilizam, mais precisamente do pacote webpack-dev-server.

Pronto, agora seu servidor de desenvolvimento já esta com o Proxy configurado e pronto para te ajudar a contornar o CORS durante o desenvolvimento do projeto.

Só lhe resta ajustar as urls que seu app requisita para apontar ao seu server de proxy, de http://localhost:8080/path/do/recurso para http://localhost:4200/api/path/do/recurso .

Sugiro dar uma olhada na documentação do webpack dev server para encontrar a configuração que melhor satisfaça sua necessidade.[^longnote]

Obrigado pela leitura, toda dúvida, dica, crítica é bem vinda![^1]

[^1]: Here is the footnote.

[^longnote]: Here’s one with multiple blocks.

Referências:
- https://pt.wikipedia.org/wiki/Cross-origin_resource_sharing
- https://www.html5rocks.com/en/tutorials/cors/
- https://webpack.github.io/docs/webpack-dev-server.html

lala

:thumbsup: :dog:

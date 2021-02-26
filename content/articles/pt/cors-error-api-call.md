---
title: Resolvendo o problema de CORS em aplicações Angular e Vue.js
description: | 
  Recentemente percebi que muitas pessoas estão tendo problema de CORS ao iniciar seus projetos, 
  então decidi fazer esse post para tentar esclarecer o que é CORS, porque ele ocorre e como resolvê-lo, 
  usando @angular/cli e @vue/cli como exemplo.
createdAt: 2017-09-18T00:00:00-03:00
updatedAt: 2020-02-25T17:00:00-03:00
author: giovane-souza
tags:
  - front-end
---
Recentemente percebi que muitas pessoas estão tendo problema de CORS ao iniciar seus projetos, 
então decidi fazer esse post para tentar esclarecer o que é CORS, porque ele ocorre e como resolvê-lo, 
usando @angular/cli e @vue/cli como exemplo.

## Primeiro, o que é CORS?
`Cross-origin Resource Sharing` ou Compartilhamento de Recursos de Origem Cruzada é uma especificação 
de segurança de navegadores que tem como intenção fazer a segurança de recursos de diferentes origens (domínios).

Antes de você sair por aí vendo qualquer porção de código pela internet e tentar inserir 
`Access-Control-Allow-Origin: *` nos headers de suas requisições 
(já vi muita gente tentando isso, eu mesmo já tentei antes de pesquisar direito hahaha), 
deixa eu simplificar melhor isso tudo.

Configurar o CORS é algo de responsabilidade do back-end que provê o recurso / API, 
pois os navegadores usam um mecanismo chamado `preflight`.

O `preflight` é uma requisição que seu navegador faz ao back-end que você deseja consumir 
recursos e verifica as políticas de CORS configuradas. 
O navegador então verifica se a origem (domínio) da sua requisição está autorizada, 
se seus `headers` estão de acordo com o esperado pelo back-end 
e se o verbo `HTTP` usado por você está autorizado a acessar os recursos do back-end.

> Não existe apenas **Access-Control-Allow-Origin**  
> O back-end pode restringir uso de **headers**, configurando **Access-Control-Allow-Headers**  
> Também pode restringir o uso de verbos **HTTP**, configurando **Access-Control-Allow-Methods**

Com tudo isso em mente podemos resumir de maneira grosseira que o CORS é a configuração 
de uma de `whitelist` para acessar seus recursos. 
Se você não está autorizado, o navegador simplesmente não realiza a requisição que você solicitou.

Aí você pode ter a idéia de pedir pro teu amiguinho responsável pelo back-end configurá-lo para liberar geral, 
`Access-Control-Allow-Origin: *`, e continuar trabalhando no seu front-end sem problema algum.

Isso vai funcionar sem problema algum, porém se seus recursos não forem realmente abertos para qualquer um acessar, 
você terá de criar regras de segurança no servidor para cobrir essa abertura no seu back-end.

> Como se você ja não fosse fazer isso né :wink:

Mas vamos pensar no cenário em que você não quer esperar que seu amiguinho responsável pelo back-end configure essa 
**GAMBIARRA** para você poder desenvolver seu front-end.

> já configurei o back-end… me julguem

Você como um bom front-end deve estar subindo seu próprio server para desenvolvimento, e muito provavelmente esse 
server tem como configurar `Proxy` nele. E essa é a solução, porque com ele você fará a requisição para seu próprio server 
que provê seu front e ele fará o redirecionamento da requisição pro back-end "por baixo dos panos". 
E como o CORS é algo validado pelo navegador, você estará livre das verificações de CORS.

## Configurando um proxy server para seu app

Para os exemplos de configuração vamos seguir o seguinte cenário:

- front-end servido em `http://localhost:4200`
- back-end servido em `http://localhost:8080`

### App Angular gerado pelo @angular/cli

Crie um arquivo `proxy.config.js` no mesmo diretório em que se encontra o seu `package.json :

```js
const proxy = [
  {
    context: '/api',
    target: 'http://localhost:8080',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
```

Agora edite o script de start de sua aplicação no `package.json` :

```js
...
"scripts": {
  "start": "ng serve --proxy-config proxy.config.js",
...
```

Ou dentro configure dentro de seu `.angular-cli.json` , assim não precisa usar a flag `--proxy-config` no comando `ng serve`:

```js
...
"defaults": {
  "serve": {
    "proxyConfig": "./proxy.config.js"
  }
...
```

### App Vuejs gerado pelo @vue/cli

Se ja tiver um arquivo `vue.config.js` incremente-o com o a configuração de `devServer` a seguir, 
caso não tenha ainda, crie-o na raiz de seu projeto Vue.js com a seguinte configuração:

```js
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

`context`: O contexto que deve ser requisitado para tratar o redirecionamento da requisição.

No vuejs no lugar de usar um array especificando o contexto do proxy no atributo `context` você deve utilizar 
um objeto onde o contexto é o próprio atributo.

Assim no lugar de: 

```js
[
  { context: '/v1',... }, 
  { context: '/v2',... }
]
```

Você usa:

```js
{
  '/v1': {...},
  '/v2': {...}
}
```

`target`: Endpoint ao qual você quer que seja feito o redirecionamento

`pathRewrite`: Objeto opcional em que você escreve uma expressão regular como atributo e o que 
deve substituir o resultado da expressão para reescrever a url resultado do redirecionamento

### Exemplos

Sem pathRewrite:
`http://localhost:4200/api/user => http://localhost:8080/api/user`

Com pathRewrite: `{ '^/api': '' }`  
`http://localhost:4200/api/user => http://localhost:8080/user`

Com pathRewrite: `{ '^/api': '/bacon' }`  
`http://localhost:4200/api/user => http://localhost:8080/bacon/user`

É importante que você entenda que independente do framework (Angular ou Vue.js) 
ou ferramenta ([@angular/cli](https://cli.angular.io/) ou [@vue/cli](https://cli.vuejs.org/)), 
isso é uma feature do [webpack](https://webpack.js.org/) que ambas tecnologias utilizam, 
mais precisamente do pacote [webpack-dev-server](https://webpack.js.org/configuration/dev-server/).

Pronto, agora seu servidor de desenvolvimento já esta com o `Proxy` configurado e pronto para te ajudar a 
contornar o CORS durante o desenvolvimento do projeto.

Só lhe resta ajustar as urls que seu app requisita para apontar ao seu `Proxy`, 
de `http://localhost:8080/path/do/recurso` para `http://localhost:4200/api/path/do/recurso`.

Sugiro dar uma olhada na documentação do [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) 
para encontrar a configuração que melhor satisfaça sua necessidade.

## E como fica em produção?

Conforme deixei explícito durante o artigo, essa é uma solução para seu ambiente de desenvolvimento. 

Para produção é diferente, provavelmente em produção não seja necessário nenhuma configuração pois ambos 
front-end e back-end estarão publicados sobre o mesmo domínio.

Mas isso vai depender mais dos processos e ferramentas que sua empresa adotou, então caso tenha de
resolver problemas de CORS em produção, você já sabe o que esta causando este problema e só precisará pesquisar
como configurar seu ferramental para conseguir resolve-lo.

<div class="dot-separator">...</div>

Obrigado pela leitura, toda dúvida, dica, crítica é bem vinda!

#### Referências
- [https://pt.wikipedia.org/wiki/Cross-origin_resource_sharing](https://pt.wikipedia.org/wiki/Cross-origin_resource_sharing)
- [https://www.html5rocks.com/en/tutorials/cors/](https://www.html5rocks.com/en/tutorials/cors/)
- [https://webpack.github.io/docs/webpack-dev-server.html](https://webpack.github.io/docs/webpack-dev-server.html)

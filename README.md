# Implementação API cypress Cucumber

## Por **Gerson Dias** | [LinkedIn](https://www.linkedin.com/in/gerson-costa-dias/) | [GitHub](https://github.com/gersoncdias)

---

## 0. O Cenário implementa o uso de uma api Vtex para login

```feature
Feature: Login and set authentication cookie

  Scenario: Access the website and set authentication cookie
    Given I'm on the home page
    When I set the authentication token with my credentials
    Then I must be logged in

```

## 1. Inicialize node e instale o projeto

```
npm init -y
npm install cypress --save-dev
npx cypress open
```

## 2. Instalar os Pacotes

- Abra o terminal e navegue até o diretório onde deseja clonar o repositório do GitHub. Em seguida, execute o seguinte comando:
  `git clone https://github.com/gersoncdias/automacao_login_cypress_api_vtex.git`
- Entre no diretório do projeto recém-clonado usando o comando:
  `cd nome-repositorio`
- Edite o arquivo cypress_exemplo.env.json para cypress.env.json e insera seus dados

```javascript
npm install @badeball/cypress-cucumber-preprocessor --save-dev
npm install @bahmutov/cypress-esbuild-preprocessor --save-dev  //Agrupe as especificações do Cypress usando esbuild - para aumentar o desempenho
```

## 3. Atualizar configurações

`cypress.config.js`

```javascript
const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const preprocessor = require('@badeball/cypress-cucumber-preprocessor')
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      )
      preprocessor.addCucumberPreprocessorPlugin(on, config)
      return config
    },
    specPattern: '**/*.feature',
  },
})
```

## 4. Atualizar as configurações "cypress-cucumber-preprocessor" ((defina o caminho das definições das etapas e torne-as globais))`package.json`

```javascript
"cypress-cucumber-preprocessor": {
    "step_definitions": "cypress/support/step_definitions/",
    "nonGlobalStepDefinitions": false
  }
```

## 5. Adicione o plugin na sua IDE para os arquivos `.feature`

Este é um dos melhores para VS-Code [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)

### 6. Execução dos testes

NO pronpt de comando:
Navegar até a pasta do projeto e execute um dos comando abaixo:

`npx cypress open`: Abrira a IDE do Cypress e apartir de lá executar os testes

`npx cypress run --reporter null` : executar os testes em headless

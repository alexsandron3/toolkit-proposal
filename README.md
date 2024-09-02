# Toolkit para Node.js: Problemas e Alternativas

## Problemas ao Desenvolver um Toolkit em Node.js

### 1. Tamanho do Pacote
Ao desenvolver um toolkit para Node.js, o tamanho do pacote pode ser um problema. Imagine que o toolkit tenha as seguintes implementações:

- A
- B
- C
- D

Nem todas as lambdas irão usar todas as implementações, o que pode resultar em builds maiores do que o necessário. Isso é especialmente problemático em ambientes de lambda functions, onde a minimização do tamanho do build é essencial para melhorar o desempenho e reduzir custos.

### 2. Conflito de Versões de Pacotes
Lambdas usando o toolkit podem acabar utilizando pacotes que o toolkit também utiliza, gerando múltiplas versões do mesmo pacote. Por exemplo:

- O toolkit usa Jest na versão `27.0.0`
- A lambda usa Jest na versão `29.0.0`

Essas discrepâncias de versão podem causar problemas de compatibilidade e conflitos, dificultando a manutenção e o gerenciamento de dependências.

### 3. Conflito com Versões de Pacotes em Lambda Layers
Lambdas podem utilizar uma layer contendo bibliotecas usadas pelo toolkit. Isso pode levar a problemas semelhantes ao anterior, com versões diferentes de um mesmo pacote. Por exemplo:

- A layer do toolkit usa Jest na versão `27.0.0`
- A lambda usa Jest na versão `29.0.0`

Esse tipo de conflito pode complicar a resolução de dependências e afetar a execução correta da aplicação.

## Alternativas para Mitigação dos Problemas

### 1. Uso de Monorepo para Controle de Dependências
Uma estratégia de monorepo pode ser utilizada para permitir que apenas os pacotes necessários sejam incluídos no toolkit. Ao estruturar o projeto com um `package.json` separado para cada implementação, podemos versionar e controlar dependências de forma individual. Exemplo de estrutura:


```
/toolkit
├── /A
│   └── package.json
├── /B
│   └── package.json
├── /C
│   └── package.json
└── /D
    └── package.json
```
Com essa abordagem, apenas os pacotes estritamente necessários para uma implementação específica são incluídos, reduzindo o tamanho do build e os riscos de conflito.

### 2. Uso de `peerDependencies` para Controlar Versões de Pacotes
Para resolver problemas de versão, o uso de `peerDependencies` no toolkit é recomendado. Isso força as lambdas a utilizarem versões específicas dos pacotes definidos pelo toolkit. Caso uma versão diferente seja especificada, o `npm` bloqueará e emitirá um aviso sobre a versão permitida. Exemplo:

- Layer do toolkit define Jest como `peerDependencies` na versão `X.Y.Z`
- Se a lambda tentar usar uma versão diferente, o `npm` irá bloquear a instalação e alertar sobre a versão permitida.

Além disso, mesmo que o `peerDependencies` do toolkit defina uma versão específica (por exemplo, `X.Y.Z`), a lambda pode optar por usar uma versão mais recente do pacote adicionando manualmente a versão desejada em `dependencies` no seu próprio `package.json`. Após isso, ao executar `npm install`, a versão definida no `package.json` da lambda será instalada e utilizada. **A versão especificada diretamente no `package.json` da lambda sempre terá prioridade sobre a versão definida em `peerDependencies` do toolkit.**

### 3. Prioridade de Versões entre Lambda Layer e Lambda `package.json`
Em cenários onde há layers com pacotes e lambdas definindo suas próprias dependências, a versão especificada diretamente no `package.json` da lambda terá prioridade. Por exemplo:

- A layer do toolkit usa Jest na versão `27.0.0`
- A lambda usa Jest na versão `29.0.0`

Nesse caso, a versão `29.0.0` será utilizada, pois a configuração direta no `package.json` da lambda tem prioridade sobre a layer.

## Conclusão
Ao desenvolver um toolkit para Node.js, é essencial considerar estratégias para controlar o tamanho dos pacotes e gerenciar versões de dependências de forma eficiente. O uso de monorepos e `peerDependencies`, combinado com uma compreensão clara da hierarquia de resolução de versões, pode ajudar a mitigar muitos dos problemas comuns em ambientes de desenvolvimento de lambda functions. Além disso, é importante validar se é possível criar uma pipeline que permita a implementação de monorepos.

Com essas abordagens, os desenvolvedores podem garantir que suas lambdas sejam leves e eficientes, ao mesmo tempo em que mantêm consistência nas versões de dependências utilizadas.

# SGI Banco de empregos

## Inicializar o projeto

> É necessario ter o `node`, `npm` e o `angular cli `instalados na sua maquina

### Antes de tudo é preciso fazer o clone do projeto pra sua maquina

- para fazer o clone, basta ultilizar o comando `git clone <https...>`

### Inicializar

- Entre na pasta raiz do projeto
- Baixe as dependencias com o comando
  `npm install` ou `yarn`
- Incialize o projeto angular com o comando `ng s`
- Abra o navegador no link `http://localhost:4200`

## Git

### Para contribuir com esse projeto, leia com atenção as informações abaixo:

### 1 - Guarde com carinho as seguintes informações:

- O projeto possui duas branchs principais: **main** e **develop**
- Não exclua em hipótese alguma tais branchs :triumph:
- Imagine a main como o ambiente de produção, e a develop como o ambiente de desenvolvimento e homologação juntos (sim, juntos).

| Nome da branch | Significado                                     |
| -------------- | ----------------------------------------------- |
| feat           | Criando/otimizando uma funcionalidade           |
| fix            | Resolvendo um bug                               |
| refact         | Refatorando codigo                              |
| build          | Criando/otimizando funcionalidades para o build |

> :information_source: Info: Para todos os tipos de contribuição, antes de tudo, é necessário criar uma branch no repositório principal. Você está livre para criar N branchs, não tem problema, desde que isso não afete as branchs já mencionadas.

> :information_source: Info: Para isso, basta acessar o projeto no GitLab, e logo acima da última mensagem de commit, você encontrará um dropdown com um plus (:heavy_plus_sign:), clicando sobre ele, estará a opção de criação de uma nova branch.

##### `IMPORTANTE:` A criação de branchs possuem uma nomenclatura padrão. Então, siga isso da forma correta. Os padrões são:

- Ao criar uma feat, fix ou refact, respectivamente, o nome da branch deve ter o seguinte prefixo: `feat/` `fix/` `refact/`
- Após o prefixo, deve-se ter o nome da branch, ultilize o id da task que esta no readmine ex.: `feat/#2312`.
- Crie sua branch com base na branch `develop` e submeta o merge request para a `develop`.

##### Criada a branch você e/ou a sua equipe poderá acessá-la.

---

### 2 - Se estiver em uma equipe, e necessitar expor suas alterações na branch aos membros, será necessário comitá-la para o seu fork, e abrir um merge request para o repositório principal.

- Os processos de merge request para `main` e `develop`, passarão pela aprovação de alguma pessoa responsável pelo projeto.

- Ao abrir o merge request, selecione a branch de funcionalidade do seu fork, com a branch criada no repositório.

  - `[obrigatório]` **Nunca deve haver um merge request de uma `feat/`, `fix/` diretamente para `main`, esse merge deve passar antes pela branch `develop`, e então, da `develop` para `main`.`**
  - `[obrigatório]` **Defina o título do seu merge request de forma clara (`isso vale para qualquer tipo de merge request`)**
  - `[opcional]` **Adicione uma descrição do que se trata a branch de forma mais detalhada (`isso vale para qualquer tipo de merge request`)**

---

### 3 - Vale lembrar:

- Quando você for usar os comandos do git, passe a referência da branch que você está usando: Por exemplo: `git push origin feat/#1332`
- Tenha cuidado, mesmo localmente, em qual branch está sendo feita as alterações.
- É recomendado nunca alterar, mesmo localmente, as branchs master e develop.
- Caminhe entre as branchs, ou seja, escolha qual branch você deseja alterar, utilizando o comando checkout. Por exemplo: `git checkout feature/#2343`

---

### 4 - Convenção de commits

- Os commits devem seguir o padrão do Conventional Commits
- O commit deve conter os seguintes elementos estruturais, para comunicar a intenção
  `<tipo>[escopo opcional]: <descrição>` ex.:

  `feat: criar componente de menu`,

  `fix: resolve erro ao mudar de pagina`

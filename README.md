# gestao_academica
Projeto da Disciplina DS151 - Aplicativo Móvel de Gestão Acadêmica
## Alunos:
- **Laísa Cristina Krolikovski da Silva - GRR20221113**
- **Lucas Henrique Ramos Cazionato - GRR20221122**

**Link do GitHub: https://github.com/lucas-cazionato/gestao_academica**

## Instruções para Iniciar o Projeto

### Passo 1: Atualização do endereço IP do servidor
1. Dentro da pasta raiz do projeto (onde se encontra o arquivo index.js), navegue até a pasta `\src\api`:
```bash
cd ~\GestaoAcademica\src\api
```
2. Edite o arquivo `api.js` e atualize o valor da variável `API_URL` com o endereço IP de sua máquina:
```javascript
export const API_URL = 'http://ENDERECO_IP:3000/api';
```
Substitua `ENDERECO_IP` pelo endereço IP real da sua máquina/servidor.

### Passo 2: Iniciar o Servidor Backend
1. Dentro da pasta raiz do projeto (onde se encontra o arquivo index.js), navegue até a pasta `backend`:
```bash
cd ~\GestaoAcademica\backend
```
2. Inicie o servidor Node.js:
```bash
node index.js
```

### Passo 3: Iniciar a Aplicação
1. Navegue até a pasta raiz do projeto:
```bash
cd ~/GestaoAcademica
```
2. Inicie o React Native:
```bash
# npx react-native start
```
### Executar no Dispositivo Físico ou Emulador
#### Android
- Após iniciar o React Native, pressione `a` para escolher a opção Android.
#### iOS
- Após iniciar o React Native, pressione `i` para escolher a opção iOS.

Pronto! Se o ambiente de execução foi configurado corretamente, o projeto deve executar normalmente.

## Contato
Em caso de problemas, entre em contato com os integrantes da equipe:
- **Laísa Cristina Krolikovski da Silva: laisacristina@ufpr.br**
- **Lucas Henrique Ramos Cazionato: lucas.cazionato@ufpr.br**
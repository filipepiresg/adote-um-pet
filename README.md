# Adote um Pet

Por: _**Filipe Pires Guimarães**_

## Descrição

Esse projeto foi desenvolvido para a disciplina **TCC** da _Universidade Federal de Campina Grande (UFCG)_, nele foi pensado em um aplicativo para dispositivos móveis para auxiliar o gerenciamento/divulgação de pets que estão disponíveis para adoção.

Foi pensado que usuários `comuns` não precisariam logar na aplicação, nisso ele tem como visualizar o mapa da localização das organizações cadastradas e uma lista de pets disponíveis para adoção, e através dessa lista é possível ainda ligar para tal organização. Para os usuários `organização`, seria necessário cadastrar-se, para que seja possível adicionar novos anúncios de pets disponíveis para adoção, para atualizar seus dados, e também para visualizar o mapa.

Os usuários `comuns` serão notificados sobre novos anúncios, através do `Onesignal`.

> Por falta de uma conta de desenvolvimento `Apple`, foi retirado do aplicativo `iOS` o `Onesignal`.

## Ferramentas utilizadas

- React Native
- Firebase
- Google Maps
- Onesignal (somente para `Android`)

## Padrão de projeto

Foi utilizado o `eslint + prettier` com as regras [aqui](./.eslintrc.js)

## Como rodar

- Em produção
  - **[Android]** O `.apk` está disponível em [release](https://github.com/filipepiresg/adote-um-pet/releases) para download
  - **[iOS]** Infelizmente, não será disponibilizado o `.ipa`, pois é necessário uma licença para isso.
- Em desenvolvimento
  1. Necessário primeiramente clonar este repositório, depois instalar as dependência com o comando `npm i` (ou `yarn install`)
  2. Copiar o arquivo `.env.example` para `.env` e colocar suas chaves de acesso a _api google maps_ e ao projeto no _onesignal_
  3. Rodar o comando `npm start` (ou `yarn start`)
     1. **Para android**, deve-se abrir o emulador (ou estar conectado com o celular ao computador), e rodar o comando `npm run dev:android` (ou `yarn run dev:android`).
     2. **Para ios**, deve-se ter instalado o `XCode` (em uma máquina com SO `OSX`), e em seguida rodar o comando `npm run dev:ios` (ou `yarn run dev:ios`). 
        1. > **Não é possível enviar notificação para simuladores**, veja mais [aqui](https://documentation.onesignal.com/docs/troubleshooting-ios#3-test-on-mobile-device).
        2. >  Foi retirado toda a configuracão de notificacão, pois é necessário uma conta de desenvolvimento `Apple`, e fica inviável nesse momento a criacao dessa conta

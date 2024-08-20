# Youtube Total Time

## Descrição

Este aplicativo é capaz de recuperar o tempo total de vídeos e transmissões ao vivo já gravadas de qualquer canal do YouTube.

## Requisitos

- [Node.js](https://nodejs.org/) instalado em versões LTS latest.

## Instruções

1. **Clonando o Repositório:**
   - Abra o terminal e execute o comando abaixo para clonar o repositório:
     ```bash
     git clone https://github.com/AlexSnider/YoutubeTotalTime
     ```
   - Navegue até o diretório do projeto:
     ```bash
     cd YoutubeTotalTime
     ```

2. **Configuração do Ambiente:**
   - Renomeie o arquivo `.env.example` para `.env` e preencha as informações necessárias. 

3. **Obtenção da Chave de API do YouTube:**

   Para utilizar este aplicativo, você precisará de uma chave de API do YouTube. Siga os passos abaixo para obtê-la:

   1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
   2. Faça login com sua conta Google, se necessário.
   3. Crie um novo projeto clicando em "Select a project" e depois em "New Project".
   4. Dê um nome ao projeto e clique em "Create".
   5. Após a criação do projeto, certifique-se de que ele está selecionado no topo da página.
   6. No menu à esquerda, vá para **APIs & Services** > **Library**.
   7. Procure por "YouTube Data API v3" e clique nela.
   8. Clique em "Enable" para ativar a API para o seu projeto.
   9. Após ativar a API, vá para **APIs & Services** > **Credentials**.
   10. Clique em "Create Credentials" e selecione "API key".
   11. Sua chave de API será gerada. Copie essa chave e cole-a no arquivo `.env`, no campo `YOUTUBE_API_KEY`.

4. **Execução:**
   - Escolha o arquivo `run` apropriado para o sistema operacional que você está usando:
     - `runAppLinux.sh` para Linux/macOS.
     - `runAppWindows.bat` para Windows.
   - Execute o script e aguarde até que o arquivo `totaltime.txt` seja gerado com os dados.

## Observação

Os dados recuperados podem ser inconsistentes devido à consistência eventual da API do YouTube, o que pode resultar em informações que ainda estão sendo propagadas nos servidores.

## Licença

[MIT](https://github.com/AlexSnider/YoutubeTotalTime/blob/main/LICENSE).

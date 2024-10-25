# ravasio-backoffice

## Contatti

Rilasciato il 15 gennaio 2024.

## Stack tecnologico

Client: React + Typescript + SCSS
Server: NestJS + Typescript + TypeORM

## Installazione

- Occorre anzitutto produrre l'_artefatto_, e trasferirlo sulla macchina di produzione. Nel repository è configurata (file `.github/workflows/build.yml`) una github action su una macchina Linux con Docker installato, è sufficiente lanciare i comandi:
  - posizionarsi nella root folder del repository;
  - lanciare `docker build -t ravasio-backoffice .`;
  - lanciare `docker cp ravasio-backoffice:/build /path/to/folder`;
  - a questo punto, all'interno di `/path/to/folder`, si troverà l'artefatto.
- L'artefatto si compone delle seguenti sottocartelle: `client`, `server` e `server-install`.
  - la cartella `client` contiene il client React, nella forma di un sito statico "single page application";
  - la cartella `server` contiene il server nodejs;
  - la cartella `server-install` contiene una procedura che consente l'installazione del server nodejs come servizio Windows (il nome del servizio windows è `Ravasio nodejs server`).

### Installazione del server

- All'interno della cartella `server-install`, occorre modificare opportunamente i parametri del file `.env`.
- Installare NodeJS (installer MSI a 64-bit scaricabile dal sito ufficiale di Node), versione v20 LTS. Utilizzare tutte le opzioni predefinite.
- All'interno dell'artefatto, occorre andare nella cartella `server/server`, e lanciare `npm ci --omit=dev`, per installare i pacchetti node da cui il server dipende.
- All'interno dell'artefatto, occorre andare nella cartella `server-install`, e lanciare `npm ci --omit=dev`, per installare i pacchetti node da cui il server dipende.
- Con permessi di amministratore, andare nella cartella `server-install` dell'artefatto e lanciare `node ./install-service.js`: questo script installa il servizio e lo avvia.
- I log del server finiscono salvati in `server/server/dist/daemon`

### Installazione del client

- Aggiornare la configurazione nel file `index.html` del client.
- Il client può essere servito per mezzo di IIS. Occorre aver installato, a tal fine:
  - IIS (installabile come funzionalità di Windows Server)
  - Supporto di IIS per ASP.NET 4.7 (sempre installabile come funzionalità di Windows Server) - è veramente necessario?
  - Il modulo di URL REWRITING per IIS, che si può scaricare qui: https://www.iis.net/downloads/microsoft/url-rewrite
- Per creare il sito IIS, aprire pannello di controllo IIS > Siti > "Aggiunti sito web" > scegliere come percorso fisico la cartella `client`.
- Il file `web.config` presente nel client istruisce già IIS a servire il sito statico nella forma di una Single Page Application.

## Note sullo sviluppo

Dopo aver clonato il repository, è necessario:

- installare i node_modules del common, e compilare: `cd ./common`, `npm i`, e `npx tsc`
- installare i node_modules del client: `cd ../client`, `npm i`
- installare i node_modules del server: `cd ../server`, `npm i`

A questo punto, occorre:

- configurare il server e il client, creando adeguatamente un file `.env.local` nella cartella `server`, e uno nella cartella `client`,
  che contengano i valori corretti dei parametri di configurazione (si utilizzino come modelli `client/.env` e `server/.env`);
- avviare il server: `cd server && npm run start:dev`
- avviare il client: `cd client && npm start`

Sul server è attivo swagger: per accedervi basta navigare sulla rotta `/api`.

Il client contiene, nella cartella `/client/services/openapi`, la definizione tipizzata di rotte ed entità dedotte dalle specifiche openapi:
è generata automaticamente lanciando `npm run types:openapi` nel client.

## Altre note interne

Per creare i models a partire dalla struttura del DB, in modo automatico, abbiamo adoperato il comando
`typeorm-model-generator -h 172.16.2.20 -d AHRW_DEMO -p 1433 -u trickyleaf -x !trickYleaf_23 -e mssql`

# A4M33VIA-semestral-work
Semestrální projekt pro účely předmětu A4M33VIA.

### Návod pro lokální spuštění
1) spusť `npm install` (stažení a instalace všech balíčků)
2) spusť v adresáři servers `deno run --allow-read --allow-net --allow-env server.ts
   ` (spuštění aplikace na adrese `localhost:8080`)

### URL nasazené aplikace
- Client : https://via-semestral-work-2021.web.app
- Server (vlastní API): https://via-healthy-app-1681c74d.deno.dev/

### API dotazy
Dotazy zasílané na serverové API mají následující strukturu:

` https://via-healthy-app-1681c74d.deno.dev/api/bmi?height=<výška>&weight=<hmotnost>`

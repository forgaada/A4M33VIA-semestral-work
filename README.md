# Healthy Lifestyle App
Semestrální projekt pro účely předmětu A4M33VIA.

## Úvod
Předmětem této semestrální práce je využití dostupných API pro vytvoření aplikace pro
zdravý životní styl. Aplikace využívá jak veřejná API, tak i vlastní dokumentované API.

## Využívaná API
### BMI Calculator API
Jedná se o vlastní vytvořené API, které umožňuje na základě vstupních URL parametrů
(výška a hmotnost) vypočítat tzv. Body Mass Index (BMI) jedince.

Backendová část byla vytvořena s použitím jazyka Deno a je nasazená na adrese 
https://via-healthy-app-1681c74d.deno.dev/ .

Dotazy zasílané na server musí splňovat následující strukturu:

` https://via-healthy-app-1681c74d.deno.dev/api/bmi?height=<výška>&weight=<hmotnost>`

### Nutritionix API
Nutritionix je jednou z největších databází jídel na světě. Vystavuje veřejné API pro hledání 
nutričních hodnot pokrmů a umožňuje i full-textové vyhledávání v anglickém jazyce.

API bylo v semestrální práci použito a uživatel může pomocí něj vyhledat záznam s nejvyšší relevancí
včetně výčtu dostupných informací o nutričních hodnotách pokrmu.

### Fitness Calculator API
Fitness Calculator API umožňuje na základě vstupních parametrů vypočítat rychlost bazálního metabolismu
jedince. Na základě tohoto údaje rovněž stanovuje doporučenný denní kalorický příjem.

## Návod pro lokální spuštění aplikace
1) spusť `npm install` (stažení a instalace všech balíčků)
2) spusť v adresáři servers `deno run --allow-read --allow-net --allow-env server.ts
   ` (spuštění aplikace na adrese `localhost:8080`)

## URL nasazené aplikace
- Client : https://via-semestral-work-2021.web.app
- Server (vlastní API): https://via-healthy-app-1681c74d.deno.dev/
- Swagger dokumentace: http://via-healthy-app-documentation.wz.cz/


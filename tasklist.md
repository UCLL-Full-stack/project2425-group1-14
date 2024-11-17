# Tasklist
## 1 - Typescript & Testing
- [x] De code van je project staat op GitHub classroom, in een repository die overeenkomt met je Toledo groep.
- [x] De map “back-end/model” bevat je domeinmodel geschreven in Typescript.
- [ ] De map “back-end/test/model” bevat alle tests voor je domeinobjecten. Op dit moment kun je alleen het aanmaken van je objecten testen, validatie is voor de volgende les.
- [ ] Tests worden geschreven met Jest.

## 2 - Back-end: Rest API wih Node.js & Express.js
- [~] Alle lagen worden geïmplementeerd volgens de principes van gelaagde architectuur:
    - [~] Domein
    - [~] Services
    - [~] Controllers
- [x] Validatie:
    - [x] Controllers bevatten geen validatie.
    - [X] Services bevatten overkoepelende validatieregels.
    - [x] Domeinobjecten bevatten input validatie en business validatie die specifiek zijn voor dat domeinobject.
- [ ] Testen:
    - [ ] Alle domeinobjecten zijn volledig getest met Jest, inclusief validatie.
    - [ ] Alle services zijn volledig getest met Jest.
- [ ] Controllers worden getest via swagger (handmatig), geen aparte tests nodig.
- [x] De gegevens die binnenkomen via requests in de router worden ingekapseld in Data Transfer Objects. Deze DTO's zijn gedefinieerd in een bestand index.ts in de map types.
- [~] Alle routes zijn volledig gedocumenteerd en uitvoerbaar met Swagger via de url /api-docs.
- [~] Voor elk type is er een volledig uitgewerkt componentenschema gedefinieerd bovenaan de controller zelf.

## 3 - Front-end: Introduction to React & Next.js
- [x] Een Next.js front-end app is geïnstalleerd in de front-end directory.
- [x] Alle pagina's die een route in Next.js nodig hebben worden in de map “pages” geplaatst.
- [ ] Pagina's worden opgebouwd uit verschillende herbruikbare componenten die in de map “components” worden geplaatst.
    - [ ] Componenten worden niet rechtstreeks geïmplementeerd in een pagina.
- [ ] “Props” worden gebruikt om dynamische inhoud binnen componenten weer te geven.
- [ ] “State” wordt gebruikt om informatie op te slaan tussen verschillende renders van een component (geen lokale variabelen!).
- [ ] Callback functies worden gebruikt om hogerliggende componenten of pagina's op de hoogte te brengen van een gebeurtenis binnen de huidige component.
- [ ] Het aanroepen van een Rest API gebeurt in afzonderlijke, herbruikbare Services. Er wordt nooit fetch logica rechtstreeks in een component geschreven.
- [ ] Dynamische routing moet op de juiste plaatsen worden gebruikt.
- [ ] Je gebruikt events op verschillende plaatsen (onclick, onhover, ...).

## 4 - Database ✓
- [x] Je werkt niet langer met statische gegevens in de repositories, maar met een echte database.
- [X] Wijzigingen aan bestaande entiteiten moeten in de servicelaag via het domeinmodel worden gedaan en pas daarna via de repository-laag naar de database worden gestuurd. Op deze manier worden business- en validatieregels niet geschonden.
- [x] Het databaseschema wordt gemodelleerd in een Prisma-schema en de Prisma-client wordt gegenereerd.
- [x] Databaseobjecten in de domeinlaag gebruiken de Prisma-client om de database te bevragen.
- [x] Er worden geen Prisma-objecten doorgegeven aan de servicelaag. Prisma-objecten worden gekoppeld aan domeinobjecten in een statische from-methode van het bijbehorende domeinobject.
- [x] Er wordt een lokale postgreSQL database geïnstalleerd en gebruikt. De configuratie om verbinding te maken staat in een .env bestand.
   => WE HEBBEN EEN REMOTE DATABASE ^_^
- [x] Er wordt minimaal 1 één-op-veel relatie gemodelleerd.
- [x] Tenminste 1 many-to-many relatie is gemodelleerd in je prisma schema en domein objecten. Er mag geen circulaire afhankelijkheid bestaan in je domeinlaag, dus beslis of je een tussenliggend object gebruikt of dat je de relatie in het domein uni-directioneel maakt.

## 5 - Front-end: React & Next.js advanced
- [ ] De hook useSWR wordt gebruikt voor API-requests.
    - [ ] SSR en SSG kunnen optioneel worden toegepast.
- [ ] De hook useEffect wordt gebruikt voor interactie met een extern systeem (bijv. browser storage).
- [ ] Er is minstens 1 functioneel formulier met validatie, foutafhandeling en integratie met de back-end.
- [ ] Er is minstens 1 login formulier met validatie en foutafhandeling.
- [ ] Er worden minstens 2 waarden opgeslagen in de browser storage en gebruikt in de hele applicatie.
- [ ] Styling is toegepast in de mate dat je applicatie bruikbaar en leesbaar is. Je mag je eigen styling framework kiezen.
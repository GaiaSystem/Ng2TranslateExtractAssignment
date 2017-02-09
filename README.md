# Ng2TranslateExtractAssignment

Välkommen till Ng2TranslateExtractAssignment.

I detta repository hittar du två projekt, **Application** och **gaia-translate-extract**.

**Application** är en Angular 2 app och ska när den körs rendera en sida enligt följande bild.

![Alt text](image1.PNG?raw=true =250x "Application")

**gaia-translate-extract** är ett projekt som hittar och extraherar texter som ska översättas från en Angular 2 app.

## Uppgift 1
Det första du ska göra är att få igång **Application**.
Börja med att klona detta repository och starta **Application** på din egen dator.

## Uppgift 2
Som du kanske har sett är orden som listas i **Application** märkta med ett direktiv som heter *translate*.
Detta används för att förstå vilka delar av applikationen som ska översättas till andra språk.

Om du kör kommandot *npm run extract:translations* så kommer det genereras en fil *./src/translations/zh_CN.json* där det är möjligt
att skriva kinesiska översättningar för de extraherade orden.
Som du ser är översättningarna i filen inte sorterade i bokstavsordning. Din uppgift är att modifiera **gaia-translate-extract** så
att det är möjligt att få översättningar i filen *./src/translations/zh_CN.json* sorterade i bokstavsordning om man skulle vilja. (OBS! Det är inte listan som visas i webbläsaren som ska sorteras, utan själva filen zh_CH.json)

Gör följande:

    1. Lägg till en flagga för kommandot ng2-translate-extract som heter --sort.
    2. Modifiera TranslationCollection så att det finns möjlighet att sortera översättningar.
    3. Gör så att filen med översättningar sorteras i alfabetisk ordning om flaggan "--sort" används.

## Uppgift 3 (Bonus)
Om du har lust, tid och möjlighet skriv enhetstester för den kod du utvecklat i *Uppgift 2*.

# Lycka till!


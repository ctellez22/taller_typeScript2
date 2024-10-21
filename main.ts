import { dataSeries } from "./dataSeries.js";
import { Serie } from "./serie.js";

let seriesTbody: HTMLElement = document.getElementById('series')!;
let seriesCbody: HTMLElement = document.getElementById('infoCard')!;


renderSeriesInTable(dataSeries);

function calculateSeasonAverage(series: Serie[]) {
    let numSeries = series.length;
    let sumSeasons = 0;
    series.forEach(c=>{
        sumSeasons += c.seasons;
    });
return sumSeasons/numSeries
}

function renderSeriesInTable(series: Serie[]): void {
    series.forEach(c => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${c.id}</td>
                           <td><a href="#" id="button-${c.id}">${c.name}</a></td>
                           <td>${c.channel}</td>
                           <td>${c.seasons}</td>`;
        seriesTbody.appendChild(trElement);
    });
    let seasonAverage = calculateSeasonAverage(series);
    let seasonAvgElement = document.createElement("tr");
    seasonAvgElement.innerHTML=`<p>Seasons average: ${seasonAverage}<p>`;
    seriesTbody.appendChild(seasonAvgElement);

}

function setCurrentSerie(idSerie: number) {
    let i: number = 0;
    let found: boolean = false;
    while (i < dataSeries.length && !found) {

        if (dataSeries[i].id == idSerie) {
            found = true;
            renderSerieCard(dataSeries[i]);
        }
        i = i + 1;

    }

}

function renderSerieCard(serie: Serie) {
    seriesCbody.removeChild(document.getElementById("currentCard")!);
    let cardElement = document.createElement("div");
    cardElement.setAttribute("id","currentCard");
    cardElement.setAttribute("class", "card");

    cardElement.innerHTML =
        `<img  src="${serie.image}" alt="Imagen serie">
                <div class="card-body">
                    <h5 class="card-title">${serie.name}</h5>
                    <p class="card-text">${serie.description}</p>
                    <a href="${serie.webpage}">${serie.webpage}</a>
                </div> `;
    seriesCbody.appendChild(cardElement);
    

}

dataSeries.forEach(c => {
    document.getElementById(`button-${c.id}`)!.onclick = () => setCurrentSerie(c.id);
});

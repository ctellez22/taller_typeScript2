import { dataSeries } from "./dataSeries.js";
let seriesTbody = document.getElementById('series');
let seriesCbody = document.getElementById('infoCard');
renderSeriesInTable(dataSeries);
function calculateSeasonAverage(series) {
    let numSeries = series.length;
    let sumSeasons = 0;
    series.forEach(c => {
        sumSeasons += c.seasons;
    });
    return sumSeasons / numSeries;
}
function renderSeriesInTable(series) {
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
    seasonAvgElement.innerHTML = `<p>Seasons average: ${seasonAverage}<p>`;
    seriesTbody.appendChild(seasonAvgElement);
}
function setCurrentSerie(idSerie) {
    let i = 0;
    let found = false;
    while (i < dataSeries.length && !found) {
        if (dataSeries[i].id == idSerie) {
            found = true;
            renderSerieCard(dataSeries[i]);
        }
        i = i + 1;
    }
}
function renderSerieCard(serie) {
    seriesCbody.removeChild(document.getElementById("currentCard"));
    let cardElement = document.createElement("div");
    cardElement.setAttribute("id", "currentCard");
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
    document.getElementById(`button-${c.id}`).onclick = () => setCurrentSerie(c.id);
});

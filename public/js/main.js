let cases;
let deaths;
let recovered;
let critical;

let select;
let nameSelect;
let valueSelect;

var chart;
var aux = 0;
$(document).ready(function() {
    fetchData();
});


function fetchData(){
    fetch("https://coronavirus-19-api.herokuapp.com/countries").then(response => {
        return response.json();
    }).then(function(response) {
        select = document.getElementById("country");
        selectValue = select.options[select.selectedIndex].value;
        selectName = select.options[select.selectedIndex].text;

        let country = response.filter(country => country.country === 'Brazil')[0];

        cases = country.cases;
        deaths = country.deaths;
        recovered = country.recovered;
        critical = country.critical;

        console.log(country);
    });
}

// gera o gráfico
function spawnChart(){
    chart = new Chart(document.getElementById('chart'), {
        type: 'doughnut',
        data: {
            labels: ['Casos totais', 'Recuperados', 'Críticos', 'Mortos'],
            datasets: [
                {
                    label: "Ocorrências",
                    backgroundColor: ["#3e95cd", "#00ff7f", "#bd353b", "#1C1C1C"],
                    data: [cases, recovered, critical, deaths]
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'gráfico gerado teste'
            }
        }
    });
}   
let cases;
let deaths;
let recovered;
let critical;

let select;
let selectName;
let selectValue;

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
        document.getElementById("countryName").innerHTML = selectName;

        let country = response.filter(country => country.country === selectValue)[0];

        cases = country.cases;
        deaths = country.deaths;
        recovered = country.recovered;
        critical = country.critical;

        
        spawnChart();
    });
}

// gera o gráfico
function spawnChart(){  
    if (aux == 1){
        chart.destroy();
        aux = 0;
    }

    chart = new Chart(document.getElementById('chart'), {
        type: 'doughnut',
        data: {
            labels: ['Casos totais', 'Mortes', 'Recuperados', 'Críticos'],
            datasets: [
                {
                    label: "Ocorrências",
                    backgroundColor: ["#FAA613", "#990033", "#688E26", "#550527"],
                    data: [cases, deaths, recovered, critical]
                }
            ]
        }
    });

    document.getElementById("cases").innerHTML = cases;
    document.getElementById("deaths").innerHTML = deaths;
    document.getElementById("recovered").innerHTML = recovered;
    aux++;
}


document.getElementById('change').addEventListener('click', function() {
    if (window.chart.options.circumference === Math.PI) {
        window.chart.options.circumference = 2 * Math.PI;
        window.chart.options.rotation = -Math.PI / 2;
    } else {
        window.chart.options.circumference = Math.PI;
        window.chart.options.rotation = -Math.PI;
    }

    window.chart.update();
});
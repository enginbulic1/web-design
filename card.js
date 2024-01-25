function mobileMenu() {
    var originalMenu = document.querySelector('.header ul');
    var pom = document.querySelector('.pomocni');
    let btn = document.querySelector('.header button');

    if(btn.innerText === "MENU") {
        var clonedMenu = originalMenu.cloneNode(true);
        pom.appendChild(clonedMenu); 
        btn.innerText = "CLOSE";
    } else if(btn.innerText === "CLOSE") {
        pom.removeChild(pom.lastChild); 
        btn.innerText = "MENU";
    }
}

function stvarnoVremeUvecano(x) 
{
    var sada = new Date();

    sada.setHours(sada.getHours() + x);

    var sati = sada.getHours();
    var minuti = sada.getMinutes();

    sati = (sati < 10) ? '0' + sati : sati;
    minuti = (minuti < 10) ? '0' + minuti : minuti;

    return sati + ':' + minuti;
}


function trenutnoVreme() 
{
    var sada = new Date();

    var godina = sada.getFullYear();
    var mesec = sada.getMonth() + 1; 
    var dan = sada.getDate();
    var sati = sada.getHours();

    
    mesec = (mesec < 10) ? '0' + mesec : mesec;
    dan = (dan < 10) ? '0' + dan : dan;
    sati = (sati < 10) ? '0' + sati : sati;

    return godina + '-' + mesec + '-' + dan + ' ' + sati + ':00:00';
}


function stvarniDatum() {
    var sada = new Date();

    var dan = sada.getDate();
    var mesec = sada.getMonth() + 1; 
    var godina = sada.getFullYear();


    dan = (dan < 10) ? '0' + dan : dan;
    mesec = (mesec < 10) ? '0' + mesec : mesec;

    return dan + '.' + mesec + '.' + godina;
}

function stvarnoVreme() {
    var sada = new Date();

    var sati = sada.getHours();
    var minuti = sada.getMinutes();


    sati = (sati < 10) ? '0' + sati : sati;
    minuti = (minuti < 10) ? '0' + minuti : minuti;

    return sati + ':' + minuti;
}






function odrediIkonicu(status, divNeki) {
        let slika = document.querySelector('.' + divNeki + ' img');
    

    // radi ispravno
    switch(status)
    {
        case 'Clear sky':
            slika.src = 'icons/clear-sky.png'; // ubacit sliku neku
        break;
        case 'Overcast':
            slika.src = 'icons/overcast.png';
        break;
        case 'Partly cloudy':
        case 'Cloudy':
            slika.src = 'icons/cloudy.png';
        break;
        case 'Light snow':
        case 'Snow':
        case 'Snow showers':    
            slika.src = 'icons/snow.png';
        break;
        case 'Light rain':
        case 'Rain':
        case 'Rain showers':    
            slika.src = 'icons/rain.png';
        break;
        case 'Sun':
            slika.src = 'icons/sun.png';
        break;
        case 'Sleet':
        case 'Light sleet':
        case 'Sleet showers':
            slika.src = 'icons/sleet.png';
        break;
        case 'Storm':
            slika.src = 'icons/storm.png';
        break;
        default:
            slika.src = 'icons/sun.png';                  
    }
}

var currentIndex;
var counter = 0;
var apiItem;
var trenutniInterval = 0; // Globalna promenljiva za praćenje trenutnog intervala

function promena(apiItem, i) {
    const segmenti = ['prvi', 'drugi', 'treci', 'cetvrti'];

    for (let j = 0; j < segmenti.length; j++) {
        let selektor = '.' + segmenti[j] + ' .si-';
        let pomeraj = j + 1 + trenutniInterval; // Dodajemo trenutniInterval na pomeraj

        document.querySelector(selektor + 'time').innerText = stvarnoVremeUvecano(pomeraj);
        document.querySelector(selektor + 'temp').innerText = apiItem.forecast[i + pomeraj].T + '°c';
        document.querySelector(selektor + 'status').innerText = apiItem.forecast[i + pomeraj].W;
        
        let status = apiItem.forecast[i + pomeraj].W;
        odrediIkonicu(status, segmenti[j]);
    }
}



function moveRightFunction() {
    if(trenutniInterval < (counter - currentIndex) - 3) 
    {
        trenutniInterval++;
        promena(apiItem, trenutniInterval);
    }
}


function moveLeftFunction() {
    if (trenutniInterval > 0) {
        trenutniInterval--;
        promena(apiItem, trenutniInterval); // Pozivamo promena umesto checkWeather
    }
}




const apiUrl = "http://apis.is/weather/forecasts/en?stations=1" ;

async function checkWeather()
{
    const response = await fetch(apiUrl);

    var data = await response.json();
    
    // console.log(data);

    var n = data.results[0].forecast.length;
    
    var currentTime = trenutnoVreme();

    var currentDay = trenutnoVreme().split(" ")[0].split("-")[2].trim();

    apiItem = data.results[0];
    
    for(var i=0; i < n; i++)
    {

        var apiTime = apiItem.forecast[i].ftime;
        // console.log(apiTime); 

        if(currentTime === apiTime) // nasli smo niz iz kojeg kupimo podatke
        {
            currentIndex = i+1;
            // console.log(currentIndex);
            break;
        }

    }

    for(var j=0; j < n; j++)
    {
        apiTime = apiItem.forecast[j].ftime;

        var apiDay = apiTime.split(" ")[0].split("-")[2].trim();

        if(apiDay === currentDay)
        {
            counter++;
        }
    }

    // console.log("counter" + counter);

    document.querySelector('#city').innerText = data.results[0].name; // ime Grada
    document.querySelector('#today-date').innerText = ("Today: " + stvarniDatum()); // trenutni datum
    // document.querySelector('#today-time').innerText = (stvarnoVreme());  // trenutno vreme
    document.querySelector('#status').innerText = apiItem.forecast[i].W;  // Status vremena
    document.querySelector('#temp').innerText = (apiItem.forecast[i].T + '°c'); // temperatura

    document.querySelector('#wind-sped').innerHTML = `Wind Speed: <span>${apiItem.forecast[i].F} m/s</span>`; // brzina vetra DODATI IKONICU I TEKTS
    document.querySelector('#wind-direction').innerHTML = `Wind Direction: <span>${apiItem.forecast[i].D} </span>`; // pravac vetra DODATI IKONICU I TEKST
   
    
    


    // promena pozadine
    let status = apiItem.forecast[i].W;

    switch(status)
    {
        case 'Clear sky':
            document.body.style.backgroundImage = "url('backGrounds/clear-sky.jpg')";
        break;
        case 'Overcast':
            document.body.style.backgroundImage = "url('backGrounds/overcast.jpg')";
        break;
        case 'Partly cloudy':
        case 'Cloudy':
            document.body.style.backgroundImage = "url('backGrounds/cloudy.jpg')"; 
        break;
        case 'Light snow':
        case 'Snow':
        case 'Snow showers':    
            document.body.style.backgroundImage = "url('backGrounds/snow.jpg')";
        break;
        case 'Light rain':
        case 'Rain':
        case 'Rain showers':    
            document.body.style.backgroundImage = "url('backGrounds/rain.jpg')";
        break;
        case 'Sun':
            document.body.style.backgroundImage = "url('backGrounds/sun.jpg')";
        break;
        case 'Sleet':
        case 'Light sleet':
        case 'Sleet showers':
            document.body.style.backgroundImage = "url('backGrounds/sleet.png')";
        break;
        case 'Storm':
            document.body.style.backgroundImage = "url('backGrounds/storm.jpg')";
        break;
        default:
            document.body.style.backgroundImage = "url('backGrounds/sun.jpg')";             

    }



    promena(apiItem, i);

}

checkWeather();



    


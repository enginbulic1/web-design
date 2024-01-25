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






let errors = {
    "poruka": [],
    "email": [],
    "korisnicko_ime": [],
    "ime_prezime":[]
};

let inputs = document.querySelectorAll('input');

let textarea = document.querySelector('textarea');

textarea.addEventListener('change',function(event){

    let currentArea = event.target;
    let areaName = currentArea.getAttribute('name');
    let areaValue = currentArea.value;

    errors[areaName] = [];

    if((areaValue.length <5 && areaValue.length != 0) || areaValue.length > 50)
    {
        errors[areaName] = ['This field must contain between 5 and 50 characters'];
    }

    populateErrors();

});

for(let i = 0; i < inputs.length; i++) {

    inputs[i].setAttribute('autocomplete', 'off'); // sprecavanje autoispune

    inputs[i].addEventListener('change', function(event) {

        let currentInput = event.target;
        let inputName = currentInput.getAttribute('name');
        let inputValue = currentInput.value;

        errors[inputName] = []; 

        if(inputValue.length < 5) {
            // errors[inputName].push('The field must contain at least 5 characters');
            errors[inputName]=['The field must contain at least 5 characters'];
        } else {
            switch(inputName) {
                case 'ime_prezime':
                    let tekst = inputValue.trim().split(" ");
                    if(tekst.length < 2) {
                        errors[inputName].push("Please enter Name and Surname");
                    }
                break;

                case 'email':
                    if(!mailValidation(inputValue)) {
                        errors[inputName].push("Incorrect E-mail address");
                    }
                break;
            }
        }

        populateErrors();
    });
}





function populateErrors() {
  
    for (let key of Object.keys(errors)) {
        let input = key === "poruka" ? document.querySelector(`textarea[name="${key}"]`) : document.querySelector(`input[name="${key}"]`);
        if (!input) continue;

        let parentElement;
        if (key === 'ime_prezime') {

            parentElement = input.closest('.imePrezime');
        } else {

            parentElement = input.parentElement;
        }


        let lista = parentElement.querySelector('.lista');
        if (!lista) {
            lista = document.createElement('ul');
            lista.className = "lista";
            parentElement.appendChild(lista);
        } else {

            lista.innerHTML = '';
        }

        errors[key].forEach(error => {
            let li = document.createElement('li');
            li.innerText = error;
            lista.appendChild(li);
        });
    }
}


function mailValidation(m) 
{
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(m);
}






function Errors() 
{
    for (let key of Object.keys(errors)) 
    {
        if (errors[key].length > 0) 
        {
            return true;
        }
    }
    return false;
}

function blankInputs()
{

    let inputs = document.querySelectorAll('input');
    
    for (let input of inputs) 
    {
        if (input.value.trim() === '') 
        {
            return true;
        }
    }

    return false;
}



function showCustomAlert(message) {
    document.getElementById('customAlertMessage').innerText = message;
    document.getElementById('customAlert').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

function handleSendMessage() {
    if (Errors()) {
        showCustomAlert("Please correct the errors in the form.");
    } else if (blankInputs()) {
        showCustomAlert("Please fill all fields.");
    } else {
        window.location.href = "feedback.html";
    }
}



document.querySelector('#message-btn').addEventListener('click', handleSendMessage);






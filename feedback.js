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
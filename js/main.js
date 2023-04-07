function desplegarMenu (){
    let btnMenu = document.querySelector(".btn-menu")
    let menu = document.querySelector(".menu")

    btnMenu.addEventListener("click", function (){
        menu.classList.toggle("abierto")
    })
}

desplegarMenu();
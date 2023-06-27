let tickets = JSON.parse(sessionStorage.getItem(sessionStorage.getItem("data-seance-id")));
let ticketWrapper = document.getElementsByClassName("ticket__info-wrapper")[0];
ticketWrapper.getElementsByClassName("ticket__details ticket__title")[0].textContent = tickets.currentBuy["data-film-name"];

let ticketPlaces = ticketWrapper.getElementsByClassName("ticket__details ticket__chairs")[0];
ticketPlaces.textContent = "";
Object.keys(tickets.currentBuy["chair"]).forEach((row,index) => {
    tickets.currentBuy["chair"][row].forEach((place,index) => {
        ticketPlaces.textContent = ticketPlaces.textContent + `${row}/${place}`; // информация о каждом месте
        if(tickets.currentBuy["chair"][row].length - 1 > index){
            ticketPlaces.textContent = ticketPlaces.textContent + ", ";
        }  
    })
    if(Object.keys(tickets.currentBuy["chair"]).length - 1 > index){
        ticketPlaces.textContent = ticketPlaces.textContent + ", ";
    }
})
ticketWrapper.getElementsByClassName("ticket__details ticket__hall")[0].textContent = tickets.currentBuy["data-hall-name"].substr(tickets.currentBuy["data-hall-name"].length - 1);
ticketWrapper.getElementsByClassName("ticket__details ticket__start")[0].textContent = tickets.currentBuy["data-seance-time"];
ticketWrapper.getElementsByClassName("ticket__details ticket__cost")[0].textContent = tickets.currentBuy["cost"];

// показываем, что на кнопку можно нажать
document.getElementsByClassName("acceptin-button")[0].addEventListener("mouseenter",function () {
    this.style.cursor = "pointer";
})
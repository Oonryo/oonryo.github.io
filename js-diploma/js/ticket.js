let wrapper = document.getElementsByClassName("ticket__info-wrapper")[0];

let tickets = JSON.parse(sessionStorage.getItem(sessionStorage.getItem("data-seance-id")));
wrapper.getElementsByClassName("ticket__details ticket__title")[0].textContent = tickets.currentBuy["data-film-name"];

let ticketPlaces = wrapper.getElementsByClassName("ticket__details ticket__chairs")[0]; 
ticketPlaces.textContent = "";
Object.keys(tickets.currentBuy["chair"]).forEach((row,index) => {
    tickets.currentBuy["chair"][row].forEach((place,index) => {
        ticketPlaces.textContent = ticketPlaces.textContent +`${row}/${place}`;
        if(tickets.currentBuy["chair"][row].length - 1 > index){
            ticketPlaces.textContent = ticketPlaces.textContent + ", ";
        }  
    })
    if(Object.keys(tickets.currentBuy["chair"]).length - 1 > index){
        ticketPlaces.textContent = ticketPlaces.textContent + ", ";
    }
})
wrapper.getElementsByClassName("ticket__details ticket__hall")[0].textContent = tickets.currentBuy["data-hall-name"].substr(tickets.currentBuy["data-hall-name"].length - 1);
wrapper.getElementsByClassName("ticket__details ticket__start")[0].textContent = tickets.currentBuy["data-seance-time"]; 


let childElement = wrapper.children[3]; 

let div = document.createElement("div"); // создаем место для кода

document.getElementsByClassName("ticket__info-qr")[0].remove(); // удаляем qr по умолчанию, чтобы заменить его дальше

let infoToCode = `Фильм: ${tickets.currentBuy["data-film-name"]}\nРяд/Место: ${ticketPlaces.textContent}\nЗал: ${tickets.currentBuy["data-hall-name"].substr(tickets.currentBuy["data-hall-name"].length - 1)}\nНачало: ${tickets.currentBuy["data-seance-time"]}`;
JSON.stringify(infoToCode);
let qr = QRCreator(infoToCode,
{ mode: 4,
  eccl: 0,
  version: 8,
  mask: 3,
  image: 'png',
  modsize: 4,
  margin: 0
}); // замена кода
const content = (qrcode) =>{
  return qrcode.error ?
    `Произошла ошибка ${qrcode.error}`:
    qrcode.result;
};
div.classList.add("ticket__info-qr");
let qrCanvas = content(qr);
qrCanvas.style.padding = "5px";
qrCanvas.style.background = "white";
div.appendChild(qrCanvas);
wrapper.insertBefore(div, childElement.nextSibling);// вставляем qr код
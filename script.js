// Відображення дати придбання
function displayPurchaseInfo() {
    let purchaseDate = localStorage.getItem('purchaseDate');

    if (!purchaseDate) {
        const now = new Date();
        localStorage.setItem('purchaseDate', now.toISOString());
        purchaseDate = now.toISOString();
    }

    const formattedDate = new Date(purchaseDate).toLocaleString('uk-UA', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    document.getElementById('purchase-info').textContent = `Придбано ${formattedDate}`;
}

// Збільшення номера квитка
function incrementTicketNumber() {
    let ticketNumber = localStorage.getItem('ticketNumber');
    if (!ticketNumber) {
        ticketNumber = Math.floor(Math.random() * (500000- 186542+ 1)) + 186542;
    }
    localStorage.setItem('ticketNumber', ticketNumber);
    const formattedNumber = Number(ticketNumber).toLocaleString('uk-UA');
    document.getElementById('ticket-number').textContent = formattedNumber;
}

// Таймер дії квитка
function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    
        timer--;
        hours = Math.floor((timer+1) / 3600);
        minutes = Math.floor(((timer+1) % 3600) / 60);
        seconds = (timer+1) % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = hours + ":" + minutes + ":" + seconds;
        
    const interval = setInterval(function () {
        hours = Math.floor(timer / 3600);
        minutes = Math.floor((timer % 3600) / 60);
        seconds = timer % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = hours + ":" + minutes + ":" + seconds;

          
        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "0:00:00";
        }
    }, 1000);
}

function setColorByDay(){
    const elem1 = document.querySelector('.secure-wrapper');
    const elem2 = document.querySelector('.secure-block');

    switch(new Date().getDay()){
        case 1:
            elem1.style.backgroundColor = "rgba(13, 104, 98, 0.1)";
            elem2.style.color = "rgba(13, 104, 98, 1)";
            break;
        case 2:
            elem1.style.backgroundColor = "rgba(139, 64, 153, 0.1)";
            elem2.style.color = "rgba(139, 64, 153, 1)";
            break;
        case 3:
            elem1.style.backgroundColor = "rgba(139, 64, 153, 0.1)";
            elem2.style.color = "rgba(139, 64, 153, 1)";
            break;
        case 4:
            elem1.style.backgroundColor = "rgba(139, 64, 153, 0.1)";
            elem2.style.color = "rgba(139, 64, 153, 1)";
            break;
        case 5:
            elem1.style.backgroundColor = "rgba(139, 64, 153, 0.1)";
            elem2.style.color = "rgba(139, 64, 153, 1)";
            break;
        case 6:
            elem1.style.backgroundColor = "rgba(11, 106, 153, 0.1)";
            elem2.style.color = "rgba(11, 106, 153, 1)";
            break;
        case 0:
            elem1.style.backgroundColor = "rgba(74, 91, 184, 0.1)";
            elem2.style.color = "rgba(74, 91, 184, 1)";
            break;     
    }
}

function calculateAndDisplay(){
    displayPurchaseInfo();
    incrementTicketNumber();
    setColorByDay();
    
    let display = document.querySelector('#timer');
    let durationInSeconds = 60 * 90;

    let storedEndTime = localStorage.getItem('ticketEndTime');
    let now = Date.now();

    let timeLeft;

    if (!storedEndTime) {
        let endTime = now + durationInSeconds * 1000;
        localStorage.setItem('ticketEndTime', endTime);
        timeLeft = durationInSeconds;

        // Також оновимо дату покупки
        let nowISO = new Date().toISOString();
        localStorage.setItem('purchaseDate', nowISO);
    } else {
        let endTime = parseInt(storedEndTime, 10);
        timeLeft = Math.floor((endTime - now) / 1000);
        if (timeLeft <= 0) {
            timeLeft = 0;
        }
    }
    startTimer(timeLeft, display);
    setTimeout(function() {
    document.getElementById("load").remove();
    }, 1000);

}

window.onload = function () {
    
    calculateAndDisplay();

    document.addEventListener('click', function (e) {

    if (e.target.closest('#instruction-btn')) {
        document.body.innerHTML = "";
        document.body.insertAdjacentHTML('beforeend', `<div class = "loader-container" id = "load"> <div class="loader"></div></div><div class="details" style=""><div class="details-container"><button id="back-button" aria-label="Назад" class="back-button main-layout--icon-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12H21M10 19L3 12L10 19ZM3 12L10 5L3 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button><h1 class="details-title">Деталі квитка</h1><div class="details-wrapper"><div class="details-block block-row"><div class="ticket-details--info-block"><p class="info-block info-title"><strong>Ваш перевізник</strong></p><p class="info-description main-info-description">Миколаївелектротранс Тролейбус</p></div><div class="ticket-details--info-block logo-wrapper" aria-hidden="true"><div class="info-logo" style="background-image: url('images/logo.png')" aria-hidden="true"></div></div></div><div class="details-block block-row"><div class="ticket-details--info-block"><p class="info-block info-title first-letter-capitalize"><strong>Квиток</strong></p><p class="info-description main-info-description first-letter-capitalize">Повний</p></div><div class="ticket-details--info-block"><p class="info-block info-title"><strong>Вартість</strong></p><p class="info-description main-info-description" style="margin-left: auto;">8  грн</p></div></div><div class="details-block block-column"><div class="ticket-details--info-block"><p class="info-block"><strong>Код ЄДРПОУ</strong></p><p class="info-description"></p></div><div class="ticket-details--info-block"><p class="info-block"><strong>Основний контакт</strong></p><p class="info-description"><a href="tel:"></a></p></div><div class="ticket-details--info-block"><p class="info-block"><strong>Адреса</strong></p><p class="info-description"></p></div></div><div class="details-block block-column"><div class="ticket-details--info-block"><p class="info-block"><strong>Страховик</strong></p><p class="info-description"></p></div><div class="ticket-details--info-block"><p class="info-block"><strong>Номер договору</strong></p><p class="info-description"></p></div></div></div><div class="plash-logo"><img src="images/plash.png" alt="plash" class="plash"/></svg></div></div></div>`);
        setTimeout(() => document.getElementById("load")?.remove(), 1000);
    }

    if (e.target.closest('#back-button')) {
        document.body.innerHTML = "";
        document.body.insertAdjacentHTML('beforeend', `<div class = "loader-container" id = "load"> <div class="loader"></div></div> <div class="restart" id="restart"></div> <button class="instruction-btn" id="instruction-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="white" fill-opacity="0.01"></rect><path d="M12.9999 7C12.9999 6.44772 12.5522 6 11.9999 6C11.4476 6 10.9999 6.44772 10.9999 7C10.9999 7.55228 11.4476 8 11.9999 8C12.5522 8 12.9999 7.55228 12.9999 7Z" fill="currentColor"></path><path d="M12.0001 1.99976C17.523 1.99976 22.0001 6.47691 22.0001 11.9998C22.0001 17.5226 17.523 21.9998 12.0001 21.9998C6.47727 21.9998 2.00012 17.5226 2.00012 11.9998C2.00012 6.47691 6.47727 1.99976 12.0001 1.99976Z" stroke="currentColor" stroke-width="2"></path><path d="M10.5 16.5H14.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.5 16.5V10.5H10.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button> <div class="ticket-wrapper"><div class="ticket-container"><div class="top-cutout"></div><img src="images/logo.png" alt="Logo" class="logo" /><div class="secure-wrapper"><div class="secure-block"><p class="secure-text">Життя — цікаве, і мотивація то є сильна: філософія, психологія. Найголовніше — залишайтеся людьми і кричіть, що ви живі. Я живий! <span style="margin-left: 8px;">⬥</span></p><p class="secure-text">Життя — цікаве, і мотивація то є сильна: філософія, психологія. Найголовніше — залишайтеся людьми і кричіть, що ви живі. Я живий! <span style="margin-left: 8px;">⬥</span></p><p class="secure-text">Життя — цікаве, і мотивація то є сильна: філософія, психологія. Найголовніше — залишайтеся людьми і кричіть, що ви живі. Я живий! <span style="margin-left: 8px;">⬥</span></p></div></div><div class="header">Миколаївелектротранс Тролейбус</div><div class="thin-line"></div><div class="purchase-info" id="purchase-info"></div><div class="ticket-info"><span id="ticket-count">1</span> квиток</div><div class="timer-container"><svg id="timerCircle" width="28" height="28" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" stroke="#17954D" stroke-width="1.5" fill="none"></circle></svg><div class="timer">Квиток дійсний — <span id="timer"></span></div></div><div class="dotted-line"></div><img src="images/qr-code.png" alt="QR Code" class="qr-code" /><div class="footer">Номер: <span id="ticket-number">286&nbsp;542</span></div></div></div> <div id = "reset-div" class="reopen-message">Ви зможете повторно відкрити цю<br>сторінку через історію браузера</div>`);
        calculateAndDisplay();
    }

    
    });

    document.addEventListener('dblclick', function (e) {
    if (e.target.closest('#restart')) {
    if (confirm("?")) {
      localStorage.removeItem('ticketNumber');
      localStorage.removeItem('purchaseDate');
      localStorage.removeItem('ticketEndTime');
      location.reload();
    }
     }
    });

};

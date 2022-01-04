//https://beeceptor.com/console/testui maks 50 zapytań dziennie w razie czego odkomentować endpointy 
var URL='https://testui.free.beeceptor.com'
function goTo(page){
    window.location.href = page;
};
function sendContact(){
    var text
    let contactMap =new Map()
    contactMap.set('lastName',document.getElementById("lastName").value)
    contactMap.set('firstName',document.getElementById("firstName").value)
    contactMap.set('email',document.getElementById("email").value)
    contactMap.set('phone',document.getElementById("phone").value)
    contactMap.set('question',document.getElementById("question").value)
    contactMap.set('yacht-type', document.querySelector('input[name="yacht-type"]:checked').value)
    const value = Object.fromEntries(contactMap);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", URL+"/contact", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: value
    }));
    document.getElementById("form").style.display = "none";
};
function getEndpoint(end)
    {
        var xhr = new XMLHttpRequest();
        xhr.open( "GET", URL+end, false ); // false for synchronous request
        xhr.send( null );
        return(xhr.responseText);
    };
function ok(){

    };




/////////////////////////////////////////////////ukradziejowany datapicker/////////////
class Calendar {
    constructor(input, options,blockedday) {
        this.now = new Date();
        this.day = this.now.getDate();
        this.month = this.now.getMonth();
        this.year = this.now.getFullYear();
        this.input = input;
        this.divCnt = null;
        this.divTable = null;
        this.divDateText = null;
        this.divButtons = null;
        this.blockeddaylist=blockedday;
        const defaultOptions = {
            closeOnSelect : true,
            onDateSelect : (day, month, year) => {
                const monthText = ((month + 1) < 10) ? "0" + (month + 1) : month + 1;
                const dayText =  (day < 10) ? "0" + day : day;
                this.input.value = `${dayText}-${monthText}-${this.year}`;
            }
        }
        this.options = Object.assign({}, defaultOptions, options);

    }

    //metoda tworząca przyciski prev-next
    createButtons() {
        const buttonPrev = document.createElement("button");
        buttonPrev.innerText = "<";
        buttonPrev.type = "button";
        buttonPrev.classList.add("input-prev");
        buttonPrev.addEventListener("click", e => {
            this.month--;
            if (this.month < 0) {
                this.month = 11;
                this.year--;
            }
            this.createCalendarTable(this.blockeddaylist);
            this.createDateText();
        });
        this.divButtons.appendChild(buttonPrev);

        const buttonNext = document.createElement("button");
        buttonNext.classList.add("input-next");
        buttonNext.innerText = ">";
        buttonNext.type = "button";
        buttonNext.addEventListener("click", e => {
            this.month++;
            if (this.month > 11) {
                this.month = 0;
                this.year++;
            }
            this.createCalendarTable(this.blockeddaylist);
            this.createDateText();
        });
        this.divButtons.appendChild(buttonNext);
    }

    //metoda wypisująca nazwę miesiąca i roku
    createDateText() {
        const monthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
        this.divDateText.innerHTML = monthNames[this.month] + " " + this.year;
    }

    //metoda tworząca tabele z kalendarzem
    createCalendarTable( blockeddaylist) {
        this.divTable.innerHTML = "";

        //tworzymy nazwy dni
        const tab = document.createElement("table");
        tab.classList.add("calendar-table");

        //tworzymy nagłówki dni
        let tr = document.createElement("tr");
        tr.classList.add("calendar-table-days-names");
        const days = ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"];
        days.forEach(day => {
            const th = document.createElement("th");
            th.innerHTML = day;
            tr.appendChild(th);
        });
        tab.appendChild(tr);

        //pobieramy wszystkie dni danego miesiąca
        const daysInMonth = new Date(this.year, this.month+1, 0).getDate();

        //pobieramy pierwszy dzień miesiąca
        const tempDate = new Date(this.year, this.month, 1);
        let firstMonthDay = tempDate.getDay();
        if (firstMonthDay === 0) {
            firstMonthDay = 7;
        }

        //wszystkie komórki w tabeli
        const j = daysInMonth + firstMonthDay - 1;

        if (firstMonthDay - 1 !== 0) {
            tr = document.createElement("tr");
            tab.appendChild(tr);
        }

        //tworzymy puste komórki przed dniami miesiąca
        for (let i=0; i < firstMonthDay - 1; i++) {
            const td = document.createElement("td");
            td.innerHTML = "";
            tr.appendChild(td);
        }

        //tworzymy komórki dni
        for (let i = firstMonthDay-1; i<j; i++) {
            if(i % 7 === 0){
                tr = document.createElement("tr");
                tab.appendChild(tr);
            }

            const td = document.createElement("td");
            td.innerText = i - firstMonthDay + 2;
            td.dayNr = i - firstMonthDay + 2;
            td.classList.add("day");
            if (blockeddaylist!==undefined){
                blockeddaylist.forEach(element =>{
                    var start = new Date(element)
                    var dzien=i - firstMonthDay + 2
                if (start.getFullYear() === this.now.getFullYear() && start.getMonth() === this.now.getMonth() && start.getDate() ===  i - firstMonthDay + 2 ) {
                    td.classList.add("blocked-day")
                }})
            }
            if (this.year === this.now.getFullYear() && this.month === this.now.getMonth() && this.day === i - firstMonthDay + 2) {
                td.classList.add("current-day")
            }

            tr.appendChild(td);
        }

        tab.appendChild(tr);

        this.divTable.appendChild(tab);
    }

    //podpinamy klik pod dni w tabeli kalendarza
    bindTableDaysEvent() {
        this.divTable.addEventListener("click", e => {
            if (e.target.tagName.toLowerCase() === "td" && e.target.classList.contains("day")) {
                if (this.options.closeOnSelect) {
                    this.hide();
                }
                this.options.onDateSelect(e.target.dayNr, this.month + 1, this.year);
            }
        });
    }

    //metoda ukrywa/pokazuje kalendarz
    toggleShow() {
        this.divCnt.classList.toggle("calendar-show");
    }

    //metoda pokazuje kalendarz
    show() {
        this.divCnt.classList.add("calendar-show");
    }

    //metoda ukrywa kalendarz
    hide() {
        this.divCnt.classList.remove("calendar-show");
    }

    //metoda inicjująca obiekt
    init() {
        //tworzymy div z całą zawartością
        this.divCnt = document.createElement("div");
        this.divCnt.classList.add("calendar");

        //tworzymy div z guzikami
        this.divButtons = document.createElement("div");
        this.divButtons.className = "calendar-prev-next";
        this.createButtons();

        //tworzymy div z nazwą miesiąca
        this.divDateText = document.createElement("div");
        this.divDateText.className = "date-name";
        this.createDateText();

        //tworzymy nagłówek kalendarza
        this.divHeader = document.createElement("div");
        this.divHeader.classList.add("calendar-header");

        this.divHeader.appendChild(this.divButtons);
        this.divHeader.appendChild(this.divDateText);
        this.divCnt.appendChild(this.divHeader);

        //tworzymy div z tabelą kalendarza
        this.divTable = document.createElement("div");
        this.divTable.className = "calendar-table-cnt";
        this.divCnt.appendChild(this.divTable);
        this.createCalendarTable(this.blockeddaylist);
        this.bindTableDaysEvent();

        //tworzymy wrapper dla input
        this.calendarWrapper = document.createElement("div");
        this.calendarWrapper.classList.add("input-calendar-cnt");
        this.input.parentElement.insertBefore(this.calendarWrapper, this.input);
        this.calendarWrapper.appendChild(this.input);
        this.calendarWrapper.appendChild(this.divCnt);

        this.input.classList.add("input-calendar");
        this.input.addEventListener("click", e => this.toggleShow());
        this.input.addEventListener("click", e => e.stopImmediatePropagation());
        this.divCnt.addEventListener("click", e => e.stopImmediatePropagation());
        document.addEventListener("click", e => this.hide());
    }
}
//dla 2 inputa nadpisuję tylko akcję po wyborze daty
function getcal(dayblocklist){
const input1 = document.querySelector("#st");
const calendar1 = new Calendar(input1, {

    onDateSelect(day, month, year) {
        const dayText = (day < 10) ? "0" + day : day;
        const monthText = (month < 10) ? "0" + month : month;
        const date = `${dayText} / ${monthText} / ${year}`;
        input1.value = date;

    }
},dayblocklist);
calendar1.init();
const input2 = document.querySelector("#end");
const calendar2 = new Calendar(input2, {

    onDateSelect(day, month, year) {
        const dayText = (day < 10) ? "0" + day : day;
        const monthText = (month < 10) ? "0" + month : month;
        const date = `${dayText} / ${monthText} / ${year}`;
        input2.value = date;

    }
},dayblocklist);
calendar2.init();}

function getstep1(){
    var text="<p class=\"front-box__desc\">\n" +
        "                Witaj w wypożyczalni powiedz mi jakie akweny preferujesz:\n" +
        "            </p>"
    var req=JSON.parse("{ \n" +
        "\"yahttype\":\n" +
        " [\n" +
        "\"morskie\",\n" +
        "\"słodkowodne\"\n" +
        "]}")
    // var req=JSON.parse(getEndpoint("/yahttype"))
    req=req["yahttype"]
    req.forEach(value=> {
        text += "<input class=\"front-box-input__desc\"  type=\"radio\" id=" + value + " name=\"yacht-type_r\" value=" + value + " checked=\"checked\"> " + value;
    });
    text += "<br> <button class=\"front-box__button_right\" type=\"button\" onClick=\"changeStep(getstep2());\">Dalej</button>"
    return text;
}

function getstep2(){
    var text="<p class=\"front-box__desc\">\n" +
        "                Wybierz swój jacht do poknywania wodnych bezdroży :\n" +
        "            </p>"
    var val= document.querySelector('input[name="yacht-type_r"]:checked').value
    var req
    if (val=='morskie'){
        req=JSON.parse("{\n" +
            "\"yaht\":  \n" +
            "[\n" +
            "\"marineyaht1\",\n" +
            "\"marineyaht2\",\n" +
            "\"marineyaht3\"\n" +
            "]}")
        // var req=JSON.parse(getEndpoint("/marineyaht"))
    }
    else if (val=='słodkowodne'){
        req=JSON.parse("{\n" +
            "\"yaht\": \n" +
            "[\n" +
            "\"freshwateryath1\",\n" +
            "\"freshwateryath2\",\n" +
            "\"freshwateryath3\"\n" +
            "]}")
        // var req=JSON.parse(getEndpoint("/reqfreshwater"))
    }
    req=req["yaht"]
    req.forEach(value=> {
        text += "<input class=\"front-box-input__desc\" type=\"radio\" id=" + value + " name=\"yacht_r\" value=" + value + " checked=\"checked\"> " + value;
    });
    text += "<br><br><button class=\"front-box__button_right\" type=\"button\" onClick=\"getstep3();\">Dalej</button>"
    text += "<button class=\"front-box__button\" type=\"button\" onClick=\"changeStep('prev');\">Wstecz</button>"
    changeStep('next')
    document.getElementById("step2").innerHTML=text;

}
function getstep3(){
    var text="<p class=\"front-box__desc\">\n" +
        "                Wybierz w kalendarzu czas twojej podróży pamiętaj że dni zaznaczone na niebiesko są nie dostępne dla twojego jachtu :\n" +
        "            </p>"
    var val= document.querySelector('input[name="yacht_r"]:checked').value
    var req=JSON.parse("{\n" +
        "\"date\":\n" +
        "[\n" +
        "\"2022-01-12\",\n" +
        "\"2022-01-13\",\n" +
        "\"2022-01-14\",\n" +
        "\"2022-01-15\",\n" +
        "\"2022-01-16\",\n" +
        "\"2022-01-20\",\n" +
        "\"2022-01-22\"\n" +
        "]}"
    )
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", URL+"/calendarforyaht", true);
    // xhr.setRequestHeader('yaht', val);
    // xhr.send(JSON.stringify({
    //     value: value
    // }));
    // req=xhr.responseText

    req=req["date"]

    text+="<label for=\"st\">Data wypożyczenia</label>\n" +
        "                    <input type=\"text\" id=\"st\" class=\"front-box-input__form input-calendar\" placeholder=\"Początek podróży\"><br><br>\n" +
        "                    <label for=\"end\">Data zwrotu</label>\n" +
        "                    <input type=\"text\" id=\"end\" class=\"front-box-input__form input-calendar\" placeholder=\"Koniec podróży\"><br><br>\n" +
        "                    <label for=\"lastName_r\">Nazwisko</label>\n" +
        "                    <input class=\"front-box-input__form\" type=\"text\" placeholder=\"Nazwisko\" id=\"lastName_r\" /><br><br>\n" +
        "                    <label for=\"firstName_r\">Imie</label>\n" +
        "                    <input class=\"front-box-input__form\" type=\"text\" placeholder=\"Imie\" id=\"firstName_r\" /><br><br>\n" +
        "                    <label for=\"email_r\">Email</label>\n" +
        "                    <input class=\"front-box-input__form\" type=\"email\" placeholder=\"Podaj Email\" id=\"email_r\" /><br><br>\n" +
        "                    <label for=\"phone_r\">Telefon</label>\n" +
        "                    <input class=\"front-box-input__form\" type=\"tel\" placeholder=\"Telefon\" id=\"phone_r\" /><br><br>\n" +
        "                    <label for=\"question_r\">Opis</label>\n" +
        "                    <input class=\"front-box-input__form\" type=\"text\" placeholder=\"Dodatkowy Opis\" id=\"question_r\" /><br><br>\n" +
        "                    <button class=\"front-box__button_right\" type=\"button\" onClick=\"send_r();\">Zgłoś rezerwacje</button>\n" +
        "                    <button class=\"front-box__button\" type=\"button\" onClick=\"changeStep('prev');\">Wstecz</button>"
    changeStep('next')
    document.getElementById("step3").innerHTML=text;
    console.log(req)
    getcal(req)

}
const steps =Array.from(document.querySelectorAll(' .step'));
console.log(steps)
function changeStep(direction){
    let index=0;
    const active =document.querySelector('form .step.active');
    index=steps.indexOf(active);
    steps[index].classList.remove('active');
    if (direction==='next'){
        index++
    }
    else if (direction==='prev'){
        index--;
    }
    steps[index].classList.add('active')
    console.log(index)
}
document.getElementById("step1").innerHTML=getstep1()
function send_r(){
    var text
    let resMap =new Map()
    resMap.set('yaht',document.querySelector('input[name="yacht_r"]:checked').value)
    resMap.set('lastName',document.getElementById("lastName_r").value)
    resMap.set('firstName',document.getElementById("firstName_r").value)
    resMap.set('email',document.getElementById("email_r").value)
    resMap.set('phone',document.getElementById("phone_r").value)
    resMap.set('question',document.getElementById("question_r").value)
    resMap.set('startDate',document.getElementById("st").value)
    resMap.set('endDate',document.getElementById("end").value)
    const value = Object.fromEntries(resMap);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", URL+"/reservation", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: value
    }));
    document.getElementById("form_r").style.display = "none";
    document.getElementById("finish").innerHTML= "<p className=\"front-box__desc\">Dziękujemy za rezerwacje</p>"
};
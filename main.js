var chatsbutton = document.querySelector('.chatsbutton');
var usersbutton = document.querySelector('.usersbutton');
var stockbutton = document.querySelector('.stockbutton');
var chats = document.querySelector('.maincolumn-chats');
var users = document.querySelector('.maincolumn-users');
var stock = document.querySelector('.maincolumn-stock');
var navtext = document.querySelector('.nav-text');

var buttons = [chatsbutton,usersbutton,stockbutton];
buttons.forEach(element => {
    element.addEventListener('click', () =>{
        chatsbutton.classList.remove('menu-button--active');
        usersbutton.classList.remove('menu-button--active');
        stockbutton.classList.remove('menu-button--active');
        element.classList.toggle('menu-button--active');

        if(element.classList.contains('chatsbutton')){
            navtext.innerHTML = "Chats";
            users.classList.add('d-none');
            stock.classList.add('d-none');
            chats.classList.remove('d-none');
        }
        if(element.classList.contains('usersbutton')){
            navtext.innerHTML = "Users";
            chats.classList.add('d-none');
            stock.classList.add('d-none');
            users.classList.remove('d-none');
        }
        if(element.classList.contains('stockbutton')){
            navtext.innerHTML = "Stock";
            chats.classList.add('d-none');
            users.classList.add('d-none');
            stock.classList.remove('d-none');
        }
    })
});

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h')
            .then(response => response.json())
            .then(data => { 
                for(var i = 0; i < 20; i++){
                    symbol = data[i]['symbol'];
                    var currentprice = '$' + data[i]['current_price'];
                    var changeprice1 = data[i]['price_change_percentage_1h_in_currency'] ;
                    id = data[i]['id'];

                    var srclink = '/CryptoIcons/svg/icon/' + symbol +'.svg';
                    var cryptoicon = document.querySelectorAll('.crypto-icon');
                    cryptoicon[i].src = srclink;
                    cryptoicon[i].alt = id;
                    var symbolbox = document.querySelectorAll('.crypto-symbol');
                    symbolbox[i].innerHTML = symbol;
                    var pricebox = document.querySelectorAll('.stock-price');
                    pricebox[i].innerHTML = currentprice;

                    var changebox = document.querySelectorAll('.change-price');
                    changebox[i].innerHTML = Math.round(changeprice1 * 1000)/1000  + '%';
                    if(changeprice1 < 0){
                        changebox[i].style.color = '#e15241';
                    }
                    else{
                        changebox[i].style.color = '#4eaf0a';
                    }
                }
                var stockbuttons = document.querySelectorAll('.stock-arrow');
                stockbuttons.forEach(element => {
                    element.addEventListener('click', () => {
                        var page1 = document.querySelector('.stock-page1');
                        var page2 = document.querySelector('.stock-page2');
                        var pagenumber = document.querySelector('.stock-page--number');
                        if(element.classList.contains('fa-chevron-left')){
                            page1.classList.remove('d-none');
                            page2.classList.add('d-none');
                            pagenumber.innerHTML = "1";
                            element.style.color = '#515558';
                            stockbuttons[1].style.color = '#FFFFFF';
                        }
                        else{
                            page1.classList.add('d-none');
                            page2.classList.remove('d-none');
                            pagenumber.innerHTML = "2";
                            element.style.color = '#515558';
                            stockbuttons[0].style.color = '#FFFFFF';
                        }
                    })
                });
            });


var stockboxes = document.querySelectorAll('.maincolumn-stock--box');
stockboxes.forEach(element => {
    element.addEventListener('click', () => {
        var elementalt = element.getElementsByTagName('img')[0].alt
        var capelementalt = elementalt.charAt(0).toUpperCase() + elementalt.slice(1);
        fetch('https://api.coingecko.com/api/v3/coins/'+ elementalt +'/market_chart?vs_currency=usd&days=1&interval=hourly')
            .then(response => response.json())
            .then(info => { 
                var pricesarray = [];
                for(i = 1; i < 25; i++){
                    var prices = info['prices'][i][1];
                    pricesarray.push(Math.round(prices*1000)/1000);
                }
                //Min and Max values for 24h
                low24 = Math.round(Math.min(...pricesarray)*1000)/1000;
                high24 = Math.round(Math.max(...pricesarray)*1000)/1000;
                //Color chart
                fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='+ elementalt +'&order=market_cap_desc&page=1&sparkline=false&price_change_percentage=1h')
                    .then(response => response.json())
                    .then(data => { 
                        changeprice1h = data[0]['price_change_percentage_1h_in_currency'] ;
                        changeprice24h = data[0]['price_change_percentage_24h'] ;
                        console.log(changeprice1h, changeprice24h);

                        if(changeprice1h < 0){
                            chartcolor = '#e15241';
                        }
                        else{
                            chartcolor = '#4eaf0a';
                        }
                    });
                const labels = [
                    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                ];
                const data = {
                    labels: labels,
                    datasets: [{
                        label: capelementalt  + ' ($)',
                        backgroundColor: chartcolor,
                        borderColor: chartcolor,
                        data: pricesarray,
                        tension: 0.4,
                    }]
                };
                const config = {
                    type: 'line',
                    data: data,
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            }
                        },
                        scales: {
                            x:{
                                grid: {
                                    display: false,
                                }
                            },
                            y: {
                              display: false,
                              grid: {
                                display: false,
                              }
                            }
                        }
                    },
                };
                const myChart = new Chart(
                    document.getElementById('myChart'),
                    config
                );
            });
        var stockdetails = document.createElement('div');
        stockdetails.classList.add('maincolumn-stock-cryptodetails');
        stockdetails.innerHTML = "<i class='fa-solid fa-chevron-left fa-lg stock-cryptodetails--arrow'></i><h2>"+ capelementalt +"</h2><div class='stock-chart'><h5>Last 24h</h5><canvas id='myChart'></canvas></div><div class='stock-chart--details'><div><h5>24h Low</h5><p class='stock-24low'>" + low24 +"</p></div><div><h5>24h High</h5><p class='stock-24high'>"+ high24 +"</p></div><div><h5>1h</h5><p class='stock-1h'>"+ Math.round(changeprice1h*1000)/1000+"</p></div><div><h5>24h</h5><p class='stock-24h'>"+ Math.round(changeprice24h*1000)/1000+"</p></div></div>";
        for(i = 0; i< stockboxes.length; i++){
            stockboxes[i].classList.add('d-none');
        }
        var stockinput = document.querySelector('.maincolumn-stock--input');
        var pagination = document.querySelector('.maincolumn-stock-pagination');
        stockinput.classList.add('d-none');
        pagination.classList.add('d-none');
        document.querySelector(".maincolumn-stock").appendChild(stockdetails);

        var stock24h = document.querySelector('.stock-24h');
        var stock1h = document.querySelector('.stock-1h');
        if(stock1h.innerHTML < 0){
            stock1h.style.color = '#e15241';
            stock1h.innerHTML = stock1h.innerHTML + "%";
        }
        else{
            stock1h.style.color = '#4eaf0a';
            stock1h.innerHTML = stock1h.innerHTML + "%";
        }
        if(stock24h.innerHTML < 0){
            stock24h.style.color = '#e15241';
            stock24h.innerHTML = stock24h.innerHTML + "%";
        }
        else{
            stock24h.style.color = '#4eaf0a';
            stock24h.innerHTML = stock24h.innerHTML + "%";
        }

        var backarrow = document.querySelector('.stock-cryptodetails--arrow');
        backarrow.addEventListener('click', () =>{
            stockdetails.remove();
            for(i = 0; i< stockboxes.length; i++){
                stockboxes[i].classList.remove('d-none');
            }
            stockinput.classList.remove('d-none');
            pagination.classList.remove('d-none');
        })
    })
});


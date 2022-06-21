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

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false')
            .then(response => response.json())
            .then(data => { 
                for(var i = 0; i < 20; i++){
                    var symbol = data[i]['symbol'];
                    var currentprice = '$' + data[i]['current_price'];
                    var changeprice = data[i]['price_change_percentage_24h'] ;
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
                    changebox[i].innerHTML = Math.round(changeprice * 100)/100  + '%';
                    if(changeprice < 0){
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
                    pricesarray.push(prices);
                }
                //Min and Max values for 24h
                low24 = Math.min(pricesarray);
                high24 = Math.max(pricesarray);

                const labels = [
                    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                ];
                const data = {
                    labels: labels,
                    datasets: [{
                        label: capelementalt  + ' ($)',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
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
        stockdetails.innerHTML = "<i class='fa-solid fa-chevron-left fa-lg stock-cryptodetails--arrow'></i><h1>"+ capelementalt + "</h1><div class='stock-chart'><h5>Last 24h</h5><canvas id='myChart'></canvas></div><div class='stock-chart--details'><div><h5>24h Low</h5><p class='stock-24low'>1000$</p></div><div><h5>24h High</h5><p class='stock-24high'>2000$</p></div><div><h5>1h</h5><p class='stock-24h'>5.0%</p></div><div><h5>24h</h5><p class='stock-24h'>0.2%</p></div></div>";
        for(i = 0; i< stockboxes.length; i++){
            stockboxes[i].classList.add('d-none');
        }
        var stockinput = document.querySelector('.maincolumn-stock--input');
        var pagination = document.querySelector('.maincolumn-stock-pagination');
        stockinput.classList.add('d-none');
        pagination.classList.add('d-none');
        document.querySelector(".maincolumn-stock").appendChild(stockdetails);

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


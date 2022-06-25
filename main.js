var chatsbutton = document.querySelector('.chatsbutton');
var usersbutton = document.querySelector('.usersbutton');
var stockbutton = document.querySelector('.stockbutton');
var chats = document.querySelector('.maincolumn-chats');
var users = document.querySelector('.maincolumn-users');
var stock = document.querySelector('.maincolumn-stock');
var navtext = document.querySelector('.nav-text');

const CryptoContainer = document.querySelector('[crypto-cards-container]');
var Pagination = document.querySelector('.maincolumn-stock-pagination');
var Page2 = document.querySelector('[crypto-cards-page2]');
var pagenumber = document.querySelector('.stock-page--number');
var paginationLeft = Pagination.querySelector('.fa-chevron-left');
var paginationRight = Pagination.querySelector('.fa-chevron-right');

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
            CryptoContainer.classList.remove('d-none');
            Page2.classList.add('d-none');
            pagenumber.innerHTML = "1";
            paginationLeft.style.color = '#515558';
            paginationRight.style.color = '#FFFFFF';
        }
        if(element.classList.contains('usersbutton')){
            navtext.innerHTML = "Users";
            chats.classList.add('d-none');
            stock.classList.add('d-none');
            users.classList.remove('d-none');
            CryptoContainer.classList.remove('d-none');
            Page2.classList.add('d-none');
            pagenumber.innerHTML = "1";
            paginationLeft.style.color = '#515558';
            paginationRight.style.color = '#FFFFFF';
        }
        if(element.classList.contains('stockbutton')){
            navtext.innerHTML = "Stock";
            chats.classList.add('d-none');
            users.classList.add('d-none');
            stock.classList.remove('d-none');
        }
    })
});

const CryptoTemplate = document.querySelector('[crypto-card-template]');
const SearchInput = document.querySelector('[crypto-search]');

let cryptoArray = [];

SearchInput.addEventListener('input', e => {
    const value = e.target.value.toLowerCase();
    cryptoArray.forEach(crypto => {
        const isVisible = crypto.name.toLowerCase().includes(value) || crypto.symbol.toLowerCase().includes(value);
        crypto.element.classList.toggle('d-none', !isVisible);
        var Page2 = document.querySelector('[crypto-cards-page2]');
        Page2.classList.remove('d-none');
        var Pagination = document.querySelector('.maincolumn-stock-pagination');
        Pagination.classList.add('d-none');
        if(e.target.value === ''){
            Pagination.classList.remove('d-none');
            Page2.classList.add('d-none');
        }
    })
})

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h')
    .then(res => res.json())
    .then(data => {
        array1h = [];
        cryptoArray = data.map(cryptoData =>{
            const card = CryptoTemplate.content.cloneNode(true).children[0];
            const alt = card.querySelector(".crypto-icon");
            const symbol = card.querySelector(".crypto-symbol");
            const price = card.querySelector('.stock-price');
            const change = card.querySelector('.change-price');
            alt.src = "CryptoIcons/svg/" + cryptoData.symbol + ".svg"
            alt.alt = cryptoData.id;
            symbol.innerHTML = cryptoData.symbol;
            price.innerHTML = '$' + cryptoData.current_price;

            change.innerHTML = Math.round(cryptoData.price_change_percentage_1h_in_currency *1000)/1000 + '%';
            if(Math.round(cryptoData.price_change_percentage_1h_in_currency *1000)/1000 > 0){
                change.style.color = '#4eaf0a';
            }
            else{
                change.style.color = '#e15241';
            }
            CryptoContainer.append(card);

            for(i = 10; i < 20; i++){
                CryptoContainer.childNodes[i]
            }
            return { name: cryptoData.name, symbol: cryptoData.symbol, element: card, Child: CryptoContainer.childNodes[i] }
        })
    })
    .then(ChildCount => {
        var CryptoContainerChild = CryptoContainer.childElementCount;
        CryptoBoxes = document.querySelectorAll('.maincolumn-stock--box');
        for(i=0; i<CryptoContainerChild; i++){
            if(i>9){
                var Page2 = document.querySelector('[crypto-cards-page2]');
                Page2.appendChild(CryptoBoxes[i]);
                Page2.classList.add('d-none');
            }
        }
        var stockbuttons = document.querySelectorAll('.stock-arrow');
        stockbuttons.forEach(element => {
            element.addEventListener('click', () => {
                var pagenumber = document.querySelector('.stock-page--number');
                if (element.classList.contains('fa-chevron-left')) {
                    CryptoContainer.classList.remove('d-none');
                    Page2.classList.add('d-none');
                    pagenumber.innerHTML = "1";
                    element.style.color = '#515558';
                    stockbuttons[1].style.color = '#FFFFFF';
                }
                else {
                    CryptoContainer.classList.add('d-none');
                    Page2.classList.remove('d-none');
                    pagenumber.innerHTML = "2";
                    element.style.color = '#515558';
                    stockbuttons[0].style.color = '#FFFFFF';
                }
            })
        });
        var stockboxes = document.querySelectorAll('.maincolumn-stock--box');
        stockboxes.forEach(element => {
            element.addEventListener('click', () => {
                var elementalt = element.getElementsByTagName('img')[0].alt.toLowerCase();
                var capelementalt = elementalt.charAt(0).toUpperCase() + elementalt.slice(1);
                fetch('https://api.coingecko.com/api/v3/coins/' + elementalt + '/market_chart?vs_currency=usd&days=1&interval=hourly')
                    .then(res => res.json())
                    .then(info => {
                        var pricesarray = [];
                        for(i = 1; i < 25; i++){
                            var prices = info['prices'][i][1];
                            pricesarray.push(prices);
                        }
                        //Min and Max values for 24h
                        low24 = Math.round(Math.min(...pricesarray)*1000)/1000;
                        high24 = Math.round(Math.max(...pricesarray)*1000)/1000;
                        
                        var stockdetails = document.createElement('div');
                        stockdetails.classList.add('maincolumn-stock-cryptodetails');
                        stockdetails.innerHTML = "<i class='fa-solid fa-chevron-left fa-lg stock-cryptodetails--arrow'></i><h1>"+ capelementalt.replaceAll('-', ' ') + "</h1><div class='stock-chart'><h5>Last 24h</h5><canvas id='myChart'></canvas></div><div class='stock-chart--details'><div><h5>24h Low</h5><p class='stock-24low'>"+ low24 +"</p></div><div><h5>24h High</h5><p class='stock-24high'>"+ high24 +"</p></div><div><h5>1h</h5><p class='stock-24h'>2.0%</p></div><div><h5>24h</h5><p class='stock-24h'>5.0%</p></div></div>";

                        var stockinput = document.querySelector('.maincolumn-stock--input');
                        var pagination = document.querySelector('.maincolumn-stock-pagination');
                        var cryptolist = document.querySelector('.crypto-pages');
                        stockinput.classList.add('d-none');
                        pagination.classList.add('d-none');
                        cryptolist.classList.add('d-none');
                        document.querySelector(".maincolumn-stock").appendChild(stockdetails);
                        var backarrow = document.querySelector('.stock-cryptodetails--arrow');
                        backarrow.addEventListener('click', () =>{
                            stockdetails.remove();
                            cryptolist.classList.remove('d-none');
                            stockinput.classList.remove('d-none');
                            pagination.classList.remove('d-none');
                        })

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
                    })
                    .then(colors => {
                        var stock24h = document.querySelectorAll('.stock-24h');
                        stock24h.forEach(element => {
                            if(element.innerHTML > 0){
                                element.style.color = "#4eaf0a";
                            }else{
                                element.style.color = "#e15241";
                            }
                        });
                    })
            })
        });
    })

    var profileSmActive = document.querySelector('.profile-socialmedia--active');
    var profileEditAcive = document.querySelector('.profile-edit--active');
    var links = document.querySelector('.profile-edit');
    var navimage = document.querySelector('.nav-image');
    navimage.addEventListener('click', () => {
        var profilebox = document.querySelector('.profile-info');
        var profilearrow = profilebox.querySelector('.fa-chevron-left');
        var nav = document.querySelector('nav');
        var menu = document.querySelector('.menu');

        profilebox.classList.remove('d-none');
        nav.classList.add('d-none');
        menu.classList.add('d-none');
        profileSmActive.classList.add('d-none');
        profileEditAcive.classList.add('d-none');
        links.classList.remove('d-none');

        profilearrow.addEventListener('click', () => {
            profilebox.classList.add('d-none');
            nav.classList.remove('d-none');
            menu.classList.remove('d-none');
        })
    });


    var socialmediabutton = document.querySelector('.profile-edit-links');
    socialmediabutton.addEventListener('click', () => {
        links.classList.add('d-none');

        profileSmActive.classList.remove('d-none');

        var profileSmBack = document.querySelector('.profile-sm-back');
        profileSmBack.addEventListener('click', () => {
            profileSmActive.classList.add('d-none');
            links.classList.remove('d-none');;
        })
    });

    var editprofilebutton = document.querySelector('.profile-edit-profile');
    editprofilebutton.addEventListener('click', () => {
        links.classList.add('d-none');

        profileEditAcive.classList.remove('d-none');

        var profilEditBack = document.querySelector('.profile-edit-back');
        profilEditBack.addEventListener('click', () => {
            links.classList.remove('d-none');
            profileEditAcive.classList.add('d-none');
        })
    })


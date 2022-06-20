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
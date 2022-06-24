var choosebox = document.querySelector('.choosebox');
var createbutton = document.querySelector(".createaccount-button");
var loginbutton = document.querySelector(".login-button");

createbutton.addEventListener('click', () => {
    choosebox.classList.add('d-none');
    var createaccountbox = document.querySelector('.createaccount');
    createaccountbox.classList.remove('d-none');
});

loginbutton.addEventListener('click', () => {
    choosebox.classList.add('d-none');
    var loginbox = document.querySelector('.login');
    loginbox.classList.remove('d-none');
})

var backarrow = document.querySelectorAll('.fa-chevron-left');
backarrow.forEach(element => {
    element.addEventListener('click', () => {
        var createaccountbox = document.querySelector('.createaccount');
        var loginbox = document.querySelector('.login');
        createaccountbox.classList.add('d-none');
        loginbox.classList.add('d-none');
        choosebox.classList.remove('d-none');
    })
});
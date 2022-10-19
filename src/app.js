import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { logout } from "./api/users.js";

import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { dashboardPage } from "./views/dashboard.js";
import { addOfferPage } from "./views/addOffer.js";
import { detailsPage } from "./views/details.js";
import { editOfferPage } from "./views/edit.js";


const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout)


page(decorateContext)
page('/', homePage)
page('/dashboard', dashboardPage)
page('/login', loginPage)
page('/register', registerPage)
page('/create', addOfferPage)
page('/details/:id', detailsPage)
page('/edit/:id', editOfferPage)


page.start()
updateNav()

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    next()
}

function renderMain(templateResult) {
    render(templateResult, main)
}

export function updateNav() {
    const userData = getUserData()
    if(userData) {
        document.querySelector('.user').style.display = 'inline';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'inline';
    }
}

function onLogout() {
    logout()
    updateNav();
    page.redirect('/')
}
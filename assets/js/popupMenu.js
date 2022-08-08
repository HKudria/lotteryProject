document.addEventListener("DOMContentLoaded", function () {

    const openPopupMenu = document.querySelector('#popupMenu');
    const popup = document.querySelector('.popup');
    const popupFrame = document.querySelector('.popup-frame');
    let singIn = document.querySelector('.singInButton');
    let register = document.querySelector('#registerButton');
    const accountButton = document.querySelector('#accountButton');
    const loginForm = popupFrame.innerHTML;
    let formStatus = false;
    const cssVariable = document.querySelector(':root');

    const setTransplate = () => {
        if (window.window.innerHeight > 900) {
            cssVariable.style.setProperty('--tranplatePopup', '30%');
        } else {
            cssVariable.style.setProperty('--tranplatePopup', '10%');
        }
    }

    const showMenu = () => {
        setTransplate()
        popup.classList.add('show');

        const showMenu = () => {
            popupFrame.classList.add('callPopup');
        }

        window.setTimeout(showMenu, 10);
    }

    const closePopup = (event) => {
        if (event.target.className === 'popup show') {
            popupFrame.classList.remove('callPopup');

            const closeMenu = () => {
                popup.classList.remove('show');
                formStatus = true;
                renderRegisterForm()
            }

            window.setTimeout(closeMenu, 800);
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        let emailValue = document.querySelector('#formEmail').value;
        let passwordValue = document.querySelector('#formPassword').value;
        window.alert(`Your email: ${emailValue};\nYour password ${passwordValue}`);
    }

    const renderRegisterForm = () => {
        if (!formStatus) {
            popupFrame.innerHTML = `
                <h2>Create account</h2>
                <form class="popupForm">
                    <ul>
                        <li><label for="formEmail">E-mail</label></li>
                        <li><input type="text" id="formEmail" autocomplete="username"></li>
                        <li><label for="formPassword">Password</label></li>
                        <li><input type="password" id="formPassword" autocomplete="current-password"></li>
                        <li>
                            <button type="submit" class="singInButton">Sing Up</button>
                        </li>
                    </ul>
                </form>
                <hr class="betweenLinks">
                <span>Already have an account? <a href="#registerButton" id="registerButton">Log in</a></span> `;
            formStatus = true;
        } else {
            popupFrame.innerHTML = loginForm;
            formStatus = false;
        }
        singIn = document.querySelector('.singInButton');
        register = document.querySelector('#registerButton');
        initEventListener();
    }

    const initEventListener = () => {
        openPopupMenu.addEventListener('click', showMenu);
        popup.addEventListener('click', closePopup);
        singIn.addEventListener('click', submitForm);
        register.addEventListener('click', renderRegisterForm);
        accountButton.addEventListener('click', showMenu);
    }

    initEventListener();

});


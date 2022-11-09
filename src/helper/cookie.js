export const createCookieInHour = (cookieName, cookieValue, hourToExpire) => {
    let date = new Date();
    date.setTime(date.getTime()+(hourToExpire*60*60*1000));
    document.cookie = cookieName + " = " + cookieValue + "; expires = " +date.toUTCString()+"; SameSite=Lax";
}

export const deleteCookie = (cookieName) => {
    document.cookie = cookieName + " = ; expires = Thu, 18 Dec 2013 12:00:00 UTC; SameSite=Lax";
}

export const getCookie = (cookieName) => {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}
const mediaArray = [
    {
        src: 'public/img/japan.jpg',
        alt: 'JAPAN'
    },
    {
        src: 'public/img/usa.jpg',
        alt: 'USA'
    },
    {
        src: 'public/img/island.jpg',
        alt: 'SPAIN'
    },
    {
        src: 'public/img/japan.jpg',
        alt: 'JAPAN'
    },
    {
        src: 'public/img/usa.jpg',
        alt: 'USA'
    },
    {
        src: 'public/img/island.jpg',
        alt: 'SPAIN'
    },
    {
        src: 'public/img/japan.jpg',
        alt: 'JAPAN'
    },
    {
        src: 'public/img/usa.jpg',
        alt: 'USA'
    },
    {
        src: 'public/img/island.jpg',
        alt: 'SPAIN'
    },
]

document.addEventListener("DOMContentLoaded", function () {
    const CAROUSEL_BLOCK = document.querySelector("#carousel");
    const BUTTON_LEFT = document.querySelector("#arrow-left");
    const BUTTON_RIGHT = document.querySelector("#arrow-right");
    const NAV_SPAIN = document.getElementById("spain");
    const NAV_JAPAN = document.getElementById("japan");
    const NAV_USA = document.getElementById("usa");
    const cssVariable = document.querySelector(':root');
    let activeImage;
    let isSpainActive = false;
    let isUsaActive = false;
    let isJapanActive = true;

    const setCarouselWidth = () => {
        if (CAROUSEL_BLOCK.offsetWidth > 890) {
            cssVariable.style.setProperty('--carousel-widht', '860px');
        } else {
            cssVariable.style.setProperty('--carousel-widht', '100%');
        }
    }

    const leftClick = () => {
        setCarouselWidth();
        mediaArray.unshift(mediaArray.pop());
        removeEventListener();
        CAROUSEL_BLOCK.classList.add("transition-left");
    }

    const rightClick = () => {
        setCarouselWidth();
        mediaArray.push(mediaArray.shift());
        removeEventListener();
        CAROUSEL_BLOCK.classList.add("transition-right");
    }

    const initEventListener = () => {
        BUTTON_LEFT.addEventListener("click", leftClick);
        BUTTON_RIGHT.addEventListener("click", rightClick);
        NAV_SPAIN.addEventListener("click", spainClick);
        NAV_USA.addEventListener("click", usaClick);
        NAV_JAPAN.addEventListener("click", japanClick);
    }

    const removeEventListener = () => {
        BUTTON_LEFT.removeEventListener("click", leftClick);
        BUTTON_RIGHT.removeEventListener("click", rightClick);
        NAV_SPAIN.removeEventListener("click", spainClick);
        NAV_USA.removeEventListener("click", usaClick);
        NAV_JAPAN.removeEventListener("click", japanClick);
    }

    const spainClick = () => {
        if (!isSpainActive) {
            if (isUsaActive) rightClick();
            if (isJapanActive) leftClick();
        }
    }

    const usaClick = () => {
        if (!isUsaActive) {
            if (isSpainActive) leftClick();
            if (isJapanActive) rightClick();
        }
    }

    const japanClick = () => {
        if (!isJapanActive) {
            if (isUsaActive) leftClick();
            if (isSpainActive) rightClick();
        }
    }

    const clearNavStyle = () => {
        activeImage = document.querySelector("[active-image]").getAttribute('active-image');
        NAV_JAPAN.classList.remove('active');
        NAV_USA.classList.remove('active');
        NAV_SPAIN.classList.remove('active');
        if (NAV_SPAIN.id === activeImage.toLowerCase()) {
            NAV_SPAIN.classList.add('active');
            isSpainActive = true;
            isJapanActive = false;
            isUsaActive = false;
        }
        if (NAV_USA.id === activeImage.toLowerCase()) {
            NAV_USA.classList.add('active');
            isUsaActive = true;
            isJapanActive = false;
            isSpainActive = false;
        }
        if (NAV_JAPAN.id === activeImage.toLowerCase()) {
            NAV_JAPAN.classList.add('active');
            isJapanActive = true;
            isUsaActive = false;
            isSpainActive = false;
        }
    }

    const renderNewCarousel = () => {
        let count = 1;
        CAROUSEL_BLOCK.innerHTML = "";
        mediaArray.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("destination-section");//
            const span = document.createElement("span");
            span.innerText = item.alt;
            const img = document.createElement("img");
            img.src = item.src;
            img.alt = item.alt;
            if (count === 4) img.addEventListener("click", leftClick)
            if (count === 5) img.setAttribute('active-image', item.alt)
            if (count === 6) img.addEventListener("click", rightClick)
            card.appendChild(span);
            card.appendChild(img);
            CAROUSEL_BLOCK.appendChild(card);
            count++;
        })
        initEventListener();
        clearNavStyle();
    }

    renderNewCarousel();

    CAROUSEL_BLOCK.addEventListener("animationend", (animationEvent) => {
        animationEvent.preventDefault();
        if (animationEvent.animationName === "move-left") {
            CAROUSEL_BLOCK.classList.remove("transition-left");
        } else {
            CAROUSEL_BLOCK.classList.remove("transition-right");
        }
        renderNewCarousel();
    })

});



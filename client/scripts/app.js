function pageController(hash) {
    switch (hash) {
        case '#page1': {
            document.title = 'Api 1';
            for (let element of document.getElementsByClassName('content-box')) {
                element.style.display = 'none';
            }
            document.getElementById('api1-box').style.display = 'flex';
            break;
        }
        case '#page2': {
            for (let element of document.getElementsByClassName('content-box')) {
                element.style.display = 'none';
            }
            document.getElementById('api2-box').style.display = 'flex';
            document.title = 'Api 2';
            break;
        }
        case '#page3': {
            for (let element of document.getElementsByClassName('content-box')) {
                element.style.display = 'none';
            }
            document.getElementById('api3-box').style.display = 'flex';
            document.title = 'Api 3';
            break;
        }
    }
}

window.addEventListener('popstate', () => {
    pageController(window.location.hash);
});

window.location.hash = '#page1';
document.getElementById('api1-box').style.display = 'flex';

document.getElementById('search-api1-button').addEventListener('click', () => {
    alert('tada');
});

document.getElementById('search-api2-button').addEventListener('click', () => {
    alert('tada');
});

document.getElementById('search-api3-button').addEventListener('click', () => {
    alert('tada');
});
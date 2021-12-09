/**
 * Manages displaying content boxes when visiting different pages.
 * @param hash page hash
 */
function pageController(hash) {
    switch (hash) {
        case '#page1': {
            document.title = 'Healthy Lifestyle App';
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
            document.title = 'Healthy Lifestyle App';
            break;
        }
        case '#page3': {
            for (let element of document.getElementsByClassName('content-box')) {
                element.style.display = 'none';
            }
            document.getElementById('api3-box').style.display = 'flex';
            document.title = 'Healthy Lifestyle App';
            break;
        }
    }
}

/**
 * Clear BMI form data.
 */
function clearBmiContents() {
    document.getElementById('bmi-height-input').value = '';
    document.getElementById('bmi-weight-input').value = '';
    document.getElementById('bmi-output').value = '';
    document.getElementById('bmi-output-label').innerText = 'BMI: ';
}

function addBMIResult() {
    let createdElement = document.createElement('label');

    let createdInputDiv = document.createElement('div');
    createdInputDiv.classList.add('content_inline');
    createdInputDiv.style.display = 'none';
    createdElement.appendChild(createdInputDiv);

    let createdDiv = document.createElement('div');
    createdDiv.classList.add('content_inline');
    createdElement.appendChild(createdDiv);

    let createdLabel = document.createElement('label');
    createdLabel.innerText = 'BMI: ';
    createdLabel.style.height = '40px';
    createdInputDiv.appendChild(createdLabel);

    let createdInput = document.createElement('input');
    createdInput.type = 'number';
    createdInput.id = "aaa" + '-input';
    createdInputDiv.appendChild(createdInput);

    let confirmButton = document.createElement('button');
    confirmButton.classList.add('arrow-button');
    confirmButton.innerText = 'Smazat';
    createdInputDiv.appendChild(confirmButton);

    document.getElementById('bmi-results').appendChild(createdElement);
}

/**
 * Calculates BMI status in plain text, based on index value.
 * @param bmiValue body mass index value
 * @returns {string} bmi status in text form
 */
function getBMIStatus(bmiValue) {
    let bmiStatus;
    if (bmiValue < 18.5) {
        bmiStatus = "Podváha"
    } else if (bmiValue < 24.9) {
        bmiStatus = "Normální váha"
    } else if (bmiValue < 29.9) {
        bmiStatus = "Nadváha"
    } else {
        bmiStatus = "Obezita"
    }
    return bmiStatus;
}

/**
 * Creates listeners on button click events and sends XHR request to API's.
 */
function setButtonListeners() {
    document.getElementById('bmi-button').addEventListener('click', () => {
        const h = document.getElementById('bmi-height-input').value;
        const w = document.getElementById('bmi-weight-input').value;

        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let bmiValue = JSON.parse(xmlHttpRequest.response).result;
                document.getElementById('bmi-output').value = bmiValue;
                document.getElementById('bmi-output-label').innerText = "BMI: " + getBMIStatus(bmiValue);
                // addBMIResult();
            }
        };
        xmlHttpRequest.open("GET", `https://via-healthy-app-1681c74d.deno.dev/api/bmi?height=${h}&weight=${w}`, true);
        xmlHttpRequest.send();
    });

    document.getElementById('search-api2-button').addEventListener('click', () => {
        alert('tada');
    });

    document.getElementById('search-api3-button').addEventListener('click', () => {
        alert('tada');
    });
}

// INITIALIZE APP
window.addEventListener('popstate', () => {
    pageController(window.location.hash);
    clearBmiContents();
});

window.location.hash = '#page1';
document.getElementById('api1-box').style.display = 'flex';
clearBmiContents();
setButtonListeners();
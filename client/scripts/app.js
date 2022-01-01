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
            displayBMIResults();
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

function addBMIResult(bmiValue, bmiStatus) {
    let arr = JSON.parse(window.localStorage.getItem('bmiRecords'));
    if (arr === null || arr === undefined) {
        arr = []
    }

    arr.push({
        val: bmiValue,
        stat: bmiStatus,
        date: new Date().toLocaleDateString("en-US")
    });

    window.localStorage.setItem('bmiRecords', JSON.stringify(arr));
}

function displayBMIResults() {
    document.getElementById('bmi-results').innerHTML = '';
    document.getElementById('bmi-results-content').style.display = 'flex';
    let arr = JSON.parse(window.localStorage.getItem('bmiRecords'));
    if (arr === null || arr === undefined) {
        arr = []
    }

    for (let record of arr) {
        let createdElement = document.createElement('label');
        createdElement.style.backgroundColor = "white";
        createdElement.style.borderRadius = "25px";

        let createdInputDiv = document.createElement('div');
        createdInputDiv.classList.add('content_inline');
        createdElement.appendChild(createdInputDiv);

        let createdLabel = document.createElement('label');
        createdLabel.innerText = 'BMI: ' + record.val + ' | Status: ' + record.stat + ' | Dne: ' + record.date;
        createdLabel.style.height = '25px';
        createdInputDiv.appendChild(createdLabel);

        document.getElementById('bmi-results').appendChild(createdElement);
    }
}

/**
 * Calculates BMI status in plain text, based on index value.
 * @param bmiValue body mass index value
 * @returns {string} bmi status in text form
 */
function getBMIStatus(bmiValue) {
    let bmiStatus;
    if (bmiValue === 0) {
        bmiStatus = "Chyba"
    } else if (bmiValue < 18.5) {
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
                if (bmiValue === undefined || bmiValue === null) return;
                if (bmiValue < 0 || bmiValue > 100) bmiValue = 0;
                document.getElementById('bmi-output').value = bmiValue;
                document.getElementById('bmi-output-label').innerText = "BMI: " + getBMIStatus(bmiValue);
                addBMIResult(bmiValue, getBMIStatus(bmiValue));
                displayBMIResults();
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

    document.getElementById('delete-bmi-button').addEventListener('click', () => {
        window.localStorage.setItem('bmiRecords', JSON.stringify([]));
        document.getElementById('bmi-results').innerHTML = '';
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
displayBMIResults();
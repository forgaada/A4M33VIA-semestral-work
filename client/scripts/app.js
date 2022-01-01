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

function displayNutritionResults(food) {
    let resultLabel = document.getElementById("nutritionix-search-result");
    resultLabel.style.backgroundColor = "white";
    resultLabel.style.borderRadius = "25px";
    resultLabel.style.textAlign = "center";
    resultLabel.style.lineHeight = "150%";
    resultLabel.style.display = "block";
    resultLabel.style.paddingBottom = "15px";
    resultLabel.innerText = `
    Název: ${food.food_name} \r
    Počet: ${food.serving_qty} \r
    Velikost / jednotka: ${food.serving_unit} \r
    Hmotnost [g]: ${food.serving_weight_grams} \r
    Kalorie [kcal]: ${food.nf_calories} \r
    Tuky [g]: ${food.nf_total_fat} \r
    Cukry [g]: ${food.nf_sugars} \r
    Bílkoviny [g]: ${food.nf_protein} \r`
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
        let queryString = document.getElementById("search-api2-input").value;

        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let foods = JSON.parse(xmlHttpRequest.response).foods;
                displayNutritionResults(foods[0]);
            } else {
                let resultLabel = document.getElementById("nutritionix-search-result");
                resultLabel.innerText = "Žádné výsledky";
            }
        };
        xmlHttpRequest.open("POST", `https://trackapi.nutritionix.com/v2/natural/nutrients`, true);
        xmlHttpRequest.setRequestHeader('Access-Control-Allow-Headers', '*');
        xmlHttpRequest.setRequestHeader("x-app-id", "aa50ba62");
        xmlHttpRequest.setRequestHeader("x-app-key", "4e9b9d54c9a9c3f11ee37209396bbee4");
        xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
        xmlHttpRequest.send(JSON.stringify({ "query": queryString }));
    });

    document.getElementById('search-api3-button').addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let data = JSON.parse(xhr.response).data;
                let resultLabel = document.getElementById("bmr-output");
                resultLabel.style.backgroundColor = "white";
                resultLabel.style.borderRadius = "25px";
                resultLabel.style.textAlign = "center";
                resultLabel.style.lineHeight = "150%";
                resultLabel.style.display = "block";
                resultLabel.style.paddingBottom = "15px";
                resultLabel.innerText = `Rychlost spalování vašeho metabolismu: ${Math.floor(data.goals["maintain weight"])} kcal / den \r
                Doporučený denní příjem pro hubnutí: ${Math.floor(data.goals["Weight loss"].calory)} kcal \r
                Doporučený denní příjem pro nabírání: ${Math.floor(data.goals["Weight gain"].calory)} kcal`;
            }
        });

        xhr.open("GET", `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${document.getElementById('fitness-age-input').value}&gender=${document.querySelector('.gender:checked').value}&height=${document.getElementById('fitness-height-input').value}&weight=${document.getElementById('fitness-weight-input').value}&activitylevel=${document.querySelector('.activity:checked').value}`);
        xhr.setRequestHeader("x-rapidapi-host", "fitness-calculator.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "9d4861ef5amsh4f2e9163426b16bp1249efjsnb5ef49204b62");

        xhr.send(null);
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
//DataBase
const car1 = {
    brand:  "Toyota",
    model:  "Prius",
    type:   "Sedan",
    price:  49,
    img:    "img/prius.avif",
    isAvailable: true
}
const car2 = {
    brand:  "Toyota",
    model:  "Corolla",
    type:   "Sedan",
    price:  80,
    img:    "img/corolla.avif",
    isAvailable: true
}
const car3 = {
    brand:  "Toyota",
    model:  "Rav-4",
    type:   "SUV",
    price:  190,
    img:    "img/rav_4.avif",
    isAvailable: true
}
const car4 = {
    brand:  "Toyota",
    model:  "Tacoma",
    type:   "Truck",
    price:  300,
    img:    "img/tacoma.avif",
    isAvailable: true
}
const cars=[car1,car2,car3,car4];

    let filteredCar = [];
    const container = document.querySelector('.cars-container'); // Selecting container of cars
    const carFilter = document.querySelector('.cars-filter');
    const carType = document.querySelector('#carType');

    carFilter.addEventListener('click', function (e) {
        e.preventDefault();
        const carType = document.querySelector('#carType');
        const priceRange = document.querySelector('#priceRange');

        const [minPrice, maxPrice] = getPriceMinMax(priceRange.value, '-');

        //before calling cartypefiler
        carTypeFilter(carType);
        displayCar(minPrice, maxPrice);

        const filer_options = document.querySelector('.filter_options');
        filer_options.classList.add('is-hidden');
    });

    function carTypeFilter(carFilter) {
    // console.log("I am inside car Filter")
    if (carFilter.value !== "all") {
        for (let currentCar of cars) {
            if (isEqualCaseInsensitive(currentCar.type, carFilter.value)) {
                filteredCar.push(currentCar);
            }
        }
    } else {
        for (let car of cars) {
            filteredCar.push(car);
        }
    }
}

function isEqualCaseInsensitive(car, car1) {
    return car.toUpperCase() === car1.toUpperCase();
}

/**
 * min = 0
 * max = 50
 * @param stringToSplit
 * @param separator "-"
 */
function getPriceMinMax(stringToSplit, separator) {
    if (typeof stringToSplit !== 'string') {
        console.error("Invalid data type: Not string:", stringToSplit);
        return;
    }
    const [minPrice, maxPrice] = stringToSplit.split('-').map(Number);  //  "0-50" -> [0, 50]
    return [minPrice, maxPrice];
}

function displayCar(min, max) {
    // console.dir(`total car is ${cars}`);
    console.dir(`Filtered car is ${filteredCar}`);

    for (const car of filteredCar) {
        // console.dir(car);
        // console.log(`I am inside display car - ${car}`);
        console.log(`car price of ${car.brand}${car.model} : ${car.type} is ${car.price}`);
        if (car.price >= min && car.price <= max) {
            console.log(`I am inside display car - ${car}`);
            // // creating and adding elements in page by new.

            //Creating Div to hold car Info
            const availableCar = document.createElement('div');
            availableCar.classList.add('cars');

            // Create elements for car details
            const label = document.createElement('span');
            label.innerText = `${car.brand} : ${car.model} | Price Per Day :`;
            label.classList.add('rpd');

            const carPrice = document.createElement('div');
            carPrice.innerHTML = car.price;
            carPrice.classList.add('price-head');   // Adding Class inside carPrice Div

            const hrElt = document.createElement('hr');

            //Working with image
            const imageElement = document.createElement('img');
            imageElement.src = car.img;   // adding source of each car

            //Append elements to availableCar
            availableCar.appendChild(label);
            availableCar.appendChild(hrElt);
            availableCar.appendChild(carPrice);
            availableCar.appendChild(imageElement);

            // const imgDiv    = document.querySelector('div');
            // imgDiv.classList.add('carImg');
            // availableCar.appendChild(imgDiv);

            container.appendChild(availableCar);
            // //   Not a good practice
            // car.classId.classList.remove('is-hidden');
        }
    }
}

//####################################################################################################################
//Reservation Section
// const fullName = document.querySelector('#fullName');
// const reservationCar = document.querySelector('#reservationCar');
// const pickupDate = document.querySelector('#pickupDate');
// const returnDate = document.querySelector('#returnDate');
//
// const submitButton = document.querySelector('#submitButton');
//
// submitButton.addEventListener('click',function (e){
//     e.preventDefault();
//
//     console.log("clicked");
//     console.log("");
// })
//



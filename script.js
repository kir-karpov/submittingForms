const getCarPrice = (car) => {
  return new Promise((resolve, reject) => {
    const carPrices = {
      volvo: 1000,
      bmw: 2000,
      mercedes: 3000,
      ford: 1500
    };

    if (carPrices.hasOwnProperty(car)) {
      resolve(carPrices[car]);
    } else {
      reject("Ошибка: Неизвестная марка автомобиля");
    }
  });
};

const carSelector = document.getElementById("car-selector");
const buyButton = document.getElementById("buy-button");
const resultDiv = document.getElementById("result");

buyButton.addEventListener("click", () => {
  const selectedCar = carSelector.querySelector('input[name="car"]:checked');
  
  if (selectedCar) {
    const car = selectedCar.value;

    resultDiv.textContent = "Загрузка...";
    
    getCarPrice(car)
      .then(price => {
        resultDiv.textContent = `Вы выбрали ${car}. Стоимость: ${price}$`;

        // Отправка данных на сервер
        const data = {
          car: car,
          price: price
        };
      
        sendData(data)
          .then(response => {
            console.log(response);
            // Дополнительные действия после успешной отправки данных
          })
          .catch(error => {
            console.error(error);
            // Дополнительные действия в случае ошибки отправки данных
          });
      })
      .catch(error => {
        resultDiv.textContent = error;
      });
  } else {
    resultDiv.textContent = "Пожалуйста, выберите автомобиль.";
  }
});

const sendData = async (data) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Ошибка отправки данных на сервер");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

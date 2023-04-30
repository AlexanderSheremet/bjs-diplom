"use strict";
const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};
// получение информации о пользователе.

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile.showProfile(response.data);
  }
});

// Получение текущих курсов валюты.

const ratesBoard = new RatesBoard();
ratesBoard.currencyRates = () => {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
};
// Операция с деньгами.
const moneyManager = new MoneyManager();
// пополнение баланса
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Баланс пополнен");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};
// конвертирование валюты.
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Конвертация произведена");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};
// перевод валюты.
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Перевод произведен");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};

// Работа с избранным
//начальный список избранного
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});
// добавление пользователя в список избранных

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.succes, "Пользователь добавлен");
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
};
// удаление пользователя
favoritesWidget.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, "Пользователь удалён");
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
};

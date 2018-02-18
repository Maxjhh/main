//Класс, объекты которого описывают параметры гамбургера.
function Hamburger(size, stuffing) {
	this.size = size;
	this.stuffing = stuffing;
	this.toppings = [];
	showResult.call(this);
} 
//Размеры, виды начинок и добавок
Hamburger.SIZE_SMALL = { price: 50, calories: 20 }
Hamburger.SIZE_LARGE = { price: 100, calories: 40 }
Hamburger.STUFFING_CHEESE = { price: 10, calories: 20 }
Hamburger.STUFFING_SALAD = { price: 20, calories: 5 }
Hamburger.STUFFING_POTATO = { price: 15, calories: 10 }
Hamburger.TOPPING_MAYO = { price: 20, calories: 5 }
Hamburger.TOPPING_SPICE = { price: 15, calories: 0 }
Hamburger.DEFAULT = { price: 0, calories: 0 }
//Добавить добавку к гамбургеру. Можно добавить несколько добавок, при условии, что они разные.
Hamburger.prototype.addTopping = function (topping){
	var i = this.toppings.indexOf(topping);
	if(i == (-1)){
		this.toppings[this.toppings.length] = topping;
		showResult.call(this);
	}
	else {
		HamburgerException.call(Hamburger, 1);
	}
}
//Убрать добавку, при условии, что она ранее была добавлена.
Hamburger.prototype.removeTopping = function (topping){
	var i = this.toppings.indexOf(topping);
	if(i == (-1)){
		HamburgerException.call(this, 2);
	}
	else {
		this.toppings.splice(i, 1);
		showResult.call(this);
	}
}
//Получить список добавок.
//@return {Array} Массив добавленных добавок, содержит константы Hamburger.TOPPING_*
Hamburger.prototype.getToppings = function (){
	this.toppingsText = "";
	var mass = [];
	for (var i = 0; i < this.toppings.length; i++) {
		this.toppingsText += ", с ";
		switch(this.toppings[i]){
			case "mayo":
			this.toppingsText += "майонезом";
			mass[i] = Hamburger.TOPPING_MAYO;
			break;
			case "spice":
			this.toppingsText += "приправой";
			mass[i] = Hamburger.TOPPING_SPICE;
			break;
			default:
			this.toppingsText += "с неизвестной добавкой";
			mass[i] = Hamburger.DEFAULT;
			break;
		}
	}
	return mass;
}
//Узнать размер гамбургера
Hamburger.prototype.getSize = function (){
	switch(this.size){
		case "large":
		this.sizeText = "большой";
		return Hamburger.SIZE_LARGE;
		break;
		case "small":
		this.sizeText = "маленький";
		return Hamburger.SIZE_SMALL;
		break;
		default:
		this.sizeText = "неизвестный размер";
		return Hamburger.DEFAULT;
		break;
	}
}
//Узнать начинку гамбургера
Hamburger.prototype.getStuffing = function (){
	this.stuffingText = "с ";
	switch(this.stuffing){
		case "cheese":
		this.stuffingText += "сыром";
		return Hamburger.STUFFING_CHEESE;
		break;
		case "salad":
		this.stuffingText += "салатом";
		return Hamburger.STUFFING_SALAD;
		break;
		case "potato":
		this.stuffingText += "картофелем";
		return Hamburger.STUFFING_POTATO;
		break;
		default:
		this.stuffingText += "неизвестной начинкой";
		return Hamburger.DEFAULT;
		break;
	}
}
//Узнать цену гамбургера
Hamburger.prototype.calculatePrice = function (){
	var price = this.getSize().price + this.getStuffing().price;
	var toppings = this.getToppings();
	for (var i = toppings.length - 1; i >= 0; i--) {
		price += toppings[i].price;
	}
	return price;
}
//Узнать калорийность
Hamburger.prototype.calculateCalories = function (){
	var calories = this.getSize().calories + this.getStuffing().calories;
	var toppings = this.getToppings();
	for (var i = toppings.length - 1; i >= 0; i--) {
		calories += toppings[i].calories;
	}
	return calories;
}
//Представляет информацию об ошибке в ходе работы с гамбургером. 
//Подробности хранятся в свойстве message.
function HamburgerException (err) {
	switch (err){
		case 1:
			this.message = "Такая добавка уже добавлена";
		break;
		case 2:
			this.message = "Такой добавки нет";
		break;
	}
	console.log(this.message);
	alert(this.message);
}

function showResult(){
	this.getSize();
	this.getStuffing();
	this.getToppings();
	document.getElementById('res').innerHTML = "<b>Результат:</b><br>Гамбургер: " + this.sizeText + ", " + this.stuffingText + this.toppingsText + "<br>Цена: " + this.calculatePrice() + " рублей, калорийность: " + this.calculateCalories() + " калорий";
}

myHamburger = {};
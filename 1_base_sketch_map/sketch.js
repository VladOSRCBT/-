// Объект карты
let myMap;
// Холст p5js
let canvas;
// Объект mappa
const mappa = new Mappa('Leaflet');
// Дополнительные настройки карты (координаты центра, масштаб, сервер)
const options = {
	lat: 56,
	lng: 93,
	zoom: 12,
	// style: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'

	// style: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
	style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
	// style: 'http://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
	// style: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
	// style: 'http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png'
	// style: 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
	// style: 'http://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png'
	// style: 'http://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png'
	// style: 'http://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png'
	// style: 'http://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png'

	// style: 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
	// style: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png'
	// style: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
};
function preload() {
	data = loadJSON('./assets/trans.geojson');
}
// Настройка приложения
// Данная функция будет выполнена первой и только один раз
function setup () {
	canvas = createCanvas(windowWidth, windowHeight);

	myMap = mappa.tileMap(options);

	myMap.overlay(canvas);
}

// Основная функция отрисовки
// Выполняется 60 раз в секунду (как правило)
function draw () {
	// background(100);
	clear();
	//data.features[0].geometry.coordinates[0]
	stroke(255)
	for(let i=0;i<data.features.length;i++){
		for(let j=1; j< data.features[i].geometry.coordinates.length;j++){
			let start=data.features[i].geometry.coordinates[j-1];
			let end=data.features[i].geometry.coordinates[j];
			let s=myMap.latLngToPixel(start[1], start[0]);
			let e=myMap.latLngToPixel(end[1], end[0]);
			line (s.x,s.y,e.x,e.y);
		}
	}
	ellipse(mouseX, mouseY, 21, 21);
}

// Вспомогательная функция, которая реагирует на изменения размера
function windowResized() {
	canvas = resizeCanvas(windowWidth, windowHeight);
	myMap.mappaDiv.style.width = windowWidth + 'px';
 	myMap.mappaDiv.style.height = windowHeight + 'px';
}
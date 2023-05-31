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
	stations = loadJSON('./assets/stati.geojson')
}
// Настройка приложения
// Данная функция будет выполнена первой и только один раз
function setup() {
	canvas = createCanvas(windowWidth, windowHeight);

	myMap = mappa.tileMap(options);

	myMap.overlay(canvas);
}

// Основная функция отрисовки
// Выполняется 60 раз в секунду (как правило)
function draw() {
	// background(100);
	clear();
	//data.features[0].geometry.coordinates[0]
	//Рисуем дорогу
	drawRail();
	//Рисуем станции
	drawStations();

	// ellipse(mouseX, mouseY, 21, 21);
}

function drawStations() {
	stroke(210);
	fill(210);
	polys = stations.features[0].geometry.coordinates;
	polys.forEach(poly => {
		beginShape();
		for (let i = 0; i < poly.length; i++) {
			let lon = poly[i][0];
			let lat = poly[i][1];
			let pt = myMap.latLngToPixel(lat, lon);
			vertex(pt.x, pt.y);
		}
		endShape(CLOSE);
	});
}

function drawRail() {
	stroke(255);
	for (let i = 0; i < data.features.length; i++) {
		for (let j = 1; j < data.features[i].geometry.coordinates.length; j++) {
			let start = data.features[i].geometry.coordinates[j - 1];
			let end = data.features[i].geometry.coordinates[j];
			let s = myMap.latLngToPixel(start[1], start[0]);
			let e = myMap.latLngToPixel(end[1], end[0]);
			
			
			if(mouseOverLine(createVector(s.x, s.y), createVector(e.x, e.y))) {
				strokeWeight(5);
				// console.log(data.features[i].properties.Layer);
				let l = data.features[i].properties.Layer;
				if(l == 'r') stroke(255,0, 0);
				if(l == 'g') stroke(0, 255, 0);
				if(l == 'y') stroke(0, 0, 255);
				if(l == 'hd') stroke(255, 255, 0);
				// stroke(2)
			} else {
				strokeWeight(1);
			}
			line(s.x, s.y, e.x, e.y);
		}
	}
}

function mouseOverLine(start, end) {
	//нормаль на линию
	let m = createVector(mouseX, mouseY);
	let n = getNormalPoint(m, start, end);
	let d = n.dist(m);

	let ab = end.copy().sub(start);
	let ac = n.copy().sub(start);
	let k_ac = ab.dot(ac);
	let k_ab = ab.dot(ab);

	if (k_ac > 0 && k_ac < k_ab && d < 10) {
		fill(255, 0, 0);
		circle(n.x, n.y, 10);
		return true;
	}
	return false;
}

function getNormalPoint(pos, a, b) {
	let ap = pos.copy().sub(a);
	let ab = b.copy().sub(a);
	ab.normalize();
	ab.mult(ap.dot(ab));

	return a.copy().add(ab);
}

// Вспомогательная функция, которая реагирует на изменения размера
function windowResized() {
	canvas = resizeCanvas(windowWidth, windowHeight);
	myMap.mappaDiv.style.width = windowWidth + 'px';
	myMap.mappaDiv.style.height = windowHeight + 'px';
}
const csv = require('csv-parser')
const fs = require('fs');
const results = [];
const GeoJSON = require('geojson')

function saveToFile(output, filename) {
	fs.writeFile(filename, output, (err) => {
		// throws an error, you could also catch it here
		if (err) throw err;

		// success case, the file was saved
		console.log('saved!');
	});
}

fs.createReadStream('./data/bornes-recharge.csv')
	.pipe(csv())
	.on('data', (data) => {
//		var lat = Array.from(data.coordonneesXY)[1]
//		var long = Array.from(data.coordonneesXY)[0]
//		console.log(data.coordonneesXY)
		results.push(data)
	})
	.on('end', () => {
		var gjson = GeoJSON.parse(results, {Point: ['consolidated_latitude','consolidated_longitude']})
		saveToFile(JSON.stringify(gjson),'./generated/bornes-recharge.geojson')
		// [
		//   { NAME: 'Daffy Duck', AGE: '24' },
		//   { NAME: 'Bugs Bunny', AGE: '22' }
		// ]
	});

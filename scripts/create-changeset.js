const fs = require('fs');
const { create } = require('xmlbuilder2');
var schools = require('/home/aureliano/git/datahub/docker/postgres/data/annuaire-de-leducation.json');
var root = create({ version: '1.0' }).ele('osm')

function buildXML(school) {
	var isPrimary = false

	var level = ""

	if (school.fields.ecole_elementaire == 1 || school.fields.ecole_maternelle == 1) {
		isPrimary = true
		if (school.fields.ecole_elementaire == 1 && school.fields.ecole_maternelle == 1) {
			level = "0;1"
		} else {
			if (school.fields.ecole_maternelle == 1) {
				level = "0"
			}
			if (school.fields.ecole_elementaire == 1) {
				level = "1"
			}
		}

	} else {
		console.log(school.fields.nom_etablissement + " - " + school.fields.type_etablissement + " - " + school.fields.libelle_nature)
		if (school.fields.type_etablissement == 'Collège') {
			level = "2"
		} else {
			if (school.fields.type_etablissement == 'Lycée') {
				level = "3"
			} else {
				level = "4"
			}
		}

	}


	root
		.ele('node', { changeset: '229583', lat: school.fields.latitude, lon: school.fields.longitude, source: 'http://opendata.corsica/' })
		.ele('tag', { 'k': 'isced:level', v: level}).up()
		.ele('tag', { 'k': 'contact', v: school.fields.mail}).up()
		.ele('tag', { 'k': 'addr', v: school.fields.adresse_1}).up()
		.ele('tag', { 'k': 'name', v: school.fields.nom_etablissement}).up()
		.ele('tag', { 'k': 'amenity', v: 'school'}).up()
		.ele('tag', { 'k': 'operator', v: school.fields.statut_public_prive}).up()

}

for (const s of schools) {
	buildXML(s)
}
const xml = root.end({ format: 'xml', prettyPrint: true }); //

fs.writeFile('osm.xml', xml, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('saved!');
});




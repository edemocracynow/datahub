const fs = require('fs');
const { create } = require('xmlbuilder2');
var schools = require('/home/aureliano/git/datahub/docker/postgres/data/annuaire-de-leducation.json');

const axios = require('axios');
const api = 'https://api.openstreetmap.org/api/0.6'
const api_dev = 'https://master.apis.dev.openstreetmap.org/api/0.6'
const auth = {
	username: process.env.OSM_USERNAME,
	password: process.env.OSM_PASSWORD
}

function freeze(time) {
	const stop = new Date().getTime() + time;
	while (new Date().getTime() < stop);
}

async function closeAllChangeset() {
	const res = await axios.get(`${api}/changesets`, {
		params: {
			display_name: 'aurelianobuendias'
		},
		headers: { 'Content-Type': 'text/xml; charset=utf-8' },
		auth: auth
	});
	return res.data;
}

async function closeChangeset(id) {
	const res = await axios.put(`${api}/changeset/${id}/close`, {}, {
		headers: { 'Content-Type': 'text/xml; charset=utf-8' },
		auth: auth
	});
	console.log(`closed changeset ${res.data}`)
	return res.data;
}

async function createChangeset() {
	var root = create({ version: '1.0' }).ele('osm')

	root
		.ele('changeset')
		.ele('tag', { k: 'comment', v: 'Update Corse schools' })
		.ele('tag', { k: 'created_by', v: 'Aureliano Buendias' }).up()
	const xml = root.end({ format: 'xml', prettyPrint: true })
	const res = await axios.put(`${api}/changeset/create`, xml, {
		headers: { 'Content-Type': 'text/xml; charset=utf-8' },
		auth: auth
	});
	return res;
}

async function submit(node) {
	const xml = node.end({ format: 'xml', prettyPrint: true })
	const res = await axios.put(`${api}/node/create`, xml, {
		headers: { 'Content-Type': 'text/xml; charset=utf-8' },
		// Axios looks for the `auth` option, and, if it is set, formats a
		// basic auth header for you automatically.
		auth: auth
	});
	console.log("submitted node" + res.data)
	return res.data
}

function saveToFile(root) {
	const xml = root.end({ format: 'xml', prettyPrint: true }); //

	fs.writeFile('osm.xml', xml, (err) => {
		// throws an error, you could also catch it here
		if (err) throw err;

		// success case, the file was saved
		console.log('saved!');
	});
}

async function buildXML(school, changesetid) {

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

	var root = create({ version: '1.0' }).ele('osm')

	root
		.ele('node', { changeset: changesetid, lat: school.fields.latitude, lon: school.fields.longitude, source: 'http://opendata.corsica/' })
		.ele('tag', { 'k': 'isced:level', v: level }).up()
		.ele('tag', { 'k': 'name', v: school.fields.nom_etablissement }).up()
		.ele('tag', { 'k': 'amenity', v: 'school' }).up()

	if (school.fields.mail) {
		root.ele('tag', { 'k': 'contact', v: school.fields.mail }).up()
	}

	if (school.fields.adresse_1) {
		root.ele('tag', { 'k': 'addr', v: school.fields.adresse_1 }).up()
	}

	if (school.fields.statut_public_prive) {
		root.ele('tag', { 'k': 'operator', v: school.fields.statut_public_prive }).up()
	}

	await submit(root)

}

(async function() {
	res = await createChangeset()
	id = res.data
	console.log("created changeset " + id)

	for (const s of schools) {
		await buildXML(s, id)
		console.log("done");
	}

	await closeChangeset(id)

})()

const osmread = require("osm-read")

let waterfall = []
let school = []

var parser = osmread.parsePbf({
    filePath: '/home/aureliano/git/datahub/docker/postgres/data/corse-latest.osm.pbf',
    endDocument: function(){
	    console.log('Waterfall**********');
	    console.log('node: ' + JSON.stringify(waterfall));
        console.log('Schools**********');
	    console.log('node: ' + JSON.stringify(school));
        console.log('document end');
    },
    bounds: function(bounds){
        //console.log('bounds: ' + JSON.stringify(bounds));
    },
    node: function(node){
	    if(Object.entries(node['tags']).length > 0){
		   if(node['tags']['waterway'] == 'waterfall'){
			 waterfall.push(node)
		   }
           if(node['tags']['amenity'] == 'school'){
			 school.push(node)
		   }
	    }
    },
    way: function(way){
        //console.log('way: ' + JSON.stringify(way));
    },
    relation: function(relation){
        //console.log('relation: ' + JSON.stringify(relation));
    },
    error: function(msg){
        console.log('error: ' + msg);
    }
});
 

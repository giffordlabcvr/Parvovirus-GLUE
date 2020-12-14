var infiles = [ "bfdvMissing.tsv" ];


// Get the sequence source mappings (i.e. which in ncbi-refseqs, ncbi-curated, etc)
var epvRefseqResultMap = {};
get_sequence_source_mappings(epvRefseqResultMap);


for(var i = 0; i < infiles.length; i++) {

	var infile = infiles[i];

	// Load EVE data from tab file 
	var loadResult;
	glue.inMode("module/tabularUtilityTab", function() {
		loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/"+infile]));
		//glue.log("INFO", "load result was:", loadResult);
	});

	_.each(loadResult, function(isolateObj) {

        var sequenceID = isolateObj.sequence_sequenceID;
        var sourceName = epvRefseqResultMap[sequenceID];
		glue.log("INFO", "Entering sequence table data for isolate:", sequenceID, " from source '", sourceName, "'");
		glue.inMode("sequence/"+sourceName+"/"+sequenceID, function() {

        	var isolateEdit   = isolateObj.isolate;
        	var isolateUpdate = isolateObj.isolate_update;
		    //glue.log("INFO", "FIELD: isolateEdit:", isolateEdit);
		    //glue.log("INFO", "FIELD: isolateUpdate:", isolateUpdate);	    
		    if (isolateEdit != 'unchanged') {		    	
				glue.log("INFO", "Updating country field to:", isolateUpdate);
				glue.command(["set", "field", "gb_country", isolateUpdate]);				
		    }

        	var countryEdit   = isolateObj.country;
        	var countryUpdate = isolateObj.country_update;
		    //glue.log("INFO", "FIELD: isolateEdit:", isolateEdit);
		    //glue.log("INFO", "FIELD: isolateUpdate:", isolateUpdate);	    
		    if (countryEdit != 'unchanged') {		    	
				glue.log("INFO", "Updating country field to:", countryUpdate);
				glue.command(["set", "field", "gb_country", countryUpdate]);				
		    }
		    

		});

	});

}



// Populate a map with sequenceID -> sourceName pairs
function get_sequence_source_mappings(epvRefseqResultMap) {

	var resultList = glue.tableToObjects(glue.command(["list","sequence","sequenceID","source.name"]));	
		
	_.each(resultList,function(resultObj){

		//glue.log("INFO", "This result is:", resultObj);
		var sequenceID = resultObj["sequenceID"];
		var sourceName = resultObj["source.name"];
		//var sourceName = ["ncbi-refseqs"];
		epvRefseqResultMap[sequenceID] = sourceName;

	});
	
}



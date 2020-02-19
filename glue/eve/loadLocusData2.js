// Load EVE data from tab file 
var loadResult;
glue.inMode("module/aavTabularUtility", function() {
	loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/locus/epv-locus-data.tsv"]));
	// glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(eveObj) {

	glue.inMode("custom-table-row/locus_data/"+eveObj.id, function() {
	
		glue.log("INFO", "Processing sequence:", eveObj.id);

		glue.command(["set", "field", "scaffold", eveObj.scaffold]);
		glue.command(["set", "field", "start_position", eveObj.extract_start]);
		glue.command(["set", "field", "end_position", eveObj.extract_end]);
		glue.command(["set", "field", "orientation", eveObj.orientation]);
		glue.command(["set", "field", "host_sci_name", eveObj.organism]);

	});
});

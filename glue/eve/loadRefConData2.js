// Load EVE data from tab file 
var loadResult;
glue.inMode("module/parvoviridaeTabularUtility", function() {
	loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/eve/epv-refseqs-side-data.tsv"]));
	// glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(eveObj) {

	
	glue.inMode("sequence/fasta-refseqs-epv/"+eveObj.sequenceID, function() {
	
		glue.log("INFO", "Entering sequence table data for EVE reference:", eveObj.sequenceID);

		glue.command(["set", "field", "name", eveObj.insertion_name]);
		glue.command(["set", "field", "full_name", eveObj.insertion_full_name]);

	});

	glue.inMode("sequence/fasta-refseqs-epv/"+eveObj.sequenceID, function() {
	
		glue.log("INFO", "Entering sequence table data for EVE reference:", eveObj.sequenceID);

		//glue.command(["set", "field", "clade_ns", eveObj.virus_clade_ns]);
		//glue.command(["set", "field", "subclade_ns", eveObj.virus_subclade_ns]);
		//glue.command(["set", "field", "clade_vp", eveObj.virus_clade_vp]);
		//glue.command(["set", "field", "subclade_vp", eveObj.virus_subclade_vp]);
		glue.command(["set", "field", "name", eveObj.insertion_name]);
		glue.command(["set", "field", "full_name", eveObj.insertion_full_name]);

	});

});

	
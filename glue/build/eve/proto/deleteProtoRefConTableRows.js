
// Delete custom-table table rows for proto genus extension sequences
 var resultList = glue.tableToObjects(glue.command(["list", "sequence", "sequenceID", "source.name", "-w", "source.name = 'fasta-refseqs-proto-epv'"]));	
 	 
 _.each(resultList,function(resultObj) {

	var sequenceID = resultObj["sequenceID"];
	glue.log("INFO", "Deleting refcon_data row for:", sequenceID);
	glue.command(["delete", "custom-table-row", "refcon_data", sequenceID]);				

});


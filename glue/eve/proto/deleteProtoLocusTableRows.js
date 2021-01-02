// Delete custom-table table rows for proto genus extension sequences
 var resultList = glue.tableToObjects(glue.command(["list", "sequence", "sequenceID", "source.name", "-w", "source.name = 'fasta-digs-proto-epv'"]));	
 	 
 _.each(resultList,function(resultObj) {

	var sequenceID = resultObj["sequenceID"];
	glue.log("INFO", "Deleting locus_data row for:", sequenceID);
	glue.command(["delete", "custom-table-row", "locus_data", sequenceID]);				

});


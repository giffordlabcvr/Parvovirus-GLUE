// list the sequences in source 'ncbi-curated-amdo-amdv'
var listSeqResult = glue.command(["list", "sequence", "-w", "source.name = 'ncbi-curated-amdo-amdv'"]);

// extract from the result a list of sequence IDs.
var seqIds = glue.getTableColumn(listSeqResult, "sequenceID");

// Enter the taxonomic information for for each sequence in the sequence table
_.each(seqIds, function(seqId) {

	glue.inMode("sequence/ncbi-curated-amdo-amdv/"+seqId, function() {
	
		glue.log("INFO", "Entering sequence table data for EVE reference:", seqId );

		glue.command(["set", "field", "name", "AMDV"]);
		glue.command(["set", "field", "full_name", "Aleutian mink disease virus"]);
		glue.command(["set", "field", "genus", "Amdoparvovirus"]);

	});

});



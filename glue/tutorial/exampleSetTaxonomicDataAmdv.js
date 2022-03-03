// list the sequences in source 'ncbi-curated-amdo-amdv'
var listSeqResult = glue.command(["list", "sequence", "-w", "source.name = 'ncbi-curated-amdv'"]);

// extract from the result a list of sequence IDs.
var seqIds = glue.getTableColumn(listSeqResult, "sequenceID");

// Enter the taxonomic information for for each sequence in the sequence table
_.each(seqIds, function(seqId) {

	glue.inMode("sequence/ncbi-curated-amdv/"+seqId, function() {
	
		glue.log("INFO", "Entering taxonomic data for AMDV sequence:", seqId );

		glue.command(["set", "field", "name", "AMDV"]);
		glue.command(["set", "field", "full_name", "Aleutian mink disease virus"]);
		glue.command(["set", "field", "genus", "Amdoparvovirus"]);

	});

});


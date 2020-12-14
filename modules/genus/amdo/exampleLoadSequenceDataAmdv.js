// list the sequences in source 'ncbi-curated-circo-bfdv'
var listSeqResult = glue.command(["list", "sequence", "-w", "source.name = 'ncbi-curated-circo-bfdv'"]);

// extract from the result a list of sequence IDs.
var seqIds = glue.getTableColumn(listSeqResult, "sequenceID");

// Enter the taxonomic information for for each sequence in the sequence table
_.each(seqIds, function(seqId) {

	glue.inMode("sequence/ncbi-curated-circo-bfdv/"+seqId, function() {
	
		glue.log("INFO", "Entering sequence table data for EVE reference:", seqId );

		glue.command(["set", "field", "name", "BFDV"]);
		glue.command(["set", "field", "full_name", "Beak and feather disease virus"]);
		glue.command(["set", "field", "family", "Circoviridae"]);
		glue.command(["set", "field", "genus", "Circovirus"]);
		glue.command(["set", "field", "clade", "Avian-1"]);

	});

});



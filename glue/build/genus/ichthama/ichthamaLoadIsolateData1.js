var masterRef = 'MN049932';

// list the sequences in source ncbi-refseqs-ichthama
var listSeqResult = glue.command(["list", "sequence", "-w", "source.name = 'ncbi-refseqs-ichthama' and genus = 'Ichthamaparvovirus'"]);

// extract from the result a list of sequence IDs.
var seqIds = glue.getTableColumn(listSeqResult, "sequenceID");

// for each sequence ID
_.each(seqIds, function(seqId) {

	if (seqId != masterRef) { // Skip master reference
	  // create an object in the custom table which uses the sequence ID as the row ID.
	  glue.command(["create", "custom-table-row", "isolate", seqId]);
	  // associate the corresponding sequence with this object.
	  glue.inMode("sequence/ncbi-refseqs-ichthama/"+seqId, function() {
		  glue.command(["set", "link-target", "isolate", "custom-table-row/isolate/"+seqId]);
	  });
    }
});



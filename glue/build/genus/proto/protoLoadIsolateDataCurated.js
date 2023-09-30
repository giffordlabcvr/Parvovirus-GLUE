var masterRef = 'NC_001539';
var refSeqs = get_reference_sequence_map();

// list the sequences in source ncbi-refseqs-proto
var listSeqResult = glue.command(["list", "sequence", "-w", "source.name = 'ncbi-curated-proto'"]);

// extract from the result a list of sequence IDs.
var seqIds = glue.getTableColumn(listSeqResult, "sequenceID");

// for each sequence ID
_.each(seqIds, function(seqId) {

	if (seqId == masterRef) { 
		// Skip master reference
		glue.log("INFO", "Excluding master reference sequence:", seqId);
	}
	else if (refSeqs[seqId]) {
	
		// Skip genus-level reference sequences
		glue.log("INFO", "Excluding genus reference sequence:", seqId);
	}
	else {
	
	  // create an object in the custom table which uses the sequence ID as the row ID.
	  glue.command(["create", "custom-table-row", "isolate", seqId]);
	  
	  // associate the corresponding sequence with this object.
	  glue.inMode("sequence/ncbi-curated-proto/"+seqId, function() {
	  
	  	  glue.log("INFO", "Linking curated sequence:", seqId);
		  glue.command(["set", "link-target", "isolate", "custom-table-row/isolate/"+seqId]);
		  
	  });
    
    }

});

// Get coding features in a map  
function get_reference_sequence_map() {

	var resultMap = {};	

	// list the sequences in source
	var listSeqResult = glue.command(["list", "sequence", "-w", "source.name = 'ncbi-refseqs-proto'"]);

	// extract from the result a list of sequence IDs.
	var seqIds = glue.getTableColumn(listSeqResult, "sequenceID");
	
	_.each(seqIds,function(seqID){
		
		//glue.log("INFO", "Excluding reference sequence:", seqID);
		resultMap[seqID] = 1;
		

	});

	return resultMap;
}


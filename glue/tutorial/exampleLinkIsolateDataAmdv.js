// list the sequences in source 'ncbi-curated-circo-amdv'
var listSeqResult = glue.command(["list", "sequence", "-w", "source.name = 'ncbi-curated-amdv'"]);

// extract from the result a list of sequence IDs.
var seqIds = glue.getTableColumn(listSeqResult, "sequenceID");

// for each sequence ID
_.each(seqIds, function(seqId) {

    // create an object in the custom table which uses the sequence ID as the row ID.
    glue.command(["create", "custom-table-row", "isolate", seqId]);
    
    // associate the corresponding sequence with this object.
    glue.inMode("sequence/ncbi-curated-amdv/"+seqId, function() {
    
        if (seqId == 'NC_001662') {
             
             // Do nothing for main AMDV reference sequence
             
        }
        else {
	
		    glue.log("INFO", "Linking sequence to isolate table:", seqId );

        	glue.command(["set", "link-target", "isolate", "custom-table-row/isolate/"+seqId]);
        	
    	}
    });
    
});

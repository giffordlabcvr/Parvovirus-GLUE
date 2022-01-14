// Script to calculate nucleotide composition in reference sequences
var nucCompositionResults = {};
var lengthResults = {};

// export reference sequences from GLUE
glue.inMode("module/fastaExporter", function(){

	var sequences = glue.command(["export","-w","source.name like '%refseq%'","-p"]);
	var list = sequences.nucleotideFasta.sequences;
	
	_.each(list, function(seq)  {

	
        //loop through each sequence in the alignment
        seqNucComposition = {}
        
        var sequence   = seq.sequence;
        var sequenceId = seq.id;
		glue.log("INFO", "ID result was:", sequenceId);

	    //loop through each position in the current sequence
		for (var i=0; i < seq.sequence.length; i++) {

			var base = seq.sequence.charAt(i);
			
			if (seqNucComposition[base]) {

			    seqNucComposition[base] += 1;
			
			}
			else {

                seqNucComposition[base] = 1;
			}
	
		}
		
        glue.log("INFO", "Nucleotide composition result was:", seqNucComposition);
        
        nucCompositionResults[sequenceId] = seqNucComposition;
        lengthResults[sequenceId] = seq.sequence.length;
			
	});

	_.each(_.keys(nucCompositionResults), function(sequenceID) {
	
		var seqResults = nucCompositionResults[sequenceID];
		glue.log("INFO", "RESULTS FOR '"+sequenceID+"'");

	    _.each(_.keys(seqResults), function(nucleotide) {

			var count = seqResults[nucleotide];
			var length = lengthResults[sequenceID];		
			var ratio = count / length;
			//glue.log("INFO", "Got count '"+count+"' for nucleotide character'"+nucleotide+"'");
			glue.log("INFO", "Got ratio '"+ratio+"' for nucleotide character'"+nucleotide+"'");
		
		});
		
	});

});
 

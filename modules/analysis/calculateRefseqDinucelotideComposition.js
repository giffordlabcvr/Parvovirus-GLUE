// Script to calculate dinucleotide composition in reference sequences

var dinucCompositionResults = {};
var lengthResults = {};

// export reference sequences from GLUE
glue.inMode("module/fastaExporter", function(){

	var sequences = glue.command(["export","-w","source.name like '%refseqs%'","-p"]);
	var list = sequences.nucleotideFasta.sequences;
	
	_.each(list, function(seq)  {

	
        //loop through each sequence in the alignment
        seqDinucComposition = {}
        
        var sequence   = seq.sequence;
        var sequenceId = seq.id;
		glue.log("INFO", "ID result was:", sequenceId);

	    //loop through each position in the current sequence
	    var lastBase;
		for (var i=0; i < seq.sequence.length; i++) {

			var base = seq.sequence.charAt(i);
			
			if (lastBase) {
			
			    var dinuc = lastBase += base;
			
				if (seqDinucComposition[dinuc]) {

					seqDinucComposition[dinuc] += 1;
			
				}
				else {
					seqDinucComposition[dinuc] = 1;
				}
				
				lastBase = undefined;
				
			}
			else {
			
			  lastBase = base;
			}		
		}
		
        glue.log("INFO", "Dinucleotide composition result was:", seqDinucComposition);
        dinucCompositionResults[sequenceId] = seqDinucComposition;
        lengthResults[sequenceId] = seq.sequence.length;
			
	});

    
 
	_.each(_.keys(dinucCompositionResults), function(sequenceID) {
	
		var seqResults = dinucCompositionResults[sequenceID];
		glue.log("INFO", "RESULTS FOR '"+sequenceID+"'");

	    _.each(_.keys(seqResults), function(dinucleotide) {

			var count = seqResults[dinucleotide];
			var length = lengthResults[sequenceID];		
			var ratio = count / length;
			//glue.log("INFO", "Got count '"+count+"' for dinucleotide character'"+dinucleotide+"'");
			glue.log("INFO", "Got ratio '"+ratio+"' for dinucleotide character'"+dinucleotide+"'");
		
		});
		
	});



});

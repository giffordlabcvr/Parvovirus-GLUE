// Calculate dinucleotide composition in reference sequences
function calculateCompositionDinuc() {

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


	//glue.log("INFO", "FINAL RESULT WAS ", dinucCompositionResults);

	// Transform the data 
	// Iterate through reference sequences
	_.each(_.keys(dinucCompositionResults), function(referenceName) {

		//glue.log("INFO", "Got reference name '"+referenceName);
	
		// Iterate through reference sequence features
		var featuresObj = dinucCompositionResults[referenceName];
   
		_.each(_.keys(featuresObj), function(featureName) {

		   // Write values for each amino (count + ratio) 
		   var aaObj = featuresObj[featureName];
		   var length = aaObj["length"];
		   //glue.log("INFO", "Got reference name '"+referenceName+" and feature "+featureName+" length = "+length);
		   
		   
		   var aaCountResults = {};
		   var aaFreqResults = {};
		   _.each(headerRowAas, function(aa) {

			   var aaFreq;
			   var aaCount = aaObj[aa];
			   if (aaCount) {
					var aaFreq = (aaCount / length) * 100;
					var aaFormatedFreq = aaFreq.toFixed(2);
					//glue.log("INFO", "  Amino acid '"+aa+" frequency = ("+aaCount+" / "+length+") "+aaFormatedFreq);
			   }
			   else {
				    aaCount = '0';
				    aaFormatedFreq = '0';		  
			   }
			  
			  aaCountResults[aa] = aaCount;
			  aaFreqResults[aa] = aaFormatedFreq;

		   });

		   // add results to array to be returned to GLUE
		   outputArray.push({
		
			   referenceName: referenceName,
			   featureName: featureName,
			   seqLength: length,
			   AA: aaFreqResults["AA"]+" ("+aaCountResults["AA"]+")",
			   AT: aaFreqResults["AT"]+" ("+aaCountResults["AT"]+")",
			   AC: aaFreqResults["AC"]+" ("+aaCountResults["AC"]+")",
			   AG: aaFreqResults["AG"]+" ("+aaCountResults["AG"]+")",
			   TA: aaFreqResults["TA"]+" ("+aaCountResults["TA"]+")",
			   TT: aaFreqResults["TT"]+" ("+aaCountResults["TT"]+")",
			   TC: aaFreqResults["TC"]+" ("+aaCountResults["TC"]+")",
			   TG: aaFreqResults["TG"]+" ("+aaCountResults["TG"]+")",
			   CA: aaFreqResults["CA"]+" ("+aaCountResults["CA"]+")",
			   CT: aaFreqResults["CT"]+" ("+aaCountResults["CT"]+")",
			   CC: aaFreqResults["CC"]+" ("+aaCountResults["CC"]+")",
			   CG: aaFreqResults["CG"]+" ("+aaCountResults["CG"]+")",
			   GA: aaFreqResults["GA"]+" ("+aaCountResults["GA"]+")",
			   GT: aaFreqResults["GT"]+" ("+aaCountResults["GT"]+")",
			   GC: aaFreqResults["GC"]+" ("+aaCountResults["GC"]+")",
			   GG: aaFreqResults["GG"]+" ("+aaCountResults["GG"]+")"
			   
		   });
   
		});

	});
	 
	return outputArray;
}



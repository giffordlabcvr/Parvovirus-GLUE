function calculateCompositionCodonT() {

	// Script to calculate amino acid composition in reference sequences

	var codingFeatures = {};
	var resultMap = glue.command(["list", "feature","-w", "featureMetatags.name = 'CODES_AMINO_ACIDS'"]);
	var featureList = resultMap["listResult"];
	var codingFeatureList = featureList["row"];
	_.each(codingFeatureList,function(featureObj){

		//glue.log("INFO", "RESULT WAS ", featureObj);
	
		var valueArray = featureObj["value"];
		var codingFeatureName = valueArray[0];
		//glue.log("INFO", "NAME WAS ", featureName)
		codingFeatures[codingFeatureName] = featureObj;

	
	});	
	//glue.log("INFO", "RESULT WAS ", codingFeatures);

	// get list of reference sequences from GLUE
	var referencesResult = glue.command(["list","reference"]);
	//glue.log("INFO", "RESULT WAS ", referencesResult);

	var listResult = referencesResult["listResult"];
	var referencesList = listResult["row"];
	//glue.log("INFO", "RESULT WAS ", referencesList);


	// iterate through reference list and get AA composition of each coding feature
	codonCompositionResults = {}
	_.each(referencesList, function(refObj) {

		//glue.log("INFO", "RESULT WAS ", refObj);
	
		var refseqResults = {};
		var referenceProperties = refObj["value"];
		var referenceName = referenceProperties[0];
	
		//glue.log("INFO", "Reference name result was:", referenceName);

		// list all features annotated in this reference 
		// GLUE COMMAND: reference [referenceName] list feature-location
		glue.inMode("/reference/"+referenceName, function() {

			var featuresResult = glue.tableToObjects(glue.command(["list", "feature-location"]));
			//glue.log("INFO", "RESULT WAS ", featuresResult);
			 
			// iterate through features
			_.each(featuresResult, function(featureObj) {

			   //glue.log("INFO", "RESULT WAS ", featureObj);
			   
			   var featureResults = {};
		   
			   // get amino acid sequence
			   var featureName = featureObj["feature.name"];
			   //glue.log("INFO", "Feature name result was:", featureName);
		   
			   // get amino acid sequence of the features
			   if (codingFeatures[featureName]) {

				   glue.inMode("/feature-location/"+featureName, function() {
						  
					   var codonSequenceResult = glue.tableToObjects(glue.command(["amino-acid"]));

					   //glue.log("INFO", "Table result was:", codonSequenceResult);
	 
					   // iterate through and get codon composition of feature
					   var length = 0;
					   _.each(codonSequenceResult, function(codonObj) {
 
						   var codon = codonObj["codonNts"];
					   
						   length += 1;

						   //glue.log("INFO", "Amino acid residue result was:", codon);
			
						   if (featureResults[codon]) {

							   featureResults[codon] += 1;
			
						   }
						   else {

							   featureResults[codon] = 1;
						   }

					   });
				   
					   featureResults["length"] = length;
		   
				   });
			   
				  // store feature result
				  refseqResults[featureName] = featureResults;
			
				}
				   
			});   

			// store reference result
			codonCompositionResults[referenceName] = refseqResults;
		
		});   
	
	});

	//glue.log("INFO", "FINAL RESULT WAS ", codonCompositionResults);

	// Transform the data 
	var outputArray = [];
    var headerRowCodons = [ 'TTA', 'TTG', 'GTT', 'TTT', 'TTC', 'TGT', 'TGC', 'GCT', 'TCT',
                            'TCC', 'TCA', 'TCG', 'TAT', 'TAC', 'TGG', 'TGA', 'TAA', 'TAG' ];

	// Iterate through reference sequences
	_.each(_.keys(codonCompositionResults), function(referenceName) {

		glue.log("INFO", "Got reference name '"+referenceName);
	
		// Iterate through reference sequence features
		var featuresObj = codonCompositionResults[referenceName];
   
		_.each(_.keys(featuresObj), function(featureName) {

		   // Write values for each amino (count + ratio) 
		   var codonObj = featuresObj[featureName];
		   var length = codonObj["length"];
		   //glue.log("INFO", "Got reference name '"+referenceName+" and feature "+featureName+" length = "+length);
		   
		   
		   var codonCountResults = {};
		   var codonFreqResults = {};
		   _.each(headerRowCodons, function(codon) {

			   var codonFreq;
			   var codonCount = codonObj[codon];
			   if (codonCount) {
					var codonFreq = (codonCount / length) * 100;
					var codonFormatedFreq = codonFreq.toFixed(2);
					//glue.log("INFO", "  Amino acid '"+codon+" frequency = ("+codonCount+" / "+length+") "+codonFormatedFreq);
			   }
			   else {
				    codonCount = '0';
				    codonFormatedFreq = '0';		  
			   }
			  
			  codonCountResults[codon] = codonCount;
			  codonFreqResults[codon] = codonFormatedFreq;

		   });

		   // add results to array to be returned to GLUE
		   outputArray.push({

		
			   referenceName: referenceName,
			   featureName: featureName,
			   seqLength: length,
			   
			   "TCT%": codonFreqResults["TCT"],
			   "TCC%": codonFreqResults["TCC"],			   
			   "TCA%": codonFreqResults["TCA"],
			   "TCG%": codonFreqResults["TCG"],			   
			   "TAT%": codonFreqResults["TAT"],
			   "TAC%": codonFreqResults["TAC"],
			   "TGG%": codonFreqResults["TGG"],
			   "TTT%": codonFreqResults["TTT"],
			   "TTC%": codonFreqResults["TTC"],
			   "TTA%": codonFreqResults["TTA"],
			   "TTG%": codonFreqResults["TTG"],			   			   
			   "TGA%": codonFreqResults["TGA"],
			   "TAA%": codonFreqResults["TAA"],
			   "TAG%": codonFreqResults["TAG"],			   
			   "TGT%": codonFreqResults["TGT"],
			   "TGC%": codonFreqResults["TGC"],

		   });

   
		});


	});
	 
	return outputArray;
}



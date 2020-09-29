// Get variations
var master_ref = 'REF_MASTER_AAV2';
var master_alignment = 'AL_Dependo_A';

var codingfeatures = [  "Rep78", "VP1" ]; 

// Get the reference sequence amino acid residues for each feature into map data structure
var refseqFeatureAaMap = initialise_refseq_feature_aa_map();
glue.logInfo("refseqFeatureAaMap "+refseqFeatureAaMap); 

// Iterate through the coding features, retrieving variations that meet the criterion
_.each(codingfeatures, function(codingfeature) {

    glue.logInfo("Processing feature "+codingfeature+" in alignment "+master_alignment);

    // Get reference aminos for this feature from map
    var featureRefMap = refseqFeatureAaMap[codingfeature];
    
    // Use alignment to calculate aa frequencies in each listed coding feature
    var featureResultMap = {};
    var variationsToInclude = {};
    var sequencesToInclude = {};


	glue.inMode("alignment/"+master_alignment, function(){
	
		var resultList = glue.tableToObjects(glue.command(["amino-acid", "frequency", "-r", master_ref, "-f", codingfeature]));		
		_.each(resultList,function(resultObj){
		
		    // Get differences from consensus
		    var codonLabel = resultObj.codon;
		    var refResultObj  = featureRefMap[codonLabel]
		    var consensus  = refResultObj.definiteAas
		    
		    var aminoAcid  = resultObj.aminoAcid;
		    var numMembers = resultObj.numMembers;
		    var pctMembers = resultObj.pctMembers;
		    
		    
    		glue.logInfo("Processing "+codingfeature+" position "+codonLabel+consensus+" - frequency of '"+aminoAcid+"' = "+pctMembers);
		    
		});

	});
	
	//  Identify sequences containing the variations we selected
	
    // Create and export an alignment containing just these sequences 

});

// Get the reference sequence amino acid residues for listed coding features into a map data structure
function initialise_refseq_feature_aa_map() {

    var refseqFeatureResultMap = {}; 

	// Iterate through the coding features
	_.each(codingfeatures, function(codingfeature) {

		var labelledCodons;
		glue.inMode("reference/"+master_ref+"/feature-location/"+codingfeature, function(){
		
			var featureResultMap = {};
			var resultList = glue.tableToObjects(glue.command(["amino-acid"]));		
			_.each(resultList,function(resultObj){

				featureResultMap[resultObj.codonLabel] = resultObj;
				var codonLabel = resultObj.codonLabel;
				var aminoAcid  = resultObj.definiteAas;
				glue.logInfo("Setting AA at position '"+codonLabel+"' to be:'"+aminoAcid+"'");

			});
			
			refseqFeatureResultMap[codingfeature] = featureResultMap;
		});
	});
	return refseqFeatureResultMap;
}





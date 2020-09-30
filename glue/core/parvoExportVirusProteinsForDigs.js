var rep_fasta_aa = [ ];
var cap_fasta_aa = [ ];


// Get a list of all the distinct sources for reference sequences
var source_names = get_refseq_sources();

// Process reference sequences in each source
var featureSummary = {};
for(var i = 0; i < source_names.length; i++) {

	var sourceName = source_names[i];
	glue.logInfo("Processing source: "+sourceName);

    // Get the names (IDs) of all master references in this source	
	var refseq_ids = get_refseq_ids(sourceName);	

	// Iterate through the list of references
	for(var j = 0; j < refseq_ids.length; j++) {

		var refseqID = refseq_ids[j];
		glue.logInfo("Processing source "+sourceName+", Reference: "+refseqID);		

		// Get a list of the features in this reference sequence
		var myFeatures = get_features(refseqID);				

		// Iterate through the list of features
		for(var k = 0; k < myFeatures.length; k++) {
		
			var featureID = myFeatures[k];		
			process_feature(featureSummary, refseqID, featureID);
			
		}
	}
}

var rep_fasta_aa_str = rep_fasta_aa.join("\n");
glue.command(["file-util", "save-string", rep_fasta_aa_str, "export/rep78.faa"]);

var cap_fasta_aa_str = cap_fasta_aa.join("\n");
glue.command(["file-util", "save-string", cap_fasta_aa_str, "export/vp1.faa"]);





// SUBROUTINES
// Process feature 
function process_feature(featureSummary, refseqID, featureID) {
	
	glue.logInfo("  Processing feature: "+featureID+" in reference "+refseqID);

	if (featureID == "Rep78" || featureID == "VP1" ) {
		var featureCodons = get_coding_feature_amino_acids(refseqID, featureID);
		create_feature_fasta(refseqID, featureID, featureCodons, featureSummary);
	}	
}

// Create feature fasta 
function create_feature_fasta(refseqID, featureID, featureCodons, featureSummary) {

	var labelledCodons;
	glue.inMode("reference/"+refseqID+"/feature-location/"+featureID, function(){
		labelledCodons = glue.getTableColumn(glue.command(["list", "labeled-codon"]), "codonLabel");
		
	});

	// Iterate through all the codon positions
	var fasta_aa = ">"+refseqID+"_"+featureID+"\n";
	_.each(labelledCodons,function(codonLabel) {
	  
	  var resultObj1 = featureCodons[codonLabel];
	  var amino1   = resultObj1.aminoAcid;	
	  var ref_nuc  = resultObj1.refNt;	
	  var codon    = resultObj1.codonNts;	

	  //glue.logInfo("  amino acid "+amino1+", "+ref_nuc+", "+codon);

	  fasta_aa = fasta_aa+amino1;
	  
	});

 	//glue.logInfo("FASTA amino acid "+fasta_aa);	
	//glue.logInfo("FASTA nucleotide "+fasta_codons);
	
	fasta_aa = fasta_aa+"\n";
	if (featureID == "Rep78") {
	  rep_fasta_aa.push(fasta_aa); 
	
	}	
	if (featureID == "VP1") {
	  cap_fasta_aa.push(fasta_aa); 
	}	
	
}

// Return a map object containing amino-acid summary for a coding feature 
function get_coding_feature_amino_acids(refseqID, featureID) {
	
	glue.logInfo("  Getting amino acids for feature: "+featureID);
	
	var resultMap = {};
	glue.inMode("reference/"+refseqID+"/feature-location/"+featureID, function(){		
		var resultList = glue.tableToObjects(glue.command(["amino-acid"]));		
		_.each(resultList,function(resultObj){
			resultMap[resultObj.codonLabel] = resultObj;
		});
		
	});
	
	/* resultList will look like this.
	 * [
	 * 		{ codonLabel: "1", aminoAcid: "K", nucleotideTriplet:"TAC", ... },
	 *     	{ codonLabel: "2", aminoAcid: "L", ... },
	 *     	{ codonLabel: "3", aminoAcid: "S", ... }
	 * ]
	 */
	
	/* resultMap will look like this:
	 *  {
	 *     "1": { codonLabel: "1", aminoAcid: "K", ...},
	 *     "2": { codonLabel: "2", aminoAcid: "L", ...},
	 *     "3": { codonLabel: "3", aminoAcid: "S", ...},
	 * }
	 * 
	 */

	return resultMap;
}

// Get feature names for a give reference sequence
function get_features(refseqID) {

	var myFeatures;	
	glue.inMode("reference/"+refseqID, function(){
		myFeatures = glue.getTableColumn(glue.command(["list", "feature-location"]), "feature.name");
	});
	return myFeatures;
}

// Get source names
function get_refseq_sources() {
	glue.logInfo("Getting sources");
	var my_sources = glue.getTableColumn(glue.command(["list","source"]), "name");
	return my_sources;
}

// Get refseq IDs 
function get_refseq_ids(source) {
	glue.logInfo("Getting references");
	var my_refseq_ids = glue.getTableColumn(glue.command(["list","reference","-w", "sequence.source.name = '"+source+"'"]), "name");
	return my_refseq_ids;
}

// Get codons + amino acids for a given coding feature
function get_feature_amino_acids(refSeqID, feature) {

	var resultMap = {};
	glue.inMode("reference/"+refSeqID+"/feature-location/"+feature, function() {
	
		var resultList = glue.tableToObjects(glue.command(["amino-acid"]));		
		_.each(resultList,function(resultObj){
			resultMap[resultObj.codonLabel] = resultObj;
		});
	});
	return resultMap;	
}

// Get coding features in a map  
function get_coding_feature_map() {

	var resultMap = {};
	var myCodingFeatures = glue.getTableColumn(glue.command(["list", "feature-location","-w", "feature.featureMetatags.name = 'CODES_AMINO_ACIDS'"]));
	_.each(myCodingFeatures,function(resultObj){
		resultMap[resultObj.feature.name] = resultObj;
	});	
	return resultMap;

}


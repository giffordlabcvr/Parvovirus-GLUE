// Remove feature location annotations all reference sequences except master
//glue.command(["multi-delete", "feature_location", "-w", "referenceSequence.name != 'REF_MASTER_Dependo_AAV2'"]);

var constrainingRef = 'REF_MASTER_Dependo_AAV2';

// Get list of features on master reference
//var featuresToInherit = get_features('REF_MASTER_Dependo_AAV2');
var featuresToInherit = [ 'RCR', 'AAP'  ];

//list all dependo reference sequences
var refSeqObjList = glue.tableToObjects(glue.command(["list", "reference", "name"]));

var refseqs = ['REF_AAV1', 'REF_AAV10', 'REF_AAV11', 'REF_AAV12', 'REF_AAV3a', 'REF_AAV3b', 'REF_AAV4', 'REF_AAV5', 'REF_AAV6', 'REF_AAV7', 'REF_AAV8','REF_AAV9' ]



_.each(refSeqObjList, function(refSeqObj) {

	 for(var k = 0; k < featuresToInherit.length; k++) {
		 var featureID = featuresToInherit[k];
		 
		 glue.logInfo(" Inheriting feature: "+featureID+" from " +constrainingRef+ " to "+refSeqObj.name);		

		 glue.inMode("reference/"+refSeqObj.name, function() {
			 glue.command(["inherit", "feature-location", 			
				 "AL_Dependo_A", "-l", "REF_MASTER_Dependo_AAV2", featureID]);
		 });			
		 
	 }
	 		
});

// Get feature names for a give reference sequence
function get_features(refseqID) {

	var myFeatures;	
	glue.inMode("reference/"+refseqID, function(){
		myFeatures = glue.getTableColumn(glue.command(["list", "feature-location"]), "feature.name");
	});
	return myFeatures;
}


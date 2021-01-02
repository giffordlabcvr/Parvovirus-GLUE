// ABOUT: script to populate EPV tips within constrained alignment
// EPV sequences are added to alignments based on the taxonomic data associated with 
// the reference sequences.
// EPV sequences are linked to reference sequences via the locus ID

// Preset variables
var refconDataPath = "tabular/eve/epv-dependo-refseqs-side-data.tsv";
var rootAlignment = 'AL_MASTER_Dependo';

// Load the refcon data and store relationships between locus and viral taxonomy
var epvRefseqResultMap = {};
get_refcon_data(epvRefseqResultMap, refconDataPath);
//glue.log("INFO", "RESULT WAS ", epvRefseqResultMap);


// Load DIGS hit data from tabular file 
var loadResult1;
glue.inMode("module/tabularUtility", function() {
	loadResult1 = glue.tableToObjects(glue.command(["load-tabular", "tabular/eve/epv-dependo-side-data.tsv"]));
	// glue.log("INFO", "load result was:", loadResult1);
});

// Load NCBI curated EPV source
var loadResult2;
glue.inMode("module/tabularUtility", function() {
	loadResult2 = glue.tableToObjects(glue.command(["load-tabular", "tabular/eve/epv-dependo-ncbi-curated.tsv"]));
	// glue.log("INFO", "load result was:", loadResult2);
});


// Process source
process_source(loadResult1);
process_source(loadResult2);




//-~-~ SUBROUTINES

// get a list of sequence IDs from a given source in an alignment
function process_source(loadResult) {


	// Iterate on DIGS data, adding sequences to alignments as appropriate
	_.each(loadResult, function(eveObj) {

		// Get the locus ID
		var locus_name = eveObj.locus_name;
		var locus_numeric_id = eveObj.locus_numeric_id;
		var sequenceID = eveObj.sequenceID;
	
		glue.log("INFO", "Sequence ID", eveObj.sequenceID);
		glue.log("INFO", "Locus ID", eveObj.locus_numeric_id);
		glue.log("INFO", "Locus name:", eveObj.locus_name);

		if (locus_name != 'NK') { // Skip elements that haven't been assigned to a locus
	
			// Does an alignment exist for this locus ID
			var alignmentName = locus_name.replace("dependo.", "AL_EPV-DEPENDO-");

			// Get the taxonomy 
			var locusObj    = epvRefseqResultMap[locus_numeric_id];
			//glue.log("INFO", "LOADED EPV INFO ", locusObj);

			glue.log("INFO", "Adding sequence:", eveObj.id);
			glue.log("INFO", "to alignment", alignmentName);
			glue.log("INFO", "Assign_clade:", locusObj.assign_clade);
			glue.log("INFO", "Assign_subclade", locusObj.assign_subclade);
	
			var assign_clade    = locusObj.assign_clade;
			var assign_subclade = locusObj.assign_subclade;
		
			var parentAlignmentName;
			if (assign_clade == 'NK') {	// Skip references that havent been assigned to a clade			

			}
			else {
				
				parentAlignmentName = "AL_" + assign_subclade;

				glue.log("INFO", "PARENT ALIGNMENT: ", parentAlignmentName);

				var alignmentExists = does_alignment_exist(alignmentName);
		
				if (alignmentExists == undefined) { // If not create the alignment
				
					// Create the alignment
					var refseqName = "REF_EPV_" + locus_name;
				
					glue.log("INFO", "CREATING ALIGNMENT WITH CONSTRAINING REFERENCE: ", refseqName);
					glue.inMode("/alignment/"+parentAlignmentName, function() {
						glue.command(["extract", "child", alignmentName, "-r", refseqName]);
					});
			
				}	

				// Add the sequence to the alignment
				glue.inMode("/alignment/"+parentAlignmentName, function() {
			
					glue.command(["demote", "member", alignmentName, "-w", "sequence.sequenceID = '"+sequenceID+"'"]);
				});
			
			}
		
		}

	});
  
}


// get a list of sequence IDs from a given source in an alignment
function get_refcon_data(resultMap, refconDataPath) {

  // Load EVE reference data from tab file 
  var loadResult;
  glue.inMode("module/tabularUtility", function() {
	  loadResult = glue.tableToObjects(glue.command(["load-tabular", refconDataPath]));
	  // glue.log("INFO", "load result was:", loadResult);
  });

  _.each(loadResult, function(eveObj) {

	  var source_name = eveObj.source_name
	  var sequenceID = eveObj.sequenceID
	  var locus_numeric_id = eveObj.locus_numeric_id;
	  // glue.log("INFO", "Setting locus data for EVE reference:", eveObj.sequenceID);
	  resultMap[locus_numeric_id] = eveObj;
	
  });
  
}

// check whether an alignment exists
function does_alignment_exist(alignmentName) {

	var alignmentExists = undefined;
	// glue.log("INFO", "Checking for alignment ", alignmentName);

    alignmentResult = glue.tableToObjects(glue.command(["list", "alignment", "-w", "name = '"+alignmentName+"'"]));
	//glue.log("INFO", "list result was:", alignmentResult);

	var rowObj =  alignmentResult[0];
	if (rowObj) {
		alignmentExists = rowObj['name'];
		//glue.log("INFO", "got exists value:", alignmentExists);
	}
	
	return alignmentExists;
}


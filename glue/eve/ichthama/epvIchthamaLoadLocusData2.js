var refconDataPath = "tabular/eve/epv-ichthama-refseqs-side-data.tsv";
var source_name = 'fasta-digs-ichthama-epv';

// Load the refcon data and store relationships between locus and viral taxonomy
var epvRefseqResultMap = {};
get_refcon_data(epvRefseqResultMap, refconDataPath);
//glue.log("INFO", "RESULT WAS ", epvRefseqResultMap);

// Load EVE side data from tab file 
var loadResult;
glue.inMode("module/tabularUtility", function() {
	loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/eve/epv-ichthama-side-data.tsv"]));
	// glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(eveObj) {

    var locus_numeric_id = eveObj.locus_numeric_id;
	//glue.log("INFO", "LOADED EPV INFO ", eveObj);
	glue.inMode("custom-table-row/locus_data/"+eveObj.sequenceID, function() {
	
		glue.log("INFO", "Entering locus data for sequence:", eveObj.sequenceID);

		glue.command(["set", "field", "locus_name", eveObj.locus_name]);
		glue.command(["set", "field", "locus_numeric_id", eveObj.locus_numeric_id]);
		glue.command(["set", "field", "scaffold", eveObj.scaffold]);
		glue.command(["set", "field", "start_position", eveObj.extract_start]);
		glue.command(["set", "field", "end_position", eveObj.extract_end]);
		glue.command(["set", "field", "orientation", eveObj.orientation]);
		glue.command(["set", "field", "host_sci_name", eveObj.organism]);
		//glue.command(["set", "field", "host_class", eveObj.host_class]);
		//glue.command(["set", "field", "host_superorder", eveObj.host_superorder]);
		//glue.command(["set", "field", "host_order", eveObj.host_order]);
		//glue.command(["set", "field", "host_family", eveObj.host_family]);
		//glue.command(["set", "field", "host_genus", eveObj.host_genus]);

	});

	if (eveObj.locus_name != 'NK') { // Skip elements that haven't been assigned to a locus
	
		// Does an alignment exist for this locus ID
		glue.log("INFO", "Getting taxonomic data for sequence:", eveObj.sequenceID);

		// Get the taxonomy 
		var epvRefConObj = epvRefseqResultMap[locus_numeric_id];
		//glue.log("INFO", "LOADED REFCON INFO ", epvRefConObj);


	
		var assign_clade      = epvRefConObj.assign_clade;
		var assign_subclade   = epvRefConObj.assign_subclade;
		var clade_ns    = epvRefConObj.virus_clade_ns;
		var subclade_ns = epvRefConObj.virus_subclade_ns;
		var clade_vp    = epvRefConObj.virus_clade_vp;
		var subclade_vp = epvRefConObj.virus_subclade_vp;


		glue.inMode("sequence/"+source_name+"/"+eveObj.sequenceID, function() {

			//glue.command(["set", "field", "clade_ns", clade_ns]);
			//glue.command(["set", "field", "subclade_ns", subclade_ns]);
			//glue.command(["set", "field", "clade_vp", clade_vp]);
			//glue.command(["set", "field", "subclade_vp", subclade_vp]);
			glue.command(["set", "field", "genus", "Amdoparvovirus"]);
			glue.command(["set", "field", "subfamily", "Parvovirinae"]);
			
			glue.command(["set", "field", "assign_clade", assign_clade]);
			glue.command(["set", "field", "assign_subclade", assign_subclade]);

			glue.command(["set", "field", "name", eveObj.sequenceID]);
			glue.command(["set", "field", "full_name", eveObj.sequenceID]);

		});

	}

});



// get a list of sequence IDs from a given source in an alignment
function get_refcon_data(resultMap, refconDataPath) {

  // Load EVE reference data from tab file 
  var loadResult;
  glue.inMode("module/tabularUtility", function() {
	  loadResult = glue.tableToObjects(glue.command(["load-tabular", refconDataPath]));
	  // glue.log("INFO", "load result was:", loadResult);
  });

  _.each(loadResult, function(eveObj) {

	  var locus_numeric_id = eveObj.locus_numeric_id;
	  //glue.log("INFO", "Setting locus data for EVE reference:", eveObj.sequenceID);
	  resultMap[locus_numeric_id] = eveObj;
	
  });
  
}

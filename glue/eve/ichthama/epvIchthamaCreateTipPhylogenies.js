// ABOUT: script to create tip phylogenies
var outputPath = "trees/eve-orthologs/";
var alignOutputPath = "alignments/export/eve-orthologs/";

// Get list of alignments
alignmentResult = glue.tableToObjects(glue.command(["list", "alignment", "-w", "name like '%AL_epv-Ichthama%'"]));

// Iterate on DIGS data, adding sequences to alignments as appropriate
_.each(alignmentResult, function(alnObj) {

	// Set paths
	var alignmentName = alnObj.name;
    var alignmentStem = alignmentName.replace("AL_", "");
    var treeOutputPath = outputPath + alignmentStem + ".tre";
    var midpointPath   = outputPath + alignmentStem + ".midpointRooted.tre";
	var annotationPath = outputPath + alignmentStem + ".figtree-annotations.tsv";
 	var alignmentPath = alignOutputPath + alignmentStem + ".aln.fna";


    glue.log("INFO", "Checking for alignment ", alignmentName);

    // How many taxa?
    var numTaxa;
    glue.inMode("/alignment/"+alignmentName, function() {

		alignmentListResult = glue.tableToObjects(glue.command(["list", "member"]));
		numTaxa = alignmentListResult.length;

	});   
    glue.log("INFO", "NUMBER TAXA: ", numTaxa);


	if (numTaxa >= 4) {

		glue.command(["compute", "alignment", alignmentName, "parvoMafftAligner"]);
  
		// Record feature coverage in each alignment
		glue.inMode("/module/parvoFeaturePresenceRecorder", function() {		
			glue.command(["record", "feature-presence", alignmentName, "--recursive", "--featureName", "whole_genome", "--descendentFeatures" ]);
		});   

		// Create the phylogenies
		glue.inMode("/module/raxmlPhylogenyGenerator", function() {
	 
			glue.log("INFO", "Tree will be written to path: ", treeOutputPath);
			glue.command(["generate", "nucleotide",  "phylogeny", alignmentName, "-a", "-o",treeOutputPath, "NEWICK_BOOTSTRAPS" ]);

		});   


		// Reroot the phylogenies
		glue.inMode("/module/phyloUtility", function() {

			
			glue.log("INFO", "Tree will be written to path: ", midpointPath);
			glue.command(["reroot-phylogeny", "--inputFile",  treeOutputPath, "NEWICK_BOOTSTRAPS",  "--midpoint", "--outputFile", midpointPath, "NEWICK_BOOTSTRAPS" ]);

		});   

		
		// Export the annotations
		glue.inMode("/module/epvFigTreeAnnotationExporter", function() {

			glue.log("INFO", "Tree will be written to path: ", annotationPath);
			glue.command(["export", "figtree-annotation",  alignmentName, "-f", annotationPath ]);

		});   
		
		// Export the alignments
		glue.inMode("/module/epvFastaAlignmentExporter", function() {

			glue.log("INFO", "Alignment will be written to path: ", alignmentPath);
			glue.command(["export", alignmentName, "-e", "-a","-o", alignmentPath ]);
			
		});   
		
		
	}
	
});



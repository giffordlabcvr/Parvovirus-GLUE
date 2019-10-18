# Parvoviridae-EVE

## Description

This is Parvoviridae-EVE, a GLUE project designed to support comparative genomic and evolutionary analysis of parvoviruses.

Parvoviridae-EVE contains aligned, annotated genome sequence data for:

1. Parvoviruses (family Parvoviridae)
2. Endogenous viral elements (EVEs) derived from parvoviruses

## Sequence data

The sequence data in this project have been organised into the following sources:

*ncbi-refseqs*: Genome-length reference sequences of representative parvovirus species. These XML-formatted files are downloaded directly from NCBI using a GLUE module (see here) and are uniquely identified within this project by their GenBank accession numbers.

*fasta-curated*: A non-redundant set of parvovirus-derived EVE loci. These FASTA sequences have been curated via systematic screening of whole genome sequence (WGS) assemblies using the DIGS tool. Sequences in this source have unique IDs based on arbitrary numbering.

*fasta-refseqs*: EVE reference sequences - i.e. best-guess estimates of the ancestral parvovirus sequences that gave rise to EVEs. Where possible these are consensus/ancestral sequences derived from alignments included in this project. Sequence IDs used in this source correspond to the names of the unique EVE loci they represent (see here for details). 

## Sequence-associated data

Sequences included in this project are linked to auxiliary data in tabular format, this includes:

1. Basic taxonomic data for genome-length virus reference sequence in ncbi-refseqs.
2. Locus data for the EVE sequences in fasta-curated.
3. Evolutionary history of the EVE loci represented in fasta-refseqs.

## Multiple sequence alignments (MSAs)

Several distinct categories of MSA are included in this project, each representing a distinct taxonomic level.

1. Tip (i): Virus species (genome-length)
2. Tip (ii): EVE lineages (single gene). These alignments contain sets of EVE sequences derived from the same ancestral germline colonisation event (i.e. orthologs or duplicates)
3. Internal: Virus genera (genome-length)
4. Root: Viruses and EVE reference sequences (single gene)

## GLUE project

On computers with
[GLUE](http://tools.glue.cvr.ac.uk) installed, the Parvoviridae-EVE project can be instantiated by
navigating to the project folder, initiating GLUE, and issuing the following command in the GLUE shell:

	Mode path: /
	GLUE> run file parvoviridaeProject.glue


## Contributors

Robert J. Gifford (robert.gifford@glasgow.ac.uk)

Josh Singer (josh.singer@glasgow.ac.uk) 

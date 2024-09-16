# Parvovirus-GLUE

<img src="md/parvo-glue-logo.png" align="right" alt="" width="280"/>

Welcome to Parvovirus-GLUE, a resource for comparative genomic analysis of parvoviruses, developed using the [GLUE software framework](https://github.com/giffordlabcvr/gluetools).

**Parvoviruses** (family *Parvoviridae*) are a diverse group of small, non-enveloped DNA viruses that infect a broad range of animal species. This family includes several pathogens of humans and domesticated animals, as well as viruses being developed for therapeutic uses.

**[GLUE](https://github.com/giffordlabcvr/gluetools)** is an open, integrated software toolkit designed for storing and interpreting sequence data. It supports the creation of bespoke projects, incorporating essential data items for comparative genomic analysis, such as sequences, multiple sequence alignments, genome feature annotations, and other associated data.

Projects are loaded into the GLUE "engine," forming a relational database that represents the semantic relationships between data items. This foundation supports systematic comparative analyses and the development of sequence-based resources.

**Parvovirus-GLUE** contains genome feature definitions, multiple sequence alignments, and annotated reference sequences for all parvovirus species included in the [most recent ICTV report](https://ictv.global/report/chapter/parvoviridae/parvoviridae).

This **Parvovirus-GLUE**  project can be extended with additional layers, openly available via GitHub, including:

  - **[Parvovirus-GLUE-EVE](https://github.com/giffordlabcvr/Parvovirus-GLUE-EVE)**: extends Parvovirus-GLUE through the incorporation of endogenous parvoviral elements.

Please see the **[User Guide](https://github.com/giffordlabcvr/Parvovirus-GLUE/wiki)** for more details.

## Table of Contents

- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [Data Sources](#data-sources)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Key Features


- **GLUE Framework Integration**: Built on the GLUE software framework, Parvovirus-GLUE offers an extensible platform for efficient, standardized, and reproducible computational genomic analysis of parvoviruses.

- **Phylogenetic Structure**: Sequence data in Parvovirus-GLUE is organized in a phylogenetically-structured manner, allowing users to explore evolutionary relationships easily.

- **Rich Annotations**: Annotated reference sequences enable rigorous comparative genomic analysis related to conservation, adaptation, structural context, and genotype-to-phenotype associations.
  
- **Reproducibility**: Ensures fully reproducible analyses through data standards and a relational database.
  
- **Reusable Data Objects**: High-value data items such as multiple sequence alignments are prepared once and reused.
  
- **Validation**: Enforces high data integrity through cross-validation.
  
- **Standardisation of Genomic Coordinates**: All sequences use the coordinate space of a chosen reference sequence.
  
- **Predefined Reference Sequences**: Includes fully-annotated reference sequences for parvovirus species.
  
- **Alignment Trees**: Links alignments constructed at distinct taxonomic levels, maintaining a standardised coordinate system.
  

## Installation

If you have not done so already, install the GLUE software framework by following the [installation instructions](http://glue-tools.cvr.gla.ac.uk/#/installation) on the GLUE web site: 

Download the Parvovirus-GLUE repository, navigate into the top-level directory, and start the GLUE command line interpreter.

### Steps

1. **Build the Core Project**:
   
```
   Mode path: /
   GLUE> run file buildCoreProject.glue
```

This command builds the core project, representing diversity among the parvovirus family via a minimal annotated species reference sequences.

2. **Build Genus-Level Extension Projects**:

```
Mode path: /
GLUE> run file buildGenusLevelProjects.glue
```

This command constructs genus-level extensions, incorporating a more extensive set of species.

To build both project layers in one go, run the 'buildParvovirusProject.glue' file as follows:

```
Mode path: /
GLUE> run file buildParvovirusProject.glue
```

## Usage

GLUE contains an interactive command line environment focused on the development and use of GLUE projects by bioinformaticians. This provides a range of productivity-oriented features such as automatic command completion, command history and interactive paging through tabular data. 

For detailed instructions on how to use Parvovirus-GLUE for your comparative genomic analysis, refer to the GLUE's [reference documentation](http://glue-tools.cvr.gla.ac.uk/).

## Data Sources

Parvovirus-GLUE relies on the following data sources:

- [NCBI Nucleotide](https://www.ncbi.nlm.nih.gov/nuccore)


## Contributing

We welcome contributions from the community! If you're interested in contributing to Parvovirus-GLUE, please review our [Contribution Guidelines](./md/CONTRIBUTING.md).

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./md/code_of_conduct.md)


## License

The project is licensed under the [GNU Affero General Public License v. 3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)

## Contact

For questions, issues, or feedback, please open an issue on the [GitHub repository](https://github.com/giffordlabcvr/Parvovirus-GLUE/issues).


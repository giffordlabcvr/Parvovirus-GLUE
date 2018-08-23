# Parvoviridae-GLUE

## Description

This is Parvoviridae-GLUE: a GLUE project for the [parvoviruses](https://viralzone.expasy.org/11?outline=all_by_species) (family Parvoviridae ).

[GLUE](http://tools.glue.cvr.ac.uk) is an open source, data-centric bioinformatics environment specialised for developing virus genome data resources (VGDR).

 This [GLUE](http://tools.glue.cvr.ac.uk) project contains reference information for the parvovirus family, including:

* A set of parvovirus reference sequences linked to auxiliary data.
* A comprehensive list of parvovirus genome features and their specific locations on full genome reference sequences.
* Alignments of parvovirus reference sequences arranged hierarchically by clade.

## Who can use this resource, and for what?

Parvoviridae-GLUE can be used a straightforward data repository, with no requirement for use of the GLUE software framework. 

In addition, the Parvoviridae-GLUE project can be developed within the GLUE framework by extending the core dataset with new data and functionality.
So far we have used Parvoviridae-GLUE to develop the following GLUE extension projects. 

* [Parvoviridae-EVE](https://giffordlabcvr.github.io/Parvoviridae-EVE/) - a GLUE project for endogenous parvoviral elements.
* [Dependoparvovirus-EVE](https://giffordlabcvr.github.io/Dependoparvovirus-EVE/) - a GLUE project for dependoparvoviruses, focussed on their potential applications as gene therapy vectors. 

Note that Parvoviridae-GLUE serves as a data repository for parvovirus reference data, and these data can be accessed here, without any requirement to install GLUE. 

## Installation

You can install Parvoviridae-GLUE on computers running Windows, MacOSX or Linux.

1. Install [GLUE](http://tools.glue.cvr.ac.uk), based on the [GLUE installation instructions](http://tools.glue.cvr.ac.uk/#/installation). 
2. Once GLUE is installed and working, clone the Parvoviridae-GLUE repository into your `gluetools/projects` directory.
3.  Within the `gluetools/projects/Parvoviridae-GLUE` directory, start GLUE and build the project by issuing the command shown below:

```
Mode path: /
GLUE> run file parvoviridae.glue
```
4. This should run to completion and produce the `OK` result.


## Contributors

Robert J. Gifford (robert.gifford@glasgow.ac.uk)

Josh Singer (josh.singer@glasgow.ac.uk)


## License

The project is licensed under the [GNU Affero General Public License v. 3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)

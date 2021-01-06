###### Parvoviridae

# See recent hits 
SELECT * FROM digs_results
ORDER BY TIMESTAMP DESC

# HOW many SPECIES screened?
SELECT DISTINCT organism
FROM searches_performed

# HOW many assemblies screened?
SELECT DISTINCT organism, target_version
FROM searches_performed 

# Get Parvoviridae hits
select  *
FROM digs_results, eve_data
WHERE assigned_name = eve_data.virus_species
AND virus_genus = 'Protoparvovirus'

# COUNT Parvoviridae hits  by genus
select  genus, count(*) as number 
FROM digs_results, eve_data
WHERE assigned_name = eve_data.virus_species
GROUP BY genus

# Get Flaviviridae hits by specific genus
SELECT virus_genus, organism, assigned_name, assigned_gene, bitscore, identity, target_version,target_name,scaffold,extract_start,extract_end,sequence_length,orientation,sequence
FROM eve_data, digs_results
WHERE assigned_name = eve_data.virus_species
AND virus_genus = 'Flaviviridae'
AND bitscore > 40
ORDER BY organism


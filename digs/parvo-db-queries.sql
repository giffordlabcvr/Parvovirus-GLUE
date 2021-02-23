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





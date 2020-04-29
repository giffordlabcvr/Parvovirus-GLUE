# Get Parvoviridae hits from digs_results
SELECT digs_results.record_id, organism, virus_family, virus_genus, assigned_gene,scaffold,extract_start,extract_end, sequence_length, orientation, assigned_name, subject_start, subject_end, sequence
FROM eve_data, digs_results
WHERE assigned_name = eve_data.virus_species
AND virus_family = 'Parvoviridae'

ORDER BY digs_results.TIMESTAMP DESC
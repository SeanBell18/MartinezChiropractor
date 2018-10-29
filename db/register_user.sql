INSERT INTO client
(name, auth_id, email, phone, is_admin)
VALUES 
($1, $2, $3, $4, false)
RETURNING *
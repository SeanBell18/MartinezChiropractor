INSERT INTO client
(name, auth_id, email, phone, is_admin, picture)
VALUES 
($1, $2, $3, $4, false, 'http://via.placeholder.com/200x200')
RETURNING *
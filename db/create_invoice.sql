INSERT INTO invoice(item_id, qty, client_id, invoice_date)
VALUES(1, 1, $1, $2);
SELECT invoice_id FROM invoice ORDER BY invoice_id DESC LIMIT 1;
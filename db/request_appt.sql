INSERT INTO appointment(client_id, invoice_id, appt_date, appt_time, approved)
VALUES($1, $2, $3, $4, 'pending')
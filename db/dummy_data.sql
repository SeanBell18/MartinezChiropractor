INSERT INTO product (product_name, price, in_stock)
VALUES('adjustment', 30.00, 5000),
('massage(30)', 30.00, 5000),
('massage(60)', 55.00, 5000),
('Biofreeze', 8.00, 25),
('Exercise Ball', 13.00, 20),
('Foam Roller', 15.00, 12);
INSERT INTO invoice (item_id, qty, client_id, invoice_date)
VALUES(1, 1, 3, '2018-10-23'),
(1, 1, 3, '2018-10-22'),
(1, 1, 2, '2018-10-22'),
(1, 1, 3, '2018-10-23');
INSERT INTO appointment (client_id, invoice_id, appt_date, appt_time, approved)
VALUES (3, 1, '2018-10-26', '8:15', 'pending'),
(3, 2, '2018-10-30', '9:00', 'pending'),
(2, 3, '2018-10-26', '13:15', 'pending'), 
(3, 4, '2018-10-05', '16:15', 'pending')
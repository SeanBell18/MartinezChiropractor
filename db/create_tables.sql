CREATE TABLE client (
    client_id serial primary key,
    name varchar(100),
    auth_id text, 
    email text, 
    phone varchar(12)
);
CREATE TABLE payment (
    payment_id serial primary key, 
    client_id integer references client(client_id), 
    amount float(2),
    payment_date varchar(10)
);
CREATE TABLE product (
    product_id serial primary key, 
    product_name varchar(100),
    price float(2),
    in_stock integer
);
CREATE TABLE invoice (
    invoice_id serial primary key, 
    item_id integer references product(product_id),
    qty integer, 
    client_id integer references client(client_id),
    invoice_date varchar(10)
);
CREATE TABLE appointment (
    appt_id serial primary key,
    client_id integer references client(client_id), 
    invoice_id integer references invoice(invoice_id), 
    appt_date varchar(10), 
    appt_time time, 
    approved varchar(10)
);
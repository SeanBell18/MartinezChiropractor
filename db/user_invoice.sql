SELECT p.price, i.qty
FROM product p
JOIN invoice i ON p.product_id = i.item_id
WHERE i.client_id=$1
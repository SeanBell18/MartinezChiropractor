--Returns one number; total of all payments made by this user
SELECT SUM(amount) AS total_payment FROM payment WHERE client_id=$1 GROUP BY client_id;
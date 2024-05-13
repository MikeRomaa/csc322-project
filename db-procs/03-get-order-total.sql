CREATE FUNCTION get_order_total (order_id INT UNSIGNED) RETURNS DECIMAL(5, 2) DETERMINISTIC
    RETURN (
        WITH subtotal AS (
            SELECT SUM(i.price * i.quantity) AS subtotal
            FROM order_item AS i
            WHERE i.order_id = order_id
        )
        SELECT s.subtotal * 1.0875 +
               IF(o.delivery_address IS NULL, 0, 5) -
               IF(o.vip_discount, s.subtotal * 0.10, 0)
        FROM subtotal AS s
        JOIN food_order AS o
        WHERE o.id = order_id
    );

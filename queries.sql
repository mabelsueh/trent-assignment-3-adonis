INSERT INTO products (product_name, description, sku, price, quantity, imgurl, category)
VALUES ("Beginner Skiver", "An economic and beginner friendly skiver that is easy to use, sharpen and maintain. ", "T-SK-001", 1000, 20, "/public/images/tools/begskiver","tools");

INSERT INTO addresses (street, postal_code)
VALUES ("610 yishun ring rd", 760610);

UPDATE products
SET imgurl = '/public/images/tools/begskiver.jpg'
WHERE id = 1;

INSERT INTO orders (total_price, date, user_id, product_id, address_id)
VALUES (1000, "2021-01-30", 1, 1, 1);

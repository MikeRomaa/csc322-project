USE restaurant_db;

SET character_set_client=utf8mb4;
SET character_set_connection=utf8mb4;


/** BEGIN User Data */
/** END User Data */


/** BEGIN Restaurant Data */
INSERT INTO restaurant (id, name, address, city, state, zip, banner)
VALUES (1, 'Sal''s Smoothie Spot', '589 1st Avenue', 'New York', 'NY', '10016', 'https://doordash-static.s3.amazonaws.com/media/store/header/68d3564e-0106-40d5-aaa5-b61eeb315253.jpg');

INSERT INTO dish (restaurant_id, name, price, description, thumbnail)
VALUES (1, 'The Green Machine Smoothie', 13.99, 'Avocado, spinach, kale, banana & apple juice.', 'https://doordash-static.s3.amazonaws.com/media/photosV2/93591ee5-3b8d-4744-9b57-5adad8414f31-retina-large.jpeg');
INSERT INTO dish (restaurant_id, name, price, description, thumbnail)
VALUES (1, 'Very Berry Smoothie', 13.99, 'Blueberries, raspberries, strawberries & apple juice.', 'https://doordash-static.s3.amazonaws.com/media/photosV2/93591ee5-3b8d-4744-9b57-5adad8414f31-retina-large.jpeg');
INSERT INTO dish (restaurant_id, name, price, description, thumbnail)
VALUES (1, 'Soy Energy Smoothie', 13.99, 'Peanut butter, banana & soy milk.', 'https://doordash-static.s3.amazonaws.com/media/photosV2/963d64fa-97cb-4697-90e4-2119ced727ba-retina-large.jpeg');
INSERT INTO dish (restaurant_id, name, price, description, thumbnail)
VALUES (1, 'Banana Blast', 12.99, 'Banana, strawberries & orange juice.', 'https://doordash-static.s3.amazonaws.com/media/photosV2/c3609132-3b46-48ab-8460-993d6143308e-retina-large.jpeg');

INSERT INTO restaurant (id, name, address, city, state, zip, banner)
VALUES (2, 'Au Za''atar To Go Midtown East', '1063 1st Avenue', 'New York', 'NY', '10016', 'https://doordash-static.s3.amazonaws.com/media/store/header/e9713fdb-c2fb-4568-bd72-e1d82ead1ed8.jpg');

INSERT INTO dish (restaurant_id, name, price, description, thumbnail)
VALUES (2, 'Fattoush Salad', 15.00, 'Greens with tomatoes, cucumbers, radish, onions and toasted za''atar pita points in a lemon sumac vinaigrette.', 'https://doordash-static.s3.amazonaws.com/media/photos/21d47010-fae8-47f2-af8d-f75ed967da9b-retina-large-jpeg');
INSERT INTO dish (restaurant_id, name, price, description, thumbnail)
VALUES (2, 'Kibbeh Kras', 16.50, 'Lebanon''s national dish. A mixture of lean beef and bulgur wheat filled with a mixture of ground beef, diced onions and pine nuts.', 'https://doordash-static.s3.amazonaws.com/media/photos/857fc97e-fb84-4790-a53a-c6fbf4b7e460-retina-large-jpeg');
INSERT INTO dish (restaurant_id, name, price, description, thumbnail)
VALUES (2, 'Batata Harra', 15.00, 'Sauteed potato cubes with cilantro, garlic and red pepper flakes.', 'https://doordash-static.s3.amazonaws.com/media/photos/44f484a1-e56e-4b82-8bc1-86fbe3150879-retina-large-jpeg');
INSERT INTO dish (restaurant_id, name, price, description, thumbnail)
VALUES (2, 'Shish Tawook Pita Sandwich', 15.50, 'char-grilled chicken breast cubes, garlic toum, onions & parsley sumac mix, pickles, and fries all inside the sandwich', 'https://doordash-static.s3.amazonaws.com/media/photosV2/a383bee8-0b76-4531-bd2e-f1c5a919b499-retina-large.JPG');

INSERT INTO restaurant (id, name, address, city, state, zip, banner)
VALUES (3, 'Hutong', '731 Lexington Avenue', 'New York', 'NY', '10022', 'https://doordash-static.s3.amazonaws.com/media/store/header/95ba2e9c-99f7-4551-9ea2-8385a5418784.jpeg');

INSERT INTO dish (restaurant_id, name, price, description, thumbnail)
VALUES (3, '師傅炒饭 Chef''s Fried Rice', 24.00, 'Vegetarian fried rice with finely diced pickled vegetables', 'https://doordash-static.s3.amazonaws.com/media/photosV2/55100465-f7f8-4bf2-8ad9-a878a94ed6bd-retina-large.jpg');
INSERT INTO dish (restaurant_id, name, price, description, thumbnail)
VALUES (3, '山城辣子鸡 Sanchen Spiced Chicken', 42.00, 'Wok-fried fillet with dried chillies, star anise and cumin seeds', 'https://doordash-static.s3.amazonaws.com/media/photos/7e294136-8ce8-4907-84b0-b0f5c3e99628-retina-large.jpg');
INSERT INTO dish (restaurant_id, name, price, description, thumbnail)
VALUES (3, '胡同担担面目 Hutong Dan Dan Noodles', 19.00, 'Sichuan classic dish served in a spicy minced pork, sesame and peanut broth (individual portion)', 'https://doordash-static.s3.amazonaws.com/media/photos/6b753448-e694-4b25-acd5-c11451d6683b-retina-large.jpg');
INSERT INTO dish (restaurant_id, name, price, description, thumbnail)
VALUES (3, 'Dim Sum Platter', 51.00, 'Iberico pork dumplings, rosé champagne dumplings, scallop & prawn wontons, truffle & wild mushroom bao, hutong prawn rolls, vegetable spring rolls, wagyu beef millefeuille.', 'https://doordash-static.s3.amazonaws.com/media/photos/044951f0-3180-4f91-a29c-b6369b7425fb-retina-large.jpg');
/** END Restaurant Data */


/** BEGIN Order Data */
/** END Order Data */

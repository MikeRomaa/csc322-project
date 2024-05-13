USE restaurant_db;


/** BEGIN User Data */
CREATE TABLE user (
    id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name    VARCHAR(32)  NOT NULL,
    last_name     VARCHAR(32)  NOT NULL,
    email         VARCHAR(255) NOT NULL,
    password_hash CHAR(97)     NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (email)
) CHARACTER SET = utf8mb4;

CREATE TABLE address (
    id      INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    address VARCHAR(32)  NOT NULL,
    city    VARCHAR(32)  NOT NULL,
    state   CHAR(2)      NOT NULL,
    zip     CHAR(5)      NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
) CHARACTER SET = utf8mb4;

CREATE TABLE wallet_transaction (
    id        INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    user_id   INT UNSIGNED  NOT NULL,
    amount    DECIMAL(5, 2) NOT NULL,
    notes     VARCHAR(128)  NOT NULL,
    timestamp TIMESTAMP     NOT NULL DEFAULT NOW(),

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
) CHARACTER SET = utf8mb4;
/** END User Data */


/** BEGIN Restaurant Data */
CREATE TABLE restaurant (
    id      INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name    VARCHAR(64)  NOT NULL,
    address VARCHAR(32)  NOT NULL,
    city    VARCHAR(32)  NOT NULL,
    state   CHAR(2)      NOT NULL,
    zip     CHAR(5)      NOT NULL,
    banner  TEXT         NULL,

    PRIMARY KEY (id)
) CHARACTER SET = utf8mb4;

CREATE TABLE dish (
    id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
    restaurant_id INT UNSIGNED NOT NULL,
    name          VARCHAR(64)  NOT NULL,
    price         DECIMAL(5,2) NOT NULL,
    description   TEXT         NOT NULL,
    thumbnail     TEXT         NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
) CHARACTER SET = utf8mb4;
/** END Restaurant Data */


/** BEGIN Order Data */
CREATE TABLE food_order (
    id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id          INT UNSIGNED NOT NULL,
    restaurant_id    INT UNSIGNED NOT NULL,
    billing_address  INT UNSIGNED NOT NULL,
    delivery_address INT UNSIGNED NULL,
    placed           TIMESTAMP    NOT NULL DEFAULT NOW(),
    status           ENUM('placed', 'fulfilled', 'cancalled') NOT NULL DEFAULT 'placed',

    PRIMARY KEY (id),
    FOREIGN KEY (user_id)          REFERENCES user(id),
    FOREIGN KEY (restaurant_id)    REFERENCES restaurant(id),
    FOREIGN KEY (delivery_address) REFERENCES address(id),
    FOREIGN KEY (billing_address)  REFERENCES address(id)
) CHARACTER SET = utf8mb4;

CREATE TABLE order_item (
    order_id INT UNSIGNED     NOT NULL,
    dish_id  INT UNSIGNED     NOT NULL,
    price    DECIMAL(5,2)     NOT NULL,
    quantity TINYINT UNSIGNED NOT NULL,

    PRIMARY KEY (order_id, dish_id),
    FOREIGN KEY (order_id) REFERENCES food_order(id),
    FOREIGN KEY (dish_id)  REFERENCES dish(id)
) CHARACTER SET = utf8mb4;
/** END Order Data */

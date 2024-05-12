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


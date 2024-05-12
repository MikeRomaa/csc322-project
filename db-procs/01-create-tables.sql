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
);
/** END User Data */


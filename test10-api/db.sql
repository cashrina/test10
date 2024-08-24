create schema news collate utf8mb4_general_ci;
use news;

create table category
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    description text         null
);

create table location
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    description text         null
);

create table products
(
    id          int auto_increment
        primary key,
    name        varchar(255)                       not null,
    category_id int                                not null,
    location_id int                                not null,
    description text                               null,
    photo       varchar(255)                       null,
    date        datetime default CURRENT_TIMESTAMP null,
    constraint products_category_id_fk
        foreign key (category_id) references category (id),
    constraint products_location_id_fk
        foreign key (location_id) references location (id)
);

INSERT INTO news (title, description, image) VALUES ('Мирбек Атабеков', 'Известного певца отправили на Евровидение', '1.jpg');

INSERT INTO comments (news_id, author, description) VALUES ((SELECT id from news WHERE title = 'Мирбек Атабеков'), 'bubble tea', 'Алга Кыргызстан!')
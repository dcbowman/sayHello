CREATE DATABASE events_db;

use events_db;

CREATE TABLE tables(
table_number integer(3) NOT NULL,
guest_first varchar(60) NOT NULL,
guest_last varchar(60) NOT NULL,
guest_role varchar(255) NOT NULL

);

CREATE TABLE guests(

guest_first varchar(60) NOT NULL,
guest_last varchar(60) NOT NULL,
guest_role varchar(255) NOT NULL,
image varchar(255),
link varchar(255)
);

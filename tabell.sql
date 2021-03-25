-- SQLite


CREATE TABLE tavla (
name VARCHAR(64) UNIQUE,
price INTEGER (64),
info VARCHAR(64),
made VARCHAR(64),
pic VARCHAR(364),
sale VARCHAR(64),
art VARCHAR(64),
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);

INSERT INTO tavla(name,price,info,made,pic,sale,art)
            VALUES
            ('Korven','299','test','freddie marriage','https://images.unsplash.com/photo-1573725342230-178c824a10f2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=651&q=80','no','djur');


CREATE TABLE saveTransaction(
orderID VARCHAR(64) UNIQUE,
create_time VARCHAR(164),
status VARCHAR(64),
given_name VARCHAR(64),
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);


DROP TABLE users


CREATE TABLE users (
Email VARCHAR(164),
firstname VARCHAR(64),
lastname VARHCAR(64),
password VARCHAR(364),
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);

INSERT INTO post (tavla, art, name, comment, rating)
    VALUES
    ('Arizona', 'Nature','Anton','Mycket fin tavla väldigt fin och värd priset','5');

    DROP TABLE post;
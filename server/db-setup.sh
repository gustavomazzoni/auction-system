#!/bin/bash

echo "Inserting items"

MYSQL=`which mysql`

Q1="INSERT INTO items (name, avatar) VALUES ('Bread','assets/bread.png');"
Q2="INSERT INTO items (name, avatar) VALUES ('Carrot','assets/carrot.png');"
Q3="INSERT INTO items (name, avatar) VALUES ('Diamond','assets/diamond.png');"
SQL="${Q1}${Q2}${Q3}"

$MYSQL -u root -p auction_system -e "$SQL"

echo "Items inserted"

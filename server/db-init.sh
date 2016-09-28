#!/bin/bash

echo "Creating Tables"

MYSQL=`which mysql`

CREATE_USERS="CREATE TABLE IF NOT EXISTS users (username VARCHAR(50) NOT NULL, PRIMARY KEY (username));"
CREATE_PLAYERS="CREATE TABLE IF NOT EXISTS players (username VARCHAR(50) NOT NULL, coins INT(8) NOT NULL, PRIMARY KEY (username));"
CREATE_ITEMS="CREATE TABLE IF NOT EXISTS items (id INT(8) NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, avatar VARCHAR(50), PRIMARY KEY (id));"
CREATE_PLAYERS_ITEMS="CREATE TABLE IF NOT EXISTS players_items (id INT(8) NOT NULL AUTO_INCREMENT, username VARCHAR(50) NOT NULL, id_item INT(8) NOT NULL, quantity INT(8) NOT NULL, PRIMARY KEY (id), CONSTRAINT fk_player FOREIGN KEY (username) REFERENCES players(username), CONSTRAINT fk_item FOREIGN KEY (id_item) REFERENCES items(id));"
CREATE_AUCTIONS="CREATE TABLE IF NOT EXISTS auctions (id INT(8) NOT NULL AUTO_INCREMENT, seller_username VARCHAR(50) NOT NULL, id_item INT(8) NOT NULL, quantity INT(8) NOT NULL, minimum_bid INT(8) NOT NULL, status VARCHAR(10) NOT NULL, winner_bid INT(8), winner_username VARCHAR(50), PRIMARY KEY (id), CONSTRAINT fk_seller FOREIGN KEY (seller_username) REFERENCES players(username), CONSTRAINT fk_winner FOREIGN KEY (winner_username) REFERENCES players(username), CONSTRAINT fk_itemm FOREIGN KEY (id_item) REFERENCES items(id));"
SQL="${CREATE_USERS}${CREATE_PLAYERS}${CREATE_ITEMS}${CREATE_PLAYERS_ITEMS}${CREATE_AUCTIONS}"

$MYSQL -u root -p auction_system -e "$SQL"

echo "Tables created"

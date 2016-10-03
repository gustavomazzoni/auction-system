#!/bin/bash

# Functions
echo "Creating Database auction_system"

MYSQL=`which mysql`

Q1="CREATE DATABASE IF NOT EXISTS auction_system;"
Q2="GRANT ALL ON *.* TO auction@'localhost' IDENTIFIED BY '12345';"
Q3="FLUSH PRIVILEGES;"
SQL="${Q1}${Q2}${Q3}"
 
$MYSQL -uroot -p -e "$SQL"

echo "Database auction_system and user auction created with a password 12345"

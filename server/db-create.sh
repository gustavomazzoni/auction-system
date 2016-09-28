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
 


#!/bin/bash

# Functions
# ok() { echo -e '\e[32m'$1'\e[m'; } # Green

# EXPECTED_ARGS=3
# E_BADARGS=65
# MYSQL=`which mysql`

# Q1="CREATE DATABASE IF NOT EXISTS $1;"
# Q2="GRANT ALL ON *.* TO '$2'@'localhost' IDENTIFIED BY '$3';"
# Q3="FLUSH PRIVILEGES;"
# SQL="${Q1}${Q2}${Q3}"
 
# if [ $# -ne $EXPECTED_ARGS ]
# then
#   echo "Usage: $0 dbname dbuser dbpass"
#   exit $E_BADARGS
# fi
 
# $MYSQL -uroot -p -e "$SQL"

# ok "Database $1 and user $2 created with a password $3"

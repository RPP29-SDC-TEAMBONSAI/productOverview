# productOverview

### Introduction
---
This repository provides the microservices for the productOveriew (product information) module for Team Cotijta. For quick deployment and testing with a temporary database, please visit: https://github.com/RPP29-SDC-TEAMBONSAI/productOverview/tree/main/MSSQL .

### Demonstration
---
![demo-gif](https://github.com/FEC-RPP29-cotija/Front-End-Capstone/blob/main/FECdemo1.0.gif)

### USING NGNIX
---
I recommend using this guide to deploy NGINX https://docs.nginx.com/nginx/deployment-guides/amazon-web-services/high-availability-network-load-balancer/ 

### MS SQL Connection Pools
---
The current service makes use of the global connection pool. However the connection pool object allows up to 30 pools to be created. To read more on connection poos and advance applications please see here https://www.npmjs.com/package/mssql 

Previous versions made use of advance pool management in order to support connections to multiple databases. This was in order to create separate pools for read vs read/write operations.

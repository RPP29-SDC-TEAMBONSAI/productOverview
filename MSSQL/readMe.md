# INTRO TO MSSQL

## INSTALL VIA DOCKER

### ACCESS "bash" IN CONTAINER
`docker exec -it sdc-products "bash"`

### ACCESS MSSQL IN CONTAINER
`/opt/mssql-tools/bin/sqlcmd -S [SERVER] -U SA -P [PASSWORD]`
***"SA" (SystemAdmin) is the default user until others are specified***

### ADD FILES TO DOCKER CONTAINER
`docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-`

exampe `docker cp foo.txt container_id:/foo.txt`
[COPY FILE TO DOCKER CONTAINER](https://docs.docker.com/engine/reference/commandline/cp/)

[Documentation for quereies here](https://docs.microsoft.com/en-us/sql/t-sql/lesson-1-creating-database-objects?view=sql-server-ver15)

## MSSQL CLI/CRUD/QUERY
***NOTE: YOU CAN USE SQL SERVER MANAGEMENT STUDIO (SSMS) OR AZURE DATA STUDIO***

### List all databases
`select name from sys.databases`
`GO`

### Create a database and use it
`CREATE DATABASE TestData`
`GO`
`USE TestData`
`GO`

### SHOW ALL TABLES
`SELECT * FROM [databaseName].INFORMATION_SCHEMA.TABLES`
`GO`

### Create a table
`USE TEST`
`GO`

`DROP TABLE IF EXISTS Products`

`CREATE TABLE [dbo].[Products](`
`[UID] [int] NOT NULL,`
`[name] [varchar] NOT NULL,`
`[slogan] [varchar] NOT NULL,`
`[description] [varchar] NOT NULL,`
`[category] [varchar] NOT NULL,`
`[default_price] [int] NOT NULL`
`)`
`GO`

### Bulk insert into a table

BULK INSERT Products FROM '/product.csv' WITH (FIRSTROW = 2, FIELDTERMINATOR = ',', ROWTERMINATOR='0x0a' );
GO


id bigint IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL
    , productId bigint NOT NULL
    , name nvarchar(600)NOT NULL
    , sale_price bigint NULL
    , original_price bigint NULL
    , default_style bigint NOT NULL
   )

BULK INSERT photos FROM '/photos.csv' WITH (FORMAT = 'CSV', FIRSTROW = 2, FIELDTERMINATOR = ',', ROWTERMINATOR ='\n', KEEPNULLS);
GO

USE Test
GO

BULK INSERT photos
FROM '/photos.csv'
WITH (
  DATAFILETYPE = 'char',
  FIRSTROW = 2,
  FIELDTERMINATOR = ',',
  ROWTERMINATOR ='\n',
  KEEPNULLS);
GO
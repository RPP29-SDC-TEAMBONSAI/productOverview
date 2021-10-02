const sql = require('mssql')

const table = new sql.Table('style');
table.create = true; //checks if table exists or not

table.columns.add('id', sql.BigInt, {nullable: false, primary: true});
table.columns.add('productId', sql.BigInt, {nullable: false});
table.columns.add('name', sql.NVarChar(600), {nullable: false});
table.columns.add('sale_price', sql.BigInt, {nullable: true});
table.columns.add('original_price', sql.BigInt, {nullable: true});
table.columns.add('default_style', sql.BigInt, {nullabe: false});

const request = new sql.Request();

const style = request.bulk(table, (err, result) => {
  if (err) {
    console.log('Error creating styles table: ' + err)
  } else {
    console.log('Styles table is available...' + result)
  }
})



const Airtable = require('airtable');

class AirtableSimple {
  constructor(api, base, table) {
    this.base = new Airtable({ apiKey: api }).base(base);
    this.table = table;
  }

  async first(column, id) {
    const select = `AND(${column} = "${id}")`;

    try {
      let row = await this.base(this.table)
        .select({
          view: 'Grid view',
          filterByFormula: select,
        })
        .firstPage();

      if (row.length == 0) {
        return null;
      }

      return row[0];
    } catch (error) {
      console.log(error);
    }
  }

  async update(rowId, column, data) {
    try {
        await this.base(this.table).update(rowId, {
          [column]: data
        }) 
    } catch (error) {
     console.log(error)   
    }
  }

  async create(row) {
    this.base(this.table).create(
      row,
      function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
      }
    )
  }
}


module.exports = AirtableSimple;

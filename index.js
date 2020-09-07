const Airtable = require('airtable')

class Airtable {
    constructor (api, base, table) {
        this.base = new Airtable({ api }).base(base)
        this.table = table
    }

    first(row, id) {
        const select = `AND(${row} = ${id})`

        try {
            let row = await base(this.table)
              .select({
                view: "Grid view",
                filterByFormula: select
              })
              .firstPage();
    
              return row[0]
        } catch (error) {
            console.log(error)
        }
    }
}
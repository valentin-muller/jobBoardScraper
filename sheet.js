const { GoogleSpreadsheet } = require("google-spreadsheet");

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet(
      "1nnqS7DxrpSV3CAqbP0yH4feC9EpQW89EFHqMT3ACGi8"
    );
  }
  async load() {
    await this.doc.useServiceAccountAuth(require("./credentials.json"));
    await this.doc.loadInfo();
  }
  async addRows() {
    const sheet = this.doc.sheetsByIndex[0];

    await sheet.addRows([
      { title: "Software Engineer", location: "SF" },
      { title: "Designer", location: "NY" },
    ]);
  }
}



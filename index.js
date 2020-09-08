const Sheet = require("./sheet");
const fetch = require("node-fetch");

async function scrapePage(i) {
  const res = await fetch(`https://jobs.github.com/positions.json?page=${i}&search=code`);
  const json = await res.json();

  const rows = json.map((job) => {
    return {
      company: job.company,
      title: job.title,
      location: job.location,
      date: job.created_at,
      url: job.url,
    };
  });

  return rows;
};

(async function () {
  
    let i = 1;
    let rows = [];
    while(true) {
       const newRows = await scrapePage(i);
    //    console.log('new row length', newRows.length);
        if (newRows.length === 0) break;
        rows = rows.concat(newRows);
        i++;
    }


    // Challenge 1: sort date function
    // Challenge 2: filter JavaScript jobs -> "js.includes("js")



    let filtered = rows.filter((a) => {
      return a.title.includes("Software");
    });

    let sorted = filtered.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB;
    });


    // console.log('total rows length', rows.length);
    // console.log('All Data', filtered);

    const sheet = new Sheet();
    await sheet.load();

    await sheet.addRows(sorted);
  
})();

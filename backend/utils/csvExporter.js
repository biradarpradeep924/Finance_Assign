const { createObjectCsvWriter } = require('csv-writer');

async function exportToCSV(data, fields, filePath) {
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: fields.map(f => ({ id: f, title: f }))
  });

  await csvWriter.writeRecords(data.map(d => {
    const record = {};
    fields.forEach(field => record[field] = d[field]);
    return record;
  }));
}

module.exports = { exportToCSV };
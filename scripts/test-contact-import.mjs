import assert from 'node:assert/strict';
import * as XLSX from 'xlsx';
import { prepareContactImport, readContactWorkbook } from '../src/contact-import.js';

const fileFor = (name, bytes) => ({ name, size: bytes.length, arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) });
const options = { nameColumn: 0, phoneColumn: 1, headerRow: true, group: 'Test' };
const csv = Buffer.from('Name,Mobile\r\n"A, B",+9779841234567\r\nC,९८४१२३४५६७\r\nD,bad');
const sheets = await readContactWorkbook(fileFor('contacts.csv', csv));
const result = prepareContactImport(sheets[0].rows, options, [{ phone: '9841234567' }]);
assert.equal(result.contacts[0].name, 'A, B');
assert.equal(result.contacts.length, 1);
assert.equal(result.duplicates.length, 1);
assert.equal(result.invalid.length, 1);
assert.equal(result.existingCount, 1);
assert.equal(prepareContactImport([['Person', '9841234567']], { ...options, headerRow: false }).contacts.length, 1);
assert.equal(prepareContactImport([['Name', 'Mobile'], ['', ''], ['Person', '009779841234567']], options).contacts.length, 1);
assert.equal(prepareContactImport([['Name', 'Mobile'], ['k|lj)f s\'df/ >]i&', '9841234567']], { ...options, encoding: 'pcs nepali' }).contacts[0].name, 'प्रविण कुमार श्रेष्ठ');
for (const bookType of ['xlsx', 'biff8', 'xlsb']) {
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet([['Name', 'Mobile'], ['Person', '9841234567']]), 'Contacts');
  XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet([['Name', 'Mobile']]), 'Other');
  const bytes = XLSX.write(book, { bookType, type: 'buffer' });
  const parsed = await readContactWorkbook(fileFor(`contacts.${bookType === 'biff8' ? 'xls' : bookType}`, bytes));
  assert.equal(parsed.length, 2);
  assert.equal(parsed[0].rows[1][0], 'Person');
}
await assert.rejects(() => readContactWorkbook(fileFor('contacts.pdf', Buffer.from('bad'))), /Excel or CSV/);
await assert.rejects(() => readContactWorkbook({ name: 'large.xlsx', size: 11 * 1024 * 1024 }), /10 MB/);
console.log('Contact import checks passed.');

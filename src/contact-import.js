export function normalizeImportPhone(value) {
  let phone = String(value ?? '').replace(/[०-९]/g, (char) => String(char.charCodeAt(0) - 0x966)).replace(/\D/g, '');
  if (phone.startsWith('00977') && phone.length === 15) phone = phone.slice(5);
  if (phone.startsWith('977') && phone.length === 13) phone = phone.slice(3);
  return phone;
}

export function prepareContactImport(rows, { nameColumn, phoneColumn, headerRow, group, encoding = 'unicode' }, existing = []) {
  const contacts = [], invalid = [], duplicates = [];
  const seen = new Set();
  const known = new Set(existing.map((contact) => normalizeImportPhone(contact.phone)));
  let existingCount = 0;
  rows.slice(headerRow ? 1 : 0).forEach((row, index) => {
    if (!row.some((value) => String(value ?? '').trim())) return;
    const originalName = String(row[nameColumn] ?? '').trim();
    const name = encoding === 'unicode' ? originalName : preeti(originalName, encoding).trim();
    const phone = normalizeImportPhone(row[phoneColumn]);
    const sourceRow = index + (headerRow ? 2 : 1);
    if (!name || !/^9[678]\d{8}$/.test(phone)) {
      invalid.push({ row: sourceRow, reason: !name ? 'Missing name' : 'Invalid Nepal mobile number' });
      return;
    }
    if (seen.has(phone)) { duplicates.push(sourceRow); return; }
    seen.add(phone);
    if (known.has(phone)) existingCount += 1;
    contacts.push({ name, phone, group });
  });
  return { contacts, invalid, duplicates, existingCount };
}

export async function readContactWorkbook(file) {
  if (!/\.(xlsx|xls|xlsm|xlsb|csv)$/i.test(file.name)) throw new Error('Choose an Excel or CSV file.');
  if (file.size > 10 * 1024 * 1024) throw new Error('File exceeds 10 MB. Split it into smaller files.');
  const XLSX = await import('xlsx');
  const data = await file.arrayBuffer();
  const bytes = new Uint8Array(data);
  const csv = /\.csv$/i.test(file.name);
  const encoding = bytes[0] === 255 && bytes[1] === 254 ? 'utf-16le' : bytes[0] === 254 && bytes[1] === 255 ? 'utf-16be' : 'utf-8';
  const book = XLSX.read(csv ? new TextDecoder(encoding).decode(data) : data, { type: csv ? 'string' : 'array', cellDates: false });
  const sheets = book.SheetNames.map((name) => ({ name, rows: XLSX.utils.sheet_to_json(book.Sheets[name], { header: 1, defval: '', raw: false, blankrows: true }) }));
  if (!sheets.some((sheet) => sheet.rows.length)) throw new Error('No rows found in this file.');
  return sheets;
}
import preeti from 'preeti';

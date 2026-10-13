import React, { useMemo, useState } from 'react';
import { prepareContactImport, readContactWorkbook } from './contact-import.js';

export default function ContactFileImport({ contacts, targetGroup, importContacts, disabled }) {
  const [sheets, setSheets] = useState([]);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [headerRow, setHeaderRow] = useState(true);
  const [nameColumn, setNameColumn] = useState(0);
  const [phoneColumn, setPhoneColumn] = useState(1);
  const [encoding, setEncoding] = useState('unicode');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const rows = sheets[sheetIndex]?.rows || [];
  const columns = Array.from({ length: Math.max(0, ...rows.slice(0, 20).map((row) => row.length)) }, (_, index) => ({
    index, label: `Column ${index + 1}${headerRow && rows[0]?.[index] ? `: ${rows[0][index]}` : ''}`
  }));
  const result = useMemo(() => prepareContactImport(rows, { nameColumn, phoneColumn, headerRow, group: targetGroup, encoding }, contacts), [rows, nameColumn, phoneColumn, headerRow, targetGroup, contacts, encoding]);
  const autoMap = (sheet) => {
    const first = sheet.rows[0] || [];
    const name = first.findIndex((value) => /name|representative|नाम/i.test(String(value)));
    const phone = first.findIndex((value) => /phone|mobile|contact|ph[. ]|मोबाइल|फोन/i.test(String(value)));
    setHeaderRow(name >= 0 || phone >= 0);
    setNameColumn(name >= 0 ? name : 0);
    setPhoneColumn(phone >= 0 ? phone : Math.min(1, first.length - 1));
    setEncoding('unicode');
  };
  const load = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setLoading(true); setMessage(''); setSheets([]);
    try {
      const next = await readContactWorkbook(file);
      setSheets(next); setSheetIndex(0); autoMap(next[0]);
    } catch (error) { setMessage(error.message || 'Could not read the file. Export an unencrypted Excel or CSV file and retry.'); }
    finally { setLoading(false); }
  };
  const save = async () => {
    if (!targetGroup.trim()) { setMessage('Enter a group name.'); return; }
    setLoading(true); setMessage('');
    try {
      if (await importContacts(result.contacts)) {
        setMessage(`Saved ${result.contacts.length} unique contacts to ${targetGroup}.`);
        setSheets([]);
      }
    } finally { setLoading(false); }
  };
  return <div className="contact-file-import">
    <label>Excel or CSV file<input type="file" accept=".xlsx,.xls,.xlsm,.xlsb,.csv" onChange={load} disabled={loading || disabled} /></label>
    {message && <p role="status">{message}</p>}
    {loading && <p role="status">Processing file...</p>}
    {sheets.length > 0 && <>
      <label>Worksheet<select value={sheetIndex} onChange={(event) => { const index = Number(event.target.value); setSheetIndex(index); autoMap(sheets[index]); }}>{sheets.map((sheet, index) => <option key={sheet.name} value={index}>{sheet.name}</option>)}</select></label>
      <label><input type="checkbox" checked={headerRow} onChange={(event) => setHeaderRow(event.target.checked)} /> First row contains column headings</label>
      <label>Name column<select value={nameColumn} onChange={(event) => setNameColumn(Number(event.target.value))}>{columns.map((column) => <option key={column.index} value={column.index}>{column.label}</option>)}</select></label>
      <label>Mobile column<select value={phoneColumn} onChange={(event) => setPhoneColumn(Number(event.target.value))}>{columns.map((column) => <option key={column.index} value={column.index}>{column.label}</option>)}</select></label>
      <label>Name font<select value={encoding} onChange={(event) => setEncoding(event.target.value)}><option value="unicode">English / Nepali Unicode</option><option value="preeti">Preeti</option><option value="pcs nepali">Anuradha-compatible / PCS Nepali</option></select></label>
      <p>{result.contacts.length} valid · {result.duplicates.length} file duplicates · {result.invalid.length} invalid · {result.existingCount} existing numbers will be updated, not duplicated.</p>
      {result.existingCount > 0 && <p>Existing numbers will move to the selected group.</p>}
      <div className="contact-import-preview"><table><thead><tr><th>Name</th><th>Mobile</th><th>Group</th></tr></thead><tbody>{result.contacts.slice(0, 6).map((contact) => <tr key={contact.phone}><td>{contact.name}</td><td>{contact.phone}</td><td>{contact.group}</td></tr>)}</tbody></table></div>
      {result.invalid.length > 0 && <details><summary>Invalid rows</summary>{result.invalid.slice(0, 50).map((item) => <p key={item.row}>Row {item.row}: {item.reason}</p>)}</details>}
      {result.contacts.length > 5000 && <p role="alert">Maximum 5,000 contacts per import. Split this worksheet before importing.</p>}
      <button type="button" className="primary small" disabled={loading || disabled || !targetGroup.trim() || nameColumn === phoneColumn || !result.contacts.length || result.contacts.length > 5000} onClick={save}>Import {result.contacts.length} contacts</button>
    </>}
  </div>;
}

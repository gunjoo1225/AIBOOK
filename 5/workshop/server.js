const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'registrations.json');

function readDB() {
  if (!fs.existsSync(DB_FILE)) return { nextId: 1, records: [] };
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    return { nextId: 1, records: [] };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function nowKST() {
  return new Date().toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/register', (req, res) => {
  const { name, vehicle_number, dates } = req.body;

  if (!name || !vehicle_number || !dates) {
    return res.status(400).json({ error: '모든 항목을 입력해주세요.' });
  }

  const db = readDB();
  const existing = db.records.find(
    r => r.name === name && r.vehicle_number === vehicle_number
  );

  if (existing) {
    return res.status(409).json({ error: '이미 동일한 이름과 차량번호로 등록된 내역이 있습니다.' });
  }

  const record = {
    id: db.nextId++,
    name,
    vehicle_number,
    dates,
    created_at: nowKST()
  };

  db.records.push(record);
  writeDB(db);
  res.json({ success: true, message: '등록이 완료되었습니다.' });
});

app.get('/api/registrations', (req, res) => {
  const db = readDB();
  res.json([...db.records].reverse());
});

app.delete('/api/registrations/:id', (req, res) => {
  const db = readDB();
  db.records = db.records.filter(r => r.id !== parseInt(req.params.id));
  writeDB(db);
  res.json({ success: true });
});

app.get('/api/export/csv', (req, res) => {
  const db = readDB();
  const bom = '﻿';
  const header = '번호,이름,차량번호,참석일,등록일시\n';
  const body = db.records.map((r, i) =>
    `${i + 1},"${r.name}","${r.vehicle_number}","${r.dates}","${r.created_at}"`
  ).join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="workshop_vehicles.csv"');
  res.send(bom + header + body);
});

app.listen(PORT, () => {
  console.log('========================================');
  console.log('  워크샵 차량 등록 시스템 시작');
  console.log('========================================');
  console.log(`  참가자 등록: http://localhost:${PORT}`);
  console.log(`  관리자 페이지: http://localhost:${PORT}/admin.html`);
  console.log('  종료: Ctrl+C');
  console.log('========================================');
});

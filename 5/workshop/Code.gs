// ============================================================
//  비전캠프 차량 등록 - Google Apps Script
//  이 코드 전체를 Google Apps Script 편집기에 붙여넣으세요.
// ============================================================

function doGet(e) {
  const action = (e.parameter && e.parameter.action) || 'list';
  const sheet = getSheet();

  if (action === 'register') return handleRegister(sheet, e.parameter);
  if (action === 'delete')   return handleDelete(sheet, e.parameter);
  return handleList(sheet);
}

// ── 시트 가져오기 (없으면 생성) ──────────────────────────────
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('차량등록');
  if (!sheet) {
    sheet = ss.insertSheet('차량등록');
    const header = sheet.getRange(1, 1, 1, 4);
    header.setValues([['등록일시', '이름', '차량번호', '참석일']]);
    header.setFontWeight('bold');
    header.setBackground('#1a3a5c');
    header.setFontColor('#ffffff');
    sheet.setColumnWidths(1, 4, 160);
  }
  return sheet;
}

// ── 등록 처리 ────────────────────────────────────────────────
function handleRegister(sheet, params) {
  const name    = (params.name    || '').trim();
  const vehicle = (params.vehicle || '').trim();
  const dates   = (params.dates   || '').trim();

  if (!name || !vehicle || !dates) {
    return json({ success: false, error: '모든 항목을 입력해주세요.' });
  }

  // 중복 체크
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][1] === name && rows[i][2] === vehicle) {
      return json({ success: false, error: '이미 동일한 이름과 차량번호로 등록된 내역이 있습니다.' });
    }
  }

  const now = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
  sheet.appendRow([now, name, vehicle, dates]);

  return json({ success: true });
}

// ── 목록 반환 ────────────────────────────────────────────────
function handleList(sheet) {
  const rows = sheet.getDataRange().getValues();
  const records = [];
  for (let i = 1; i < rows.length; i++) {
    if (!rows[i][1]) continue;
    records.push({
      row:            i + 1,
      created_at:     rows[i][0],
      name:           rows[i][1],
      vehicle_number: rows[i][2],
      dates:          rows[i][3]
    });
  }
  return json(records.reverse());
}

// ── 행 삭제 ──────────────────────────────────────────────────
function handleDelete(sheet, params) {
  const row = parseInt(params.row, 10);
  if (!row || row < 2) return json({ success: false });
  sheet.deleteRow(row);
  return json({ success: true });
}

// ── JSON 응답 헬퍼 ───────────────────────────────────────────
function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

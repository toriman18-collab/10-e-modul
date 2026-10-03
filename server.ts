import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';
import { QUIZ_QUESTIONS } from './src/data/quizQuestions.ts';
import { COMPETENCY_QUESTIONS } from './src/data/competencyQuestions.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Database file setup
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DatabaseSchema {
  tokens: Array<{
    id: string;
    code: string;
    type: 'quiz' | 'competency';
    status: 'active' | 'used' | 'inactive';
    createdAt: string;
    expiresAt: string;
    createdBy: string;
  }>;
  results: Array<{
    id: string;
    studentName: string;
    studentClass: 'X-A' | 'X-B' | 'X-C';
    examType: 'quiz' | 'competency';
    tokenUsed: string;
    startTime: string;
    endTime: string;
    score: number;
    correctCount: number;
    wrongCount: number;
    unansweredCount: number;
    percentage: number;
    category: string;
    submittedAt: string;
  }>;
}

function loadDatabase(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading database file:', err);
  }
  return { tokens: [], results: [] };
}

function saveDatabase(data: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving database:', err);
  }
}

// Memory cache of database
let db = loadDatabase();

// Helper to generate token
function generateRandomCode(prefix = 'PPKN'): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${result}`;
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// 1. Teacher Authentication
app.post('/api/auth/teacher', (req, res) => {
  const { username, password } = req.body;
  if (username === 'guru' && password === 'guru123') {
    return res.json({
      success: true,
      teacher: {
        id: 'guru-01',
        name: 'Drs. Supriyanto, M.Pd.',
        role: 'Guru Mata Pelajaran',
        subject: 'Pendidikan Pancasila'
      }
    });
  }
  return res.status(401).json({ success: false, message: 'Username atau password salah.' });
});

// 2. Token Management
app.get('/api/tokens', (req, res) => {
  res.json({ success: true, tokens: db.tokens });
});

app.post('/api/tokens/generate', (req, res) => {
  const { type } = req.body;
  if (type !== 'quiz' && type !== 'competency') {
    return res.status(400).json({ success: false, message: 'Tipe token tidak valid.' });
  }

  // Deactivate previous active tokens for this type to ensure clarity, or keep history
  const now = new Date();
  const expires = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 hours validity

  const newToken = {
    id: `tok-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    code: generateRandomCode('PPKN'),
    type,
    status: 'active' as const,
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    createdBy: 'Guru Pendidikan Pancasila'
  };

  db.tokens.unshift(newToken);
  saveDatabase(db);

  res.json({ success: true, token: newToken });
});

app.post('/api/tokens/validate', (req, res) => {
  const { code, type } = req.body;
  if (!code || !type) {
    return res.status(400).json({ success: false, message: 'Kode token dan tipe ujian harus diisi.' });
  }

  const cleanCode = String(code).trim().toUpperCase();
  const token = db.tokens.find(t => t.code === cleanCode);

  if (!token) {
    return res.status(400).json({ success: false, message: 'Kode token tidak ditemukan atau salah.' });
  }

  if (token.type !== type) {
    const expected = type === 'quiz' ? 'Game Kuis' : 'Uji Kompetensi';
    const provided = token.type === 'quiz' ? 'Game Kuis' : 'Uji Kompetensi';
    return res.status(400).json({
      success: false,
      message: `Token ini adalah token ${provided}, tidak dapat digunakan untuk ${expected}.`
    });
  }

  if (token.status !== 'active') {
    return res.status(400).json({ success: false, message: 'Kode token sudah tidak aktif.' });
  }

  // Check expiration
  if (new Date(token.expiresAt) < new Date()) {
    token.status = 'inactive';
    saveDatabase(db);
    return res.status(400).json({ success: false, message: 'Kode token sudah kedaluwarsa.' });
  }

  res.json({ success: true, message: 'Token valid dan siap digunakan.', token });
});

app.post('/api/tokens/deactivate', (req, res) => {
  const { id } = req.body;
  const token = db.tokens.find(t => t.id === id);
  if (token) {
    token.status = 'inactive';
    saveDatabase(db);
    return res.json({ success: true, message: 'Token berhasil dinonaktifkan.', token });
  }
  res.status(404).json({ success: false, message: 'Token tidak ditemukan.' });
});

// 3. Quiz Submission & Server-Side Scoring
app.post('/api/exam/submit-quiz', (req, res) => {
  const { studentName, studentClass, tokenUsed, answers, startTime, endTime } = req.body;

  if (!studentName || !studentClass) {
    return res.status(400).json({ success: false, message: 'Nama dan kelas siswa wajib diisi.' });
  }

  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  QUIZ_QUESTIONS.forEach(q => {
    const studentAns = answers?.[q.id];
    if (studentAns === undefined || studentAns === null) {
      unansweredCount++;
    } else if (studentAns === q.correctAnswer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const totalQuestions = QUIZ_QUESTIONS.length;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const percentage = score;

  let category = 'Perlu Bimbingan';
  if (score >= 85) category = 'Sangat Baik';
  else if (score >= 70) category = 'Baik';
  else if (score >= 55) category = 'Cukup';

  const newResult = {
    id: `res-q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    studentName: studentName.trim(),
    studentClass,
    examType: 'quiz' as const,
    tokenUsed: tokenUsed || 'BYPASS',
    startTime: startTime || new Date().toISOString(),
    endTime: endTime || new Date().toISOString(),
    score,
    correctCount,
    wrongCount,
    unansweredCount,
    percentage,
    category,
    submittedAt: new Date().toISOString()
  };

  db.results.unshift(newResult);
  saveDatabase(db);

  res.json({ success: true, result: newResult });
});

// 4. Competency Submission & Server-Side Scoring
app.post('/api/exam/submit-competency', (req, res) => {
  const { studentName, studentClass, tokenUsed, answers, startTime, endTime } = req.body;

  if (!studentName || !studentClass) {
    return res.status(400).json({ success: false, message: 'Nama dan kelas siswa wajib diisi.' });
  }

  let totalPoints = 0;
  const maxPoints = COMPETENCY_QUESTIONS.length; // 20 points
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  COMPETENCY_QUESTIONS.forEach(q => {
    const userState = answers?.[q.id];
    const userAns = userState?.answer !== undefined ? userState.answer : userState;

    if (userAns === undefined || userAns === null || (Array.isArray(userAns) && userAns.length === 0) || (typeof userAns === 'object' && Object.keys(userAns).length === 0)) {
      unansweredCount++;
      return;
    }

    if (q.type === 'single_choice' || q.type === 'true_false') {
      if (userAns === q.correctAnswer) {
        totalPoints += 1;
        correctCount++;
      } else {
        wrongCount++;
      }
    } else if (q.type === 'multiple_choice') {
      // Multiple choice complex
      const correctArr = Array.isArray(q.correctAnswer) ? [...q.correctAnswer].sort() : [];
      const userArr = Array.isArray(userAns) ? [...userAns].sort() : [];
      
      const isIdentical = correctArr.length === userArr.length && correctArr.every((val, idx) => val === userArr[idx]);
      if (isIdentical) {
        totalPoints += 1;
        correctCount++;
      } else {
        // partial credit if at least 1 correct and 0 wrong
        const correctPicks = userArr.filter(x => correctArr.includes(x)).length;
        const wrongPicks = userArr.filter(x => !correctArr.includes(x)).length;
        if (wrongPicks === 0 && correctPicks > 0) {
          const partial = correctPicks / correctArr.length;
          totalPoints += partial;
          if (partial >= 0.5) correctCount++;
          else wrongCount++;
        } else {
          wrongCount++;
        }
      }
    } else if (q.type === 'matching') {
      // userAns is an object: { [pairId]: targetRightText }
      const pairs = q.matchingPairs || [];
      let matchCorrect = 0;
      pairs.forEach(p => {
        if (userAns && userAns[p.id] === p.right) {
          matchCorrect++;
        }
      });
      if (matchCorrect === pairs.length) {
        totalPoints += 1;
        correctCount++;
      } else if (matchCorrect > 0) {
        const partial = matchCorrect / pairs.length;
        totalPoints += partial;
        if (partial >= 0.5) correctCount++;
        else wrongCount++;
      } else {
        wrongCount++;
      }
    }
  });

  const score = Math.min(100, Math.max(0, Math.round((totalPoints / maxPoints) * 100)));
  const percentage = score;

  let category = 'Perlu Bimbingan';
  if (score >= 85) category = 'Sangat Baik';
  else if (score >= 70) category = 'Baik';
  else if (score >= 60) category = 'Cukup';

  const newResult = {
    id: `res-c-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    studentName: studentName.trim(),
    studentClass,
    examType: 'competency' as const,
    tokenUsed: tokenUsed || 'BYPASS',
    startTime: startTime || new Date().toISOString(),
    endTime: endTime || new Date().toISOString(),
    score,
    correctCount,
    wrongCount,
    unansweredCount,
    percentage,
    category,
    submittedAt: new Date().toISOString()
  };

  db.results.unshift(newResult);
  saveDatabase(db);

  res.json({ success: true, result: newResult });
});

// 5. Results Management
app.get('/api/results', (req, res) => {
  res.json({ success: true, results: db.results });
});

// Reset exam for a specific result ID
app.post('/api/results/reset', (req, res) => {
  const { resultId } = req.body;
  if (!resultId) {
    return res.status(400).json({ success: false, message: 'Result ID wajib diberikan.' });
  }

  const initialCount = db.results.length;
  db.results = db.results.filter(r => r.id !== resultId);
  saveDatabase(db);

  if (db.results.length < initialCount) {
    return res.json({ success: true, message: 'Data ujian siswa berhasil direset.' });
  }
  res.status(404).json({ success: false, message: 'Data hasil ujian tidak ditemukan.' });
});

// Delete all student response data
app.delete('/api/results/all', (req, res) => {
  db.results = [];
  saveDatabase(db);
  res.json({ success: true, message: 'Seluruh data respon siswa berhasil dihapus.' });
});

// 6. Export CSV
app.get('/api/export/csv', (req, res) => {
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="rekap-nilai-ppkn.csv"');

  let csv = 'No,Nama Lengkap,Kelas,Jenis Ujian,Nilai,Benar,Salah,Tidak Dijawab,Kategori,Waktu Selesai\n';
  db.results.forEach((item, index) => {
    const safeName = `"${item.studentName.replace(/"/g, '""')}"`;
    const examLabel = item.examType === 'quiz' ? 'Game Kuis' : 'Uji Kompetensi';
    csv += `${index + 1},${safeName},${item.studentClass},${examLabel},${item.score},${item.correctCount},${item.wrongCount},${item.unansweredCount},${item.category},${item.submittedAt}\n`;
  });

  res.send(csv);
});

// 7. Export Excel
app.get('/api/export/excel', (req, res) => {
  const worksheetData: (string | number)[][] = [
    ['No', 'Nama Lengkap', 'Kelas', 'Jenis Ujian', 'Nilai', 'Benar', 'Salah', 'Tidak Dijawab', 'Kategori', 'Waktu Selesai']
  ];

  db.results.forEach((item, index) => {
    const examLabel = item.examType === 'quiz' ? 'Game Kuis' : 'Uji Kompetensi';
    worksheetData.push([
      index + 1,
      item.studentName,
      item.studentClass,
      examLabel,
      item.score,
      item.correctCount,
      item.wrongCount,
      item.unansweredCount,
      item.category,
      item.submittedAt
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(worksheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Rekap Nilai');

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="rekap-nilai-ppkn.xlsx"');
  res.send(buf);
});

// 8. Class Specific Rekap
app.get('/api/rekap/class/:className', (req, res) => {
  const { className } = req.params;
  const filtered = db.results.filter(r => r.studentClass === className);
  res.json({ success: true, className, results: filtered });
});

// -------------------------------------------------------------
// Vite Middleware / Static Serving
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, 'dist'))) {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`e-modul-PPKn server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

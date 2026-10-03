import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { HomeSection } from './components/public/HomeSection';
import { ObjectivesSection } from './components/public/ObjectivesSection';
import { TriggerQuestionsSection } from './components/public/TriggerQuestionsSection';
import { BenefitsSection } from './components/public/BenefitsSection';
import { MaterialSection } from './components/public/MaterialSection';
import { ConclusionSection } from './components/public/ConclusionSection';
import { StudentLoginModal } from './components/student/StudentLoginModal';
import { TeacherLoginModal } from './components/teacher/TeacherLoginModal';
import { StudentDashboard } from './components/student/StudentDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { GameQuizView } from './components/student/GameQuizView';
import { CompetencyExamView } from './components/student/CompetencyExamView';
import { StudentProfile, TokenType, ExamToken, ExamResult, AppNotification } from './types';
import { Gamepad2, ArrowRight, KeyRound } from 'lucide-react';

const STORAGE_KEYS = {
  STUDENT: 'emodul_ppkn_active_student',
  TEACHER: 'emodul_ppkn_active_teacher'
};

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [student, setStudent] = useState<StudentProfile | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.STUDENT);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [teacher, setTeacher] = useState<any | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TEACHER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [isStudentLoginOpen, setIsStudentLoginOpen] = useState(false);
  const [isTeacherLoginOpen, setIsTeacherLoginOpen] = useState(false);

  // Active exam session
  const [activeExamType, setActiveExamType] = useState<TokenType | null>(null);
  const [activeToken, setActiveToken] = useState<ExamToken | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const dismissToast = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Auth Handlers
  const handleStudentLoginSuccess = (profile: StudentProfile) => {
    setStudent(profile);
    localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(profile));
    setIsStudentLoginOpen(false);
    showToast(`Selamat datang, ${profile.name}! Login berhasil.`, 'success');
    setCurrentView('dashboard-siswa');
  };

  const handleStudentLogout = () => {
    setStudent(null);
    localStorage.removeItem(STORAGE_KEYS.STUDENT);
    showToast('Anda telah logout dari sesi siswa.', 'info');
    if (currentView === 'dashboard-siswa' || currentView === 'exam-quiz' || currentView === 'exam-competency') {
      setCurrentView('home');
    }
  };

  const handleTeacherLoginSuccess = (teacherData: any) => {
    setTeacher(teacherData);
    localStorage.setItem(STORAGE_KEYS.TEACHER, JSON.stringify(teacherData));
    setIsTeacherLoginOpen(false);
    showToast('Login pengawas guru berhasil.', 'success');
    setCurrentView('dashboard-guru');
  };

  const handleTeacherLogout = () => {
    setTeacher(null);
    localStorage.removeItem(STORAGE_KEYS.TEACHER);
    showToast('Logout guru berhasil.', 'info');
    if (currentView === 'dashboard-guru') {
      setCurrentView('home');
    }
  };

  // Exam flow
  const handleStartExam = (type: TokenType, token: ExamToken) => {
    setActiveExamType(type);
    setActiveToken(token);
    if (type === 'quiz') {
      setCurrentView('exam-quiz');
    } else {
      setCurrentView('exam-competency');
    }
  };

  const handleExamFinish = (result: ExamResult) => {
    showToast(`Ujian berhasil diselesaikan! Skor: ${result.score}/100`, 'success');
  };

  // Navigation scroll to top
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Toast Notification Container */}
      <Toast notifications={notifications} onDismiss={dismissToast} />

      {/* Sticky Header */}
      {currentView !== 'exam-quiz' && currentView !== 'exam-competency' && (
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          student={student}
          isTeacherLoggedIn={!!teacher}
          onStudentLogout={handleStudentLogout}
          onTeacherLogout={handleTeacherLogout}
          onOpenStudentLogin={() => setIsStudentLoginOpen(true)}
          onOpenTeacherLogin={() => setIsTeacherLoginOpen(true)}
        />
      )}

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {/* 1. Home Section */}
        {currentView === 'home' && (
          <HomeSection
            onStartLearning={() => handleNavigate('tujuan')}
            onOpenStudentDashboard={() => {
              if (student) handleNavigate('dashboard-siswa');
              else setIsStudentLoginOpen(true);
            }}
            onOpenTeacherLogin={() => {
              if (teacher) handleNavigate('dashboard-guru');
              else setIsTeacherLoginOpen(true);
            }}
          />
        )}

        {/* 2. Tujuan Pembelajaran */}
        {currentView === 'tujuan' && (
          <ObjectivesSection onContinue={() => handleNavigate('pemantik')} />
        )}

        {/* 3. Pertanyaan Pemantik */}
        {currentView === 'pemantik' && (
          <TriggerQuestionsSection onContinue={() => handleNavigate('manfaat')} />
        )}

        {/* 4. Manfaat Pembelajaran */}
        {currentView === 'manfaat' && (
          <BenefitsSection onContinue={() => handleNavigate('materi')} />
        )}

        {/* 5. Materi Pembelajaran 17 Bab */}
        {currentView === 'materi' && (
          <MaterialSection
            onGoToConclusion={() => handleNavigate('kesimpulan')}
            onGoToQuiz={() => handleNavigate('kuis-intro')}
          />
        )}

        {/* 6. Kesimpulan */}
        {currentView === 'kesimpulan' && (
          <ConclusionSection
            onBackToMaterial={() => handleNavigate('materi')}
            onContinueToQuiz={() => handleNavigate('kuis-intro')}
          />
        )}

        {/* 7. Game Kuis Intro / Prompt */}
        {currentView === 'kuis-intro' && (
          <div className="py-16 bg-slate-900 text-white min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4">
            <div className="max-w-xl w-full bg-blue-950 p-8 rounded-3xl border-2 border-amber-400 shadow-2xl text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-amber-400 text-blue-950 flex items-center justify-center mx-auto shadow-lg">
                <Gamepad2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
                  Evaluasi Cepat & Seru
                </span>
                <h2 className="text-3xl font-black text-white">
                  Game Kuis Sidang BPUPK
                </h2>
                <p className="text-xs sm:text-sm text-blue-200 mt-2">
                  5 Soal bertimer 20 detik per soal. Uji pemahamanmu sekarang dan raih skor tertinggi!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-xs text-blue-100 text-left space-y-2">
                <div className="font-bold text-amber-300">Aturan Permainan:</div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Setiap soal memiliki timer 20 detik yang berjalan mundur.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Jika waktu habis, otomatis lanjut ke soal berikutnya.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Memerlukan token game kuis dari guru pengawas.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (student) {
                      handleNavigate('dashboard-siswa');
                    } else {
                      setIsStudentLoginOpen(true);
                    }
                  }}
                  className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-base shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-105"
                >
                  <KeyRound className="w-5 h-5" />
                  <span>{student ? 'Buka Kuis di Dashboard Siswa' : 'Masuk Siswa & Masukkan Token'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 8. Dashboard Siswa */}
        {currentView === 'dashboard-siswa' && student && (
          <StudentDashboard
            student={student}
            onLogout={handleStudentLogout}
            onStartExam={handleStartExam}
            onGoToMaterial={() => handleNavigate('materi')}
          />
        )}

        {/* 9. Dashboard Guru */}
        {currentView === 'dashboard-guru' && teacher && (
          <TeacherDashboard
            teacher={teacher}
            onLogout={handleTeacherLogout}
            onShowToast={showToast}
          />
        )}

        {/* Active Exam Views */}
        {currentView === 'exam-quiz' && student && activeToken && (
          <GameQuizView
            student={student}
            token={activeToken}
            onFinish={handleExamFinish}
            onBackToDashboard={() => handleNavigate('dashboard-siswa')}
          />
        )}

        {currentView === 'exam-competency' && student && activeToken && (
          <CompetencyExamView
            student={student}
            token={activeToken}
            onFinish={handleExamFinish}
            onBackToDashboard={() => handleNavigate('dashboard-siswa')}
          />
        )}
      </main>

      {/* Footer */}
      {currentView !== 'exam-quiz' && currentView !== 'exam-competency' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenTeacherLogin={() => setIsTeacherLoginOpen(true)}
        />
      )}

      {/* Student Login Modal */}
      <StudentLoginModal
        isOpen={isStudentLoginOpen}
        onClose={() => setIsStudentLoginOpen(false)}
        onLoginSuccess={handleStudentLoginSuccess}
      />

      {/* Teacher Login Modal */}
      <TeacherLoginModal
        isOpen={isTeacherLoginOpen}
        onClose={() => setIsTeacherLoginOpen(false)}
        onLoginSuccess={handleTeacherLoginSuccess}
      />
    </div>
  );
}

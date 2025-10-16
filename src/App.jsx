import React, { useState } from 'react';
import { User, LogOut, Users, BarChart3, Calendar, Check, X, AlertCircle, Plus, Trash2, Edit2, BookOpen, Lock, Eye, EyeOff } from 'lucide-react';

export default function AttendanceSystem() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [activeTab, setActiveTab] = useState('attendance');
  const [notification, setNotification] = useState(null);

  const [admins, setAdmins] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});

  const [studentForm, setStudentForm] = useState({ name: '', rollNo: '', email: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', email: '', subject: '' });
  const [adminForm, setAdminForm] = useState({ name: '', email: '' });
  const [subjectForm, setSubjectForm] = useState({ name: '', code: '' });
  const [credentialForm, setCredentialForm] = useState({ userId: '', password: '', role: '' });
  const [showPasswordFields, setShowPasswordFields] = useState({});

  const [editingStudent, setEditingStudent] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogin = (role) => {
    setUserRole(role);
    const names = { admin: 'Admin User', teacher: 'Prof. Anderson', student: 'John Doe' };
    setCurrentUser(names[role]);
    setShowLogin(false);
    showNotification(`Welcome ${role.charAt(0).toUpperCase() + role.slice(1)}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setShowLogin(true);
    setActiveTab('attendance');
  };

  const addAdmin = () => {
    if (!adminForm.name || !adminForm.email) {
      showNotification('Please fill all fields', 'error');
      return;
    }
    const newAdmin = {
      id: Date.now(),
      name: adminForm.name,
      email: adminForm.email,
      password: null,
      status: 'Inactive'
    };
    setAdmins([...admins, newAdmin]);
    setAdminForm({ name: '', email: '' });
    showNotification('Admin added successfully', 'success');
  };

  const deleteAdmin = (id) => {
    setAdmins(admins.filter(a => a.id !== id));
    showNotification('Admin deleted successfully', 'success');
  };

  const addTeacher = () => {
    if (!teacherForm.name || !teacherForm.email) {
      showNotification('Please fill all fields', 'error');
      return;
    }
    const newTeacher = {
      id: Date.now(),
      name: teacherForm.name,
      email: teacherForm.email,
      subject: teacherForm.subject,
      password: null,
      status: 'Inactive'
    };
    setTeachers([...teachers, newTeacher]);
    setTeacherForm({ name: '', email: '', subject: '' });
    showNotification('Teacher added successfully', 'success');
  };

  const updateTeacher = () => {
    if (!teacherForm.name || !teacherForm.email) {
      showNotification('Please fill all fields', 'error');
      return;
    }
    setTeachers(teachers.map(t =>
      t.id === editingTeacher.id
        ? { ...t, name: teacherForm.name, email: teacherForm.email, subject: teacherForm.subject }
        : t
    ));
    setEditingTeacher(null);
    setTeacherForm({ name: '', email: '', subject: '' });
    showNotification('Teacher updated successfully', 'success');
  };

  const deleteTeacher = (id) => {
    setTeachers(teachers.filter(t => t.id !== id));
    showNotification('Teacher deleted successfully', 'success');
  };

  const startEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setTeacherForm({ name: teacher.name, email: teacher.email, subject: teacher.subject });
  };

  const cancelEditTeacher = () => {
    setEditingTeacher(null);
    setTeacherForm({ name: '', email: '', subject: '' });
  };

  const addStudent = () => {
    if (!studentForm.name || !studentForm.rollNo) {
      showNotification('Please fill all fields', 'error');
      return;
    }
    if (students.some(s => s.rollNo === studentForm.rollNo)) {
      showNotification('Roll number already exists', 'error');
      return;
    }
    const newStudent = {
      id: Date.now(),
      name: studentForm.name,
      rollNo: studentForm.rollNo,
      email: studentForm.email,
      attendance: 0,
      password: null,
      status: 'Inactive'
    };
    setStudents([...students, newStudent]);
    setAttendanceRecords(prev => ({ ...prev, [newStudent.id]: 'unmarked' }));
    setStudentForm({ name: '', rollNo: '', email: '' });
    showNotification('Student added successfully', 'success');
  };

  const updateStudent = () => {
    if (!studentForm.name || !studentForm.rollNo) {
      showNotification('Please fill all fields', 'error');
      return;
    }
    setStudents(students.map(s =>
      s.id === editingStudent.id
        ? { ...s, name: studentForm.name, rollNo: studentForm.rollNo, email: studentForm.email }
        : s
    ));
    setEditingStudent(null);
    setStudentForm({ name: '', rollNo: '', email: '' });
    showNotification('Student updated successfully', 'success');
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    const newRecords = { ...attendanceRecords };
    delete newRecords[id];
    setAttendanceRecords(newRecords);
    showNotification('Student deleted successfully', 'success');
  };

  const startEditStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({ name: student.name, rollNo: student.rollNo, email: student.email });
  };

  const cancelEditStudent = () => {
    setEditingStudent(null);
    setStudentForm({ name: '', rollNo: '', email: '' });
  };

  const addSubject = () => {
    if (!subjectForm.name || !subjectForm.code) {
      showNotification('Please fill all fields', 'error');
      return;
    }
    if (subjects.some(s => s.code === subjectForm.code)) {
      showNotification('Subject code already exists', 'error');
      return;
    }
    const newSubject = {
      id: Date.now(),
      name: subjectForm.name,
      code: subjectForm.code
    };
    setSubjects([...subjects, newSubject]);
    setSubjectForm({ name: '', code: '' });
    showNotification('Subject added successfully', 'success');
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
    showNotification('Subject deleted successfully', 'success');
  };

  const setCredentials = () => {
    if (!credentialForm.userId || !credentialForm.password || !credentialForm.role) {
      showNotification('Please fill all fields', 'error');
      return;
    }

    if (credentialForm.role === 'teacher') {
      setTeachers(teachers.map(t =>
        t.id === parseInt(credentialForm.userId)
          ? { ...t, password: credentialForm.password, status: 'Active' }
          : t
      ));
    } else if (credentialForm.role === 'student') {
      setStudents(students.map(s =>
        s.id === parseInt(credentialForm.userId)
          ? { ...s, password: credentialForm.password, status: 'Active' }
          : s
      ));
    } else if (credentialForm.role === 'admin') {
      setAdmins(admins.map(a =>
        a.id === parseInt(credentialForm.userId)
          ? { ...a, password: credentialForm.password, status: 'Active' }
          : a
      ));
    }
    showNotification('Credentials set successfully', 'success');
    setCredentialForm({ userId: '', password: '', role: '' });
  };

  const markAttendance = (studentId, status) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: status
    }));
    showNotification(`Attendance marked: ${status}`, 'success');
  };

  const NotificationDisplay = () => notification && (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
      notification.type === 'success' ? 'bg-green-500' :
      notification.type === 'warning' ? 'bg-yellow-500' :
      notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white`}>
      <AlertCircle className="w-5 h-5" />
      {notification.message}
    </div>
  );

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
              <User className="w-12 h-12 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Attendance System</h1>
            <p className="text-gray-600">Select your role to continue</p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => handleLogin('admin')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Lock className="w-5 h-5" />
              Login as Admin
            </button>
            <button
              onClick={() => handleLogin('teacher')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Users className="w-5 h-5" />
              Login as Teacher
            </button>
            <button
              onClick={() => handleLogin('student')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <User className="w-5 h-5" />
              Login as Student
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (userRole === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <NotificationDisplay />
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Lock className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">{currentUser}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-4 overflow-x-auto">
              {['admins', 'teachers', 'students', 'credentials', 'subjects'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium border-b-2 transition whitespace-nowrap ${
                    activeTab === tab ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === 'admins' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Admins</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Add New Admin</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Admin Name"
                    value={adminForm.name}
                    onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={adminForm.email}
                    onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={addAdmin}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Admin
                </button>
              </div>

              {admins.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>No admins added yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {admins.map(admin => (
                    <div key={admin.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{admin.name}</p>
                        <p className="text-sm text-gray-500">{admin.email}</p>
                        <span className={`text-xs mt-1 px-2 py-1 rounded ${admin.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {admin.status}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteAdmin(admin.id)}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'teachers' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Teachers</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Teacher Name"
                    value={teacherForm.name}
                    onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={teacherForm.email}
                    onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Subject (optional)"
                    value={teacherForm.subject}
                    onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  {editingTeacher ? (
                    <>
                      <button
                        onClick={updateTeacher}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                      >
                        Update Teacher
                      </button>
                      <button
                        onClick={cancelEditTeacher}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={addTeacher}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Teacher
                    </button>
                  )}
                </div>
              </div>

              {teachers.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>No teachers added yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {teachers.map(teacher => (
                    <div key={teacher.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{teacher.name}</p>
                        <p className="text-sm text-gray-500">{teacher.email}</p>
                        {teacher.subject && <p className="text-sm text-gray-500">Subject: {teacher.subject}</p>}
                        <span className={`text-xs mt-1 px-2 py-1 rounded ${teacher.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {teacher.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditTeacher(teacher)}
                          className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTeacher(teacher.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'students' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Students</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  {editingStudent ? 'Edit Student' : 'Add New Student'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Student Name"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Roll Number"
                    value={studentForm.rollNo}
                    onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  {editingStudent ? (
                    <>
                      <button
                        onClick={updateStudent}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                      >
                        Update Student
                      </button>
                      <button
                        onClick={cancelEditStudent}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={addStudent}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Student
                    </button>
                  )}
                </div>
              </div>

              {students.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>No students added yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {students.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.rollNo} • {student.email}</p>
                        <span className={`text-xs mt-1 px-2 py-1 rounded ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {student.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditStudent(student)}
                          className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'credentials' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Login Credentials</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Set Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <select
                    value={credentialForm.role}
                    onChange={(e) => setCredentialForm({ ...credentialForm, role: e.target.value, userId: '' })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </select>

                  {credentialForm.role && (
                    <select
                      value={credentialForm.userId}
                      onChange={(e) => setCredentialForm({ ...credentialForm, userId: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select {credentialForm.role}</option>
                      {credentialForm.role === 'admin' && admins.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                      {credentialForm.role === 'teacher' && teachers.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                      {credentialForm.role === 'student' && students.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  )}

                  <div className="relative">
                    <input
                      type={showPasswordFields[credentialForm.userId] ? 'text' : 'password'}
                      placeholder="Enter Password"
                      value={credentialForm.password}
                      onChange={(e) => setCredentialForm({ ...credentialForm, password: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-full"
                    />
                    <button
                      onClick={() => setShowPasswordFields({ ...showPasswordFields, [credentialForm.userId]: !showPasswordFields[credentialForm.userId] })}
                      className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                    >
                      {showPasswordFields[credentialForm.userId] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <button
                  onClick={setCredentials}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Set Credentials
                </button>
              </div>

              {(credentialForm.role === 'admin' ? admins : credentialForm.role === 'teacher' ? teachers : students).length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>No users in this role yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 mb-4">Current Users</h3>
                  {(credentialForm.role === 'admin' ? admins : credentialForm.role === 'teacher' ? teachers : students).map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <span className={`text-xs mt-1 px-2 py-1 rounded ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'subjects' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Subjects</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Add New Subject</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Subject Name"
                    value={subjectForm.name}
                    onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Subject Code"
                    value={subjectForm.code}
                    onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={addSubject}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Subject
                </button>
              </div>

              {subjects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>No subjects added yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {subjects.map(subject => (
                    <div key={subject.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{subject.name}</p>
                        <p className="text-sm text-gray-500">Code: {subject.code}</p>
                      </div>
                      <button
                        onClick={() => deleteSubject(subject.id)}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (userRole === 'teacher') {
    return (
      <div className="min-h-screen bg-gray-50">
        <NotificationDisplay />
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Teacher Dashboard</h1>
                <p className="text-sm text-gray-600">{currentUser}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mark Attendance</h2>
            
            {students.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p>No students available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {students.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-500">Roll: {student.rollNo}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => markAttendance(student.id, 'Present')}
                        className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                          attendanceRecords[student.id] === 'Present'
                            ? 'bg-green-600 text-white'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        Present
                      </button>
                      <button
                        onClick={() => markAttendance(student.id, 'Absent')}
                        className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                          attendanceRecords[student.id] === 'Absent'
                            ? 'bg-red-600 text-white'
                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                        }`}
                      >
                        <X className="w-4 h-4" />
                        Absent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (userRole === 'student') {
    const currentStudent = students.find(s => s.name === currentUser);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <NotificationDisplay />
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <User className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Student Dashboard</h1>
                <p className="text-sm text-gray-600">{currentUser}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-emerald-100 rounded-lg">
                  <User className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Roll Number</p>
                  <p className="text-2xl font-bold text-gray-800">{currentStudent?.rollNo || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Attendance Status</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {attendanceRecords[currentStudent?.id] === 'Present' ? '✓ Present' : 
                     attendanceRecords[currentStudent?.id] === 'Absent' ? '✗ Absent' : 
                     'Not Marked'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Full Name</p>
                <p className="text-gray-800 font-medium">{currentStudent?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-gray-800 font-medium">{currentStudent?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Account Status</p>
                <span className={`text-sm px-3 py-1 rounded-full inline-block ${
                  currentStudent?.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {currentStudent?.status || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
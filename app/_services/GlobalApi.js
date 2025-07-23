const { default: axios } = require("axios");

const GetAllGrades = () => axios.get('/api/grade');

const CreateNewStudent = (data) => axios.post('/api/student', data);

const GetAllStudents = () => axios.get('/api/student');

const DeleteStudentRecord = (id) => axios.delete('/api/student?id=' + id);

const GetAttendanceList = (grade, month) =>
  axios.get(`/api/attendance?grade=${grade}&month=${month}`);

const MarkAttendance = (data) => axios.post('/api/attendance', data);

// ✅ CORRECTED: fixed missing '=' in query parameters
const MarkAbsent = (StudentId, day, date) =>
  axios.delete(`/api/attendance?StudentId=${StudentId}&day=${day}&date=${date}`);

export default {
  GetAllGrades,
  CreateNewStudent,
  GetAllStudents,
  DeleteStudentRecord,
  GetAttendanceList,
  MarkAttendance,
  MarkAbsent,
  
};



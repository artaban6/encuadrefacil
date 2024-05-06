const valuesForm = document.getElementById("values-form");
const totalsForm = document.getElementById("totals-form");
const studentsInfoForm = document.getElementById("students-info-form");
const studentsForm = document.getElementById("students-form");


const editValuesBtn = document.getElementById("edit-values-btn");
const editTotalsBtn = document.getElementById("edit-totals-btn");
const editStudentsBtn = document.getElementById("edit-students-btn");
const addNewStudentBtn = document.getElementById("add-new-student-btn");


const closeValuesFormBtn = document.getElementById("close-values-form-btn");
const closeTotalsFormBtn = document.getElementById("close-totals-form-btn");
const closeStudentsInfoFormBtn = document.getElementById("close-students-info-form-btn");
const closeStudentsFormBtn = document.getElementById("close-students-form-btn");
const closeResultsContainerBtn = document.getElementById("close-results-continer-btn");

const studentsInfoContainer = document.getElementById("students-info-container");
const studentsNameInput = document.getElementById("students-name-input");
const studentsActivitiesInput = document.getElementById("students-activities-input");
const studentsProjectsInput = document.getElementById("students-projects-input");
const studentsExamInput = document.getElementById("students-exam-input");
const studentsHomeworkInput = document.getElementById("students-homework-input");
const studentsAttendanceAndInvolvementInput = document.getElementById("students-attendance-and-involvement-input");

const seeResultsBtn = document.getElementById("see-results-btn");
const resultsContainer = document.getElementById("results-container");

const studentsData = [];
let currentStudent = {};

let percentageValues = {};
let totalValues = {};

const handleValuesFormSubmit = (e) => {
  e.preventDefault();

  percentageValues = {
    activities: parseFloat(document.getElementById("activities-input").value),
    projects: parseFloat(document.getElementById("projects-input").value),
    exam: parseFloat(document.getElementById("exam-input").value),
    homework: parseFloat(document.getElementById("homework-input").value),
    attendance: parseFloat(document.getElementById("attendance-and-involvement-input").value)
  };
  const totalPercentage = Object.values(percentageValues).reduce((acc, val) => acc + val, 0);
  if (totalPercentage !== 100) {
    alert("La suma de los valores debe ser 100%");
    return;
  }

  totalValues = {
    activities: parseInt(document.getElementById("total-activities-input").value),
    projects: parseInt(document.getElementById("total-projects-input").value),
    exam: parseInt(document.getElementById("total-exam-input").value),
    homework: parseInt(document.getElementById("total-homework-input").value),
    attendance: parseInt(document.getElementById("total-attendance-and-involvement-input").value)
  };

  //borrar console

  console.log(percentageValues);
  console.log(totalValues);
  valuesForm.classList.toggle("hidden-1");
};

// borrar handle




const addOrUpdateStudent = () => {
  const dataArrIndex = studentsData.findIndex((item) => item.id === currentStudent.id);

  const studentObj = {
     id: `${studentsNameInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
     studentName: studentsNameInput.value,
     activities: studentsActivitiesInput.value,
     projects: studentsProjectsInput.value,
     exam: studentsExamInput.value,
     homework: studentsHomeworkInput.value,
     attendance: studentsAttendanceAndInvolvementInput.value,
  };

  console.log(studentObj);

  if (dataArrIndex === -1) {
    studentsData.unshift(studentObj);
  } else {
    studentsData[dataArrIndex] = studentObj;
  }

  updateStudentsInfoContainer()
  reset()
};

const updateStudentsInfoContainer = () => {
  studentsInfoContainer.innerHTML = "";

  studentsData.forEach(
    ({ id, studentName, activities, projects, exam, homework, attendance }) => {
      (studentsInfoContainer.innerHTML += `
      <div class="student" id="${id}">
      <p><strong>Nombre del Estudiante:</strong> ${studentName}<p>
      <p><strong>Actividades entregadas:</strong> ${activities}<p>
      <p><strong>Proyectos entregados:</strong> ${projects}<p>
      <p><strong>Respuestas correctas en el Examen:</strong> ${exam}<p>
      <p><strong>Tareas entregadas:</strong> ${homework}<p>
      <p><strong>Asistencias del Estudiante:</strong> ${attendance}<p>
      <button onclick="deleteStudent(this)" type="button" class="btn">Borrar</button>
      </div>
      `)
    }
  );
};

const deleteStudent = (buttonEl) => {
  const dataArrIndex = studentsData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  buttonEl.parentElement.remove();
  studentsData.splice(dataArrIndex, 1);

  updateStudentsInfoContainer();
}

const reset = () => {
  studentsNameInput.value = "";
  studentsActivitiesInput.value = "";
  studentsProjectsInput.value = "";
  studentsExamInput.value = "";
  studentsHomeworkInput.value = "";
  studentsAttendanceAndInvolvementInput.value = "";
  studentsInfoForm.classList.toggle("hidden-3");
  currentStudent = {};
}


editStudentsBtn.addEventListener("click", () =>
  studentsInfoForm.classList.toggle("hidden-3")
);

closeStudentsInfoFormBtn.addEventListener("click", () => 
    studentsInfoForm.classList.toggle("hidden-3")
);


editValuesBtn.addEventListener("click", () =>
  valuesForm.classList.toggle("hidden-1") 
);

closeValuesFormBtn.addEventListener("click", () =>
    valuesForm.classList.toggle("hidden-1")
);



studentsInfoForm.addEventListener("submit", (e) => {
  e.preventDefault();

addOrUpdateStudent();
 });

 // quitar handletotals

 valuesForm.addEventListener("submit", (e) => {
  handleValuesFormSubmit(e);
});


// _____________ //

const exportToExcel = () => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([
    ["Nombre del Estudiante", "Calificación de actividades", "Calificación de proyectos", "Calificación del examen", "Calificación de tareas", "Calificación de asistencias", "Calificación general"],
    ...studentsData.map(({ studentName, activities, projects, exam, homework, attendance }) => {
      const activitiesGrade = (activities / totalValues.activities) * percentageValues.activities;
      const projectsGrade = (projects / totalValues.projects) * percentageValues.projects;
      const examGrade = (exam / totalValues.exam) * percentageValues.exam;
      const homeworkGrade = (homework / totalValues.homework) * percentageValues.homework;
      const attendanceGrade = (attendance / totalValues.attendance) * percentageValues.attendance;
      const overallGrade = (activitiesGrade + projectsGrade + examGrade + homeworkGrade + attendanceGrade);
      return [studentName, activitiesGrade, projectsGrade, examGrade, homeworkGrade, attendanceGrade, overallGrade];
    })
  ]);

  XLSX.utils.book_append_sheet(wb, ws, 'Resultados');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  const fileName = 'resultados.xlsx';

  if (typeof navigator.msSaveBlob !== 'undefined') {
    navigator.msSaveBlob(blob, fileName);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

// _______________//


seeResultsBtn.addEventListener("click", () => {
  resultsContainer.classList.toggle("hidden-2");

  if (!resultsContainer.classList.contains("hidden-2")) {
    displayResults();
  }
});

const displayResults = () => {
  resultsContainer.innerHTML = "";

  studentsData.forEach(({ studentName, activities, projects, exam, homework, attendance }) => {
 
    
    const activitiesGrade = (activities / totalValues.activities) * percentageValues.activities;
    const projectsGrade = (projects / totalValues.projects) * percentageValues.projects;
    const examGrade = (exam / totalValues.exam) * percentageValues.exam;
    const homeworkGrade = (homework / totalValues.homework) * percentageValues.homework;
    const attendanceGrade = (attendance / totalValues.attendance) * percentageValues.attendance;

    const overallGrade = (activitiesGrade + projectsGrade + examGrade + homeworkGrade + attendanceGrade);

    resultsContainer.innerHTML += `
      <div class="student">
        <p><strong>Nombre del Estudiante:</strong> ${studentName}</p>
        <p><strong>Calificación de actividades:</strong> ${activitiesGrade}</p>
        <p><strong>Calificación de proyectos:</strong> ${projectsGrade}</p>
        <p><strong>Calificación del examen:</strong> ${examGrade}</p>
        <p><strong>Calificación de tareas:</strong> ${homeworkGrade}</p>
        <p><strong>Calificación de asistencias:</strong> ${attendanceGrade}</p>
        <p><strong>Calificación general:</strong> ${overallGrade}</p>
      </div>
    `;
  });
// _______ // 
  resultsContainer.innerHTML += `
    <button id="exportExcelBtn" class="btn">Exportar a Excel</button>
  `;
// _______ //
document.getElementById('exportExcelBtn').addEventListener('click', exportToExcel);
};

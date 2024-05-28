const valuesForm = document.getElementById("values-form");
const totalsForm = document.getElementById("totals-form");
const studentsInfoForm = document.getElementById("students-info-form");
const studentsForm = document.getElementById("students-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");


const editValuesBtn = document.getElementById("edit-values-btn");
const editTotalsBtn = document.getElementById("edit-totals-btn");
const editStudentsBtn = document.getElementById("edit-students-btn");
const addNewStudentBtn = document.getElementById("add-new-student-btn");
const cancelBtn = document.getElementById("cancel-btn");



const closeValuesFormBtn = document.getElementById("close-values-form-btn");
const closeTotalsFormBtn = document.getElementById("close-totals-form-btn");
const closeStudentsInfoFormBtn = document.getElementById("close-students-info-form-btn");
const closeStudentsFormBtn = document.getElementById("close-students-form-btn");


const studentsInfoContainer = document.getElementById("students-info-container");
const studentsNameInput = document.getElementById("students-name-input");
const studentsActivitiesInput = document.getElementById("students-activities-input");
const studentsProjectsInput = document.getElementById("students-projects-input");
const studentsExamInput = document.getElementById("students-exam-input");
const studentsHomeworkInput = document.getElementById("students-homework-input");
const studentsAttendanceAndInvolvementInput = document.getElementById("students-attendance-and-involvement-input");

const seeResultsBtn = document.getElementById("see-results-btn");
const resultsContainer = document.getElementById("results-container");

const refreshBtnTwo = document.getElementById("refresh-btn-two");
const closeResultsContainerBtn = document.getElementById("close-results-continer-btn");

const totalActivitiesInput = document.getElementById("total-activities-input");
const totalProjectsInput = document.getElementById("total-projects-input");
const totalExamInput = document.getElementById("total-exam-input");
const totalHomeworkInput = document.getElementById("total-homework-input");
const totalAttendanceAndInvolvementInput = document.getElementById("total-attendance-and-involvement-input");


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
    activities: parseInt(totalActivitiesInput.value),
    projects: parseInt(totalProjectsInput.value),
    exam: parseInt(totalExamInput.value),
    homework: parseInt(totalHomeworkInput.value),
    attendance: parseInt(totalAttendanceAndInvolvementInput.value)
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
      <button onclick="deleteStudent(this)" type="button" class="btn-3">Borrar</button>
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


editStudentsBtn.addEventListener("click", () => {
// está repetido, necesito hacer que solo tenga la función y no todo

  const percentageInputs = [
    document.getElementById("activities-input").value,
    document.getElementById("projects-input").value,
    document.getElementById("exam-input").value,
    document.getElementById("homework-input").value,
    document.getElementById("attendance-and-involvement-input").value
  ];

  const totalInputs = [
    document.getElementById("total-activities-input").value,
    document.getElementById("total-projects-input").value,
    document.getElementById("total-exam-input").value,
    document.getElementById("total-homework-input").value,
    document.getElementById("total-attendance-and-involvement-input").value
  ];

  const arePercentageValuesFilled = percentageInputs.every(value => value !== "" && value !== null);
  const areTotalValuesFilled = totalInputs.every(value => value !== "" && value !== null);

  if (!arePercentageValuesFilled || !areTotalValuesFilled) {
    alert("Por favor complete el Paso 1 antes de continuar.");
    return;
  }
//--------- de ${}
studentsActivitiesInput.placeholder = `de ${totalActivitiesInput.value}`;
studentsProjectsInput.placeholder = `de ${totalProjectsInput.value}`;
studentsExamInput.placeholder = `de ${totalExamInput.value}`;
studentsHomeworkInput.placeholder = `de ${totalHomeworkInput.value}`;
studentsAttendanceAndInvolvementInput.placeholder = `de ${totalAttendanceAndInvolvementInput.value}`;
//---------
  studentsInfoForm.classList.toggle("hidden-3")
  
});

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

// ----- checar si están en rango las cosas
  if (parseFloat(studentsActivitiesInput.value) <= parseFloat(totalActivitiesInput.value) &&
      parseFloat(studentsProjectsInput.value) <= parseFloat(totalProjectsInput.value) &&
      parseFloat(studentsExamInput.value) <= parseFloat(totalExamInput.value) &&
      parseFloat(studentsHomeworkInput.value) <= parseFloat(totalHomeworkInput.value) &&
      parseFloat(studentsAttendanceAndInvolvementInput.value) <= parseFloat(totalAttendanceAndInvolvementInput.value)) {
    addOrUpdateStudent();
  } else {
    alert("El número de del Estudiante no puede ser mayor que el Total.");
    return;
  }
// -----

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
  const percentageInputs = [
    document.getElementById("activities-input").value,
    document.getElementById("projects-input").value,
    document.getElementById("exam-input").value,
    document.getElementById("homework-input").value,
    document.getElementById("attendance-and-involvement-input").value
  ];

  const totalInputs = [
    document.getElementById("total-activities-input").value,
    document.getElementById("total-projects-input").value,
    document.getElementById("total-exam-input").value,
    document.getElementById("total-homework-input").value,
    document.getElementById("total-attendance-and-involvement-input").value
  ];

  const arePercentageValuesFilled = percentageInputs.every(value => value !== "" && value !== null);
  const areTotalValuesFilled = totalInputs.every(value => value !== "" && value !== null);

  if (!arePercentageValuesFilled || !areTotalValuesFilled) {
    alert("Por favor complete el Paso 1 antes de continuar.");
    return;
  }

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
        <p><strong>Calificación de actividades:</strong> ${activitiesGrade.toFixed(1)}</p>
        <p><strong>Calificación de proyectos:</strong> ${projectsGrade.toFixed(1)}</p>
        <p><strong>Calificación del examen:</strong> ${examGrade.toFixed(1)}</p>
        <p><strong>Calificación de tareas:</strong> ${homeworkGrade.toFixed(1)}</p>
        <p><strong>Calificación de asistencias:</strong> ${attendanceGrade.toFixed(1)}</p>
        <p><strong>Calificación general:</strong> ${overallGrade.toFixed(1)}</p>
        <hr class="line"/>
        <hr class="line"/>
      </div>
      
    `;
  });
// _______ // 
  resultsContainer.innerHTML += `
  <button id="exportExcelBtn" class="btn-2">Exportar a Excel</button>
  <button id="refresh-results-btn" class="btn-2">Crear Nuevo Encuadre</button>
  `;
// _______ //



document.getElementById('exportExcelBtn').addEventListener('click', exportToExcel);
document.getElementById('refresh-results-btn').addEventListener('click', () => {
  
  // quitar console log
  console.log("button clicked");
  confirmCloseDialog.showModal();
  console.log("popo");
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

refreshBtnTwo.addEventListener("click",  () => {
  confirmCloseDialog.close();
  location.reload();
}); 

};



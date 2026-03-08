(() => {
 const ignoredSubjects = ["NSTP 1(ROTC)2018", "NSTP 2ROTC(2018)", "2020-2021", "2021-2022"];// Add subject codes or description keywords to ignore

  let rows = document.querySelectorAll("tbody tr");
  let grades = [];

  rows.forEach((row, index) => {
    if (index === 0) return; // Skip header

    const cells = row.querySelectorAll("td");
    if (cells.length < 7) return;

    const subjectYear = cells[0].innerText.trim().toUpperCase();
    const subjectCode = cells[2].innerText.trim().toUpperCase();        // e.g., "GE 1(2018)"
    const subjectDesc = cells[3].innerText.trim().toUpperCase();        // e.g., "UNDERSTANDING THE SELF"
    const units = parseFloat(cells[4].innerText.trim());
    const finalGrade = parseFloat(cells[6].innerText.trim());

    // Skip ignored subjects
    const isIgnored = ignoredSubjects.some(keyword =>
      subjectCode.includes(keyword) || subjectDesc.includes(keyword) || subjectYear.includes(keyword)
    );

    if (!isIgnored && !isNaN(units) && !isNaN(finalGrade)) {
      grades.push({ grade: finalGrade, units });
    }
  });

  chrome.runtime.sendMessage({ action: "sendGrades", data: grades });
})();

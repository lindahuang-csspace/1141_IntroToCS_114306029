const mathInput = document.getElementById('mathInput');
const englishInput = document.getElementById('englishInput');
const submitBtn = document.getElementById('submitBtn');
const tableBody = document.getElementById('tableBody');
const avgMathDisplay = document.getElementById('avgMath');
const avgEnglishDisplay = document.getElementById('avgEnglish');
const avgOverallDisplay = document.getElementById('avgOverall');

/**
* Calculates and updates the column-wise averages (Math, English, and Average column)
* in the table footer.
*/
function updateColumnAverages() {
const rows = tableBody.rows;
let sumMath = 0;
let sumEnglish = 0;
let sumAverage = 0;
const count = rows.length;

// Handle case with no data rows
if (count === 0) {
avgMathDisplay.textContent = '0.00';
avgEnglishDisplay.textContent = '0.00';
avgOverallDisplay.textContent = '0.00';
return;
}

// Loop through all data rows in the body to sum the grades
for (let i = 0; i < count; i++) {
const row = rows[i];

// Data cells are accessed by their index in the row (0 is '#'):
// Index 1: Math | Index 2: English | Index 3: Row Average

// Use textContent to get the value, then parse to a float
const math = parseFloat(row.cells[1].textContent);
const english = parseFloat(row.cells[2].textContent);
const average = parseFloat(row.cells[3].textContent);

// Ensure values are numbers before adding
if (!isNaN(math)) sumMath += math;
if (!isNaN(english)) sumEnglish += english;
if (!isNaN(average)) sumAverage += average;
}

// Calculate Averages
const avgMath = sumMath / count;
const avgEnglish = sumEnglish / count;
const avgOverall = sumAverage / count;

// Display results, rounded to 2 decimal places
avgMathDisplay.textContent = avgMath.toFixed(2);
avgEnglishDisplay.textContent = avgEnglish.toFixed(2);
avgOverallDisplay.textContent = avgOverall.toFixed(2);
}

/**
* Handles the submission of new grades.
*/
submitBtn.addEventListener('click', function() {
// 1. Validate and fetch user inputs
const math = parseFloat(mathInput.value);
const english = parseFloat(englishInput.value);

// Basic validation check
if (isNaN(math) || isNaN(english) || math < 0 || english < 0 || math > 100 || english > 100) {
alert("Please enter valid grades (0-100) for Math and English.");
return;
}

// 2. Calculate row average
const rowAverage = (math + english) / 2;

// 3. Add the entered grades as a new row in the table
const newRow = tableBody.insertRow();
const newRowNumber = tableBody.rows.length; // New number is the current length

// Cell 1: #
newRow.insertCell(0).textContent = newRowNumber;

// Cell 2: Math
const mathCell = newRow.insertCell(1);
mathCell.textContent = math.toFixed(0); // Display as whole number
// Although not strictly needed with the cell index logic, keeping data-col for good practice/legacy support
mathCell.dataset.col = 'math';

// Cell 3: English
const englishCell = newRow.insertCell(2);
englishCell.textContent = english.toFixed(0);
englishCell.dataset.col = 'english';

// Cell 4: Average (Display the calculated average score for the row)
const averageCell = newRow.insertCell(3);
averageCell.textContent = rowAverage.toFixed(2);
averageCell.dataset.col = 'average';

// 4. Update the column averages
updateColumnAverages();

// 5. Clear inputs
mathInput.value = '';
englishInput.value = '';
});

// Initial call to calculate and display the averages for the pre-existing data when the page loads
document.addEventListener('DOMContentLoaded', updateColumnAverages);
document.addEventListener("DOMContentLoaded", function () {
    const scheduleButton = document.getElementById("schedule-button");
    const nameInput = document.getElementById("name");
    const outputDiv = document.getElementById("output");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const saveButton = document.getElementById("save-button");

    scheduleButton.addEventListener("click", function () {
        const names = nameInput.value.split(",").map(name => name.trim());
        const selectedDays = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        const tasks = ["Praying", "Reading the Bible"];
        const schedule = {};

        if (selectedDays.length === 0) {
            alert("Please select at least one day.");
            return;
        }

        if (names.length === 0) {
            alert("Please enter names.");
            return;
        }

        // Shuffle the tasks randomly
        const shuffledTasks = [...tasks].sort(() => Math.random() - 0.5);

        // Initialize the index to loop through names
        let nameIndex = 0;

        // Assign tasks to names for selected days
        selectedDays.forEach((day) => {
            schedule[day] = [];
            for (let i = 0; i < 2; i++) {
                if (nameIndex >= names.length) {
                    nameIndex = 0; // Reset the index if we run out of names
                }
                const name = names[nameIndex++];
                schedule[day].push({ name, task: shuffledTasks[i] });
            }
        });

        // Display the schedule
        let outputHTML = "<h2>Schedule:</h2>";
        for (const day of selectedDays) {
            outputHTML += `<h3>${day}</h3>`;
            for (const assignment of schedule[day]) {
                outputHTML += `<p>${assignment.name}: ${assignment.task}</p>`;
            }
        }

        outputDiv.innerHTML = outputHTML;

        // Enable the save button and create a downloadable link
        saveButton.disabled = false;
        const blob = new Blob([outputHTML], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        saveButton.href = url;
        saveButton.download = "schedule.txt";
    });

    // Save button click event (optional)
    saveButton.addEventListener("click", function () {
        // You can add additional actions here if needed
    });
});

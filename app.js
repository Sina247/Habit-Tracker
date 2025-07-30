const modal = document.getElementById("modal");
const addHabitBtn = document.getElementById("addHabitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

const saveToLocal = () => {
  localStorage.setItem("habits", JSON.stringify(habits));
};

const renderHabits = () => {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const box = document.createElement("div");
    box.className = "bg-white shadow-md p-5 rounded-xl flex flex-col gap-4 hover:shadow-lg transition duration-200";
    box.innerHTML = `
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold ${habit.completed ? "line-through text-green-500" : "text-gray-800"}">${habit.name}</h3>

        <button data-index="${index}" class="toggleComplete text-sm ${habit.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"} px-3 py-1 rounded-xl transition">${habit.completed ? "Done" : "Mark as Done"}</button>
      </div>

      <button data-index="${index}" class="deleteBtn text-sm bg-red-100 text-red-600 px-3 py-1 rounded-xl self-end">Delete</button>
    `;
    habitList.appendChild(box);
  });
};

addHabitBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "bg-black", "bg-opacity-40");
  habitInput.value = "";
});

cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "bg-black", "bg-opacity-40");
});

saveBtn.addEventListener("click", () => {
  const name = habitInput.value.trim();
  if (!name) return;
  habits.push({ name, completed: false });
  saveToLocal();
  renderHabits();
  modal.classList.add("hidden");
  modal.classList.remove("fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "bg-black", "bg-opacity-40");
});

habitList.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("deleteBtn")) {
    habits.splice(index, 1);
  }

  else if (e.target.classList.contains("toggleComplete")) {
    habits[index].completed = !habits[index].completed;
  }
  saveToLocal();
  renderHabits();
});

renderHabits();

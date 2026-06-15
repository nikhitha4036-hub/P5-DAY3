let students =
JSON.parse(localStorage.getItem("students")) || [];

/* Session Check */

if (sessionStorage.getItem("loggedIn")) {

    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    displayStudents();
}

/* Login */

function login() {

    let email =
        document.getElementById("email").value;

    let password =
        document.getElementById("password").value;

    let message =
        document.getElementById("message");

    let emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        message.innerHTML = "Invalid Email";
        message.style.color = "red";
        return;
    }

    if (password.length < 6) {

        message.innerHTML =
            "Password must be at least 6 characters";

        message.style.color = "red";
        return;
    }

    sessionStorage.setItem(
        "loggedIn",
        "true"
    );

    message.innerHTML =
        "Login Successful";

    message.style.color =
        "green";

    document.getElementById(
        "loginSection"
    ).style.display = "none";

    document.getElementById(
        "dashboard"
    ).style.display = "block";

    displayStudents();
}

/* Logout */

function logout() {

    sessionStorage.removeItem(
        "loggedIn"
    );

    location.reload();
}

/* Add Student */

function addStudent() {

    let name =
        document.getElementById(
            "studentName"
        ).value;

    let course =
        document.getElementById(
            "studentCourse"
        ).value;

    if (name === "" || course === "") {

        alert(
            "Please fill all fields"
        );

        return;
    }

    students.push({
        name: name,
        course: course
    });

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();

    document.getElementById(
        "studentName"
    ).value = "";

    document.getElementById(
        "studentCourse"
    ).value = "";
}

/* Display Students */

function displayStudents() {

    let table =
        document.getElementById(
            "studentTableBody"
        );

    table.innerHTML = "";

    students.forEach(
        (student, index) => {

            table.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>

                <button
                class="btn btn-warning btn-sm"
                onclick="editStudent(${index})">
                Edit
                </button>

                <button
                class="btn btn-danger btn-sm"
                onclick="deleteStudent(${index})">
                Delete
                </button>

                </td>
            </tr>
            `;
        }
    );
}

/* Edit Student */

function editStudent(index) {

    let newName =
        prompt(
            "Enter Name",
            students[index].name
        );

    let newCourse =
        prompt(
            "Enter Course",
            students[index].course
        );

    students[index] = {
        name: newName,
        course: newCourse
    };

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();
}

/* Delete Student */

function deleteStudent(index) {

    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();
}

/* Theme */

if (
    localStorage.getItem("theme")
    === "dark"
) {

    document.body.classList.add(
        "dark-theme"
    );
}

function toggleTheme() {

    document.body.classList.toggle(
        "dark-theme"
    );

    if (
        document.body.classList.contains(
            "dark-theme"
        )
    ) {

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        localStorage.setItem(
            "theme",
            "light"
        );
    }
}
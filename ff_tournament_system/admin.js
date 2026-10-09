/* ================= DATA ================= */

const KEY = "aayan_esports_teams";

let teams = JSON.parse(
  localStorage.getItem(KEY) || "[]"
);


/* ================= POINTS ================= */

let points = JSON.parse(
  localStorage.getItem("aayan_esports_points") || "{}"
);


/* ================= RENDER ================= */

function render() {

  document.getElementById(
    "totalTeams"
  ).textContent = teams.length;


  renderTeams();

  renderPoints();

}


/* ================= TEAM TABLE ================= */

function renderTeams() {

  const body =
    document.getElementById(
      "teamsBody"
    );


  if (teams.length === 0) {

    body.innerHTML = `
      <tr>
        <td colspan="6">
          No teams registered.
        </td>
      </tr>
    `;

    return;
  }


  body.innerHTML =
    teams.map(
      (team, index) => `

      <tr>

        <td>
          ${index + 1}
        </td>

        <td>
          <b>${esc(team.team)}</b>
        </td>

        <td>
          ${esc(team.captain)}
        </td>

        <td>
          ${esc(team.uid)}
        </td>

        <td>
          ${team.players.map(esc).join(", ")}
        </td>

        <td>

          <button
            class="edit"
            onclick="editTeam(${index})"
          >
            ✏️ Edit
          </button>

          <button
            class="delete"
            onclick="deleteTeam(${index})"
          >
            🗑️ Delete
          </button>

        </td>

      </tr>

    `
    ).join("");

}


/* ================= EDIT TEAM ================= */

function editTeam(index) {

  const team = teams[index];


  document.getElementById(
    "editIndex"
  ).value = index;


  document.getElementById(
    "editTeam"
  ).value = team.team;


  document.getElementById(
    "editCaptain"
  ).value = team.captain;


  document.getElementById(
    "editUID"
  ).value = team.uid;


  document.getElementById(
    "editContact"
  ).value = team.contact;


  document.getElementById(
    "editP1"
  ).value = team.players[0] || "";


  document.getElementById(
    "editP2"
  ).value = team.players[1] || "";


  document.getElementById(
    "editP3"
  ).value = team.players[2] || "";


  document.getElementById(
    "editP4"
  ).value = team.players[3] || "";


  document.getElementById(
    "editModal"
  ).classList.add("active");

}


/* ================= SAVE EDIT ================= */

document.getElementById(
  "editForm"
).addEventListener(
  "submit",
  function (e) {

    e.preventDefault();


    const index =
      Number(
        document.getElementById(
          "editIndex"
        ).value
      );


    teams[index] = {

      team:
        document.getElementById(
          "editTeam"
        ).value.trim(),

      captain:
        document.getElementById(
          "editCaptain"
        ).value.trim(),

      uid:
        document.getElementById(
          "editUID"
        ).value.trim(),

      contact:
        document.getElementById(
          "editContact"
        ).value.trim(),

      players: [

        document.getElementById(
          "editP1"
        ).value.trim(),

        document.getElementById(
          "editP2"
        ).value.trim(),

        document.getElementById(
          "editP3"
        ).value.trim(),

        document.getElementById(
          "editP4"
        ).value.trim()

      ]

    };


    saveTeams();

    closeModal();

    render();

  }
);


/* ================= CLOSE MODAL ================= */

function closeModal() {

  document.getElementById(
    "editModal"
  ).classList.remove("active");

}


/* ================= DELETE TEAM ================= */

function deleteTeam(index) {

  const teamName =
    teams[index].team;


  const confirmDelete =
    confirm(
      `Delete "${teamName}"?`
    );


  if (!confirmDelete) {
    return;
  }


  teams.splice(index, 1);


  saveTeams();

  render();

}


/* ================= DELETE ALL ================= */

function deleteAllTeams() {

  if (teams.length === 0) {

    alert(
      "There are no teams to delete."
    );

    return;
  }


  const confirmDelete =
    confirm(
      "Are you sure you want to delete ALL registered teams?"
    );


  if (!confirmDelete) {
    return;
  }


  teams = [];


  localStorage.removeItem(KEY);


  localStorage.removeItem(
    "aayan_esports_points"
  );


  points = {};


  render();

}


/* ================= POINTS TABLE ================= */

function renderPoints() {

  const body =
    document.getElementById(
      "pointsBody"
    );


  if (teams.length === 0) {

    body.innerHTML = `
      <tr>
        <td colspan="6">
          No teams registered.
        </td>
      </tr>
    `;

    return;
  }


  body.innerHTML =
    teams.map(
      (team, index) => {

        const data =
          points[index] || {
            placement: 0,
            kills: 0
          };


        const total =
          Number(data.placement) +
          Number(data.kills);


        return `

        <tr>

          <td>
            ${index + 1}
          </td>

          <td>
            <b>${esc(team.team)}</b>
          </td>

          <td>

            <input
              class="points-input"
              type="number"
              min="0"
              value="${data.placement}"
              id="placement-${index}"
            >

          </td>

          <td>

            <input
              class="points-input"
              type="number"
              min="0"
              value="${data.kills}"
              id="kills-${index}"
            >

          </td>

          <td>
            <b>${total}</b>
          </td>

          <td>

            <button
              class="edit"
              onclick="savePoints(${index})"
            >
              Save
            </button>

          </td>

        </tr>

        `;

      }
    ).join("");

}


/* ================= SAVE POINTS ================= */

function savePoints(index) {

  const placement =
    Number(
      document.getElementById(
        `placement-${index}`
      ).value
    );


  const kills =
    Number(
      document.getElementById(
        `kills-${index}`
      ).value
    );


  points[index] = {

    placement:
      Math.max(0, placement),

    kills:
      Math.max(0, kills)

  };


  localStorage.setItem(
    "aayan_esports_points",
    JSON.stringify(points)
  );


  renderPoints();

}


/* ================= SAVE TEAMS ================= */

function saveTeams() {

  localStorage.setItem(
    KEY,
    JSON.stringify(teams)
  );

}


/* ================= SECURITY ================= */

function esc(value) {

  return String(value).replace(
    /[&<>"']/g,
    (m) => ({

      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"

    }[m])
  );

}


/* ================= START ================= */

render();
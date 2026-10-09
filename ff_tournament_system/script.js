/* ================= TOURNAMENT DATA ================= */

const KEY = "aayan_esports_teams";

let teams = JSON.parse(
  localStorage.getItem(KEY) || "[]"
);


/* ================= REGISTRATION ================= */

const form =
  document.getElementById("registrationForm");

const msg =
  document.getElementById("formMessage");


if (form) {

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    const data = new FormData(form);

    const team = {

      team: data.get("team").trim(),

      captain: data.get("captain").trim(),

      uid: data.get("uid").trim(),

      contact: data.get("contact").trim(),

      players: [

        data.get("p1").trim(),

        data.get("p2").trim(),

        data.get("p3").trim(),

        data.get("p4").trim()

      ]

    };


    /* Duplicate team */

    if (
      teams.some(
        (t) =>
          t.team.toLowerCase() ===
          team.team.toLowerCase()
      )
    ) {

      msg.textContent =
        "This team name is already registered.";

      msg.className =
        "message error";

      return;
    }


    /* Maximum teams */

    if (teams.length >= 12) {

      msg.textContent =
        "Registration is full (12 teams).";

      msg.className =
        "message error";

      return;
    }


    /* Save team */

    teams.push(team);

    localStorage.setItem(
      KEY,
      JSON.stringify(teams)
    );


    msg.textContent =
      "Registration successful! Your team has been added.";

    msg.className =
      "message success";


    form.reset();

    render();

  });

}


/* ================= DISPLAY TEAMS ================= */

function render() {

  const teamCount =
    document.getElementById("teamCount");

  if (teamCount) {

    teamCount.textContent =
      teams.length;

  }


  const teamsBody =
    document.querySelector(
      "#teamsTable tbody"
    );


  if (teamsBody) {

    teamsBody.innerHTML =
      teams.map(
        (t) => `

        <tr>

          <td>${esc(t.team)}</td>

          <td>${esc(t.captain)}</td>

          <td>${esc(t.uid)}</td>

          <td>
            ${t.players.map(esc).join(", ")}
          </td>

        </tr>

      `
      ).join("")

      ||

      `
      <tr>
        <td colspan="4">
          No teams registered yet.
        </td>
      </tr>
      `;

  }


  /* Points table */

  const pointsBody =
    document.querySelector(
      "#pointsTable tbody"
    );


  if (pointsBody) {

    pointsBody.innerHTML =
      teams.map(
        (t, i) => `

        <tr>

          <td>${i + 1}</td>

          <td>${esc(t.team)}</td>

          <td>0</td>

          <td>0</td>

          <td><b>0</b></td>

        </tr>

      `
      ).join("")

      ||

      `
      <tr>
        <td colspan="5">
          Leaderboard will appear after teams register.
        </td>
      </tr>
      `;

  }

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


/* ================= SCROLL REVEAL ================= */

const revealElements =
  document.querySelectorAll(
    ".section-head, form, .table-wrap, .stats"
  );


const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "reveal",
              "show"
            );

            observer.unobserve(
              entry.target
            );

          }

        }
      );

    },

    {
      threshold: 0.15
    }

  );


revealElements.forEach(
  (element) => {

    element.classList.add(
      "reveal"
    );

    observer.observe(element);

  }
);


/* ================= RULE CARD ANIMATION ================= */

const ruleCards =
  document.querySelector(".cards");


if (ruleCards) {

  const ruleObserver =
    new IntersectionObserver(

      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "show"
              );

              ruleObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {
        threshold: 0.2
      }

    );


  ruleObserver.observe(
    ruleCards
  );

}


/* ================= SCROLL LINKED EFFECT ================= */

window.addEventListener(
  "scroll",
  () => {

    const scrollY =
      window.scrollY;


    /* Hero title movement */

    const heroTitle =
      document.querySelector(
        ".hero h1"
      );


    if (heroTitle) {

      heroTitle.style.transform =
        `translateY(${scrollY * 0.10}px)`;

    }


    /* Hero card movement */

    const heroCards =
      document.querySelector(
        ".hero-card"
      );


    if (heroCards) {

      heroCards.style.transform =
        `translateY(${scrollY * 0.04}px)`;

    }


    /* Rule card scroll effect */

    const cards =
      document.querySelectorAll(
        ".cards article"
      );


    cards.forEach(
      (card) => {

        const rect =
          card.getBoundingClientRect();


        const center =
          window.innerHeight / 2;


        const distance =
          rect.top - center;


        const movement =
          Math.max(
            -10,
            Math.min(
              10,
              distance * -0.025
            )
          );


        if (
          card.parentElement.classList.contains(
            "show"
          )
        ) {

          card.style.transform =
            `translateY(${movement}px)`;

        }

      }
    );

  },
  {
    passive: true
  }
);


/* ================= START ================= */

render();
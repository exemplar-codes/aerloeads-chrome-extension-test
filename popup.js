let first_name = "",
  last_name = "",
  company = "";

function githubFetch(username) {
  return fetch(`https://api.github.com/users/${username}`);
}

async function getCompany(userPromise) {
  // console.log(userPromise);
  return userPromise
    .then((_) => _.clone().json())
    .then((_) => {
      const companyValue = _.company;
      company =
        companyValue && companyValue[0] === "@"
          ? companyValue?.substr(1)
          : companyValue;
      company ||= "";
      console.log(company);
    });
}

async function getFirstAndLastNames(userPromise) {
  return userPromise
    .then((_) => _.clone().json())
    .then((_) => {
      const names = _.name.split(" ");
      if (names.length === 1) first_name = names[0];
      else {
        (first_name = names.slice(0, -1).join(" ")),
          (last_name = names[names.length - 1]);
      }

      console.log([first_name, last_name]);
    });
}

let btn = document.getElementById("getUser");

// Run on click
btn.addEventListener("click", async (event) => {
  event.preventDefault();
  const username = document.getElementsByTagName("input")[0].value;
  if (username.trim() === "") return;

  const userPromise = githubFetch(username);
  await getCompany(userPromise);
  await getFirstAndLastNames(userPromise);
  // await fetch("https://localhost:3000/users/", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: [],
  // });

  btn.textContent = "Saved";
  btn.setAttribute("disabled", true);
  setTimeout(() => {
    (btn.textContent = "Save"), btn.removeAttribute("disabled");
  }, 500);
});

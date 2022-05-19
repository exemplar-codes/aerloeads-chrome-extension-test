let first_name = "",
  last_name = "",
  company = "";

function githubFetch(username) {
  return fetch(`https://api.github.com/users/${username}`);
}

async function getCompany(userPromise) {
  return userPromise
    .then((_) => _.clone().json())
    .then((_) => {
      const companyValue = _.company;
      if (companyValue) {
        company =
          companyValue && companyValue[0] === "@"
            ? companyValue?.substr(1)
            : companyValue;
      }
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
  userPromise.then(async (response) => {
    if (response.status <= 299) {
      await getCompany(userPromise);
      await getFirstAndLastNames(userPromise);
      let postResponse = await fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          company: company,
        }),
      });
      first_name = last_name = company = ""; // reset inputs
      if (postResponse.status >= 200 && postResponse <= 299)
        btn.textContent = "Saved😃";
      else btn.textContent = "Save failed!";
    } else {
      btn.textContent = "Invalid username!";
    }
    btn.setAttribute("disabled", true);
    setTimeout(() => {
      (btn.textContent = "Save"), btn.removeAttribute("disabled");
    }, 500);
  });
});

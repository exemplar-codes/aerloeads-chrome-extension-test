// let btn = document.getElementById("getUser");
// // Run on click
// btn.addEventListener("click", async () => {
//   window.open("https://www.google.com");
// });

function linkedInFetch(username, mode = null) {
  return fetch('https://www.linkedin.com/voyager/api/identity/dash/profiles?q=memberIdentity&memberIdentity=muhammad-sanjar-afaq&decorationId=com.linkedin.voyager.dash.deco.identity.profile.TopCardSupplementary-96' ||
    `https://www.linkedin.com/voyager/api/identity/dash/profiles?q=memberIdentity&memberIdentity=${username}${
      mode
        ? ""
        : `&decorationId= com.linkedin.voyager.dash.deco.identity.profile.TopCardSupplementary-96`
    }`,
    {
      headers: {
        accept: "application/vnd.linkedin.normalized+json+2.1",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "csrf-token": "ajax:8984552914058854073",
        pragma: "no-cache",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "same-origin",
        "x-li-deco-include-micro-schema": "true",
        "x-li-lang": "en_US",
        "x-li-page-instance":
          "urn:li:page:d_flagship3_profile_view_base;mfoxiCQAS4eTep6PGjRxAw==",
        "x-li-track":
          '{"clientVersion":"1.10.4765","mpVersion":"1.10.4765","osName":"web","timezoneOffset":5.5,"timezone":"Asia/Calcutta","deviceFormFactor":"DESKTOP","mpName":"voyager-web","displayDensity":2,"displayWidth":2992,"displayHeight":1934}',
        "x-restli-protocol-version": "2.0.0",
      },
      referrer: "https://www.linkedin.com/in/muhammad-sanjar-afaq/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  );
}

async function getCompany(username) {
  return linkedInFetch(username, "work").then((mainObj) =>
    console.log(mainObj.elements[0].profileTopPosition.elements[0].companyName)
  );
}

async function getFirstAndLastNames(username) {
  return linkedInFetch(username).then((mainObj) =>
    console.log([mainObj.elements[0].firstName, mainObj.elements[0].lastName])
  );
}
let username = "muhammad-sanjar-afaq";
// await getCompany(username);
await getFirstAndLastNames(username);

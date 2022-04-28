const API_URL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);
    createUserCard(data);
    getRepos(username);
  } catch (error) {
    if (error.response.status == 404) {
      createErrorCard(" Github Profile Not Found");
    }
  }
}
async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + "/repos?sort=created");
    AddRepos(data);
  } catch (error) {
    createErrorCard("Problem occured in Searching for Repositories");
  }
}

function createUserCard(user) {
  const cardhtml = `
    <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}"class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                
                <ul>
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following} <strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repositories</strong></li>
                </ul>
                <h4>Latest  Repositories</h4>
                
                <div id="repos"></div>
            </div>
        </div>
    `;

  main.innerHTML = cardhtml;
}

function createErrorCard(message) {
  const cardhtml = `
    <div class = "card">
    <h3>${message}</h3>
    </div>
  `;
  main.innerHTML = cardhtml;
}

function AddRepos(repos) {
  const reposEL = document.getElementById("repos");
  repos.slice(0, 10).forEach((repo) => {
    const repolink = document.createElement("a");
    repolink.classList.add("repo");
    repolink.href = repo.html_url;
    repolink.target = "_blank";
    repolink.innerText = repo.name;

    reposEL.appendChild(repolink);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});

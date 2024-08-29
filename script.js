const introSectionHTML = `
  <section class="intro">
      <img
          src="https://avatars.githubusercontent.com/u/22444207"
          alt=""
      />
      <h1>Farhan Hasin Chowdhury</h1>
  </section>
  <section class="nes-container with-title">
      <h3 class="title">About me</h3>
      <p class="about">
          Software developer with a knack for learning new things
          and writing about them. I write in-depth technical articles
          and open-source handbooks.
      </p>
  </section>
  `;

const bookSectionHTML = `
  <section class="nes-container with-title">
  <h3 class="title">Books That I’m Proud Of</h3>
  <article>
    <a href="https://docker-handbook.farhan.dev/" target="_blank" rel="noopener">
      The Docker Handbook - open-source book on Docker
    </a>
  </article>
  <article>
    <a href="https://www.freecodecamp.org/news/the-kubernetes-handbook/" target="_blank" rel="noopener">
      The Kubernetes Handbook - free full-length book on Kubernetes
    </a>
  </article>
  <article>
    <a href="https://www.freecodecamp.org/news/the-nginx-handbook/" target="_blank" rel="noopener">
      The NGINX Handbook - free full-length book on NGINX
    </a>
  </article>
  <article>
    <a href="https://www.freecodecamp.org/news/how-to-install-arch-linux/" target="_blank" rel="noopener">
      The Arch Linux Handbook - free full-length book on Arch Linux
    </a>
  </article>
  </section>
  `;

document.addEventListener("DOMContentLoaded", () => {
  getFeed();
});

function getFeed() {
  const RSS_URL = `https://www.freecodecamp.org/news/author/farhanhasin/rss/`;

  fetch(RSS_URL)
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      const items = data.querySelectorAll("item");

      const filteredItems = Array.from(items).filter(
        (item) =>
          !cleanString(item.querySelector("title").innerHTML)
            .toLowerCase()
            .includes("handbook"),
      );

      let generatedHTML = ``;

      filteredItems.forEach((el) => {
        generatedHTML += `
          <article>
            <a href="${cleanString(el.querySelector("link").innerHTML)}" target="_blank" rel="noopener">
              ${cleanString(el.querySelector("title").innerHTML)}
            </a>
          </article>
        `;
      });

      const feedSectionHTML = `
        <section class="nes-container with-title">
        <h3 class="title">My freeCodeCamp Articles</h3>
        ${generatedHTML}
        </section>
        `;

      const fullHTML = `
        <div class="container">
        ${introSectionHTML}
        ${bookSectionHTML}
        ${feedSectionHTML}
        <footer>
        <a href="https://github.com/fhsinchy/">GitHub</a>
        <span> | </span>
        <a href="https://www.linkedin.com/in/farhanhasin/">LinkedIn</a>
        </footer>
        </div>
        `;

      document.body.insertAdjacentHTML("beforeend", fullHTML);
    });
}

function cleanString(inputString) {
  return inputString.replace("<![CDATA[", "").replace("]]>", "").trim();
}

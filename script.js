document.addEventListener("DOMContentLoaded", () => {
  const feedElement = document.getElementById("feed");

  // Add loader to the feed section
  const loaderHTML = `
    <div class="nes-container is-rounded is-dark" id="feed-loader">
      <p>Loading articles...</p>
    </div>
  `;
  feedElement.innerHTML = loaderHTML;

  getFeed();
});

async function getFeed() {
  const RSS_URL = `https://www.freecodecamp.org/news/author/farhanhasin/rss/`;

  try {
    const response = await fetch(RSS_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = new window.DOMParser().parseFromString(
      await response.text(),
      "text/xml",
    );

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

    document.getElementById("feed").innerHTML = feedSectionHTML;
  } catch (error) {
    console.error(error.message);
  }
}

function cleanString(inputString) {
  return inputString.replace("<![CDATA[", "").replace("]]>", "").trim();
}

const title = document.querySelector(".title > h1");
const subTitle = document.querySelector(".title > h2");
const content = document.querySelector(".content");
const date = document.querySelector(".title > div > span:first-of-type");
const author = document.querySelector(".title > div > span:last-child");

const topButton = document.querySelector("button");

topButton.onclick = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const nav = document.querySelector("nav");
const menuBar = document.querySelector(".fa-bars");
menuBar.onclick = () => {
  nav.classList.toggle("open");
};

const lis = [...document.querySelectorAll("li")];
lis.forEach(
  (li, i) =>
    (li.onclick = () => {
      fetchData(i + 1);
      nav.classList.remove("open");
    })
);

function sleep(delay) {
  return new Promise((res, rej) => setTimeout(res, delay));
}

async function fetchData(postNum, delay = true) {
  try {
    content.classList.add("blur");
    if (delay) {
      await sleep(300);
    }
    const data = await fetch(`http://localhost:3003/api/post/${postNum}`).then(
      (e) => e.json()
    );
    content.classList.add("reverse");
    setTimeout(() => {
      content.innerHTML = "";
      content.classList.remove("reverse", "blur");
      title.textContent = data.title;
      subTitle.textContent = data.subTitle;
      date.textContent = data.date;
      author.textContent = data.author;
      data.content.forEach((row) => {
        const { type } = row;
        if (type === "paragraph") {
          const p = document.createElement("p");
          p.textContent = row.content;
          content.appendChild(p);
        } else if (type === "quote") {
          const div = document.createElement("div");
          div.className = "quote";
          div.classList.add("quote");
          const p = document.createElement("p");
          p.textContent = row.content;
          div.appendChild(p);
          content.appendChild(div);
        } else if (type === "image") {
          const img = document.createElement("img");
          img.src = row.src;
          const span = document.createElement("span");
          span.classList.add("caption");
          span.textContent = row.caption;
          content.appendChild(img);
          content.appendChild(span);
        }
      });
      history.pushState(
        {
          innerHTML: content.innerHTML,
          id: postNum,
          data,
        },
        data.title,
        `/post/${postNum}`
      );
    }, 300);
  } catch (e) {
    content.classList.remove("blur");
    console.log("hi");
    console.error(e);
  }
}

window.onpopstate = (e) => {
  if (e.state) {
    const { innerHTML, data } = e.state;
    content.innerHTML = innerHTML;
    title.textContent = data.title;
    subTitle.textContent = data.subTitle;
    date.textContent = data.date;
    author.textContent = data.author;
  } else {
    history.back();
  }
};

document.querySelector("header > img").onclick = () => {
  location.href = "/";
};

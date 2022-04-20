
const nav = document.querySelector('nav')
const menuBar = document.querySelector('.fa-bars')
menuBar.onclick = () => {
  nav.classList.toggle('open')
}

const lis = [...document.querySelectorAll('li')]
lis.forEach((li, i) => li.onclick = () => {
  nav.classList.remove('open')
  location.href = '/post/' + (i + 1)
})

const article = document.querySelector('article')

fetch('http://localhost:3003/api/post/').then(e => e.json()).then(json => {
  article.innerHTML = '';
  (json || []).forEach(({ title, date, image, author, id }) => {
    const row = document.createElement('a')
    row.href = `/post/${id}`
    row.innerHTML = `
      <img src="${image}">
      <div>
        <div>
          <span>${title}</span>
        </div>
        <div>
          <span>${date}</span>
          <span>${author}</span>
        </div>
      </div>
    `
    article.appendChild(row)
  })
}).catch((e) => {
  console.error(e)
  alert('api 호출 실패')
})
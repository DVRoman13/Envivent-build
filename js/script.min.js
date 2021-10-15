
const dataUrls = {
  names: 'http://techi.envivent.com/names.json',
  descriptions: 'http://techi.envivent.com/description.json',
  imgs: 'http://techi.envivent.com/images.json',
}


const wrap = document.querySelector('.team_wrap_inner');

function getNames() {
  return axios.get(dataUrls.names);
}

function getDescriptions() {
  return axios.get(dataUrls.descriptions);
}

function getImages() {
  return axios.get(dataUrls.imgs);
}

const renderBlock = (name, position, img, description) => {
  const div = document.createElement('div');
  div.classList.add('team_wrap_member');
  div.style.backgroundImage = `url("https://techi.envivent.com/employees/${img}")`

  const innerData = ` <div class="team_wrap_member_info">
                        <div class="team_wrap_member_name">${name}</div>
                        <div class="team_wrap_member_position">${position}</div>
                    </div>
                    <div class="overlay">
                        <div class="overlay_info">
                            <div class="overlay_member_name">${name}</div>
                            <div class="overlay_member_position">${position}</div>
                            <div class="overlay_member_descr">${description}</div>
                        </div>
                    </div>`

  div.innerHTML = innerData
  return div
}

axios.all([getNames(), getDescriptions(), getImages()])
  .then(axios.spread(function (names, descr, img) {
    const concatData = concatAllData(names.data.employees, descr.data.employees, img.data.employees);
    const shuffArr = shuffleData(concatData).splice(0, 3);
    wrap.innerHTML = ''
    shuffArr.forEach((el) => {
      wrap.append(renderBlock(el.first_name, el.title, el.full, el.description))
    })
  }));

const concatAllData = (names, descr, imgs) => {
 return names.map((el) => {
   let obj = descr.find(d => el.id === d.id)
   let images = imgs.find(i => el.id === i.id)
     return {
       ...el,
       ...obj,
       ...images
     }
 })
}

function shuffleData(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

const mobileBtn = document.querySelector('.mobile_menu');
const menu = document.querySelector('.menu');

mobileBtn.addEventListener('click', function (e) {
  this.classList.toggle("change");
  menu.classList.toggle("show");
})

const yearBlock = document.querySelector('#year');
console.log(new Date().getFullYear())
yearBlock.innerHTML = new Date().getFullYear()

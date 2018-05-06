// Cats gonna be renderes inside container
const container = document.querySelector('#cat_container');
let selected = 0;
let openAdmin = false;

// Array of cards
const catDB = [
  // https://flic.kr/p/XeDnd
  { img: 'img/Cat_1.jpg', name: 'Cuddle'},
  // https://flic.kr/p/4upf98
  { img: 'img/Cat_2.jpg', name: 'Snow Flake'},
  // https://flic.kr/p/Xf1Bd
  { img: 'img/Cat_3.jpg', name: 'Shadow'},
  // https://flic.kr/p/nAjHH1
  { img: 'img/Cat_4.jpg', name: 'Garfield'},
  // https://flic.kr/p/9K5G4X
  { img: 'img/Cat_5.jpg', name: 'Sleepy'},
  // https://flic.kr/p/nAzqtb
  { img: 'img/Cat_6.jpg', name: 'Panda'},
];

class Cat {
  constructor(img, name) {
    this.img = img;
    this.name = name;
    this.counter = 0;
  }

  render(id) {
    return (`
    <div class="col-9">
      <div class="card" id="cat_pict_${id}" onclick="catClick(${id})">
        <div class="card-header">
          <h5 class="card-title">Name: ${this.name}</h5>
          <h5 class="card-title">Clicked ${this.counter} Times</h5>
        </div>
        <img class="card-img-top" src="${this.img}" alt="Cat">
      </div>
    </div>`);
  }
}

const listItem = (name, id) => {
  return (`
    <p
      onclick="listClick(${id})"
      class="list-group-item list-group-item-action ${(id === selected ? 'active' : '')}"
    >
      ${name} <span class="badge badge-secondary">${Cats[id].counter}</span>
    </p>`)
};

const listItems = (name = 'Missing Name :(', id = 0) => {
  let render = '';
  Cats.forEach((element, index) => { render = render + listItem(element.name, index); });
  return render;
};

const catList = () => {
  return (`
    <div class="col-3">
      <div class="list-group">
        ${listItems()}
    </div>
  </div>`);
};

const Render = () => {
  let render = catList();
  render = render + Cats[selected].render(selected);
  container.innerHTML = render;
};


const catClick = (id) => {
  Cats[id].counter += 1;
  Render();
};

const listClick = (id) => {
  selected = id;
  Render();
};

const Cats = catDB.map(cat => new Cat(cat.img, cat.name));
Render();

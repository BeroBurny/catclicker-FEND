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

  update(name, url, counter) {
    this.name = name;
    this.img = url;
    this.counter = parseInt(counter, 10);
  }

  render(id) {
    return (`
    <div class="col-9">
      <div class="card" id="cat_pict_${id}">
        <div class="card-header">
          <div class="row">
            <div class="col-9">
              <h5 class="card-title">Name: ${this.name}</h5>
              <h5 class="card-title">Clicked ${this.counter} Times</h5>
            </div>
            <div class="col-3 text-right">
              <button 
                type="button" 
                class="btn btn-secondary"
                onclick="adminPanel(1)"
              >
                Admin Panel
              </button>
            </div>
          </div>
        </div>
        <img class="card-img-top" src="${this.img}" alt="Cat" onclick="catClick()">
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

const adminPanelModal = () => {
  const { name, img, counter } = Cats[selected];
  return (`
  <div class="modal" style="display:block;">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Admin Panel</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-3">
              <p>Name:</p>
            </div>
            <div class="col-9 text-right">
              <input id="text" type="text" class="form-control" value="${name}">
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <p>Image:</p>
            </div>
            <div class="col-9 text-right">
              <input id="url" type="text" class="form-control" value="${img}">
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <p>Counter:</p>
            </div>
            <div class="col-9 text-right">
              <input id="counter" type="number" min="0" class="form-control" value="${counter}">
            </div>
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" onclick="saveAdminAction()">Save changes</button>
          <button type="button" class="btn btn-secondary" onclick="adminPanel(0)">Close</button>
        </div>
      </div>
    </div>
  </div>`);
};

const Render = () => {
  let render = catList();
  render = render + Cats[selected].render(selected);
  !openAdmin ? '' : render = render + adminPanelModal();
  container.innerHTML = render;
};


const catClick = () => {
  Cats[selected].counter += 1;
  Render();
};

const listClick = (id) => {
  selected = id;
  Render();
};

const adminPanel = (status) => {
  openAdmin = !!status;
  Render();
};

const saveAdminAction = () => {
  Cats[selected].update(
    document.querySelector('#text').value,
    document.querySelector('#url').value,
    document.querySelector('#counter').value,
  );
  adminPanel(0);
};

const Cats = catDB.map(cat => new Cat(cat.img, cat.name));
Render();

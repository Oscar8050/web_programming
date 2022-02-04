const srcs = [
  [
    "https://images.unsplash.com/photo-1633712134056-ffb2ea169ace?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3NHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1633706351407-49fc9a63ff9e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1633704512775-8ea2448ad56f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1633539247013-6e59a7825d86?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1633553193624-43b453873e65?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2MXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1633713577519-1fd65d6e5441?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2Mnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1633698337022-e0c45e552979?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2M3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1633532482123-e068c151963a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2N3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
  ],
  [
    "https://images.unsplash.com/photo-1633692301992-d27ca897ad65?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4N3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1633698339102-1d222f9d640e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDF8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
  ],[],[],[]
];
const albname = [
  "Album1",
  "Album2",
  "Album3",
  "Album4",
  "Album5"
];
var albums = document.querySelectorAll('ul li a');
//const addbutton = document.querySelector('#aP');
const deletebutton = document.querySelector('#dA');
const menu = document.querySelector('ul');
const addAlbum = document.querySelector('#aA');
const deleteAlbum = document.querySelector('#dA');
var addButton = document.querySelectorAll('.add');
var delButton = document.querySelectorAll('.del');

const info = document.querySelector('.info');

const galleries = document.querySelector('.galleries');
//const gallery = document.querySelector('.gallery');
const preview = document.querySelector('.preview');
var imgs;
let last;
let lastalbum = 1;
renalbum(0);


//imgs[0].classList.add("sel");




function select(){
  render(this.dataset.index);
  //console.log(this);
  //last.classList.remove("sel");
  //this.classList.add("sel");
  //console.log(this.dataset.index);
  //preview.innerHTML = `<img src="${srcs[0][this.dataset.index]}">`;
  //last = this;
}

function render(e){
  imgs[last].classList.remove("sel");
  imgs[e].classList.add("sel");
  let psum = 0;
  for (var i = 0; i < srcs.length; i++){
    psum += srcs[i].length;
  }
  info.textContent = `整體相片數：${psum}／此相簿相片數：${srcs[lastalbum-1].length}／此相片為第${parseInt(e)+1}張`;
  //console.log(this.dataset.index);
  preview.innerHTML = imgs[e].querySelector("img").outerHTML;
  last = e;
}

function chalbum(){
  if (this.dataset.index === '-1' || srcs[this.dataset.index].length === 0){
    alert('this album is empty');
    return;
  }
  renalbum(this.dataset.index);
  console.log(this.dataset.index);


}

function renalbum(e){
  albums[lastalbum].classList.remove("active");
  albums[parseInt(e)+1].classList.add("active");
  console.log(srcs[e]);
  galleries.innerHTML = srcs[e].map((src, index) => `
  <div class="gallery" data-index="${index}">
      <img src="${src}" alt="">
  </div>`).join('');
  imgs = document.querySelectorAll('.gallery');

  imgs.forEach(img => img.addEventListener('click', select));
  lastalbum = parseInt(e)+1;
  last = 0;
  render(0);
}

function addPicture(e){
  var k = prompt('輸入照片url:');
  console.log(k);
  e.stopPropagation();
  console.log(this.parentElement.dataset.index);
  srcs[this.parentElement.dataset.index].push(k);
  if (parseInt(this.parentElement.dataset.index) === lastalbum-1){
    galleries.innerHTML += `
    <div class="gallery" data-index="${srcs[this.parentElement.dataset.index].length-1}">
        <img src="${k}" alt="">
    </div>`
    imgs = document.querySelectorAll('.gallery');
    imgs.forEach(img => img.addEventListener('click', select));
  }
  renmenu();


}

function deletePicture(e) {
  console.log("aasd");
  e.stopPropagation();
  console.log(this.parentElement.dataset.index);
  srcs[this.parentElement.dataset.index].pop();
  if (parseInt(this.parentElement.dataset.index) === lastalbum-1 && srcs[lastalbum-1].length !== 0){
    //console.log("in");
    renalbum(lastalbum-1);
  }
  renmenu();
}

function addAlb(e){
  var name = prompt('輸入相簿名稱:')
  console.log(name);
  e.stopPropagation();
  albname.push(name);
  srcs.push([]);
  menu.innerHTML += `
  <li><a href="#" data-index=${albname.length-1}>${name}</a></li>
  `
  albums = document.querySelectorAll('ul li a');
  albums.forEach(album => album.addEventListener('click', chalbum));
  renmenu();
}

function delAlb(){
  albname.pop();
  srcs.pop();
  renmenu();
}

function renmenu(){
  menu.innerHTML = '<li><a href="#" data-index="-1">Home</a></li>';
  menu.innerHTML += albname.map((src, index) => `
  <li><a href="#" data-index="${index}"><img src="${srcs[`${index}`].length > 0 ? srcs[`${index}`][0] : ''}">${albname[`${index}`]}<br><button type="button" name="button" class="add">＋</button><button type="button" name="button" class="del">—</button></a></li>
  `).join('');
  albums = document.querySelectorAll('ul li a');
  addButton = document.querySelectorAll('.add');
  delButton = document.querySelectorAll('.del');
  albums.forEach(album => album.addEventListener('click', chalbum));
  addButton.forEach(ad => ad.addEventListener('click', addPicture));
  delButton.forEach(del => del.addEventListener('click', deletePicture));
  lastalbum = lastalbum < albums.length ? lastalbum : 1;
  lastalbum = srcs[lastalbum-1].length > 0 ? lastalbum : 1;
  albums[lastalbum].classList.add("active");
  renalbum(lastalbum-1);
}
renmenu();

console.log(111);

albums.forEach(album => album.addEventListener('click', chalbum));
//addbutton.addEventListener('click', addPicture);
deletebutton.addEventListener('click', deletePicture);
addAlbum.addEventListener('click', addAlb);
deleteAlbum.addEventListener('click', delAlb);

addButton.forEach(ad => ad.addEventListener('click', addPicture));
delButton.forEach(del => del.addEventListener('click', deletePicture));

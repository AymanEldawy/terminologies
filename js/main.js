// crud Terminology
const inputTitle = document.querySelector('form #title'); 
const inputDescription = document.querySelector('form #description'); 
const inputLink = document.querySelector('form #link'); 
const terminologyList = document.querySelector('.terminology-list');
const showTable = document.querySelector('.terminology-show .show-table');
const showCards = document.querySelector('.terminology-show .show-cards');
// Storage Date 
const TerminologyStore = {
  fetch : ()=>{
    const terminologies = localStorage.getItem('terminologies');
    return terminologies ? JSON.parse(terminologies) : []
  },
  save:(data)=>{
    localStorage.setItem('terminologies',JSON.stringify(data))
  }
}
const terminologies = TerminologyStore.fetch();
// 
const validInput = (e) =>{
  if(e.target.value == ''){
    e.target.classList.add('err');
  }
  else {
    e.target.classList.remove('err')
  }
}
let character = "123456789";
let alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ";
function randomSerial(word){
  let serial = '';
  for(let i = 0 ; i < word.length ; i++){
    let random = Math.floor(Math.random() * alphabet.length);
    let randomChar = Math.floor(Math.random() * character.length);
    serial += alphabet[random] + character[randomChar]
  }
  return serial;
}


function addTerminology(e){

  if(inputDescription.value !== '' && inputTitle.value !== ''){
    terminologies.push({
      id:randomSerial(inputTitle.value),
      title:inputTitle.value,
      description:inputDescription.value,
      link: inputLink.value
    });
    TerminologyStore.save(terminologies)
    inputTitle.value = ''
    inputDescription.value = ''
    inputLink.value = ''
  } else{
    inputTitle.value === '' ? inputTitle.classList.add('err') : null 
    inputDescription.value === ''  ? inputDescription.classList.add('err') : null 
  }
  TerminologyStore.save(terminologies)
  getDate()
}


function getDate(){
  let defaultContent = `
    <div class="box">
      <h4 class="title">Example Title</h4>
      <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis cupiditate, nostrum aspernatur asperiores error enim aut provident sint porro quae recusandae accusamus at maxime voluptas ducimus, voluptatibus harum animi ullam.</p>
      <a class="link" href="#">No link</a>
      <span class="delete" >delete</span>
    </div>
  `
  if(terminologies){
    let content = '';
    for(let i = 0 ; i < terminologies.length ; i++){
      content += `
      <div class="box">
        <h4 class="title">${terminologies[i].title}</h4>
        <p class="description">${terminologies[i].description}</p>
        <a class="link" href=${terminologies[i].link}>${terminologies[i].link || 'No link'}</a>
        <span class="delete" id=${terminologies[i].id}>delete</span>
      </div>
      `
    }
    TerminologyStore.save(terminologies)
    terminologyList.innerHTML = content || defaultContent
  }
}
getDate()
// Show as 

const showAs = (show) =>{
  if(show == 'cards'){
    showTable.classList.remove('active')
    showCards.classList.add('active')
  } else {
    showTable.classList.add('active')
    showCards.classList.remove('active')
  }  
  terminologyList.classList = 'terminology-list ' + show
}

showCards.onclick =() => showAs('cards')
showTable.onclick =() => showAs('table')

// Delete Terminology
const deleteTerminology = (e) => {
  const TerminologyFilter = terminologies.filter(item => {
    return item.id !== e.target.id
  })
  e.target.parentElement.classList.add('deleted')
  setTimeout(()=>{
    e.target.parentElement.style.display = 'none';
  },1000)
  TerminologyStore.save(TerminologyFilter)
}
document.querySelectorAll('.box .delete').forEach(item => {
  item.addEventListener('click',deleteTerminology)
})
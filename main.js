const loadphone=async(searchtext,datalimit)=>{

 const url=`https://openapi.programming-hero.com/api/phones?search=${searchtext}`
  const res= await fetch(url);
  const data= await res.json();
  displayphones(data.data,datalimit);
} 

const displayphones=(phones,datalimit)=>{

//    console.log(phones)

const phonecontainer= document.getElementById('phone-container')
phonecontainer.innerHTML=''
//display 20 phones only
const show=document.getElementById('show-more')

if(datalimit && phones.length>10){
phones=phones.slice(0,10);
show.classList.remove('d-none')
}

else{
  show.classList.add('d-none')
}
//display no found
const msg=document.getElementById('msg')
if(phones.length===0){
  msg.classList.remove('d-none')
}
else{
  msg.classList.add('d-none')

}
phones.forEach(phone=>{

const phonediv=document.createElement('div');

phonediv.classList.add('col')
phonediv.innerHTML=` 
<div class="card p-5">
<img src="${phone.image}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${phone.phone_name}</h5>
  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
  <button type="button" onclick="details('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Details
</button>
  </div>
</div>`;

phonecontainer.appendChild(phonediv)

});

//stop loader

togglespinner(false)

}


document.getElementById('btn-search').addEventListener('click',function(){
//start loader
togglespinner(true)
const search=document.getElementById('search-field').value;

loadphone(search,10)


});


const togglespinner=isloading=>{

const loadersection= document.getElementById('loader')
if(isloading===true){

    loadersection.classList.remove('d-none')
}

else{

  loadersection.classList.add('d-none')
}


}


function  show(){
document.getElementById('show-btn')
//start loader
togglespinner(true)
const search=document.getElementById('search-field').value;

loadphone(search)
}

var input = document.getElementById("search-field");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn-search").click();
  }
});

const details= async id=>{
  const url=`https://openapi.programming-hero.com/api/phone/${id}`
  const res= await fetch(url);
  const data= await res.json();
  displaydetails(data.data)
}


const displaydetails= phone=>{

console.log(phone)
const modaltitle=document.getElementById('exampleModalLabel');
modaltitle.innerText=phone.name

const phonedetails=document.getElementById('phone-details')

phonedetails.innerHTML=`
<p>Brand name: ${phone.brand}</p>
<p>Chipset: ${phone.mainFeatures.chipSet}</p>
<p>Display: ${phone.mainFeatures.displaySize}</p>
<p>Memory: ${phone.mainFeatures.memory}</p>

<p>Release Date: ${phone.releaseDate?phone.releaseDate:"Release date not found"}</P>

`
}


// loadphone();

function linktoPortfolio(_id){
   location = `single-portfolio.html#${_id}`

}
var firestore = firebase.firestore();

var projecShowcaseNode = $('#project-showcase')

var projectsRender= async ()=>{
  var projects = []
  var projectsArray = []
  try {
   projectsQuery = await firestore.collection('projects').get();
   var projectsArray = projectsQuery.docs;
   console.log(projectsQuery.docs[0].id)
   projectsArray.forEach((project) =>{
      projects.push({...project.data(),id:project.id})
   })
   
    projects.forEach((ele)=>{
       projecShowcaseNode.append(`
       <div class="col-lg-4 col-md-6 col-sm-6 mb-5"  >
       <div class="portfolio-block">
           <img src="${ele.demoImg}" alt="portfolio" >
 
           <div class="portfolio-content">
               <h4>${ele.name}</h4>
               <span class="work-cat">Front End Development</span>
           </div>
           <div class="overlay-content">
              
              
               <div class="click" id="${ele.id}" onclick="linktoPortfolio(this.id)">
                   <i class="fa fa-link"></i>
               </div>
           </div>
       </div>
       
   </div>
 
 
       `)
    })
  } catch (error) {
     console.log(error.message)
  }
}

projectsRender()

//contact form


var submit = document.querySelector("#submit")
var contactForm = $('#main_contact_form')
var loader = $("#loader")
var btnText = $('#text');
var succsessText = document.querySelector('#success')
$(succsessText).hide()
// console.log(succsessText)
loader.hide()
contactForm.on('submit', async(e)=>{
   
   e.preventDefault();
   btnText.hide()
   submit.disabled = true
loader.show()

   var name = document.querySelector('#name').value.trim()
var email = document.querySelector('#email').value.trim()
var subject = document.querySelector('#subject').value.trim()
var message = document.querySelector('#message').value.trim()
   var contactObj = {
      name,email,subject,message,date:new Date()
   }
   // console.log(contactObj)
try {
   await firestore.collection('contact_messages').add(contactObj);
loader.hide()
btnText.show()
submit.disabled = false
$(succsessText).show()
console.log('done');

} catch (error) {
   console.log(error.message)
}
})

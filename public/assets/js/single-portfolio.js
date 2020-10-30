var firestore = firebase.firestore();
var coverNode = document.querySelector("#cover")
var nameNode = $("#projectName")
var titleNode = $(".portfolio-title")
var catagoryNode = $("#catagory");
var descriptionNode = $("#description")
var demoImgNode = document.querySelector('#demo-img')
var liveDemoBtn = $("#live-demo")
var featuresNode = $(".project-features")
var projectInfoFetch = async ()=>{
    var p_id = location.hash.substring(1, location.hash.length);
    var projectInfo = await firestore.collection('projects').doc(p_id).get()
    // console.log(projectInfo.data());
    var data = projectInfo.data()
    console.log(data)
    coverNode.style.backgroundImage = `url(${data.coverImg})`
    nameNode.html(data.name)
    titleNode.html(data.name)
    catagoryNode.html(`Catagory: ${data.name}`)
    descriptionNode.html(data.description)
    demoImgNode.src = `${data.demoImg}`;
    liveDemoBtn.click(()=> window.open(`${data.websiteLink}`))
    data.features.forEach((text)=>{
        featuresNode.append(`<li>${text}</li>`)
    })
}
projectInfoFetch()
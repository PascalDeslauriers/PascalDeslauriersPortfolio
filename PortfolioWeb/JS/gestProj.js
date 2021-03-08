(function(){

    let projectDivs = document.getElementsByClassName("project");
    let hiddenElems = document.getElementsByClassName("PP");

    function openProjPage(){
        console.log("hello other world");
        // change content of project page here

        for (let i = 0; i < hiddenElems.length; i++) {
            if(hiddenElems[i].classList.contains('hide')){ 
                hiddenElems[i].classList.remove('hide');
            }
            else{ hiddenElems[i].classList.add('hide'); }
        }

    }
    function changeProjWindCont(projElement){
        console.log("hello world");
        document.querySelector(".projCont").firstElementChild.src = projElement.firstElementChild.style.backgroundImage.slice(4, -1).replace(/"/g, "")
        document.querySelector(".infoProj").lastElementChild.innerHTML = projElement.lastElementChild.lastElementChild.innerHTML;
        document.querySelector(".infoProj").firstElementChild.innerHTML = projElement.lastElementChild.firstElementChild.innerHTML;
    }

    for (let i = 0; i < projectDivs.length; i++) {
        projectDivs[i].addEventListener("click", function(){
            changeProjWindCont(projectDivs[i]);
            openProjPage();
        });
    }
    document.querySelector('.cover').addEventListener("click", openProjPage);
    
})();
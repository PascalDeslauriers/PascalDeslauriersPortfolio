(function(){
    document.addEventListener("DOMContentLoaded", function(){
        // Sélecteur CSS pour récupérer l'élément HTML
        let selecteur = ".title";// insert logo class or id here
        // "Multiplicateur" pour le déplacement de l'élément
        let facteur1 = 0.04;
        let facteur2 = 0.02;
        let diffX, diffY;
        let dist;
        let scale;
        let growth;
        let transform;
        let filter;
        let elements = document.querySelectorAll(selecteur);
        function offsetObjects(mouseEvent){
            if(! /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { 
                for(let i = 0; i < elements.length; i++){
                    diffX = window.innerWidth/2 - mouseEvent.pageX;
                    diffY = window.innerHeight/2 - mouseEvent.pageY;
                    dist = Math.sqrt(Math.pow((innerWidth/2 - mouseEvent.pageX),2)+Math.pow((innerHeight/2 - mouseEvent.pageY),2));
                    //dir = Math.atan2((innerWidth/2 - mouseEvent.pageX), (innerHeight/2 - mouseEvent.pageY));
                    if (window,innerWidth/2>window.innerHeight/2) growth=dist*1/(window.innerWidth/2);
                    else growth = dist*1/(innerHeight/2);
                    scale = 0.3 *growth;//*((1.2-growth)/1.2)
                    
                    transform = `
                        translateX(calc(${diffX * facteur1}px)) 
                        translateY(calc(${diffY * facteur2}px))
                        scale(${scale+0.7})
                    `;
                    if (window,innerWidth/2>window.innerHeight/2) growth=dist*7/(window.innerWidth/2);
                    else growth = dist*7/(innerHeight/2);
                    filter = `
                        drop-shadow(${diffX*25/window.innerWidth}px ${diffY*25/window.innerHeight}px ${growth}px #141516)
                    `;
                    elements[i].style.transform = transform;
                    elements[i].style.msTransform = transform;
                    elements[i].style.webkitTransform = transform;
                    elements[i].style.filter = filter;
                }
            }
            else{
                transform = `
                    translateX(calc(0px)) 
                    translateY(calc(0px))
                    scale(0.7)
                `;
                filter = `
                    drop-shadow(6px 6px 4px #141516)
                `;
            }
        }

        if(elements) {
            for(let i = 0; i < elements.length; i++){
                elements[i].style.transform = transform;
                elements[i].style.msTransform = transform;
                elements[i].style.webkitTransform = transform;
                elements[i].style.filter = filter;
            }
            document.addEventListener("mousemove", offsetObjects);
            
        }
        else console.warn(`Aucun élément répondant au sélecteur ${selecteur} n'a été trouvé.`);
    }, false);
})();
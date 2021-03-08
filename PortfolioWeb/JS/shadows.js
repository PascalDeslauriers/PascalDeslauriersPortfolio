(function(){
    document.addEventListener("DOMContentLoaded", function(){
        // Sélecteur CSS pour récupérer l'élément HTML
        let selecteur = ".shadow";// insert logo class or id here
        // "Multiplicateur" pour le déplacement de l'élément
        let diffX, diffY;
        let dist;
        let scale;
        let growth;
        let filter;
        let elements = document.querySelectorAll(selecteur);
        function offsetObjects(mouseEvent){
            for(let i = 0; i < elements.length; i++){
                diffX = window.innerWidth/2 - mouseEvent.pageX;
                diffY = window.innerHeight/2 - mouseEvent.pageY;
                dist = Math.sqrt(Math.pow((innerWidth/2 - mouseEvent.pageX),2)+Math.pow((innerHeight/2 - mouseEvent.pageY),2));
                //dir = Math.atan2((innerWidth/2 - mouseEvent.pageX), (innerHeight/2 - mouseEvent.pageY));
                scale = 0.3 *growth;//*((1.2-growth)/1.2)
                if (window,innerWidth/2>window.innerHeight/2) growth=dist*5/(window.innerWidth/2);
                else growth = dist*5/(innerHeight/2);
                filter = `
                    drop-shadow(${diffX*15/window.innerWidth}px ${diffY*15/window.innerHeight}px ${growth/2}px #141516)
                `;
                elements[i].style.filter = filter;
            }
        }

        if(elements) {
            for(let i = 0; i < elements.length; i++){
                elements[i].style.filter = filter;
            }
            document.addEventListener("mousemove", offsetObjects);
            
        }
        else console.warn(`aucuns elements avec la classe shadow ont été trouvé`);
    }, false);
})();
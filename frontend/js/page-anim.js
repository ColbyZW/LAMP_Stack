var app = (function(){
    let pages = [];
    let links = [];
    
    document.addEventListener("DOMContentLoaded", function(){
        pages = document.querySelectorAll('[data-page]');
        links = document.querySelectorAll('[data-role="link"]');
        //pages[0].className = "active";  - already done in the HTML
        [].forEach.call(links, function(link){
            link.addEventListener("click", navigate)
        });
    });
    
    function navigate(ev){
        ev.preventDefault();
        let id = ev.currentTarget.href.split("#")[1];
        [].forEach.call(pages, function(page){
           if(page.id ===id){
               page.classList.add('active');
           }else{
               page.classList.remove('active');
           } 
        });
        return false;
    }
    
    return {
        pages,
        links,
        xhr: ajax
    }
})();
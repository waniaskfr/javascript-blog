/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);    
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
    
  const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks (){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    
    titleList.innerHTML = '';   
  
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';
    
    for(let article of articles){
      console.log(article);
      
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);
    
      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  
      /* get the title from the title element */
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* insert link into titleList */
      titleList.innerHTML = titleList.innerHTML + linkHTML;
  
      /* insert link into html variable */
      html = html + linkHTML;
      console.log(html);
    }
  
    titleList.innerHTML = html;
  
    const links = document.querySelectorAll('.titles a');
  
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      console.log(article);     
      /* find tags wrapper */
      const wrapTags = article.querySelector(optArticleTagsSelector);
      console.log(wrapTags);      
      /* make html variable with empty string */
      let html = '';     
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
        /* START LOOP: for each tag */
        for(let tag of articleTagsArray){
          console.log(tag);
          /* generate HTML of the link */
          const linkHTML = '<li><a href="#tag-' + articleTags + '"><span>' + tag + '</span></a></li>';
          console.log(linkHTML);      
          /* add generated code to html variable */
         html = html + linkHTML;
         console.log(html);      
         /* END LOOP: for each tag */
        }
      /* insert HTML of all the links into the tags wrapper */
      wrapTags.innerHTML = html;
    }
    /* END LOOP: for every article: */
  }
  
  generateTags();
  
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);
    /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('.list a.active');
    /* START LOOP: for each active tag link */
      for(let tagLink of tagLinks){
        console.log(tagLink);
        /* remove class active */
        tagLink.classList.remove('active');
        /* END LOOP: for each active tag link */
      } 
    /* find all tag links with "href" attribute equal to the "href" constant */
      document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
      for(let tagLink of tagLinks){
        console.log(tagLink);
        /* add class active */
        tagLink.classList.add('active');    
        /* END LOOP: for each found tag link */
      }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
  
    /* START LOOP: for each link */
  
      /* add tagClickHandler as event listener for that link */
  
    /* END LOOP: for each link */
  }
  
  addClickListenersToTags();
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
      optArticleTagsSelector = '.post-tags .list',
      optArticleAuthorSelector = '.post-author',
      optTagsListSelector = '.tags .list',
      optCloudClassCount = '5',
      optCloudClassPrefix = 'tag-size-';

  function generateTitleLinks(customSelector = ''){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    
    titleList.innerHTML = '';   
  
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

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

  function calculateTagsParams(tags){
    const params = {
      max: 0,
      min: 999999
    }
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times ');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
    return params;
  }

  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return classNumber; 
  }

  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
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
          const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
          console.log(linkHTML);      
          /* add generated code to html variable */
          html = html + linkHTML;
          console.log(html);
          /* [NEW] check if this link is NOT already in allTags */
          if(!allTags.hasOwnProperty(tag)){
            /* [NEW] add tag to allTags object */
            allTags[tag] = 1;
          } else {
            allTags[tag]++;
          }
         /* END LOOP: for each tag */
        }
      /* insert HTML of all the links into the tags wrapper */
      wrapTags.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    /*  */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    /* [NEW] START LOOP: for each tag in allTags */
    for(let tag in allTags){
      const tagLinkHTML = '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' </a>(' + allTags[tag] + ')</li>';
      console.log('taglinkHTML:', tagLinkHTML);
      /* generate code of link and add it to allTagsHTML*/
      allTagsHTML += tagLinkHTML;
     /* END LOOP: for each tag in allTags: */
    }
    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
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
      const tagsLinksChange = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
      for(let tagLink of tagsLinksChange){
        /* add class active */
        tagLink.classList.add('active');    
        /* END LOOP: for each found tag link */
      }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for(let tagLink of tagsLinks){
      /* add tagClickHandler as event listener for that link */
        tagLink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
      }
  }
  
  addClickListenersToTags();

  function generateAuthors(){
    /*find all articles*/
    const articles = document.querySelectorAll(optArticleSelector);
      console.log(articles);
      for(let article of articles){
        console.log(article);
        /*find wrapper*/
        const wrapAuthor = article.querySelector('.post-author');
        console.log(wrapAuthor);
        /* make html variable with empty string */
        let html = '';
        /* get authors from data-author*/
        const authors = article.getAttribute('data-author');
        console.log(authors);
        /*generate  html of the link*/
        const linkHTML = '<li><a href="#author-' + authors + '"><span>' + authors + '</span></a></li>';
        console.log(linkHTML);
        /* add generated code to html variable */
        html = html + linkHTML;
        console.log(html);      
        /* insert HTML of all the links into the author wrapper */
        wrapAuthor.innerHTML = html;
        /* END LOOP: for each tag */
      }
  }
      generateAuthors();

  function authorClickHandler(){
      /* prevent default action for this event */
      event.preventDefault();
      /* make new constant named "clickedElement" and give it the value of "this" */
      const clickedElement = this;
      console.log('Link was clicked!');
      console.log(event);
      /* make a new constant "href" and read the attribute "href" of the clicked element */
      const href = clickedElement.getAttribute('href');
      console.log(href);
      /* make a new constant "author" and extract author from the "href" constant */ //tag change to author
      const author = href.replace('#author-', '');
      console.log(author);
      /* find all author links with class active */
      const authorLinks = document.querySelectorAll('.post-author a.active');
      /* START LOOP: for each active author link */
      for(let authorLink of authorLinks){
        console.log(authorLink);
        /* remove class active */
        authorLink.classList.remove('active');
        /* END LOOP: for each active author link */
      } 
      /* find all author links with "href" attribute equal to the "href" constant */
      const authorsLinksChange = document.querySelectorAll('a[href="' + href + '"]');
      /* START LOOP: for each found tag link */
      for(let authorLink of authorsLinksChange){
        /* add class active */
        authorLink.classList.add('active');    
        /* END LOOP: for each found tag link */
      }
      /* execute function "generateTitleLinks" with article selector as argument */
      generateTitleLinks('[data-author="' + author + '"]');
  }
  
    function addClickListenersToAuthors(){
    /* find all links to authors */
    const authorsLinks = document.querySelectorAll('a[href^="#author-"]');
    /* START LOOP: for each link */
    for(let authorLink of authorsLinks){
      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }

  }
    addClickListenersToAuthors();

       
  
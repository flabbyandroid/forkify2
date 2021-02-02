
/*
//**********************cara2 export  //////////////
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const ID = 23;

//************************  ennnddddd /////////////////// 
*/

import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};

// 'pasta with tomato and spinach
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, current) => {
            if (acc + current.length <= limit) {
                newTitle.push(current);
            }
            return acc + current.length;
        }, 0);

        //return the result
        return `${newTitle.join(' ')} ...`;
    } 
    return title;
};


const renderRecipe = recipe => {
    const markup = `
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
        `;
    elements.searchResList.insertAdjacentHTML('beforeEnd', markup);
};

const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${type == 'prev' ? 'left' : 'right'}"></use>
</svg>
</button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    // Math.ceil round the result to the next integer
    const pages = Math.ceil(numResults / resPerPage);

    let button;

    if (page === 1 && pages > 1) {
        // button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // both previous and next button page
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // only butoon go to previous page button
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page =1, resPerPage = 10) => {
    // render results of current page
    // console.log(recipes);
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render the pagination button with the page 
    renderButtons(page, recipes.length, resPerPage);
    
};










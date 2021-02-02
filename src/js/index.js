// Global app controller
// import axios from 'axios';

/*
//************** learn 3 cara import  ////////////////

// import num from './test';
// const x = 23;
// console.log(`I imported ${num} from another module! called test.js Variable x is ${x}`); // this in index 6

import str from './models/Search'; // import module x yah specify .js file
// import {add as a, multiply as m, ID} from './views/searchView';
import * as searchView from './views/searchView';
// console.log(`Using imported functions! ${a(ID, 2)} and ${m(3,5)}. ${str}`);
console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3,5)}. ${str}`);

//**********                end       ///////////////////          
*/

// https://food2fork.ca/api/recipe/search/?page=2&query=beef carrot potato onion
// https://forkify-api.herokuapp.com/api/search

// async function getResults(query) {
//     const proxy = 'https://cors-anywhere.herokuapp.com/';
//     // const key = '9c8b06d329136da358c2d00e76946b0111ce2c48';
//     // const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/search?q=${query}`);
//     try {
//     const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
//     // const res = await axios(`${proxy}https://food2fork.ca/api/recipe/search/?page=2&key=${key}&query=${query}`);
//     const recipes = res.data.recipes;
//     console.log(recipes);
//     } catch (error){
//         alert(error);
//     }
// }
// getResults('beef');


// all event listener in the index.js file

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
/** Global state of the app
 * -Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};


/**
 * Search controller
 */

const controlSearch = async () => {
    // 1) Get query from view

    const query = searchView.getInput();
    // const query = 'pizza';
    // console.log(query);

    if (query) {
        // 2) new search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) render results on UI
            // console.log(state.search.result)
            clearLoader();
            searchView.renderResults(state.search.result);
            

        } catch (err) {
            alert('Something wrong with the search..');
            clearLoader();
        }
    }
}

// document.querySelector('.search').addEventListener('submit', e => {
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// const search = new Search('pizza');
// console.log(search);
// search.getResults();

// TESTINGG  ---  fooorrr testingg
// window.addEventListener('load', e => { // for testing
//     e.preventDefault();
//     controlSearch();
// });

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    // console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        // convert page string to int, with base 10
        searchView.renderResults(state.search.result, goToPage);
        // console.log(goToPage);
    }
});


/**
 * Recipe controller
 */
//window means that the whole program
const controlRecipe = async () => {
    // Get ID from URL
    const id = window.location.hash.replace('#', ''); // change # into nothing, so get plain number strings
    console.log(id);

    if (id) {
        //prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        //create new recipe object
        state.recipe = new Recipe(id);

        // //TESTINGGG--TEESSTTT--- (WINDOW MENGGLOBALKAN BENDE2 Y X BOLEH AKSESS OLEH ORG2 LAINNMM)
        // window.r = state.recipe; // TESTINGGG

        try{
                    //get recipe data and parse ingredient
        await state.recipe.getRecipe();
        console.log(state.recipe.ingredients);
        state.recipe.parseIngredients();

        // calc servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        // render recipe
        // console.log(state.recipe);
        clearLoader();
        recipeView.renderRecipe(state.recipe);


        } catch (err) {
            alert('Error Processing recipe!');
        }
    }
};


// const r = new Recipe(46956);
// r.getRecipe();
// console.log(r);

// window.addEventListener('hashchange', controlRecipe);//event listener for any hashchange
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
  
// handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *' )) { // ((.btn-decrease * ))means any child of the class mathces decrease
        // decrease bitton is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
        
    } else if (e.target.matches('.btn-increase, .btn-increase *' )) {
        // increase bitton is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } 
    console.log(state.recipe);

});
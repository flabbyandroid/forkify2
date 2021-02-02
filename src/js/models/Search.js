// export default 'I am an exported string.';
import axios from 'axios';
import { proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        // const proxy = 'https://cors-anywhere.herokuapp.com/'; // use this
        // const key = '9c8b06d329136da358c2d00e76946b0111ce2c48';
        // const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/search?q=${query}`);
        try {
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
        // const res = await axios(`${proxy}https://food2fork.ca/api/recipe/search/?page=2&key=${key}&query=${query}`);
        // console.log(res);
        this.result = res.data.recipes;
        // console.log(this.result);
        } catch (error){
            alert(error);
        }
    }
}


// 9c8b06d329136da358c2d00e76946b0111ce2c48
// https://food2fork.ca/api/recipe/search/?page=2&query=beef carrot potato onion
// https://forkify-api.herokuapp.com/api/search

// async function getResults(query) {
//     const proxy = 'https://cors-anywhere.herokuapp.com/';
//     const key = '9c8b06d329136da358c2d00e76946b0111ce2c48';
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


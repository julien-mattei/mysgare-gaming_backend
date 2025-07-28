import { Genre, Game } from "../models/associations.js";

export async function fetchGenres() {
    const genres = await Genre.findAll({
        order: [['id', 'ASC']]  
    });
    return genres
};

export async function createGenre(name) {
    const genre = await Genre.findOrCreate({
        name : name
    });
    return genre
};

export async function deleteGenre(id){
    
}
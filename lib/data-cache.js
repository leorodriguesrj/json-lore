const CACHE_PATH = process.env.LORE_DATA_PATH || '/var/lib/json-lore';

const path = require('path');
const fs = require('fs');

function makeHandlerForReadDir(resolve, reject) {
    return function handleRead(error, items) {
        if (error) {
            reject(error);
        } else {
            resolve(items);
        }
    };
}

function loadAllNames(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, makeHandlerForReadDir(resolve, reject));
    });
}



function makePath(id) {
    return path.join(CACHE_PATH, 'schemas', id);
}

function loadById(id) {
    const path = `${makePath(id)}.json`;
    return require(path);
}

async function loadAll() {
    const names = await loadAllNames(CACHE_PATH);
    return names.map(n => require(path.join(CACHE_PATH, n)));
}

function save(id, schema) {
    return new Promise((resolve, reject) => {
        fs.writeFile(makePath(id), schema, error => {
            if (error) return reject(error);
            resolve();
        });
    });
}

function exists(id) {
    return new Promise(resolve => fs.exists(makePath(id), resolve));
}

module.exports = {loadAll, loadById, exists, save};
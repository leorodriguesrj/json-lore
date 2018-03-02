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

function makePath(id) {
    return `${path.join(CACHE_PATH, id)}.json`;
}

function loadAllNames(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, makeHandlerForReadDir(resolve, reject));
    });
}

async function loadById(id) {
    return require(makePath(id));
}

async function loadAll() {
    const names = await loadAllNames(CACHE_PATH);
    return names.map(n => require(path.join(CACHE_PATH, n)));
}

function save(id, schema) {
    return new Promise((resolve, reject) => {
        const fileContent = JSON.stringify(schema);
        fs.writeFile(makePath(id), fileContent, error => {
            if (error) return reject(error);
            resolve();
        });
    });
}

function exists(id) {
    return new Promise(resolve => fs.exists(makePath(id), resolve));
}

module.exports = {loadAll, loadById, exists, save};
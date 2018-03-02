const CACHE_PATH = process.env.LORE_DATA_PATH || '/var/lib/json-lore';

const path = require('path');
const fs = require('fs');

function makePath(id) {
    return `${path.join(CACHE_PATH, id)}.json`;
}

function makeHandlerForReadDir(resolve, reject) {
    return function handleRead(error, items) {
        if (error) {
            reject(error);
        } else {
            resolve(items);
        }
    };
}

function makeHandlerForReadFile(resolve, reject, processData) {
    return function handleRead(error, data) {
        if (error) {
            reject(error);
        } else {
            resolve(processData(data));
        }
    }
}

function loadFromPath(path) {
    const toObject = jsonString => JSON.parse(jsonString);
    return new Promise((resolve, reject) => {
        fs.readFile(path, makeHandlerForReadFile(resolve, reject, toObject));
    });
}

function loadAllNames(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, makeHandlerForReadDir(resolve, reject));
    });
}

function loadById(id) {
    return loadFromPath(makePath(id));
}

async function loadAll() {
    const names = await loadAllNames(CACHE_PATH);
    const promises = names.map(n => loadFromPath(path.join(CACHE_PATH, n)));
    return await Promise.all(promises);
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
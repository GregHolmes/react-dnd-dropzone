import microevent from 'microevent';
import { addFile } from './requests';

var store = {
    photo: [
        { id: 1, text: "Item 1", category: "photo", image: "web/images/Smiley.svg.png", enabled: true },
        { id: 2, text: "Item 2", category: "photo", image: "web/images/Smiley.svg.png", enabled: true },
        { id: 3, text: "Item 3", category: "photo", image: "web/images/Smiley.svg.png", enabled: true },
        { id: 4, text: "Item 7", category: "photo", image: "web/images/Smiley.svg.png", enabled: true },
        { id: 5, text: "Item 8", category: "photo", image: "web/images/Smiley.svg.png", enabled: true },
        { id: 6, text: "Item 9", category: "photo", image: "web/images/Smiley.svg.png", enabled: true },
        { id: 7, text: "Item 10", category: "photo", image: "web/images/Smiley.svg.png", enabled: true },
        { id: 8, text: "Item 11", category: "photo", image: "web/images/Smiley.svg.png", enabled: true },
        { id: 9, text: "Item 12", category: "photo", image: "web/images/Smiley.svg.png", enabled: true },
        { id: 10, text: "Item 13", category: "photo", image: "web/images/Smiley.svg.png", enabled: true },
        { id: 11, text: "Item 4", category: "photo", image: "web/images/Smiley.svg.png", enabled: false },
        { id: 12, text: "Item 5", category: "photo", image: "web/images/Smiley.svg.png", enabled: false },
        { id: 13, text: "Item 6", category: "photo", image: "web/images/Smiley.svg.png", enabled: false }
    ]
}

microevent.mixin(store);

function updateFile(fileId, updateElements, category) {
    for (var i in store[category]) {
        if (store[category][i].id === fileId) {
            store[category][i] = Object.assign(store[category][i], updateElements);
        }
    }

    store.trigger('update');
}

// Adding file to specific list.
function pushFile(file, category) {
    store[category].push(file);
    store.trigger('update');
}

// Moving files within same section to a new position.
function moveFile(dragIndex, hoverIndex, category) {
    const dragFile = store[category][dragIndex];

    store[category].splice(dragIndex, 1);
    store[category].splice(hoverIndex, 0, dragFile);
    store[category].map(function(el) {
        return el.id;
    });

    store.trigger('update');
}

function createDropFunction(category) {
    return function(acceptedFiles) {
        acceptedFiles.forEach(function(val, prop) {
            addFile(val.name, true, category);
        });
    }
}

export { updateFile, pushFile, moveFile, store, createDropFunction };

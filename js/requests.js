import { pushFile, store } from './fileManagement';

function addFile(response, enabled, category) {
    pushFile(
        {
            id: store[category].length + 1,
            image: 'web/images/' + response,
            enabled: enabled,
            category: category
        },
        category: category
    )
}

export { addFile };

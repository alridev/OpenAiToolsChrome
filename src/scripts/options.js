document.getElementById('save-settings').addEventListener('click', () => {
    let apiToken = document.getElementById('api-token').value
    let model = document.getElementById('model').value
    let prompt = document.getElementById('prompt').value

    chrome.storage.sync.set({
        apiToken: apiToken,
        model: model,
        prompt: prompt
    }, () => {
        alert('Settings saved')
    })
})

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['apiToken', 'model', 'prompt'], (items) => {
        document.getElementById('api-token').value = items.apiToken || ''
        document.getElementById('model').value = items.model || 'gpt-3.5-turbo'
        document.getElementById('prompt').value = items.prompt || ''
    })
})
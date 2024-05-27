chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'extractSummary',
        title: 'Extract Summary',
        contexts: ['selection']
    })

    chrome.contextMenus.create({
        id: 'solveProblem',
        title: 'Solve Problem',
        contexts: ['selection']
    })

    chrome.contextMenus.create({
        id: 'describeImage',
        title: 'Describe Image',
        contexts: ['image']
    })

    chrome.contextMenus.create({
        id: 'generateCode',
        title: 'Generate Code',
        contexts: ['selection']
    })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (chrome.scripting) {
        if (info.menuItemId === 'extractSummary') {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: function (text) {
                    window.extractSummary(text)
                },
                args: [info.selectionText]
            })
        } else if (info.menuItemId === 'solveProblem') {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: function (text) {
                    window.solveProblem(text)
                },
                args: [info.selectionText]
            })
        } else if (info.menuItemId === 'describeImage') {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: function (url) {
                    window.describeImage(url)
                },
                args: [info.srcUrl]
            })
        } else if (info.menuItemId === 'generateCode') {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: function (text) {
                    window.generateCode(text)
                },
                args: [info.selectionText]
            })
        }
    } else {
        console.error("chrome.scripting API is not available.")
    }
})

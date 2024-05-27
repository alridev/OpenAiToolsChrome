document.getElementById('ask-question').addEventListener('click', () => {
    if (chrome.scripting) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let activeTab = tabs[0]
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: askQuestion
            })
        })
    } else {
        console.error("chrome.scripting API is not available.")
    }
})

document.getElementById('extract-summary').addEventListener('click', () => {
    if (chrome.scripting) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let activeTab = tabs[0]
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: extractSummary
            })
        })
    } else {
        console.error("chrome.scripting API is not available.")
    }
})

document.getElementById('generate-code').addEventListener('click', () => {
    if (chrome.scripting) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let activeTab = tabs[0]
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: generateCode
            })
        })
    } else {
        console.error("chrome.scripting API is not available.")
    }
})

document.getElementById('solve-problem').addEventListener('click', () => {
    if (chrome.scripting) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let activeTab = tabs[0]
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: solveProblem
            })
        })
    } else {
        console.error("chrome.scripting API is not available.")
    }
})

document.getElementById('describe-image').addEventListener('click', () => {
    if (chrome.scripting) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let activeTab = tabs[0]
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: describeImage
            })
        })
    } else {
        console.error("chrome.scripting API is not available.")
    }
})

document.getElementById('settings').addEventListener('click', () => {
    chrome.runtime.openOptionsPage()
})

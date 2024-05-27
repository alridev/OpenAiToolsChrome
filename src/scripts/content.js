function askQuestion() {
    let question = prompt('Enter your question:')
    if (question) {
        callOpenAI(question)
    }
}

function extractSummary(selectedText) {
    let prompt = `Extract a summary from the following text: ${selectedText}`
    callOpenAI(prompt)
}

function solveProblem(selectedText) {
    let prompt = `Solve the following problem or answer the question: ${selectedText}`
    callOpenAI(prompt)
}

function describeImage(imageUrl) {
    let prompt = `Describe the content of the image at this URL: ${imageUrl}`
    callOpenAI(prompt)
}

function generateCode(selectedText) {
    let prompt = `Generate code based on the following description: ${selectedText}`
    callOpenAI(prompt)
}

function callOpenAI(prompt) {
    chrome.storage.sync.get(['apiToken', 'model'], (items) => {
        let apiToken = items.apiToken
        let model = items.model
        let isChatModel = model.startsWith('gpt-4') || model.startsWith('gpt-3.5-turbo')
        let url = isChatModel ? 'https://api.openai.com/v1/chat/completions' : 'https://api.openai.com/v1/completions'

        let body = isChatModel ? {
            model: model,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 100
        } : {
            model: model,
            prompt: prompt,
            max_tokens: 100
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiToken
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    showModal(`Error: ${data.error.message}`)
                } else {
                    let text = isChatModel ? data.choices[0].message.content : data.choices[0].text
                    showModal(text.trim())
                }
            })
            .catch(error => {
                showModal(`Error: ${error.message}`)
                console.error('Error:', error)
            })
    })
}

function showModal(content) {
    let modal = document.createElement('div')
    modal.id = 'openai-modal'
    modal.innerHTML = `
        <div class="openai-modal-content">
            <span class="openai-modal-close">&times;</span>
            <pre>${content}</pre>
        </div>
    `
    document.body.appendChild(modal)

    let modalContent = modal.querySelector('.openai-modal-content')
    let closeBtn = modal.querySelector('.openai-modal-close')

    closeBtn.onclick = () => {
        document.body.removeChild(modal)
    }

    modalContent.onmousedown = function (event) {
        let shiftX = event.clientX - modalContent.getBoundingClientRect().left
        let shiftY = event.clientY - modalContent.getBoundingClientRect().top

        function moveAt(pageX, pageY) {
            modalContent.style.left = pageX - shiftX + 'px'
            modalContent.style.top = pageY - shiftY + 'px'
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY)
        }

        document.addEventListener('mousemove', onMouseMove)

        modalContent.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove)
            modalContent.onmouseup = null
        }
    }

    modalContent.ondragstart = function () {
        return false
    }
}

// Экспортируем функции, чтобы они были доступны для chrome.scripting.executeScript
window.askQuestion = askQuestion
window.extractSummary = extractSummary
window.solveProblem = solveProblem
window.describeImage = describeImage
window.generateCode = generateCode
window.callOpenAI = callOpenAI
window.showModal = showModal

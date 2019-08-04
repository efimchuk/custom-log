(async () => {

let delayOfHiding = 5000;
let maxLogMessageCount = 5;
let verticalPosition = 0; // bottom - 0, top - 1
let horizontalPosition = 0; // right - 1, left - 1

function removeLogMessage(messageDiv){
    messageDiv.style.opacity = 0;
    setTimeout((messageDiv) => {
        messageDiv.remove();
    }, 1000, messageDiv);
}

function generateRandomString(a){for(var b="",c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",d=0;d<a;d++)b+=c.charAt(Math.floor(Math.random()*c.length));return b}

let logContainerId = generateRandomString(10);
while(document.getElementById(logContainerId) !== null){
    logContainerId = generateRandomString(10);
}

let messageDivClass = generateRandomString(10);
while(document.getElementsByClassName(messageDivClass).length){
    messageDivClass = generateRandomString(10);
}

let messageTextClass = generateRandomString(10);
while(document.getElementsByClassName(messageTextClass).length){
    messageTextClass = generateRandomString(10);
}

let messageCloseButtonClass = generateRandomString(10);
while(document.getElementsByClassName(messageCloseButtonClass).length){
    messageCloseButtonClass = generateRandomString(10);
}

let Styles = document.createElement('style');
    Styles.id = 'custom-log-styles';
    Styles.innerHTML = 
    `#${logContainerId}{position:fixed;z-index:999;${verticalPosition === 0 ? 'bottom:0' : 'top:0'};`+
    `${horizontalPosition === 0 ? 'right: 0' : 'left: 0'};min-width:350px;max-width:400px;}`+
    `.${messageDivClass}{position:relative;margin:10px;background-color:#fff;box-shadow:0 0 3px #000;border-radius:2px;transition:all 1s ease-out 0s;opacity:1}`+
    `.${messageDivClass}:hover{background-color:#eee}`+
    `.${messageTextClass}{padding:10px;word-wrap:break-word;padding-right:36px}`+
    `.${messageCloseButtonClass}{position:absolute;top:0;right:0;display:inline-block;padding:5px;line-height:16.6px;font-size:29px;height:100%}`+
    `.${messageCloseButtonClass}:hover{text-shadow:0 0 2px #000;cursor:pointer}`;

document
    .getElementsByTagName('head')[0]
    .appendChild(Styles);

async function Log(message){
    /* 
    <div class="message-div">
        <div class="message-text message-div-element">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        <div class="close-message-button message-div-element">&times</div>
    </div>
    */

    // If it is first call
    let logContainer = document.getElementById(logContainerId);
    if(logContainer === null){

        logContainer = document.createElement('div');
        logContainer.id = logContainerId;
        document
            .getElementsByTagName('body')[0]
            .appendChild(logContainer);
    }

    let messageDiv = document.createElement('div');
        messageDiv.classList.add(messageDivClass);
    
    let messageText = document.createElement('div');
        messageText.classList.add(messageTextClass);
        messageText.innerText = message;

    let messageCloseButton = document.createElement('div');
        messageCloseButton.classList.add(messageCloseButtonClass);
        messageCloseButton.innerText = `×`;
        messageCloseButton.onclick = (event) => {
            removeLogMessage(event.target.parentNode);
        };

    setTimeout(removeLogMessage, delayOfHiding, messageDiv);
        

    messageDiv.appendChild(messageText);
    messageDiv.appendChild(messageCloseButton);

    let logMessages = Array.from(logContainer.getElementsByClassName(`${messageDivClass}`));

    if(maxLogMessageCount){
        if(logMessages.length < maxLogMessageCount){

            if(verticalPosition){
                logContainer.insertBefore(messageDiv, logMessages[0]);
            }else{
                logContainer.appendChild(messageDiv);
            }
        } else {
            if(verticalPosition){
                logContainer.removeChild(logMessages[logMessages.length - 1]);
                logContainer.insertBefore(messageDiv, logMessages[0])
            } else {
                logContainer.removeChild(logMessages[0]);
                logContainer.appendChild(messageDiv);
            }
        }
    }else{
        if(verticalPosition){
            logContainer.insertBefore(messageDiv, logMessages[0])
        }else{
            logContainer.appendChild(messageDiv);
        }
    }
}

console.log = Log;

})();
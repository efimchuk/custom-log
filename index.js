document.getElementById('alert').onclick = async function (event){
    console.log('ALERT');
}

document.getElementById('confirm').onclick = async function (event){
    console.log(`CONFIRM`);
}

document.getElementById('prompt').onclick = async function (event){
    console.log(`PROMPT`);
}

Array
    .from(document.getElementsByClassName('close-message-button'))
    .forEach((element, index, array) => {
        element.onclick = removeLogMessage;
    })
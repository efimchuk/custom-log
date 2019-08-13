document.getElementById('Error').onclick = async function (event){
    console.error('Error');
}

document.getElementById('Log').onclick = async function (event){
    console.log(`Log`);
}

document.getElementById('Warning').onclick = async function (event){
    console.warn(`Warning`);
}

document.getElementById('Info').onclick = async function (event){
    console.info(`Info`);
}

Array
    .from(document.getElementsByClassName('close-message-button'))
    .forEach((element, index, array) => {
        element.onclick = removeLogMessage;
    })
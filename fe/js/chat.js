async function addMessage() {
    const msgInput = document.querySelector("#chat-outgoing-msg");

    const chat = {
        sender: "ssar",
        receiver: "cos",
        msg: msgInput.value
    };
    msgInput.value = "";
    
    await fetch("http://localhost:8080/chat", {
        method: "post",
        body: JSON.stringify(chat),
        headers: {
            "Content-Type": "application/JSON; charset=utf-8"
        }
    });
    
}

document.querySelector("#chat-send").addEventListener("click", ()=>{
    addMessage();
})

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e)=>{
    if(e.keyCode === 13){
        addMessage();
    }
})

function getSendMsgBox(msg, time){
    return `<div class="sent_msg">
    <p>${msg}</p>
    <span class="time_date"> ${time}</span>
  </div>`;
}

function initMessage(data){
    const year = data.createdAt.substring(0, 5);
    const md = data.createdAt.substring(5, 10);
    const tm = data.createdAt.substring(11, 16);
    const convertTime = tm + " | " + year + md;

    const chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";
    chatOutgoingBox.innerHTML = getSendMsgBox(data.msg, convertTime);

    const chatBox = document.querySelector("#chat-box");
    chatBox.append(chatOutgoingBox);
}

const eventSource = new EventSource("http://localhost:8080/sender/ssar/receiver/cos");
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    initMessage(data);
}

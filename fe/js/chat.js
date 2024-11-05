let username = prompt("아이디를 입력하세요: ");
let roomNum = prompt("채팅방 번호를 입력 하세요: ")

document.querySelector("#userName").innerHTML = username;
document.querySelector("#roomNum").innerHTML = roomNum;

const eventSource = new EventSource(`http://localhost:8080/chat/roomNum/${roomNum}`);
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if(data.sender === username){ //로그인 유저시 파란박스
        initMyMessage(data);
    } else {
        initYourMessage(data);//다른 유저 회색박스
    }
}

function initMyMessage(data){
    const chatBox = document.querySelector("#chat-box");

    const chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";

    chatOutgoingBox.innerHTML = getSendMsgBox(data);
    chatBox.append(chatOutgoingBox);

    document.documentElement.scrollTop=document.body.scrollHeight;
}

function initYourMessage(data){
    let chatBox = document.querySelector("#chat-box");

    let receivedBox = document.createElement("div");
    receivedBox.className = "received_msg";

    receivedBox.innerHTML = getReceiveMsgBox(data);
    chatBox.append(receivedBox);

    document.documentElement.scrollTop=document.body.scrollHeight;
}

function getSendMsgBox(data){
    return `<div class="sent_msg">
    <p>${data.msg}</p>
    <span class="time_date"> ${getConvertTime(data.createdAt)}</span>
  </div>`;
}

function getReceiveMsgBox(data){  
    return `<div class="received_withd_msg">
    <p>${data.msg}</p>
    <span class="time_date"> ${getConvertTime(data.createdAt)}/<b>${data.sender}</b></span>
  </div>`;
}

function getConvertTime(time) {
    const year = time.substring(0, 5);
    const md = time.substring(5, 10);
    const tm = time.substring(11, 16);
    return tm + " | " + year + md;
}


async function addMessage() {
    const msgInput = document.querySelector("#chat-outgoing-msg");

    const chat = {
        sender: username,
        roomNum: roomNum,
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

let chats = {};
let currentChat = "Chat 1";

function loadChat(name){
    currentChat=name;
    if(!chats[name]) chats[name]=[];
    document.getElementById("chat").innerHTML="";
    chats[name].forEach(m=>{
        addMessage(m.text,m.type,false);
    });
    updateActiveChat();
    document.getElementById("chatHeader").innerText=name;
}

function updateActiveChat(){
    const list=document.getElementById("chatList").children;
    for(let div of list){
        div.classList.remove("active");
        if(div.innerText===currentChat) div.classList.add("active");
    }
}

function addMessage(text,type,save=true){
    const chat=document.getElementById("chat");
    const msg=document.createElement("div");
    msg.classList.add("message",type);
    msg.innerText=text;
    chat.appendChild(msg);
    chat.scrollTop=chat.scrollHeight;
    if(save) chats[currentChat].push({text,type});
}

function sendMessage(){
    const input=document.getElementById("input");
    const message=input.value.trim();
    if(!message) return;
    addMessage(message,"user");
    input.value="";
    showTypingEffect();
    setTimeout(()=>{
        const reply=generateReply(message.toLowerCase());
        hideTypingEffect();
        addMessage(reply,"bot");
    },2000);
}

function generateReply(msg){
    if(msg.includes("hello")||msg.includes("hi")) return "Hello! Main DetoxGPT hoon. Batao kya help chahiye.";
    if(msg.includes("discord") && msg.includes("channel")) return "Discord channels example:\nINFORMATION: #rules #announcements\nGENERAL: #general-chat #media\nVOICE: 🔊 General VC 🔊 Gaming VC";
    if(msg.includes("html")) return "HTML structure ka skeleton. Main template bana ke de sakta hoon.";
    if(msg.includes("server name")||msg.includes("name")) return "Server names examples:\n- Void Lounge\n- DarkNest\n- Orange Realm\n- Toxic Hub";
    if(msg.includes("time")) return "Abhi ka time hai: "+new Date().toLocaleTimeString();
    if(msg.includes("help")) return "Main choti moti help kar sakta hoon. Specific batao.";
    return "Samajh gaya, aur detail me batao taake main sahi help kar saku.";
}

function showTypingEffect(){
    const chat=document.getElementById("chat");
    const typing=document.createElement("div");
    typing.classList.add("message","bot");
    typing.id="typing";
    typing.innerText="...";
    chat.appendChild(typing);
    chat.scrollTop=chat.scrollHeight;
}

function hideTypingEffect(){
    const typing=document.getElementById("typing");
    if(typing) typing.remove();
}

document.getElementById("input").addEventListener("keypress",e=>{
    if(e.key==="Enter") sendMessage();
});

// Hamburger toggle
document.getElementById("hamburger").addEventListener("click",()=>{
    document.getElementById("sidebar").classList.toggle("hide");
});

// New chat
document.getElementById("newChat").addEventListener("click",()=>{
    const name=prompt("Enter chat name:");
    if(!name) return;
    const div=document.createElement("div");
    div.innerText=name;
    div.addEventListener("click",()=>loadChat(name));
    document.getElementById("chatList").appendChild(div);
    loadChat(name);
});

// Initial setup
(function(){
    const div=document.createElement("div");
    div.innerText="Chat 1";
    div.classList.add("active");
    div.addEventListener("click",()=>loadChat("Chat 1"));
    document.getElementById("chatList").appendChild(div);
    loadChat("Chat 1");
})();
// Optional: auto-save chats in localStorage (refresh ke baad bhi rahen)
function saveChats(){
    localStorage.setItem("detoxGPT_chats", JSON.stringify(chats));
}

function loadSavedChats(){
    const saved = localStorage.getItem("detoxGPT_chats");
    if(saved){
        chats = JSON.parse(saved);
        // Load last active chat
        const keys = Object.keys(chats);
        if(keys.length>0) currentChat = keys[0];
    }
}

// Update chat list UI for all saved chats
function renderChatList(){
    const chatList=document.getElementById("chatList");
    chatList.innerHTML="";
    Object.keys(chats).forEach(name=>{
        const div=document.createElement("div");
        div.innerText=name;
        div.addEventListener("click",()=>loadChat(name));
        chatList.appendChild(div);
    });
}

// Call after every new message to save
function addMessage(text,type,save=true){
    const chat=document.getElementById("chat");
    const msg=document.createElement("div");
    msg.classList.add("message",type);
    msg.innerText=text;
    chat.appendChild(msg);
    chat.scrollTop=chat.scrollHeight;
    if(save){
        if(!chats[currentChat]) chats[currentChat]=[];
        chats[currentChat].push({text,type});
        saveChats();
    }
}

// Optional: new chat prompt with auto-save
document.getElementById("newChat").addEventListener("click",()=>{
    const name=prompt("Enter chat name:");
    if(!name) return;
    if(chats[name]){
        alert("Chat already exists!");
        return;
    }
    chats[name]=[];
    renderChatList();
    loadChat(name);
    saveChats();
});

// Hamburger toggle
document.getElementById("hamburger").addEventListener("click",()=>{
    document.getElementById("sidebar").classList.toggle("hide");
});

// On load
loadSavedChats();
renderChatList();
loadChat(currentChat);

function addMessage(text, sender){
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(){
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if(!message) return;

  addMessage(message, "user");
  input.value = "";

  const typingMsg = document.createElement("div");
  typingMsg.classList.add("message", "bot");
  typingMsg.innerText = "Typing...";
  document.getElementById("chatBox").appendChild(typingMsg);

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    typingMsg.remove();

    if(data.choices){
      addMessage(data.choices[0].message.content, "bot");
    } else {
      addMessage("API Error: " + JSON.stringify(data), "bot");
    }

  } catch (err) {
    typingMsg.remove();
    addMessage("Connection error. Check server.", "bot");
    console.log(err);
  }
}

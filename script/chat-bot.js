const chatButton = document.querySelector(".chat-button");
const chatContainer = document.querySelector(".chat-container");
const closeChat = document.querySelector(".close-chat");

chatButton.addEventListener("click", () => {
  chatContainer.classList.toggle("active");
});

closeChat.addEventListener("click", () => {
  chatContainer.classList.remove("active");
});

const send_button = document.getElementById("send-button");
const chat_message = document.querySelector(".chat-messages");
const chat_input_detail = document.getElementById("chat-input-detail");
send_button.addEventListener("click", () => {
  let c = chat_input_detail.value;
  chat_message.innerHTML += `
        <div class="message user">
                <div class="avatar">U</div>
                <div class="message-content">
                    ${c}
                </div>
            </div>
    `;
    chat_input_detail.value='';
  let f = getReturn(c);
  
});

let path = "http://192.168.248.118:5001";

async function getReturn(message) {
  try {
    let real_path = path + "/get_response/" + message;

    const response = await fetch(real_path, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors", // thêm mode cors
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    chat_message.innerHTML +=`<div class="message bot">
    <div class="avatar">B</div>
    <div class="message-content">
        ${result}
    </div>
</div>`
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

const shareTrigger = document.querySelector(".page-share");
const shareModal = document.querySelector("#share-modal");
const closeButtons = document.querySelectorAll("[data-close-share]");
const messageForm = document.querySelector("#message-form");
const messageFeedback = document.querySelector("#message-feedback");
const messageContent = document.querySelector("#message-content");
const messageCount = document.querySelector("#message-count");
const messageName = document.querySelector("#message-name");
const messageList = document.querySelector(".message-list");
const waveForm = document.querySelector("#wave-form");
const waveFeedback = document.querySelector("#wave-feedback");
const waveModal = document.querySelector("#wave-modal");
const waveCloseButtons = document.querySelectorAll("[data-close-wave]");
const registeredActivityModal = document.querySelector("#registered-activity-modal");
const registeredCloseButtons = document.querySelectorAll("[data-close-registered]");

function setShareModal(open) {
  shareModal.classList.toggle("is-open", open);
  shareModal.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("modal-open", open);
}

if (shareTrigger && shareModal) {
  shareTrigger.addEventListener("click", () => setShareModal(true));

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => setShareModal(false));
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && shareModal?.classList.contains("is-open")) {
    setShareModal(false);
  }
});

if (messageForm && messageFeedback) {
  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = messageName?.value.trim() || "匿名青年";
    const content = messageContent?.value.trim() || "";
    const firstMessage = messageList?.querySelector("article");

    if (firstMessage && content) {
      firstMessage.innerHTML = `<strong></strong><p></p>`;
      firstMessage.querySelector("strong").textContent = name;
      firstMessage.querySelector("p").textContent = content;
    }

    messageFeedback.textContent = "留言提交成功，积分+5";
    messageForm.reset();
    if (messageCount) {
      messageCount.textContent = "0/120";
    }
  });
}

if (messageContent && messageCount) {
  messageContent.addEventListener("input", () => {
    messageCount.textContent = `${messageContent.value.length}/120`;
  });
}

if (waveForm && waveFeedback) {
  waveForm.addEventListener("submit", (event) => {
    event.preventDefault();
    waveFeedback.textContent = "提交成功，内容审核通过后即可获得积分。";
    if (waveModal) {
      waveModal.classList.add("is-open");
      waveModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }
    waveForm.reset();
  });
}

if (waveModal) {
  waveCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      waveModal.classList.remove("is-open");
      waveModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    });
  });
}

if (registeredActivityModal) {
  const registeredParams = new URLSearchParams(window.location.search);
  const setRegisteredModal = (open) => {
    registeredActivityModal.classList.toggle("is-open", open);
    registeredActivityModal.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("modal-open", open);
  };

  if (registeredParams.get("registered") === "1") {
    window.setTimeout(() => setRegisteredModal(true), 280);
  }

  registeredCloseButtons.forEach((button) => {
    button.addEventListener("click", () => setRegisteredModal(false));
  });
}

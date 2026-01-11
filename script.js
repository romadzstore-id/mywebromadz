// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
  }, 800);
});

// Toast Notification
function toast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Toast Style Inject
const style = document.createElement("style");
style.innerHTML = `
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #1f2937;
  color: #fff;
  padding: 14px 20px;
  border-radius: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: .3s;
  z-index: 999;
}
.toast.show {
  opacity: 1;
  transform: translateY(0);
}`;
document.head.appendChild(style);
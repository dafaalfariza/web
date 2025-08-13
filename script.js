function copyCode(btn) {
  const pre = btn.closest('.bash-container').querySelector('pre');
  const code = pre.innerText;
  navigator.clipboard.writeText(code).then(() => {
    const oldHTML = btn.innerHTML;
    btn.innerHTML = '<span style="color:#4caf50;font-weight:bold;">Copied!</span>';
    setTimeout(() => { btn.innerHTML = oldHTML; }, 2000);
  });
}

function toggleView(btn) {
  const container = btn.closest('.bash-container');
  const codeView = container.querySelector("#code-view");
  const previewView = container.querySelector("#preview-view");
  if (btn.innerText === "Source") {
    btn.innerText = "Back";
    codeView.style.display = "block";
    previewView.style.display = "none";
  } else {
    btn.innerText = "Source";
    codeView.style.display = "none";
    previewView.style.display = "block";
    previewView.srcdoc = container.querySelector("pre").innerText;
  }
}

// Set preview awal untuk bash pertama
document.getElementById("preview-view").srcdoc = document.getElementById("html-code").innerText;

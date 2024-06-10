document.addEventListener("DOMContentLoaded", function () {
  const copyButton = document.getElementById("copyButton");
  if (copyButton) {
    copyButton.addEventListener("click", function () {
      const shortUrlInput = document.getElementById("shortUrl");
      navigator.clipboard
        .writeText(shortUrlInput.value)
        .then(() => {
          alert("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });
  }
});


document.addEventListener("DOMContentLoaded", async () => {

    const qrContainer = document.getElementById("qrcode");
      const dashboard = document.getElementById("dashboard");
  const nextButton = document.getElementById("nextButton");


    try {

      const uniqueId = await window.desktop.createWidget();

      console.log(uniqueId);

      new QRCode(qrContainer, {
        text: uniqueId,
        width: 164,
        height: 164,
        colorDark: "#071421",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

    } catch (error) {
      console.error("Widget creation failed:", error);
    }

    nextButton.addEventListener("click", () => {

      pairScreen.classList.add("hidden");

      pairScreen.style.display = "none";
      dashboard.classList.remove("hidden");

    });
});

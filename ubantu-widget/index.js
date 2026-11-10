
document.addEventListener("DOMContentLoaded", async () => {

    const qrContainer = document.getElementById("qrcode");

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

    function showDashboard() {

      const pairScreen = document.getElementById("pairScreen");
      const dashboard = document.getElementById("dashboard");

      pairScreen.classList.add("hidden");

      pairScreen.style.display = "none";
      dashboard.classList.remove("hidden");

    }

});


document.addEventListener("DOMContentLoaded",()=>{
    const qrContainer = document.getElementById("qrcode");
    
    const uniqueId = crypto.randomUUID();
    
    console.log(uniqueId); 
    
    
    new QRCode(qrContainer, {
      text: uniqueId,
      width: 164,
      height: 164,
      colorDark: "#071421",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    
    
    function showDashboard() {
    
      const pairScreen = document.getElementById("pairScreen");
      const dashboard = document.getElementById("dashboard");
    
      pairScreen.classList.add("hidden");
    
        pairScreen.style.display = "none";
        dashboard.classList.remove("hidden");
    
    }

})

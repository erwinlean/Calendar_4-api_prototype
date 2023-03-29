function showAlert(header) {

    var alertDiv = document.createElement("div");
    alertDiv.classList.add("custom-alert");
    alertDiv.style.display = "none"; 
  
    var alertHeader = document.createElement("p");
    alertHeader.classList.add("custom-alert-header");
    alertHeader.innerText = header;
    alertDiv.appendChild(alertHeader);
  
    var alertBtn = document.createElement("div");
    alertBtn.classList.add("custom-alert-footer");
    var okButton = document.createElement("button");
    okButton.innerText = "OK";
    okButton.addEventListener("click", function () {
      alertDiv.style.display = "none";
      alertDiv.remove();
    });
    alertBtn.appendChild(okButton);
    alertDiv.appendChild(alertBtn);
  
    document.body.appendChild(alertDiv);

    alertBox.style.display = "block";
};
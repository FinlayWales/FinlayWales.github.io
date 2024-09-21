let pfpInput = document.getElementById("pfp-input");
let pfpOutput = document.getElementById("pfp-image");

// PFP Preview
pfpInput.addEventListener("change", function(e) {
    const [pfpFile] = pfpInput.files
    if (pfpFile) {
        pfpOutput.style.backgroundImage = "url(\"" + URL.createObjectURL(pfpFile) + "\")"
    }
});

// Submit Form
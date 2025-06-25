<script>
        function toggleTextAdder() {
            var textAdderContainer = document.getElementById("textAdderContainer");
            textAdderContainer.style.display = textAdderContainer.style.display === "none" ? "block" : "none";
        }

        function previewImage(event) {
            var imagePreview = document.getElementById("imagePreview");
            var file = event.target.files[0];

            if (file) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                };

                reader.readAsDataURL(file);
            }
        }

        let model;
        async function loadModel() {
            model = await cocoSsd.load();
            console.log("COCO-SSD Model Loaded");
        }

        async function generateObjectTextStyles() {
            let textInput = document.getElementById("textInput").value;
            let img = document.getElementById("imagePreview");

            if (!textInput.trim() || !img.src) {
                alert("Upload an image and enter text.");
                return;
            }

            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(textInput, canvas.width / 2, canvas.height / 2);

            let updatedImage = document.getElementById("updatedImage");
            updatedImage.src = canvas.toDataURL();
            updatedImage.style.display = "block";

            document.getElementById("downloadLink").href = updatedImage.src;
            document.getElementById("downloadLink").style.display = "inline-block";
        }

        window.onload = loadModel;
     
    function uploadImage() {
        let imageInput = document.getElementById("imageUpload");
        let textInput = document.getElementById("textInput").value;
        let file = imageInput.files[0];

        if (!file) {
            alert("Please upload an image.");
            return;
        }

        let formData = new FormData();
        formData.append("image", file);
        formData.append("text", textInput);

        fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData
        })
        .then(response => response.blob())
        .then(blob => {
            let url = URL.createObjectURL(blob);
            document.getElementById("updatedImage").src = url;
            document.getElementById("updatedImage").style.display = "block";
            document.getElementById("downloadLink").href = url;
            document.getElementById("downloadLink").style.display = "inline-block";
        })
        .catch(error => console.error("Error:", error));
    }
</script>
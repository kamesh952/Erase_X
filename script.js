function uploadBackground(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("previewImg").style.background = `url(${e.target.result})`;
      document.getElementById("previewImg").style.backgroundSize = "cover";
    };
    reader.readAsDataURL(file);
  }
}

async function removeBackground() {
  const fileInput = document.getElementById("fileInput");
  const removeButton = document.getElementById("addTextButton"); // This is your "Remove Background" button
  const downloadButton = document.getElementById("downloadButton");

  if (!fileInput.files.length) {
    alert("Please upload an image first.");
    return;
  }

  // Show loading state
  removeButton.textContent = "Processing...";
  removeButton.disabled = true;

  const formData = new FormData();
  formData.append("image_file", fileInput.files[0]);
  formData.append("size", "auto");

  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": "N68T1At322LGDBst7p1pjiei",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error:", errorText);
      alert("Failed to remove background: " + errorText);
      // Reset button state
      removeButton.textContent = "Remove Background";
      removeButton.disabled = false;
      return;
    }

    const blob = await response.blob();
    const imageURL = URL.createObjectURL(blob);

    // Update the preview image
    const previewImg = document.getElementById("previewImg");
    previewImg.src = imageURL;
    previewImg.style.background = "none"; // Clear any background styles
    document.getElementById("imagePreview").style.display = "block";

    // Hide Remove Background button and show Download button
    removeButton.style.display = "none";
    downloadButton.style.display = "block";
    
    // Store the processed image URL for download
    downloadButton.setAttribute('data-image-url', imageURL);

  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while processing the image.");
    // Reset button state
    removeButton.textContent = "Remove Background";
    removeButton.disabled = false;
  }
}

function downloadImage() {
  const downloadButton = document.getElementById('downloadButton');
  const imageURL = downloadButton.getAttribute('data-image-url');
  
  if (imageURL) {
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'background_removed.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Fallback to current preview image
    const img = document.getElementById('previewImg');
    if (img.src) {
      const link = document.createElement('a');
      link.href = img.src;
      link.download = 'background_removed.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function initializeSlider() {
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach(slider => {
    const comparison = slider.parentElement;
    const before = comparison.querySelector('.before');

    let isDragging = false;

    function updateSlider(position) {
      const rect = comparison.getBoundingClientRect();
      let offset = ((position - rect.left) / rect.width) * 100;
      offset = Math.max(0, Math.min(100, offset));
      before.style.clipPath = `inset(0 ${100 - offset}% 0 0)`;
      slider.style.left = `${offset}%`;
    }

    function startDragging(event) {
      isDragging = true;
      updateSlider(event.pageX || event.touches[0].pageX);
    }

    function stopDragging() {
      isDragging = false;
    }

    function drag(event) {
      if (!isDragging) return;
      updateSlider(event.pageX || event.touches[0].pageX);
    }

    // Mouse events
    slider.addEventListener('mousedown', startDragging);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('mousemove', drag);

    // Touch events (for mobile support)
    slider.addEventListener('touchstart', startDragging);
    document.addEventListener('touchend', stopDragging);
    document.addEventListener('touchmove', drag);
  });
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const previewImg = document.getElementById('previewImg');
      const imagePreview = document.getElementById('imagePreview');
      const addTextButton = document.getElementById('addTextButton');
      const uploadButton = document.getElementById('uploadButton');
      const downloadButton = document.getElementById('downloadButton');
      
      previewImg.src = e.target.result;
      previewImg.style.background = 'none'; // Clear any background styles
      imagePreview.style.display = 'flex';
      addTextButton.style.display = 'block';
      addTextButton.textContent = 'Remove Background';
      addTextButton.disabled = false;
      
      if (uploadButton) {
        uploadButton.disabled = true;
      }
      
      // Hide download button initially
      if (downloadButton) {
        downloadButton.style.display = 'none';
      }
    };
    reader.readAsDataURL(file);
  }
}

function closePreview() {
  const imagePreview = document.getElementById('imagePreview');
  const previewImg = document.getElementById('previewImg');
  const addTextButton = document.getElementById('addTextButton');
  const uploadButton = document.getElementById('uploadButton');
  const downloadButton = document.getElementById('downloadButton');
  const fileInput = document.getElementById('fileInput');
  
  previewImg.src = '';
  previewImg.style.background = 'none';
  imagePreview.style.display = 'none';
  addTextButton.style.display = 'none';
  
  if (downloadButton) {
    downloadButton.style.display = 'none';
    downloadButton.removeAttribute('data-image-url');
  }
  
  if (uploadButton) {
    uploadButton.disabled = false;
  }
  
  if (fileInput) {
    fileInput.value = '';
  }
}

function downloadImage() {
  const img = document.getElementById('previewImg');
  const link = document.createElement('a');  
  link.download = 'background-removed-image.png';
  link.href = img.src;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function openModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    const iframe = modal.querySelector('iframe');
    modal.style.display = 'flex';
    modal.style.zIndex = '1000';
    if (iframe) {
      iframe.style.display = 'block';
    }
  }
}

function closeModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    const iframe = modal.querySelector('iframe');
    modal.style.display = 'none';
    if (iframe) {
      iframe.style.display = 'none';
    }
  }
}

function setupCarousel() {
  // Add your carousel setup code here if needed
  console.log('Carousel setup initialized');
}

// Initialize everything when the page loads
window.onload = function() {
  closeModal();
  setupCarousel();
  initializeSlider();
};
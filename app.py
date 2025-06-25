from flask import Flask, render_template, request, send_file
import cv2
import numpy as np
import os
from PIL import Image
from io import BytesIO

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        image_file = request.files['image']
        if image_file:
            image = Image.open(image_file).convert('RGB')
            open_cv_image = np.array(image)
            open_cv_image = open_cv_image[:, :, ::-1].copy()

            # Convert to sketch using OpenCV
            gray = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
            inv = 255 - gray
            blur = cv2.GaussianBlur(inv, (21, 21), 0)
            sketch = cv2.divide(gray, 255 - blur, scale=256)

            # Save to BytesIO
            _, img_encoded = cv2.imencode('.png', sketch)
            return send_file(BytesIO(img_encoded.tobytes()), mimetype='image/png')

    return render_template('backremove.html')

if __name__ == '__main__':
    app.run(debug=True)

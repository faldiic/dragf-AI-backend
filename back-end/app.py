from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import cv2
import numpy as np
import tensorflow as tf
from skimage import color
from io import BytesIO
from PIL import Image

MODEL_PATH = 'model_mst/best_model_temp.h5'
IMG_SIZE = (224, 224)
HEX_LIST = ['#f6ede4','#f3e7db','#f7ead0','#eadaba','#d7bd96','#a07e56','#825c43','#604134','#3a312a','#292420']
LABELS = [f'mst_{i+1}' for i in range(len(HEX_LIST))]

app = Flask(__name__)
CORS(app, origins=["https://dragf-ai.vercel.app"])
model = tf.keras.models.load_model(MODEL_PATH, compile=False)

def segment_skin(img):
    ycrcb = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)
    mask = cv2.inRange(ycrcb, (0,133,77), (255,173,127))
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5,5))
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=2)
    skin = cv2.bitwise_and(img, img, mask=mask)
    bg = np.full_like(img, 255)
    bg_mask = cv2.bitwise_not(mask)
    out = cv2.bitwise_and(skin, skin, mask=mask) + cv2.bitwise_and(bg, bg, mask=bg_mask)
    return out

def resize_image_to_target_size(image, target_size_mb=1):
    pil_image = Image.fromarray(image)
    
    quality = 90
    img_byte_arr = BytesIO()
    pil_image.save(img_byte_arr, format='JPEG', quality=quality)
    img_size = len(img_byte_arr.getvalue()) / 1024 / 1024
    
    while img_size > target_size_mb and quality > 10:
        quality -= 5
        img_byte_arr = BytesIO()
        pil_image.save(img_byte_arr, format='JPEG', quality=quality)
        img_size = len(img_byte_arr.getvalue()) / 1024 / 1024 
    
    img_byte_arr.seek(0)
    resized_img = Image.open(img_byte_arr)
    return np.array(resized_img)

def preprocess_image(file_stream):
    file_bytes = np.frombuffer(file_stream.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    img = resize_image_to_target_size(img)
    
    img = cv2.resize(img, IMG_SIZE)
    img = segment_skin(img)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img.astype('float32') / 255.0
    return np.expand_dims(img, axis=0)

@app.route('/')
def index():
    """Render upload page"""
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """Receive an image, run inference, and return JSON."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    f = request.files['file']
    if f.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    x = preprocess_image(f.stream)
    preds = model.predict(x)[0]
    idx = int(np.argmax(preds))
    label = LABELS[idx]
    confidence = float(preds[idx])
    return jsonify({'skintone': label, 'confidence': f'{confidence:.2f}'})

if __name__ == '__main__':
    app.run(debug=True)

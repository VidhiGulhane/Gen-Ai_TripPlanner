# backend/server.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import io

# Initialize Flask App
app = Flask(__name__)
# This allows your React app (on a different port) to communicate with this server
CORS(app) 

# Load your trained Keras model
model = tf.keras.models.load_model('../models/my_model.h5')

# Define the class names in the exact same order as your training data generator
class_names = [
    'Ajanta Caves', 'Charar-E- Sharif', 'Chhota_Imambara', 'Ellora Caves', 
    'Fatehpur Sikri', 'Gateway of India', 'Hawa mahal', 'Humayun_s Tomb', 
    'India_gate', 'Khajuraho', 'Sun Temple Konark', 'alai_darwaza', 
    'alai_minar', 'basilica_of_bom_jesus', 'charminar', 'golden temple', 
    'iron_pillar', 'jamali_kamali_tomb', 'lotus_temple', 'mysore_palace', 
    'qutub_minar', 'tajmahal', 'tanjavur temple', 'victoria memorial'
]

# Create a mapping for more user-friendly destination names
destination_mapping = {
    "tajmahal": "Taj Mahal, India",
    "golden temple": "Golden Temple, India",
    "India_gate": "India Gate, India",
    "Hawa mahal": "Hawa Mahal, India",
    # Add other mappings to make the output prettier
}

def preprocess_image(image_bytes):
    """Prepares an image file for model prediction."""
    # Open the image from bytes and ensure it's in RGB format
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    # Resize to the model's expected input size (224x224)
    img = img.resize((224, 224)) 
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    # Add a batch dimension
    img_array = np.expand_dims(img_array, axis=0) 
    # Normalize the image data
    img_array /= 255.0 
    return img_array

# Define a new endpoint for image prediction to keep it separate from your Node backend
@app.route('/predict-destination', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        img_bytes = file.read()
        processed_image = preprocess_image(img_bytes)
        
        # Get model prediction
        prediction_scores = model.predict(processed_image)
        predicted_index = np.argmax(prediction_scores, axis=1)[0]
        predicted_label_raw = class_names[predicted_index]

        # Use the mapped name if available, otherwise format the raw label
        predicted_destination = destination_mapping.get(predicted_label_raw, predicted_label_raw.replace('_', ' ').title())

        return jsonify({'ok': True, 'destination': predicted_destination})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'Failed to process the image'}), 500

# NOTE: We use port 8000 here to avoid conflicts with your Node server which might be on 5000.
# If your Node server is on a different port, you can use 5000.
if __name__ == '__main__':
    app.run(debug=True, port=8000)
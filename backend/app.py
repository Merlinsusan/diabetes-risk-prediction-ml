from flask import Flask, request, jsonify
import numpy as np
import random
import joblib
from flask_cors import CORS

#  Set random seed for reproducibility
SEED = 56
np.random.seed(SEED)
random.seed(SEED)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS so frontend can call API

#  Load trained model and scaler
model = joblib.load('model.pkl')     # Your saved KNN or RandomForest model
scaler = joblib.load('scaler.pkl')   # Your saved StandardScaler

#  Define prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Extract patient input features
        features = [
            float(data['Pregnancies']),
            float(data['Glucose']),
            float(data['BloodPressure']),
            float(data['SkinThickness']),
            float(data['Insulin']),
            float(data['BMI']),
            float(data['DiabetesPedigreeFunction']),
            float(data['Age'])
        ]

        # Preprocess the input
        input_array = np.array([features])               # Convert to 2D array
        scaled_input = scaler.transform(input_array)     # Apply same scaling as training

        # Predict class and probability
        prediction = model.predict(scaled_input)[0]                      # 0 or 1
        probabilities = model.predict_proba(scaled_input)[0]            # [prob0, prob1]

        # Return JSON response
        return jsonify({
            'prediction': int(prediction),
            'probability_0': round(probabilities[0], 4),
            'probability_1': round(probabilities[1], 4)
        })

    except Exception as e:
        return jsonify({'error': str(e)})

# ✅ Run the Flask server
if __name__ == '__main__':
    app.run(debug=True)

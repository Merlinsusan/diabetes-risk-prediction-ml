from flask import Flask, request, jsonify
import numpy as np
import random
import joblib
from flask_cors import CORS

SEED = 42
np.random.seed(SEED)
random.seed(SEED)

app = Flask(__name__)
CORS(app)  
model = joblib.load('model.pkl')     
scaler = joblib.load('scaler.pkl')   

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

       
        input_array = np.array([features])              
        scaled_input = scaler.transform(input_array)    

        
        prediction = model.predict(scaled_input)[0]                      
        probabilities = model.predict_proba(scaled_input)[0]            

        return jsonify({
            'prediction': int(prediction),
            'probability_0': round(probabilities[0], 4),
            'probability_1': round(probabilities[1], 4)
        })

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)

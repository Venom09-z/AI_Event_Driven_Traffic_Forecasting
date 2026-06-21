# 🚦 AI-Powered Event-Driven Traffic Congestion Forecasting & Response Planning

### 🏆 Flipkart GRID 2026 – Theme 2 Solution

Predict • Prevent • Manage • Optimize




\

---

# 📌 Problem Statement

Large-scale events such as:

* 🎉 Festivals
* 🏏 Sports Events
* 🏛 Political Rallies
* 🚧 Construction Activities
* 🚗 Vehicle Breakdowns
* 🚨 Accidents

often create localized traffic congestion and operational challenges.

### Current Challenges

❌ Event impact not quantified in advance

❌ Resource deployment depends on experience

❌ No post-event learning system

---

# 🎯 Our Solution

We developed an AI-powered Traffic Forecasting & Response Planning System that predicts:

### 🚦 Traffic Risk Score

Predicts congestion severity before traffic collapse.

### 🚗 Congestion Score

Quantifies expected traffic impact.

### ⏱ Estimated Delay

Forecasts probable travel delays.

### 👮 Resource Recommendation

Suggests:

* Police Personnel
* Barricades
* Diversion Routes

for effective traffic management.

---

# 🧠 Machine Learning Pipeline

```text
Historical Event Data
          │
          ▼
Data Cleaning
          │
          ▼
Feature Engineering
          │
          ▼
Encoding & Transformation
          │
          ▼
CatBoost Model
          │
          ▼
LightGBM Model
          │
          ▼
Ensemble Learning
          │
          ▼
Traffic Risk Prediction
          │
          ▼
Decision Support Dashboard
```

---

# 📊 Dataset Features

The system utilizes:

* Event Type
* Event Cause
* Road Closure Requirement
* Zone
* Latitude
* Longitude
* Day
* Month
* Weekday
* Week of Year
* Time of Day

---

# ⚙️ Models Used

| Model          | Purpose                                  |
| -------------- | ---------------------------------------- |
| CatBoost       | Handles categorical features efficiently |
| LightGBM       | High-speed gradient boosting             |
| Ensemble Model | Improved prediction stability            |

---

# 📈 Model Performance

| Metric    | Score  |
| --------- | ------ |
| Accuracy  | 96.09% |
| Precision | 94.86% |
| Recall    | 99.01% |
| F1 Score  | 96.89% |
| ROC-AUC   | 99.50% |

---

# 🔍 Feature Importance

The model identified the following key factors influencing congestion:

🥇 Corridor

🥈 Event Cause

🥉 Geographic Location

🏅 Zone

🏅 Road Closure Requirement

🏅 Time Features

These insights help traffic authorities proactively plan interventions.

---

# 🖥 Dashboard Features

### Home Dashboard

✔ Traffic Risk Score

✔ Congestion Score

✔ Estimated Delay

✔ Resource Planning

---

### Analytics Dashboard

✔ Risk Distribution

✔ Congestion Insights

✔ Event-Based Analysis

✔ Historical Trends

---

### Resource Management Dashboard

✔ Police Allocation

✔ Barricade Recommendations

✔ Diversion Planning

---

# 🚀 Technology Stack

## Machine Learning

* Python
* Scikit-Learn
* LightGBM
* CatBoost
* NumPy
* Pandas

## Visualization

* Plotly
* Matplotlib

## Dashboard

* Streamlit

---

# 📂 Project Structure

```text
Traffic_AI_Dashboard/
│
├── app.py
├── requirements.txt
├── README.md
│
├── models/
│   ├── lightgbm_model.pkl
│   └── catboost_model.pkl
│
├── data/
│   └── traffic_congestion_dashboard_output.csv
│
├── screenshots/
│   ├── dashboard_home.png
│   ├── analytics.png
│   └── recommendations.png
│
└── assets/
    └── logo.png
```

---

# 🔮 Future Enhancements

* 🌍 Real-Time Traffic API Integration
* 🗺 Google Maps Integration
* 🤖 Dynamic Route Optimization
* 📱 Mobile Dashboard
* 🏙 Smart City Deployment

---

# 👥 Team

### EvoVision

Building AI solutions for smarter transportation systems.

---

# ⭐ Impact

This system transforms traditional traffic management from:

Reactive ➜ Predictive

Experience-Based ➜ Data-Driven

Manual Planning ➜ AI-Assisted Decision Making

---

### 🚦 Smarter Roads • Faster Response • Better Mobility

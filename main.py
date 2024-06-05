import os
from dotenv import load_dotenv
import requests
import json

load_dotenv()

def get_trip_logs(scooter_id, bearer_token, limit=None, sort_order="asc"):
    url = f"https://cerberus.ather.io/api/v1/triplogs?scooter={scooter_id}&sort=start_time_tz%20{sort_order}"
    if limit is not None:
        url += f"&limit={limit}"
    headers = {"Authorization": f"Bearer {bearer_token}"}
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print("Error:", response.status_code)
        return None

def save_to_file(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)
        
scooter_id = os.getenv("SCOOTER_ID")
bearer_token = os.getenv("BEARER_TOKEN")


# historical_data = get_trip_logs(scooter_id, bearer_token)
# if historical_data:
#     save_to_file(historical_data, "historical_data.json")
#     print("Trip logs saved to historical_data.json")

trip_data = get_trip_logs(scooter_id, bearer_token, limit=20, sort_order="desc")
if trip_data:
    save_to_file(trip_data, "trip_data.json")
    print("Trip logs saved to trip_data.json")


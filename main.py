import os
from dotenv import load_dotenv
import requests
import json
import hashlib
load_dotenv()

scooter_id = os.getenv("SCOOTER_ID")
bearer_token = os.getenv("BEARER_TOKEN")


def get_md5(filename):
    """Calculate and return the MD5 hash of a file."""
    hash_md5 = hashlib.md5()
    with open(filename, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


def check_md5(filename, previous_md5):
    """Check if the MD5 hash of the file matches the server's MD5 hash."""
    new_md5 = get_md5(filename)
    return new_md5 == previous_md5


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


def get_historical_data(scooter_id, bearer_token, filename):
    historical_data = get_trip_logs(scooter_id, bearer_token)
    if historical_data:
        save_to_file(historical_data, f"{filename}.json")
        print("Trip logs saved to historical_data.json")


def get_trip_data(scooter_id, bearer_token, limit, filename):
    trip_data = get_trip_logs(scooter_id, bearer_token, limit, sort_order="desc")
    if trip_data:
        save_to_file(trip_data, f"{filename}.json")
        print("Trip logs saved to trip_data.json")

def compare_history_and_trip_append(history_file, trip_file):
    with open(f'{history_file}.json', 'r') as f:
        history_data = json.load(f)

    with open(f'{trip_file}.json', 'r') as f:
        recent_trips_data = json.load(f)

    history_ids = {trip['id'] for trip in history_data}
    new_trips = [trip for trip in recent_trips_data if trip['id'] not in history_ids]
    history_data.extend(new_trips)

    with open(f'{history_file}.json', 'w') as f:
        json.dump(history_data, f, indent=4)

def process_trip_data(scooter_id, bearer_token, limit, history_file):
    trip_file = "trip_data"

    # Get recent trip data
    get_trip_data(scooter_id, bearer_token, limit, trip_file)

    # Check if MD5 hashes match
    if not check_md5(f"{trip_file}.json"):
        # If MD5 hashes don't match, compare recent trips with historical data
        compare_history_and_trip_append(history_file, trip_file)
        print("Recent trips compared with historical data.")

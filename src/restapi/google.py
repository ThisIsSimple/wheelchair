import pandas as pd
import os
import json
from time import sleep
import requests
import googlemaps
from urllib.parse import quote
from urllib.request import Request, urlopen
import ssl
import json
import os
from supabase import create_client, Client
from datetime import datetime
import asyncio
import aiohttp
from time import time

url: str = "https://.supabase.co"
key: str = "..-"
supabase: Client = create_client(url, key)

API_key = ""

async def fetch_places(session, text, current_lat, current_lon):
    payload = {
        "textQuery": text,
        "maxResultCount": 10,
        "locationBias": {
            "circle": {
                "center": {
                    "latitude": current_lat, 
                    "longitude": current_lon
                },
                "radius": 750.0
            }
        }
    }
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_key,
        "X-Goog-FieldMask": "places",
        "languageCode" : "ko"
    }

    async with session.post("https://places.googleapis.com/v1/places:searchText", json=payload, headers=headers) as response:
        return await response.json()

async def store_request(text, current_lat, current_lon):
    async with aiohttp.ClientSession() as session:
        store_response = await fetch_places(session, text, current_lat, current_lon)
        places = [place["id"] for place in store_response.get("places", [])]
        return places

async def store_info(text, current_lat, current_lon):
    places = await store_request(text, current_lat, current_lon)
    return places


def extract_data(json_data):
    place_id = json_data.get('id', None)
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    accessible_info = json_data.get('accessibilityOptions', {})
    accessible_parking = accessible_info.get('wheelchairAccessibleParking', False)
    accessible_entrance = accessible_info.get('wheelchairAccessibleEntrance', False)
    store_location = json_data.get('location', {})
    store_lat = store_location.get('latitude', 0)
    store_lon = store_location.get('longitude', 0)
    final_location = f"Point({store_lon} {store_lat})"
    
    photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=4000&photoreference="
    try:
        photo_name = json_data.get('photos', {})[0].get('name', '')
        photo_name = photo_name.replace(f'places/{place_id}/photos/', '')
        photo_return = photo_url + photo_name + f"&key={API_key}"
    except:
        photo_return = None

    try:
        periods = json_data['regularOpeningHours']['periods']
        day_mapping = {
            0: '일요일',
            1: '월요일',
            2: '화요일',
            3: '수요일',
            4: '목요일',
            5: '금요일',
            6: '토요일',
        }
        description_dict = {}
        for period in periods:
            open_time = "{:02d}:{:02d}".format(period['open']['hour'], period['open']['minute'])
            close_time = "{:02d}:{:02d}".format(period['close']['hour'], period['close']['minute'])
            day = day_mapping[period['open']['day']]
            description_dict[day] = f"오전 {open_time}~오후 {close_time}"
        for day_name in day_mapping.values():
            description_dict.setdefault(day_name, "휴무일")
        descriptions = [(day, description_dict.get(day)) for day in day_mapping.values()]
    except KeyError:
        descriptions = [("정보가 없습니다", None)]

    return {
        'name': json_data.get('displayName', {}).get('text', None),
        'google_place_id': place_id,
        'created_at': created_at,
        'address_detail' : None,
        'address': json_data.get('formattedAddress', None),
        'opening_hours': descriptions,
        'location': final_location,
        'is_accessibility_parking': accessible_parking,
        'is_accessibility_entrance': accessible_entrance,
        'thumbnail' : photo_return
    }

async def fetch_place_info(session, place_id):
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_key,
        "X-Goog-FieldMask": "id,displayName,accessibilityOptions,formattedAddress,location,regularOpeningHours,photos"
    }
    async with session.get("https://places.googleapis.com/v1/places/" + place_id, headers=headers) as response:
        return await response.json()

async def go_to_database(place_ids):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_place_info(session, place_id) for place_id in place_ids]
        place_info = await asyncio.gather(*tasks)
        return place_info

def gogo(food, current_lat, current_lon):
    store_id = asyncio.run(store_info(food, float(current_lat), float(current_lon)))
    place_info = asyncio.run(go_to_database(store_id))
    request_place = []
    for info in place_info:
        ext = extract_data(info)
        request_place.append(ext)

    data, count = supabase.table('places').upsert(request_place).execute()

    return request_place
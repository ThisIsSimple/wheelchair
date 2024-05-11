from PyNaver import NaverCloudPlatform
from urllib.request import Request, urlopen
import json
import urllib
import requests
import sys
from supabase import create_client, Client

# 네이버 애플리케이션 인증 정보
client_id = ''
client_secret = ''
skt_url = "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&callback=function"
skt_appkey = ''
address = ['경기도 수원시 영통구 영통동 994-6', '경기도 용인시 기흥구 서천동 1']
#address = ['서울 관악구 인헌16길 33-7', '경기 용인시 기흥구 하갈동 1-1']

def get_location(loc):
	# 네이버 클라우드 플랫폼 API 인스턴스 생성
	api = NaverCloudPlatform(client_id, client_secret)
	res = api.geocoding(loc)
	if res['meta']['totalCount'] == 1 : 
		lat = res['addresses'][0]['y']
		lon = res['addresses'][0]['x']
		return lon, lat
	else:
		return 0

def naver_directions(start, goal):
	start = get_location(start)
	end = get_location(goal)
	s = str(start[0]) + ',' + str(start[1])
	e = str(end[0]) + ',' + str(end[1])
	
	api = NaverCloudPlatform(client_id, client_secret)
	res = api.directions15(start=s, goal=e, option='trafast')
	return res

def skt_directions(start, goal, option):
	payload = {
		"startX": float(start[0]),
		"startY": float(start[1]),
		"endX": float(goal[0]),
		"endY": float(goal[1]),
		"startName": address[0], #urllib.parse.quote('출발', encoding='utf-8'),
		"endName": address[1], #urllib.parse.quote('도착', encoding='utf-8'),
		"searchOption": option
	}
	headers = {
		"accept": "application/json",
		"content-type": "application/json",
		"appKey": skt_appkey
	}
	if option == '30':
		skt_url = "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&callback=function"
	else:
		skt_url = 'https://apis.openapi.sk.com/tmap/routes?version=1&callback=function'
	response = requests.post(skt_url, json=payload, headers=headers)
	
	return response.text

def odsay(start, end):
	apiKey = ""
	url = 'https://api.odsay.com/v1/api/searchPubTransPathT'  #?apiKey='+apiKey+'&lang=0&SX=127.0283073&SY=37.4981639&EX=127.0846738&EY=37.2385878&OPT=0&SearchPathType=0'
	payload = {
		"apiKey": "",
		"lang": "1",
		"output": "json",
		"SX": "{}".format(start[0]),
		"SY": "{}".format(start[1]),
		"EX": "{}".format(end[0]),
		"EY": "{}".format(end[1]),
		"OPT": "0",
		"SearchPathType": "0"
	}
	headers = {
		"accept": "application/json",
		"content-type": "application/json"
	}
	response = requests.get(url, params=payload, headers=headers)
	return json.loads(response.text)

def split_find(start, _end):
	data = odsay(start, _end)

	info = data['result']['path'][0]['info']
	subpath = data['result']['path'][0]['subPath']

	lst = []
	before = start
	for path in subpath:
		if path['trafficType'] != 3:
			start = (path['startX'], path['startY'])
			end = (path['endX'], path['endY'])


			if before != start: # walk
				lst.append({3: [before, start]})

			lst.append({path['trafficType']: [start, end]})
			before = end
	
	if before != _end: # end
		lst.append({3: [before, _end]})

	arr = []
	for path in lst:
		for num, value in path.items():
			start = value[0]
			end = value[1]
			option = '0'
			if num == 3:
				option = '30'
			r = skt_directions(start, end, option)
			arr.append(r)
	return arr
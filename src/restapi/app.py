# -- coding: utf-8 --
from flask import Flask, request, render_template
from flask_cors import CORS
from google import gogo
from utils import *

app = Flask(__name__)
CORS(app)

@app.route("/geocoding", methods=['GET', 'POST']) #address
def geocoding():
	if request.method == 'POST':
		parm = request.get_json()
		start = get_location(parm['start'])
		end = get_location(parm['end'])
		option = str(parm['option'])

		if start==0 or end==0:
			return "Not Found Address X,Y"
		else:
			return skt_directions(start, end, option)
		#return render_template("index.html", start=start, end=end, option=option)
	
	else:
		return "Input POST"

@app.route("/direction", methods=['GET', 'POST']) #lon, lat
def direction():
	if request.method == 'POST':
		parm = request.get_json()
		start = [parm['start'][1], parm['start'][0]]
		end = [parm['end'][1], parm['end'][0]]
		option = str(parm['option'])

		if start==0 or end==0:
			return "Not Found Address X,Y"
		else:
			return skt_directions(start, end, option)
	
	else:
		return "Input POST"


@app.route('/near', methods=['POST'])
def near():
	if request.method == 'POST':
		parm = request.get_json()
		res = gogo(parm['food'], parm['lat'], parm['lon'])
		return res

@app.route("/split", methods=['GET', 'POST'])
def split():
	if request.method == 'POST':
		parm = request.get_json()
		start = (parm['start'][1], parm['start'][0])
		end = (parm['end'][1], parm['end'][0])
		res = split_find(start, end)
		#print(res)
		return res

if __name__ =='__main__':
	#naver_directions(address[0], address[1])
	app.run(debug=True, host='0.0.0.0', port=443, ssl_context=('cert.pem', 'key.pem'))
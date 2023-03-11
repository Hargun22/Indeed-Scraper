from scraper import Scraper
from Job import Job
import json
from flask import Flask, jsonify, request
from flask_cors import CORS

scraper = Scraper()

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def index():
    data = json.loads(request.data)
    keywords = data['keywords']
    location = data['location']
    title = data['title']
    scraper.set_params(location, title)
    scraper.set_page_limit()
    jobs = scraper.get_matched_jobs_for_all_pages(keywords)
    return jsonify([job.serialize() for job in jobs])

@app.route('/<page_num>', methods=['POST'])
def get_jobs_for_page(page_num):
    data = json.loads(request.data)
    print(data)
    keywords = data['keywords']
    location = data['location']
    title = data['title']
    scraper.set_params(location, title)
    jobs = scraper.get_matched_jobs_for_page(keywords, page_num)
    return jsonify([job.serialize() for job in jobs])

if __name__ == '__main__':
    app.run(debug=True, port=5002)
    
    


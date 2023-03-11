import requests
from bs4 import BeautifulSoup
from Job import Job
import math



class Scraper:
    # URL to scrape
    def __init__(self):
        self.base_url = "http://ca.indeed.com"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
        }
        self.params = {
            "q": "software developer",
            "l": "Canada",
            "fromage": "1",
            "start": "0"
        }

        self.page_limit = 15

    def set_params(self, location, title):
        self.params= {
            "q": title,
            "l": location,
            "fromage": "1",
            "start": "0"
        }

    def set_page_limit(self):
        r = requests.get(self.base_url + "/jobs/", headers=self.headers, params=self.params)
        soup = BeautifulSoup(r.text, "html.parser")
        job_count = soup.find("div", class_="jobsearch-JobCountAndSortPane-jobCount").text.strip().split(" ")[0]
        self.page_limit = math.ceil(int(job_count)/15)


    # Get the job details for a job listing
    def get_job_details(self, job_listing):
        #Get the job title
        job_title = job_listing.find("a", class_="jcs-JobTitle").find("span").text.strip()

        #Get the company name
        company_name = job_listing.find("span", class_="companyName").text.strip()
        # Get the location
        location = job_listing.find("div", class_="companyLocation").text.strip()
        # Get the job summary
        job_summary = job_listing.find("div", class_="job-snippet").text.strip()
        # Get the job date
        job_date = job_listing.find("span", class_="date").text.strip()[6:]
        # Get the job URL
        job_url = job_listing.find("a", class_="jcs-JobTitle").get("href")
        # Get the job URL
        job_url = self.base_url + job_url

        r2 = requests.get(job_url, headers=self.headers)
        soup2 = BeautifulSoup(r2.text, "html.parser")

        job_description = soup2.find("div", class_="jobsearch-jobDescriptionText").text.strip()

        # Print the job title, company name, location, job summary, job date, job URL
        return job_title, company_name, location, job_summary, job_date, job_url, job_description


    # returns jobs with keywords
    def get_jobs_with_keywords(self, job_listings, keywords):
        result = []
        for job_listing in job_listings:
            job_title, company_name, location, job_summary, job_date, job_url, job_description = self.get_job_details(job_listing)
            job_description = job_description.lower()
            for keyword in keywords:
                keyword = keyword.lower()
                if keyword in job_description:
                    job = Job(job_title, company_name, location, job_summary, job_date, job_url, job_description)
                    result.append(job)
        
        return result


    # loop through the pages
    def get_matched_jobs_for_all_pages(self, keywords):
        result = []
        for index in range(0, self.page_limit):
            job_listings = self.get_job_listings_for_page(index)
            result += self.get_jobs_with_keywords(job_listings, keywords)

        return result

    # Get the job listings for a page
    def get_job_listings_for_page(self, page_num):
        new_params = self.params.copy()
        new_params["start"] = page_num * 10
        # Get the HTML from the URL
        r = requests.get(self.base_url + "/jobs/", headers=self.headers, params=new_params)
        soup = BeautifulSoup(r.text, "html.parser")
        # Get the job listings
        job_listings = soup.find_all("div", class_="job_seen_beacon")
        return job_listings

    # gets the matched jobs based on keywords for a page
    def get_matched_jobs_for_page(self, page_num, keywords):
        job_listings = self.get_job_listings_for_page(page_num=page_num)
        return self.get_jobs_with_keywords(job_listings, keywords)

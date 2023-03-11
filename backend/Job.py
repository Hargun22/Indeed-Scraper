import json

class Job:
    def __init__(self, title, company, location, summary, date, url, description):
        self.title = title
        self.company = company
        self.location = location
        self.summary = summary
        self.date = date
        self.url = url
        self.description = description
        
    
    def serialize(self):
        invalidkeys = ["description"]
        return {k:v for k,v in self.__dict__.items() if k not in invalidkeys}


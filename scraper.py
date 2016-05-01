import re
import urllib3
import cgi, cgitb
import json
import tempfile
import os
from bs4 import BeautifulSoup

# cgitb.enable()

languages = ("c++", "java", "javacript", "python", "css", "php", "ruby",\
	"c", "shell") 
	# "r", "go", "perl", "swift", "coffeescript", "clojure"\
	# "arduino", "matlab")
numbers = []

#to start python server
http = urllib3.PoolManager()#allows requests to multiple hosts

#need to add  nav class=menu to narrow search

# for language in languages:
# 	print(language)
# 	r = http.request('GET', 'https://github.com/search?q=' + language)
# 	htmlSource = r.data
# 	soup = BeautifulSoup(htmlSource, "html.parser")
# 	mystuff = soup.find("span", class_="counter")
# 	str(mystuff)#convert utf-8 into string
# 	for row in mystuff:
# 		number = re.sub("[^0-9]", "", row)
# 		numbers.append(number)
# 		print(number)

#convert langauge information into json
with open('bubbles.json') as json_file:
    json_data = json.load(json_file)
langs = json_data['languages']
# for name in langs:
#     name['repositorie'] = '1'#each num is appended to repository
with tempfile.NamedTemporaryFile(dir='.', delete=False) as temp_file:
    json.dump(temp_file, json_data)
# os.replace(temp_file.name, 'bubbles.json')

# form = cgi.FieldStorage() 
# msg = form.getvalue('msg')
# print(json.JSONEncoder().encode())
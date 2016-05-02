#!/usr/bin/python

import re
import urllib3
import cgi, cgitb
import json
import os
from bs4 import BeautifulSoup

cgitb.enable()

# Checks if CGI is working
# print "Content-Type: text/html\n\n"
# print "Hello World!"

languages = ("haskell", "java", "swift", "python", "css", "php", "ruby",\
	"perl", "shell") 
#Store repository numbers for each language
numbers = []
#Create pool manager to allow multiple requests
http = urllib3.PoolManager()

#Extracts information from github 
for language in languages:
	#Extracts html from github 
	r = http.request('GET', 'https://github.com/search?q=' + language)
	htmlSource = r.data
	#parse html for information
	soup = BeautifulSoup(htmlSource, "html.parser")
	mystuff = soup.find("span", class_="counter")
	str(mystuff)#convert utf-8 into string
	#Remove utf-8 and collect repository numbers
	for row in mystuff:
		number = re.sub("[^0-9]", "", row)
		numbers.append(number)
		print(number)

#Convert langauge information into json
#Opens json file to extract data to be changed
with open('bubbles.json') as json_file:
    json_data = json.load(json_file)
langs = json_data

#Updates json file with new github information
i = 0
for name in langs:
    name['repositories'] = numbers[i]#each num is appended to repository 
    i = i + 1
#Write to temporary file
with open('temp.json', 'w') as json_write:
    json.dump(langs, json_write)

#replace bubbles information with updated information in temp
os.replace('temp.json', 'bubbles.json')

form = cgi.FieldStorage() 
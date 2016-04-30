import re
import urllib3
import cgi, cgitb
import json
from bs4 import BeautifulSoup

cgitb.enable()

languages = ("c++", "java", "javacript", "python", "css", "php", "ruby",\
	"c", "shell") 
	# "r", "go", "perl", "swift", "coffeescript", "clojure"\
	# "arduino", "matlab")


#to start python server
http = urllib3.PoolManager()#allows requests to multiple hosts

for language in languages:
	print(language)
	r = http.request('GET', 'https://github.com/search?q=' + language)
	htmlSource = r.data
	soup = BeautifulSoup(htmlSource, "html.parser")
	mystuff = soup.find("span", class_="counter")
	str(mystuff)
	for row in mystuff:
		number = re.sub("[^0-9]", "", row)
		print(number)


form = cgi.FieldStorage() 
msg = form.getvalue('msg')
print(json.JSONEncoder().encode())
#print(htmlSource)
#mystuff = soup.find("div", class_="sort-bar")



#print(soup.h3)
#print(mystuff.encode("utf-8"))



# soup = BeautifulSoup(r, "html.parser")

# titleTag = soup.html.head.title
# print("hello")
# print(titleTag)
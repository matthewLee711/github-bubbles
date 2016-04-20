import re
import urllib3
from bs4 import BeautifulSoup

http = urllib3.PoolManager()
r = http.request('GET', 'https://github.com/search?q=java')
htmlSource = r.data

soup = BeautifulSoup(htmlSource, "html.parser")
#print(htmlSource)
mystuff = soup.find("div", class_="sort-bar")

#print(soup.h3)
#print(mystuff.encode("utf-8"))

for row in mystuff.find_all('h3'):
	print(row.encode("utf-8"))

# soup = BeautifulSoup(r, "html.parser")

# titleTag = soup.html.head.title
# print("hello")
# print(titleTag)
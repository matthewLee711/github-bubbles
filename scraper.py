import re
import urllib3
from bs4 import BeautifulSoup

http = urllib3.PoolManager()
r= http.request('GET', 'http://github.com')
htmlSource = r.data

soup = BeautifulSoup(htmlSource)




# soup = BeautifulSoup(r, "html.parser")

# titleTag = soup.html.head.title
# print("hello")
# print(titleTag)
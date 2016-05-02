#!/usr/bin/env python

import re
import urllib3
import cgi, cgitb
import json
import os
from bs4 import BeautifulSoup

cgitb.enable()


print "Content-Type: text/html"
print
print 'Hello World'

form = cgi.FieldStorage() 
# import geocoder

# go to https://geocoder.readthedocs.io/api.html#install AWS LAMBDA LAYERS for external layers

import requests
#import pandas

import tabula


url = 'https://www.nccde.org/DocumentCenter/View/266'
r = requests.get(url, allow_redirects=True)

open('266.pdf', 'wb').write(r.content)


tabula.environment_info()
#
pdf_path = '266.pdf'

# houseJSON = tabula.convert_into(pdf_path, 'bryan.json', pages="all",
#                                output_format="JSON", lattice=True)

houseJSON = tabula.convert_into(pdf_path, 'bryan.json', pages="all",
                                output_format="JSON", lattice=True)

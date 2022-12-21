#!/bin/bash

cd ..
git pull
cd mysite/
python3 manage.py runserver 0.0.0.0:8000

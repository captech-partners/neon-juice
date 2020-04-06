#!/bin/bash

# Init virtualenv
virtualenv venv --python=python3
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

python -u assembler.py start fragments/ -p 5000 --local

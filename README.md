# neon-juice
## Behavior Based Dynamic Website Generator. A new way to deliver personalized, adaptive websites to all devices in real-time.

Behavioral Based Website Generator

Presenters: Ivy An, Simon Lu, Ziling Wang

Sponsor: Captech Partners (Robert Fanini) / Reactful Inc. (Roger Ruttimann)

Faculty Advisor: Professor Doug Halperin, CS490
 
Reactful is a SaaS application that dynamically changes the users' web experience by injecting Web content based on onsite user behavior (digital body language) while navigating any customized websites. In the project, the team designed a new paradigm for creating and generating dynamic websites to leverage Reactful’s capabilities. The team constructed a flexible, generalized, and minimally invasive fragmentation of HTML and templates and an API based dynamic web page creator service. The service efficiently assembles the fragments into webpages for desktop and mobile devices, and the process is deterministic by navigation, templates, and user ‘s behavior. The end objective is for web pages to be dynamically and efficiently assembled on request while supporting a wide range of content layouts.

# Project Overview
# Install

clone the directory by:
```
$ git clone https://github.com/captech-partners/neon-juice.git
```

## Running the app on your local computer
Step into project folder:
```
$ cd neon-juice
```
### Setup virtal environment
```
$ virtualenv -p python3 env
$ source env/bin/activate
$pip install -r assembler/requirements.txt
```

### Start the application
#### Full application: API, Builder interface and Admin Dashboard
```
$ python3 assembler/assembler.py start assembler/fragments/ -p <port> --local
```

#### Remote application: API, and Admin Dashboard
```
$ python3 assembler/assembler.py start assembler/fragments/ -p <port>
```

#### Testing local deployment
In your browser, enter the following address:

`
http://localhost:<port>/back-to-school/lb1
`

#### Stopping deployment
To stop the local task press Control+C ( Ctrl-C )

Exit Virtual Environment: deactivate
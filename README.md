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
$ cd neon-juice/assembler
```
### Setup virtal environment
```
$ virtualenv -p python3 env
$ source env/bin/activate
$ pip install -r requirements.txt
```

### Start the sample application

Quick Note:

The builder interface behaves as an IDE, this means that the `fragments` directory behaves as a working source folder for the builder interface (builder will write files inside `fragments` at runtime)

Currently the fragments defined in `fragments` are copied from the sample/backup directory `fragments_samples`. So __DO NOT modify `fragments_samples`, or launching the application using `fragments_samples`__

.gitignore is ignoring `fragments`. Your changes to `fragments` during local debugging will/should not be tracked.


#### Full application: API, Builder interface and Admin Dashboard
```
$ python assembler.py start fragments/ -p 5000 --local
```

#### Remote application: API, and Admin Dashboard
```
$ python assembler.py start fragments/ -p 5000
```

> Note: Frontend builder interfaces are currently hard-coded for port 5000. This will be removed to dynamic later to support any port.


#### Testing local deployment

In your browser, render `back-to-school` page by visiting the following address:
http://localhost:5000/back-to-school

Visit the builder interface
http://localhost:5000/builder

Visit the admin dashboard interface
http://localhost:5000/dashboard


#### Stopping deployment
To stop the local task press Control+C ( Ctrl-C )

Exit Virtual Environment: deactivate

# API
https://app.swaggerhub.com/apis/simonl07/neon-juice/1.0.0

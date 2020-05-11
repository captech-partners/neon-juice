# Project Overview
## Install

Clone the directory by:
```
$ git clone https://github.com/captech-partners/neon-juice.git
```

## Running the app on your local computer

### Backend
Start up the Backend (see instructions in `assembler` folder).
```
$ cd neon-juice/assembler/
```

### Start the React Application

In separate terminal instance, step into studio folder:
```
$ cd neon-juice/assembler/studio
```

Quick Note:

The builder interface behaves as an IDE, this means that the `fragments` directory behaves as a working source folder for the builder interface (builder will write files inside `fragments` at runtime)

Currently the fragments defined in `fragments` are copied from the sample/backup directory `fragments_samples`. So __DO NOT modify `fragments_samples`, or launching the application using `fragments_samples`__

.gitignore is ignoring `fragments`. Your changes to `fragments` during local debugging will/should not be tracked.


#### Setup
```
$ npm install
```

#### Deploy
```
$ npm run build
$ npm run start
```

#### Testing local deployment

In your browser:
http://localhost:8080/


#### Stopping deployment
To stop the local task press Control+C ( Ctrl-C )

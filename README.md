Info
===

Toy anonymous text board with live updates. Check [live example](http://vkevroletin.github.io/text-board/).
Power of quick live updates comes from [firebase](https://www.firebase.com/) service.

This is client-side pure javascript application. Backend is managed by SAAS platform firebase.

Installation is simple
===

You need node.js installed in your system. Also you need bower and grunt-cli(if you plan to develop):

        npm install -g bower
        npm install -g grunt-cli

Clone source code using git and install bower dependencies:

        git clone https://github.com/vkevroletin/text-board.git
        cd text-board
        bower install

Development
===

Install npm dependencies which will automate your life.
They find errors in code, run tests in multiple browsers, optimize code and install libraries. 

        npm install

Workflow
===

Verify syntax in all javascript files
       
        grunt jshint

Run unit tests and write code coverage statistics into `coverage/` folder

        grunt test

Run unit tests each time you change code

        grunt watch:jsTest

Prepare distribution with optimized code into `dist` folder

        grunt build

Serve application using nodejs server (with autoreload feature)

        grunt serve

e2e testing
===

You need to install WebDriver and configure tests/protractor.conf.js. Then you are ready
to run tests.

Run e2e tests in chrome

        grunt test:e2e

Run e2e in other browser

        grunt protractor:firefox
        grunt protractor:chrome
        grunt protractor:opera
        grunt protractor:ie

Run e2e tests each time you change code:

        webdriver-manager start
        grunt watch:e2e


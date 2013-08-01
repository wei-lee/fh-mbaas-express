PACKAGE = fh-webapp

TESTS=$(wildcard test/test-*.js)

all : test

test:
	@echo TESTS
	@env NODE_PATH=./lib whiskey --real-time --tests $(TESTS) --global-setup-teardown "test/setup.js"



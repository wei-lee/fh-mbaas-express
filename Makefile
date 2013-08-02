PACKAGE = fh-webapp

all : test

test:
	@echo TESTS
	@env npm test

.PHONY: test

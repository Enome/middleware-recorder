test:
	mocha $(shell find ./tests -name "*.js") -r should -R spec

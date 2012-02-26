test:
	mocha $$(find ./tests -name "*.js") -r should -R spec

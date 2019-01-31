.PHONY: build clean node_modules start

node_modules:
	@npm install

start: node_modules
	@npx parcel -p 4001 index.html

build: node_modules
	@npx parcel build index.html --public-url .

clean:
	@rm -rf dist node_modules

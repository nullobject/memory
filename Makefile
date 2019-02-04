.PHONY: build clean start

start:
	@npx parcel -p 4002 index.html

build:
	@npx parcel build index.html --public-url .

clean:
	@rm -rf dist node_modules

.PHONY: build clean deploy lint start test unit

start:
	@npx parcel -p 4002 index.html

build:
	@npx parcel build index.html --public-url .

deploy: build
	@aws s3 sync ./dist/ s3://memory.joshbassett.info/ --acl public-read --delete --cache-control 'max-age=300'

test: unit lint

unit:
	@npx jest

lint:
	@npx standard "src/**/*.js"

clean:
	@rm -rf dist

.PHONY: dist

dist:
	rm -rf ./build
	../../node_modules/.bin/webpack -d
	./scripts/prepend-env.sh
	cp -R src/loaders build/
	npm run build-runtime-assets

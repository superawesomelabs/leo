.PHONY: dist

dist: ./build
	webpack -d
	./scripts/prepend-env.sh
	cp -R src/loaders build/
	npm run build-runtime-assets

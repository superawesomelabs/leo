.DEFAULT_GOAL := help
.PHONY: dist, help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

dist: ## build everything for production
	rm -rf ./build
	../../node_modules/.bin/webpack -d
	./scripts/prepend-env.sh
	cp -R src/loaders build/
	npm run build-runtime-assets

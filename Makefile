.PHONY: start deploy

start:
	npm run dev

release:
deploy:
	git add -A
	git commit -m "deploy" --allow-empty
	git push origin main
